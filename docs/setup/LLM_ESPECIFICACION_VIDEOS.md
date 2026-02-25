# Especificación para generar vídeos (LLM)

Este documento define el formato JSON que debes producir cuando te pidan crear un reel para Instagram. Tu respuesta debe ser **un único objeto JSON válido**, sin markdown alrededor (o con el JSON dentro de un bloque de código si el usuario lo prefiere). El JSON se guarda en un archivo en la carpeta `content/` (ej: `content/004-nombre-del-tema.json`) y el proyecto lo convierte en un vídeo MP4 (1080×1920, 9:16).

**Resumen del sistema:**

- **Tipos de slide:** `intro`, `concept`, `highlight`, `versus`, `outro`. Cada slide tiene `duration` (segundos).
- **Body con varias líneas:** en slides `concept`, el campo `body` puede tener varias líneas usando `\n`. El proyecto limita el número de líneas (por defecto 4) y aplica ajustes automáticos si el texto es muy largo.
- **Revelado de texto:** en intro, concept y highlight se puede usar `animateText`: `"letter"` (letra a letra), `"word"`, `"line"`, `"phrase"`, `"block"`. Opcional.
- **B-roll:** en cualquier slide, `videoBackground` con ruta a un vídeo en `public/` (ej: `"videos/clip.mp4"`). Opcional.
- **CTA con palabra clave:** en outro, `ctaCommentKeyword` (ej: `"AGENTE"`) para resaltar la palabra que el usuario debe comentar. Opcional.
- **Opcionales por slide:** `transition` (`crossfade`, `wipe`, `push`), `background` (`default`, `deep`, `glow`). Si se omiten, se usan valores por defecto.
- **Validación:** si falta un campo obligatorio, el proyecto usa valores por defecto y muestra un warning; el render no falla.

---

## Objetivo

Generar un archivo JSON que describa un vídeo corto (reel) formado por **diapositivas** en secuencia. Cada diapositiva tiene un **tipo** (intro, concept, highlight, outro), textos y una **duración en segundos**. El orden típico es: intro → uno o varios concept/highlight → outro.

---

## Estructura global

El JSON tiene exactamente dos propiedades de primer nivel:

| Propiedad | Tipo   | Obligatorio | Descripción |
|-----------|--------|-------------|-------------|
| `id`      | string | Sí          | Identificador único del vídeo. Solo minúsculas, números y guiones. Se usa como nombre del archivo de salida (ej: `004-mi-tema` → `004-mi-tema.mp4`). |
| `slides`  | array  | Sí          | Lista ordenada de diapositivas. Cada elemento es un objeto con `type` y los campos propios de ese tipo. |

---

## Tipos de diapositivas

Existen cinco tipos. El campo `type` debe ser exactamente una de estas cadenas: `"intro"`, `"concept"`, `"highlight"`, `"versus"`, `"outro"`.

### 1. Intro (`"type": "intro"`)

Primera diapositiva: presenta el tema del reel.

**Campos:**

| Campo      | Tipo   | Obligatorio | Descripción |
|------------|--------|-------------|-------------|
| `type`    | string | Sí          | Literal `"intro"`. |
| `title`   | string | Sí          | Título principal. Puede incluir `\n` para saltos de línea (ej: `"Tema:\nsubtítulo"`). |
| `duration`| number | Sí          | Duración en segundos (ej: 2, 2.5, 3). |
| `emoji`   | string | No          | Emoji que se muestra en un círculo sobre el título (ej: `"🤖"`, `"✍️"`). |
| `image`   | string | No          | Ruta relativa a `public/` (ej: `"images/robot.png"`). Solo si existe; si no, omitir. |
| `transition` | string | No       | Transición hacia la siguiente slide: `"crossfade"`, `"wipe"`, `"push"`. Opcional. |
| `background` | string | No       | Fondo: `"default"`, `"deep"`, `"glow"`. Opcional. |
| `animateText` | string | No      | Revelado del título: `"letter"`, `"word"`, `"line"`, `"phrase"`, `"block"`. Opcional. |
| `videoBackground` | string | No   | Ruta a un vídeo en `public/` (ej: `"videos/clip.mp4"`). B-roll detrás del gradiente. Opcional. |

**Ejemplo:**

```json
{
  "type": "intro",
  "emoji": "🤖",
  "title": "¿Qué es la\nInteligencia Artificial?",
  "duration": 2.5
}
```

---

### 2. Concept (`"type": "concept"`)

Diapositiva de concepto: titular corto + cuerpo de texto.

**Campos:**

