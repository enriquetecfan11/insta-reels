# Cómo crear los vídeos

Este proyecto genera reels para Instagram (1080×1920 px, 9:16) con Remotion. Cada vídeo se define en un archivo JSON dentro de la carpeta `content/`. No hace falta tocar código para añadir un vídeo nuevo: solo crear el JSON y renderizar.

**Características del sistema:**

- Layout con **safe areas** para overlays de Instagram (arriba y abajo).
- **Tipografía grande** y legible; el body puede tener **varias líneas** (usa `\n` en el JSON).
- **Config central** en `src/config/reelConfig.ts` para cambiar tamaños de todo sin tocar componentes.
- **Transiciones** entre slides (crossfade, wipe, push) y **fondos** opcionales por slide (default, deep, glow).
- **Ritmo fluido** para Reels/TikTok: transiciones cortas y animaciones suaves; duraciones por slide de 2–2,5 s suelen dar buen resultado.
- **Validación** del JSON: si falta algo, se usan valores por defecto y se avisa en consola.
- **B-roll opcional:** en cualquier slide puedes añadir `"videoBackground": "videos/mi-clip.mp4"` (ruta relativa a `public/`). El clip se reproduce detrás del gradiente para dar movimiento; el texto sigue legible.

---

## 1. Estructura de un vídeo

Cada archivo en `content/` debe ser un JSON con:

| Campo   | Tipo     | Descripción |
|--------|----------|-------------|
| `id`   | string   | Identificador único. Se usa como nombre del archivo de salida y como id de la composición en Remotion (ej: `001-que-es-ia` → `001-que-es-ia.mp4`). |
| `slides` | array | Lista de diapositivas en orden. Cada una tiene un `type` y una `duration` en segundos. |

---

## 2. Tipos de diapositivas

### Intro (`type: "intro"`)

Diapositiva de apertura con título (y opcionalmente emoji o imagen).

```json
{
  "type": "intro",
  "emoji": "🤖",
  "title": "¿Qué es la\nInteligencia Artificial?",
  "duration": 2.5
}
```

| Campo     | Obligatorio | Descripción |
|-----------|-------------|-------------|
| `title`  | Sí          | Texto principal. Usa `\n` para saltos de línea. **Recomendado:** que funcione como gancho (beneficio o curiosidad) en los primeros segundos, no una pregunta teórica. |
| `duration` | Sí        | Duración en segundos. |
| `emoji`  | No          | Emoji que se muestra en un círculo sobre el título. |
| `image`  | No          | Ruta a una imagen (relativa a `public/`), ej: `"images/robot.png"`. Se muestra en círculo. |
| `transition` | No       | Transición hacia la siguiente slide: `"crossfade"`, `"wipe"`, `"push"`. Por defecto: crossfade. |
| `background` | No       | Fondo de la slide: `"default"`, `"deep"`, `"glow"`. Por defecto: default. |
| `animateText` | No      | Revelado del título: `"letter"` (letra a letra), `"word"`, `"line"`, `"phrase"`, `"block"`. Si se omite, el texto aparece en bloque. |
| `videoBackground` | No   | Ruta a un vídeo en `public/` (ej: `"videos/clip.mp4"`). Se reproduce detrás del gradiente. |

---

### Concepto (`type: "concept"`)

Diapositiva con titular y cuerpo de texto.

```json
{
  "type": "concept",
  "emoji": "🧠",
  "headline": "Aprende de datos",
  "body": "No se programa con reglas. Aprende de millones de ejemplos.",
  "duration": 3
}
```

| Campo      | Obligatorio | Descripción |
|------------|-------------|-------------|
| `headline` | Sí         | Título o frase corta. |
| `body`     | Sí          | Texto explicativo. Puede tener **varias líneas**: usa `\n` para saltos de línea. El número máximo de líneas se configura en `src/config/reelConfig.ts` (`typography.bodyMaxLines`, por defecto 4). |
| `duration` | Sí         | Duración en segundos. |
| `emoji`    | No          | Emoji opcional (en círculo). |
| `image`    | No          | Ruta a imagen en `public/` (se muestra en círculo). |
| `transition` | No        | Transición hacia la siguiente: `"crossfade"`, `"wipe"`, `"push"`. |
| `background` | No        | Fondo: `"default"`, `"deep"`, `"glow"`. |
| `animateText` | No       | Revelado del headline/body: `"letter"`, `"word"`, `"line"`, `"phrase"`, `"block"`. |
| `videoBackground` | No    | Ruta a un vídeo en `public/` para B-roll detrás del gradiente. |

