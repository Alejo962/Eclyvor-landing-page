# ECLYVOR — Landing page

Sitio web oficial de ECLYVOR, una marca de soluciones digitales para negocios: desarrollo web, herramientas a medida y automatización.

**Versión actual:** V0.2

Hecho con HTML semántico, CSS y JavaScript vanilla, sin frameworks ni dependencias externas.

## Estructura

```
├── index.html             Página principal con todas las secciones
├── 404.html               Página de error (la usa GitHub Pages)
├── manifest.webmanifest   Nombre e iconos al guardar la web en el móvil
├── css/
│   ├── base.css           Variables de diseño, reset y tipografía
│   ├── layout.css         Contenedor, cabecera, portada, secciones y pie
│   └── components.css     Botones, tarjetas, pasos, formulario y animaciones
├── js/
│   ├── config.js          Datos editables: WhatsApp, correo, redes y proyectos
│   └── main.js            Menú, enlace activo, proyectos, WhatsApp y formulario
└── assets/
    ├── favicon.svg
    ├── icono-180.png      Icono para iPhone / iPad
    ├── icono-192.png      Iconos para Android
    ├── icono-512.png
    └── compartir.png      Imagen que aparece al compartir el enlace (1200×630)
```

## Editar el contenido

Lo que cambia con frecuencia está en [`js/config.js`](js/config.js):

| Dato | Clave | Notas |
| --- | --- | --- |
| WhatsApp | `contacto.whatsapp` | Prefijo del país + número, solo dígitos. Ej. Colombia: `573001234567`. Vacío = botones desactivados con aviso. |
| Mensaje inicial | `contacto.mensaje` | Texto que aparece ya escrito al pulsar "Escribir directamente". |
| Correo | `contacto.correo` | Opcional. Vacío = no se muestra. |
| Redes | `redes` | Lista de `{ nombre, enlace }` para el pie. |
| Proyectos | `proyectos` | Cada uno con `titulo`, `descripcion`, `tecnologias`, `estado`, `enlace` y `provisional`. |

Los textos de Portada, Servicios y Proceso están en `index.html` para que se lean sin JavaScript y los indexen los buscadores. Los colores y tamaños están en las variables de `:root`, al principio de `css/base.css`.

## Contacto por WhatsApp

- **Escribir directamente:** abre WhatsApp con el mensaje de `contacto.mensaje`.
- **Consultar por WhatsApp** (en cada servicio): abre WhatsApp mencionando ese servicio.
- **Formulario:** pide nombre, tipo de negocio, servicio y una descripción, y abre WhatsApp con todo redactado. No guarda ni envía datos a ningún servidor: la persona decide si envía el mensaje.

## Contenido provisional

- Los proyectos con `provisional: true` llevan la etiqueta amarilla **Provisional**.
- Los asistentes de IA aparecen como **Próximamente**.

## Pendiente para la V1.0 (necesita la URL final)

- `<link rel="canonical">` y `og:url` en `index.html`.
- Convertir `og:image` en URL absoluta: muchas redes no cargan la imagen con una ruta relativa.
- `robots.txt` con la línea `Sitemap:` y un `sitemap.xml`.

## Compatibilidad

- **Animación de entrada de las secciones:** usa animaciones ligadas al scroll. En navegadores sin soporte, como Firefox, el contenido aparece sin animación.
- **Menú móvil:** aparece con un fundido gracias a `@starting-style`; sin soporte, simplemente aparece.
- **Movimiento reducido:** si el sistema lo pide, se desactivan las animaciones y el scroll suave.

## Hoja de ruta

- [x] **V0.1:** prototipo visual completo con navegación y datos provisionales
- [x] **V0.2:** accesibilidad, SEO básico, optimización, detalles visuales y contacto
- [ ] **V1.0:** contenido real y publicación en GitHub Pages