| Campo      | Tipo   | Obligatorio | Descripción |
|------------|--------|-------------|-------------|
| `type`     | string | Sí          | Literal `"concept"`. |
| `headline` | string | Sí          | Frase corta o título (una o dos líneas). |
| `body`     | string | Sí          | Texto que explica el concepto. **Puede tener varias líneas:** usa `\n` para saltos de línea (ej: `"Primera frase.\nSegunda frase.\nTercera."`). El proyecto admite hasta varias líneas (p. ej. 4); textos muy largos se recortan con elipsis. |
| `duration` | number | Sí          | Duración en segundos (típico: 3). |
| `emoji`    | string | No          | Emoji opcional (se muestra en círculo). |
| `image`    | string | No          | Ruta en `public/`; omitir si no hay imagen. |
| `transition` | string | No        | Transición hacia la siguiente: `"crossfade"`, `"wipe"`, `"push"`. Opcional. |
| `background` | string | No        | Fondo: `"default"`, `"deep"`, `"glow"`. Opcional. |
| `animateText` | string | No       | Revelado: `"letter"`, `"word"`, `"line"`, `"phrase"`, `"block"`. Opcional. |
| `videoBackground` | string | No    | Ruta a vídeo en `public/`. Opcional. |

**Ejemplo:**

```json
{
  "type": "concept",
  "emoji": "🧠",
  "headline": "Aprende de datos",
  "body": "No se programa con reglas. Aprende de millones de ejemplos.",
  "duration": 3
}
```

---

### 3. Highlight (`"type": "highlight"`)

Diapositiva de frase destacada (cita o idea clave).

**Campos:**

| Campo      | Tipo   | Obligatorio | Descripción |
|------------|--------|-------------|-------------|
| `type`     | string | Sí          | Literal `"highlight"`. |
| `text`     | string | Sí          | La frase a destacar (una oración o dos, concisa). |
| `duration` | number | Sí          | Duración en segundos (típico: 2.5–3). |
| `transition` | string | No        | Transición hacia la siguiente: `"crossfade"`, `"wipe"`, `"push"`. Opcional. |
| `background` | string | No        | Fondo: `"default"`, `"deep"`, `"glow"`. Opcional. |
| `animateText` | string | No      | Revelado: `"letter"`, `"word"`, `"line"`, `"phrase"`, `"block"`. Opcional. |
| `videoBackground` | string | No   | Ruta a vídeo en `public/`. Opcional. |

**Ejemplo:**

```json
{
  "type": "highlight",
  "text": "Un buen prompt es como una buena pregunta: define el problema antes de pedir solución",
  "duration": 3
}
```

---

### 4. Versus (`"type": "versus"`)

Diapositiva de comparación lado a lado (ej: Chatbot vs Agente). Los elementos entran escalonados: izquierda → "VS" → derecha.

**Campos:**

| Campo         | Tipo   | Obligatorio | Descripción |
|---------------|--------|-------------|-------------|
| `type`        | string | Sí          | Literal `"versus"`. |
| `leftLabel`   | string | Sí          | Etiqueta del lado izquierdo. |
| `leftEmoji`   | string | Sí          | Emoji del lado izquierdo. |
| `leftSubtext` | string | Sí          | Subtexto del lado izquierdo. |
| `rightLabel`  | string | Sí          | Etiqueta del lado derecho. |
| `rightEmoji`  | string | Sí          | Emoji del lado derecho. |
| `rightSubtext`| string | Sí          | Subtexto del lado derecho. |
| `duration`    | number | Sí          | Duración en segundos (típico: 3). |
| `transition`  | string | No          | `"crossfade"`, `"wipe"`, `"push"`. Opcional. |
| `background`  | string | No          | `"default"`, `"deep"`, `"glow"`. Opcional. |
| `videoBackground` | string | No       | Ruta a vídeo en `public/`. Opcional. |

**Ejemplo:**

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

---

### 5. Outro (`"type": "outro"`)

Última diapositiva: cierre y llamada a la acción (seguir, comentar, etc.).

**Campos:**

| Campo      | Tipo   | Obligatorio | Descripción |
|------------|--------|-------------|-------------|
| `type`     | string | Sí          | Literal `"outro"`. |
| `cta`      | string | Sí          | Texto de la llamada a la acción (puede incluir emoji, ej: "Sígueme para más 👇"). |
| `duration` | number | Sí          | Duración en segundos (típico: 2). |
| `background` | string | No        | Fondo: `"default"`, `"deep"`, `"glow"`. Opcional. |
| `ctaCommentKeyword` | string | No   | Palabra que el usuario debe comentar (ej: "AGENTE"); se resalta en la UI. Opcional. |
| `videoBackground` | string | No    | Ruta a vídeo en `public/`. Opcional. |