---

### Highlight (`type: "highlight"`)

Diapositiva de frase destacada (cita o idea clave).

```json
{
  "type": "highlight",
  "text": "Un buen prompt es como una buena pregunta: define el problema antes de pedir solución",
  "duration": 3
}
```

| Campo     | Obligatorio | Descripción |
|-----------|-------------|-------------|
| `text`    | Sí          | Frase a destacar. |
| `duration` | Sí        | Duración en segundos. |
| `transition` | No       | Transición hacia la siguiente: `"crossfade"`, `"wipe"`, `"push"`. |
| `background` | No       | Fondo: `"default"`, `"deep"`, `"glow"`. |
| `animateText` | No      | Revelado de la frase: `"letter"`, `"word"`, `"line"`, `"phrase"`, `"block"`. |
| `videoBackground` | No   | Ruta a un vídeo en `public/` para B-roll. |

---

### Versus (`type: "versus"`)

Diapositiva de comparación lado a lado (ej: Chatbot vs Agente).

```json
{
  "type": "versus",
  "leftLabel": "Chatbot",
  "leftEmoji": "💬",
  "leftSubtext": "Solo habla",
  "rightLabel": "Agente",
  "rightEmoji": "🛠️",
  "rightSubtext": "Hace el trabajo",
  "duration": 3
}
```

| Campo         | Obligatorio | Descripción |
|---------------|-------------|-------------|
| `leftLabel`   | Sí          | Etiqueta del lado izquierdo. |
| `leftEmoji`   | Sí          | Emoji del lado izquierdo. |
| `leftSubtext` | Sí          | Subtexto del lado izquierdo. |
| `rightLabel`  | Sí          | Etiqueta del lado derecho. |
| `rightEmoji`  | Sí          | Emoji del lado derecho. |
| `rightSubtext`| Sí          | Subtexto del lado derecho. |
| `duration`    | Sí          | Duración en segundos. |
| `transition`  | No          | Transición: `"crossfade"`, `"wipe"`, `"push"`. |
| `background`  | No          | Fondo: `"default"`, `"deep"`, `"glow"`. |
| `videoBackground` | No       | Ruta a un vídeo en `public/` para B-roll. |

---

### Outro (`type: "outro"`)

Diapositiva de cierre con llamada a la acción.

```json
{
  "type": "outro",
  "cta": "Sígueme para aprender más sobre IA 🚀",
  "duration": 2
}
```

| Campo     | Obligatorio | Descripción |
|-----------|-------------|-------------|
| `cta`     | Sí          | Texto de la llamada a la acción (ej: seguir, comentar). |
| `duration` | Sí        | Duración en segundos. |
| `background` | No       | Fondo: `"default"`, `"deep"`, `"glow"`. |
| `ctaCommentKeyword` | No | Palabra que quieres que el usuario comente (ej: `"AGENTE"`). Se resalta en pill con color accent para aumentar engagement. |
| `videoBackground` | No   | Ruta a un vídeo en `public/` para B-roll. |

---

## 3. Configuración de tamaños (opcional)

Si quieres cambiar el tamaño de los textos, emojis o espaciados **sin tocar componentes**, edita el archivo **`src/config/reelConfig.ts`**.

| Sección | Qué controla |
|---------|-------------------------------|
| `scale` | Multiplicador global (ej: `1.1` = todo un 10% más grande). |
| `typography` | Tamaños de fuente en px: `title`, `headline`, `body`, `cta`, `highlight`. También `bodyMaxLines` (máximo de líneas del body en slides concept, por defecto 4). |
| `sizes` | Tamaños en px: `emojiIntro`, `emojiConcept`, `outroEmoji`, `quoteMark` (comilla decorativa en highlight). |
| `spacing` | Márgenes y huecos: `marginH`, `safeTop`, `safeBottom`, `contentOffsetTop`, `gapHeader`, `gapBody`, `paddingBlock`. |
| `fontWeight` | Pesos de fuente (400, 700, 800) por tipo. |
| `lineHeight` | Interlineado por tipo. |

