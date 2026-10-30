// Datos editables de la web. Cambia aquí el contacto y los proyectos sin tocar el HTML.
// Lo marcado con `provisional: true` es contenido de ejemplo: sustitúyelo antes de publicar.

window.ECLYVOR = {
  contacto: {
    // Formato internacional, solo dígitos: prefijo del país + número, sin "+" ni espacios.
    // Ejemplo para Colombia: "573001234567". Si se deja vacío, el botón aparece desactivado.
    whatsapp: "573001002399",
    mensaje: "Hola, ECLYVOR. Me gustaría hablar sobre un proyecto para mi negocio.",
    // Opcional. Vacío = no se muestra.
    correo: ""
  },

  // Se muestran en el pie
  redes: [
    { nombre: "GitHub", 
      enlace: "https://github.com/Alejo962"
    }, 
    { nombre: "Facebook", 
      enlace: "https://www.facebook.com/profile.php?id=61594677965976" 
    },
    { nombre: "Instagram", 
      enlace: "https://www.instagram.com/eclyvor4"

    
    }
  ],

  // enlace: null mientras no haya URL pública.
  proyectos: [
    {
      titulo: "Sitio web de ECLYVOR",
      descripcion: "Esta misma web: HTML, CSS y JavaScript sin frameworks, pensada para cargar rápido en móvil.",
      tecnologias: ["HTML", "CSS", "JavaScript"],
      estado: "En desarrollo",
      enlace: null,
      provisional: false
    },
    {
      titulo: "Demo: reservas con aviso automático",
      descripcion: "Ejemplo de formulario de reservas que registra cada solicitud y envía un aviso al negocio.",
      tecnologias: ["Automatización", "Formularios"],
      estado: "Idea de demo",
      enlace: null,
      provisional: true
    },
    {
      titulo: "Demo: panel de pedidos",
      descripcion: "Ejemplo de panel sencillo para ver y actualizar pedidos desde el móvil.",
      tecnologias: ["Herramienta interna"],
      estado: "Idea de demo",
      enlace: null,
      provisional: true
    }
  ]
};
