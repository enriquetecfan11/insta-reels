# API HTTP — Referencia

La API HTTP permite usar Remotion de forma remota: listar contenido, encolar renders y descargar MP4 sin bloquear el servidor. Los renders se procesan en segundo plano con una cola de jobs en memoria.

## Arranque

```bash
npm run api
```

Por defecto el servidor escucha en `http://localhost:3000`. El puerto y el resto de opciones se configuran con variables de entorno (ver [Configuración](#configuración)).

---

## Endpoints

Respuestas exitosas suelen llevar `{ "success": true, "data": ... }`. Los errores llevan `{ "success": false, "error": "mensaje" }` y un código HTTP adecuado.

### GET `/health`

**Descripción:** Comprueba que el servidor está vivo (liveness).

**Respuesta:** `200 OK` con cuerpo `OK` (text/plain).

**Ejemplo:**

```bash
curl http://localhost:3000/health
```

---

### GET `/content`

**Descripción:** Lista los reels disponibles, leyendo los JSON en `content/`.

**Respuesta:** `200 OK` con JSON:

```json
{
  "success": true,
  "data": [
    { "id": "001-que-es-ia", "label": "¿Qué es la\nInteligencia Artificial?" },
    { "id": "002-prompt-engineering", "label": "Prompt Engineering:\ncómo hablarle a la IA" }
  ]
}
```

- **id** — Identificador del reel (coincide con el nombre del archivo sin `.json` y con el `id` del JSON).
- **label** — Opcional. Título o texto principal del primer slide (intro/concept/highlight) para mostrar en UIs.

**Ejemplo:**

```bash
curl http://localhost:3000/content
```

---

### POST `/render`

**Descripción:** Encola un render. No espera a que termine; devuelve un `jobId` para consultar el estado después.

**Body (uno de los dos):**

1. **Por contenido existente:** `{ "contentId": "<id>" }`  
   El servidor carga `content/<id>.json` y lo valida. Ejemplo: `{ "contentId": "001-que-es-ia" }`.

2. **Reel completo:** Un objeto **ReelContent** con `id` y `slides` (mismo formato que los JSON de `content/`). Ver [CREAR_VIDEOS.md](../setup/CREAR_VIDEOS.md) y [LLM_ESPECIFICACION_VIDEOS.md](../setup/LLM_ESPECIFICACION_VIDEOS.md).

**Respuesta exitosa:** `202 Accepted`

```json
{
  "success": true,
  "data": { "jobId": "550e8400-e29b-41d4-a716-446655440000" }
}
```

**Errores:**

- `400 Bad Request` — Body inválido o `contentId` no encontrado. `error` indica el motivo.
- `413 Payload Too Large` — Body por encima del límite configurado (`JSON_LIMIT`).

**Ejemplos:**

```bash
# Render por contentId
curl -X POST http://localhost:3000/render \
  -H "Content-Type: application/json" \
  -d '{"contentId":"001-que-es-ia"}'

# Render con ReelContent completo
curl -X POST http://localhost:3000/render \
  -H "Content-Type: application/json" \
  -d '{"id":"mi-reel","slides":[{"type":"intro","title":"Hola","duration":2}]}'
```

---

### GET `/jobs/:jobId`

**Descripción:** Devuelve el estado del job con el `jobId` devuelto por `POST /render`.

**Respuesta:** `200 OK`

```json
{
  "success": true,
  "data": {
    "status": "completed",
    "progress": 1,
    "outputId": "001-que-es-ia"
  }
}
```

**Campos de `data`:**

| Campo     | Tipo   | Descripción |
|----------|--------|-------------|
| status   | string | `pending`, `rendering`, `completed` o `failed`. |
| progress | number | Opcional. Entre 0 y 1; solo tiene sentido en `rendering` o al terminar. |
| error    | string | Opcional. Mensaje de error si `status === "failed"`. |
| outputId | string | Opcional. Id del reel (y del archivo) cuando `status === "completed"`. Usar en `GET /output/:id`. |

**Errores:**

- `404 Not Found` — No existe job con ese `jobId`.

**Ejemplo:**

```bash
curl http://localhost:3000/jobs/550e8400-e29b-41d4-a716-446655440000
```

---

### GET `/output/:id`

**Descripción:** Descarga el MP4 generado. El `id` es el `id` del reel (p. ej. el `outputId` del job cuando está `completed`). El archivo servido es `out/<id>.mp4`.

**Respuesta:** `200 OK` con el archivo MP4 (Content-Type apropiado).

**Errores:**

- `400 Bad Request` — `id` vacío o con caracteres no permitidos (solo `a-zA-Z0-9_-`).
- `404 Not Found` — No existe el archivo (aún no renderizado o id incorrecto).

**Ejemplo:**

```bash
curl -O -J "http://localhost:3000/output/001-que-es-ia"
# o en navegador: http://localhost:3000/output/001-que-es-ia
```

---

## Estados del job

| Estado     | Significado |
|-----------|-------------|
| `pending` | En cola; el worker aún no lo ha tomado. |
| `rendering` | Se está generando el vídeo (bundle + Remotion). |
| `completed` | Terminado correctamente; `outputId` indica el id del reel. |
| `failed` | Error durante el render; `error` contiene el mensaje. |

La cola es FIFO y un solo worker procesa un job a la vez. Si un job falla, el worker sigue con el siguiente.

---

## Flujo típico

1. **Listar contenido:** `GET /content` para obtener los `id` disponibles.
2. **Encolar render:** `POST /render` con `{ "contentId": "<id>" }` (o ReelContent completo). Guardar el `jobId` de la respuesta.
3. **Polling:** `GET /jobs/:jobId` hasta que `status` sea `completed` o `failed`.
4. **Descargar:** Si `completed`, `GET /output/<outputId>` para el MP4.

---

## Configuración (variables de entorno)

| Variable          | Descripción                          | Por defecto |
|-------------------|--------------------------------------|-------------|
| `PORT`            | Puerto del servidor.                 | `3000`      |
| `CORS_ORIGIN`     | Origen permitido por CORS.           | `*` (abierto; en producción conviene restringir). |
| `RATE_LIMIT_MAX`  | Máximo de peticiones por IP en la ventana. | `100`  |
| `JSON_LIMIT`      | Límite de tamaño del body JSON (p. ej. `1mb`). | `1mb` |

La ventana del rate limit es de 15 minutos. Si se supera, el servidor responde con `429 Too Many Requests` (y cabeceras estándar de rate limit si `standardHeaders: true`).

---

## Seguridad

- **Rate limit:** Límite por IP con `express-rate-limit` (configurable con `RATE_LIMIT_MAX`).
- **Tamaño de body:** Límite en el parser JSON (`JSON_LIMIT`) para evitar payloads enormes.
- **CORS:** Origen configurable con `CORS_ORIGIN`; por defecto `*` para desarrollo.
- **Output id:** En `GET /output/:id` solo se aceptan ids que coinciden con `^[a-zA-Z0-9_-]+$` para evitar path traversal.

---

## Errores y respuestas

Las respuestas de error son JSON con `success: false` y `error` con un mensaje legible. Códigos habituales:

- **400** — Petición inválida (body mal formado, contentId no encontrado, id de output inválido).
- **404** — Recurso no encontrado (job o archivo de salida).
- **413** — Body demasiado grande.
- **429** — Demasiadas peticiones (rate limit).

Si el servidor falla internamente, puede devolver **500** con `error` en el cuerpo.

---

## Estructura del código (API)

- **`src/api/index.ts`** — Punto de entrada: Express, CORS, rate limit, rutas, arranque del worker.
- **`src/api/routes/health.ts`** — `GET /health`.
- **`src/api/routes/content.ts`** — `GET /content`.
- **`src/api/routes/render.ts`** — `POST /render`, `GET /jobs/:jobId`, `GET /output/:id`.
- **`src/api/jobs/queue.ts`** — Cola en memoria: estados, `addJob`, `getJob`, `getNextPending`, `updateJob`.
- **`src/api/jobs/worker.ts`** — Worker que procesa jobs (bundle + Remotion `renderMedia`) y actualiza la cola.

La validación del contenido usa `src/utils/validateReel.ts` y los tipos en `src/utils/types.ts`. El render reutiliza la misma lógica que `scripts/render-all.ts` (bundle + selectComposition + renderMedia).
