# ECLYVOR — Landing page

Sitio web oficial de ECLYVOR, una marca de soluciones digitales para negocios: desarrollo web, herramientas a medida y automatización.

**Versión actual:** V0.1 (prototipo)

Hecho con HTML semántico, CSS y JavaScript vanilla, sin frameworks ni dependencias externas.

## Estructura

```
├── index.html          Página única con todas las secciones
├── css/
│   ├── base.css        Variables de diseño (colores, tipografía, espaciado), reset y utilidades
│   ├── layout.css      Contenedor, header, hero, secciones, contacto y footer
│   └── components.css  Logo, botones, tarjetas, pasos, etiquetas y animaciones
├── js/
│   ├── config.js       Datos editables: WhatsApp, correo, redes y proyectos
│   └── main.js         Menú móvil, header al hacer scroll, enlace activo y renderizado de datos
└── assets/
    └── favicon.svg
```

## Ejecutar en local

No hay que instalar nada. Hay dos opciones:

1. **Abrir el archivo directamente:** doble clic en `index.html`.
2. **Usar un servidor local** (recomendado, se comporta igual que la web publicada):

   ```bash
   python3 -m http.server 8000
   ```

   Después abre <http://localhost:8000> en el navegador.

## Editar el contenido

Casi todo lo que cambia con frecuencia está en [`js/config.js`](js/config.js):

| Dato | Clave | Notas |
| --- | --- | --- |
| WhatsApp | `contact.whatsappNumber` | Solo dígitos, con prefijo de país y sin `+`. Ej.: `34600111222`. Si está vacío, el botón aparece desactivado con un aviso. |
| Mensaje inicial | `contact.whatsappMessage` | Texto que aparece ya escrito al abrir WhatsApp. |
| Correo | `contact.email` | Opcional. Si está vacío no se muestra. |
| Redes | `social` | Lista de `{ label, url }` que se muestra en el footer. |
| Proyectos | `projects` | Cada proyecto tiene `title`, `description`, `tags`, `status`, `url` y `placeholder`. |

Los textos de Hero, Servicios y Proceso están directamente en `index.html` para que se lean sin JavaScript y los indexen los buscadores.

Los colores y tamaños se cambian en las variables de `:root`, al principio de `css/base.css`.

## Contenido provisional

Para no inventar información, todo lo que falta se marca de forma visible:

- Los proyectos con `placeholder: true` llevan la etiqueta amarilla **Provisional**.
- El botón de WhatsApp se queda desactivado hasta que se configure el número.
- Los asistentes de IA aparecen como **Próximamente**.

Antes de publicar la V1.0 hay que sustituir todo el contenido provisional por datos reales.

## Compatibilidad

- **Animación de entrada de las secciones:** usa animaciones ligadas al scroll (CSS). Es una mejora progresiva: en navegadores sin soporte, como Firefox, el contenido aparece sin animación.
- **Enlace activo del menú:** usa `scroll-target-group` donde está disponible y, en el resto, un respaldo con `IntersectionObserver`.
- **Movimiento reducido:** si el sistema tiene activada la preferencia de reducir movimiento, se desactivan las animaciones y el scroll suave.

## Hoja de ruta

- [x] **V0.1:** prototipo visual completo con navegación y datos provisionales
- [ ] **V0.2:** accesibilidad, SEO básico, optimización, detalles visuales y contacto
- [ ] **V1.0:** contenido real y publicación en GitHub Pages