**Ejemplo:**

```json
{
  "type": "outro",
  "cta": "Sígueme para aprender más sobre IA 🚀",
  "duration": 2
}
```

---

## Reglas al generar el JSON

1. **Orden de slides:** La primera debe ser `intro`, la última `outro`. Entre medias, alternar o combinar `concept`, `highlight` y `versus` según el guion.
2. **Duración:** Valores numéricos en segundos. Típicos: intro 2–2.5, concept/highlight 2.5–3.5, outro 2. No usar decimales raros; 2.5 y 3 son suficientes.
3. **`id`:** Sin espacios, sin mayúsculas. Formato recomendado: `NNN-slug-del-tema` (ej: `004-prompt-engineering`). Se usa como nombre del archivo de vídeo (`<id>.mp4`).
4. **Textos:** Breves y legibles. En `body` (concept) se permiten **varias líneas** con `\n`; no hace falta limitarse a una o dos frases si el guion pide más (el proyecto limita y ajusta automáticamente). En `text` (highlight) y `cta` (outro), mantener conciso.
5. **Saltos de línea:** Usar `\n` dentro del string en `title` (intro) y en `body` (concept), ej: `"Línea uno.\nLínea dos."`.
6. **Emojis:** Opcionales pero recomendables en intro y concept. Uno por slide; se muestran en un círculo.
7. **`image`:** Incluir solo si el usuario indica que hay una imagen en `public/`; si no, omitir.
8. **`transition` y `background`:** Opcionales. Valores válidos: `transition` = `"crossfade"` | `"wipe"` | `"push"`; `background` = `"default"` | `"deep"` | `"glow"`. Omitir si no se quiere personalizar.
9. **`animateText`:** Opcional en intro, concept y highlight. Valores: `"letter"` | `"word"` | `"line"` | `"phrase"` | `"block"`. Omitir para revelado en bloque.
10. **`videoBackground`:** Opcional en cualquier slide. Ruta relativa a `public/` (ej: `"videos/clip.mp4"`). El clip se reproduce detrás del gradiente.
11. **`ctaCommentKeyword`:** Solo en outro. Palabra que quieres que el usuario comente; se resalta en la interfaz. Opcional.

---

## Ejemplo completo (para copiar como plantilla)

Un reel de 5 diapositivas: intro → dos conceptos → highlight → outro.

```json
{
  "id": "004-ejemplo-llm",
  "slides": [
    {
      "type": "intro",
      "emoji": "✍️",
      "title": "Prompt Engineering:\ncómo hablarle a la IA",
      "duration": 2.5
    },
    {
      "type": "concept",
      "emoji": "🎯",
      "headline": "Sé específico",
      "body": "Cuanto más detalle das, mejor respuesta obtienes. El contexto es clave.",
      "duration": 3
    },
    {
      "type": "concept",
      "emoji": "🎭",
      "headline": "Dale un rol",
      "body": "\"Actúa como un experto en marketing…\" mejora drásticamente los resultados.",
      "duration": 3
    },
    {
      "type": "highlight",
      "text": "Un buen prompt es como una buena pregunta: define el problema antes de pedir solución",
      "duration": 3
    },
    {
      "type": "outro",
      "cta": "¿Quieres más tips de IA? Sígueme 👇",
      "duration": 2
    }
  ]
}
```

---

## Resumen para el LLM

- **Salida:** Un único objeto JSON con `id` y `slides`.
- **`slides`:** Array de objetos; cada uno tiene `type` (`"intro"` | `"concept"` | `"highlight"` | `"versus"` | `"outro"`) y los campos indicados para ese tipo. Todos tienen `duration` (number, segundos). Opcionales: `transition`, `background`, `animateText` (intro/concept/highlight), `videoBackground` (cualquier slide), `ctaCommentKeyword` (outro).
- **Orden:** intro → [concept | highlight | versus]* → outro.
- **Textos:** Cortos y claros, sin markdown. Saltos de línea con `\n` en `title` (intro) y en `body` (concept); el body puede tener varias líneas.
- **`id`:** Identificador en minúsculas y guiones; se usa como nombre del archivo de vídeo (`<id>.mp4`).
- **Validación:** Si falta un campo obligatorio, el proyecto usa valores por defecto y muestra un warning; el JSON debe respetar los tipos y valores indicados para no depender de fallbacks.

Si el usuario pide "crea un reel sobre X", genera directamente este JSON listo para guardar en `content/NNN-tema.json` y renderizar con el proyecto.
