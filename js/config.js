/* ==========================================================================
   Configuración editable de la web
   --------------------------------------------------------------------------
   Cambia aquí los datos de contacto y los proyectos sin tocar el HTML.
   Todo lo marcado con `placeholder: true` o "PROVISIONAL" es contenido de
   ejemplo y debe sustituirse por información real antes de publicar.
   ========================================================================== */

window.ECLYVOR_CONFIG = {
  contact: {
    // Número de WhatsApp en formato internacional, solo dígitos, sin "+" ni espacios.
    // Ejemplo: "34600111222" (España) o "5215512345678" (México).
    // PROVISIONAL: vacío hasta que se configure el número real.
    whatsappNumber: "",

    // Mensaje que aparece ya escrito al abrir WhatsApp.
    whatsappMessage: "Hola, ECLYVOR. Me gustaría hablar sobre un proyecto para mi negocio.",

    // Correo de contacto opcional. Déjalo vacío para ocultarlo.
    // PROVISIONAL: vacío hasta tener un correo real.
    email: ""
  },

  // Redes sociales para el footer. Añade objetos { label, url }.
  // Ejemplo: { label: "GitHub", url: "https://github.com/tu-usuario" }
  social: [],

  // Proyectos y demostraciones.
  // - status: texto corto del estado ("Demo", "En desarrollo", "Publicado"...)
  // - url: enlace al proyecto. Usa null si todavía no hay enlace.
  // - placeholder: true muestra la etiqueta "Provisional".
  projects: [
    {
      title: "Sitio web de ECLYVOR",
      description: "Esta misma web: HTML, CSS y JavaScript sin frameworks, pensada para cargar rápido en móvil.",
      tags: ["HTML", "CSS", "JavaScript"],
      status: "En desarrollo",
      url: null,
      placeholder: false
    },
    {
      title: "Demo: reservas con aviso automático",
      description: "Ejemplo de formulario de reservas que registra cada solicitud y envía un aviso al negocio.",
      tags: ["Automatización", "Formularios"],
      status: "Idea de demo",
      url: null,
      placeholder: true
    },
    {
      title: "Demo: panel de pedidos",
      description: "Ejemplo de panel sencillo para ver y actualizar pedidos desde el móvil.",
      tags: ["Herramienta interna"],
      status: "Idea de demo",
      url: null,
      placeholder: true
    }
  ]
};