Los vídeos usan estos valores automáticamente; no hace falta recompilar nada especial, solo guardar y volver a abrir el estudio o renderizar.

---

## 4. Ejemplo completo

Archivo: `content/003-mi-tema.json`

```json
{
  "id": "003-mi-tema",
  "slides": [
    {
      "type": "intro",
      "emoji": "✍️",
      "title": "Mi tema:\nprimera idea",
      "duration": 2.5
    },
    {
      "type": "concept",
      "emoji": "🎯",
      "headline": "Primer concepto",
      "body": "Texto que explica el concepto en una o dos frases.",
      "duration": 3
    },
    {
      "type": "highlight",
      "text": "Una frase que quieras destacar como cita.",
      "duration": 2.5
    },
    {
      "type": "outro",
      "cta": "Sígueme para más 👇",
      "duration": 2
    }
  ]
}
```

El vídeo se generará como `out/003-mi-tema.mp4`.

---

## 5. Validación del JSON

Cada JSON se valida al cargar (en Studio y al renderizar). Si falta un campo obligatorio o el tipo no es válido:

- Se muestra un **warning en consola**.
- Se usan **valores por defecto** (ej: título "Título", duration 2.5) para que el render no falle.
- Los tipos de slide deben ser exactamente: `intro`, `concept`, `highlight`, `versus`, `outro`.
- Las transiciones opcionales deben ser: `crossfade`, `wipe`, `push`.
- Los fondos opcionales deben ser: `default`, `deep`, `glow`.

---

## 6. Comandos para generar los vídeos

### Ver y editar en el estudio (recomendado antes de renderizar)

```bash
npm run studio
```

Abre Remotion Studio en el navegador. Ahí puedes:

- Ver todos los JSON que haya en `content/` como composiciones (cada `id` es una composición).
- Reproducir el vídeo y ajustar tiempos o textos.
- Hacer pruebas antes de renderizar.

### Renderizar un solo vídeo

El script por defecto renderiza el demo (`003-que-es-un-agente-ia`):

```bash
npm run render
```

Para otro vídeo, el **id de la composición es el `id` del JSON** (no "AIReel"). Ejemplo para el archivo `content/002-prompt-engineering.json` cuyo `id` es `002-prompt-engineering`:

```bash
npx remotion render 002-prompt-engineering --props=content/002-prompt-engineering.json
```

La salida será `out/<id>.mp4`.

### Renderizar todos los vídeos de `content/`

```bash
npm run render-all
```

- Lee todos los `.json` de la carpeta `content/`.
- Valida cada uno y genera un MP4 en la carpeta `out/`.
- Los nombres de archivo son los `id` de cada JSON (ej: `001-que-es-ia.mp4`).

---

## 7. Resumen rápido

1. **Crear un vídeo nuevo:** Añade un JSON en `content/` con `id` y `slides` (intro, concept, highlight, versus, outro). El body puede tener varias líneas con `\n`. Para ritmo fluido tipo Reels/TikTok, usa duraciones de 2–2,5 s por slide. Opcional: `transition`, `background`, `animateText` (letter/word/line/phrase/block), `videoBackground`, y en outro `ctaCommentKeyword`.
2. **Cambiar tamaños:** Edita `src/config/reelConfig.ts` (tipografía, sizes, spacing, `bodyMaxLines`, `scale`).
3. **Previsualizar:** `npm run studio` y elige la composición cuyo id coincida con tu `id`.
4. **Un vídeo:** `npx remotion render <id> --props=content/TU-ARCHIVO.json` (el `<id>` es el del JSON).
5. **Todos:** `npm run render-all`.

Los vídeos quedan en **`out/`** en formato MP4 (1080×1920, 30 fps), listos para subir a Instagram.
