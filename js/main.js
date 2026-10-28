// Comportamiento de la página

const datos = window.ECLYVOR ?? {};
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

// Los atributos ARIA necesitan "true" explícito: un valor vacío cuenta como false
function ariaActivo(elemento, atributo, activo) {
  if (activo) elemento.setAttribute(atributo, "true");
  else elemento.removeAttribute(atributo);
}

function crear(etiqueta, clase, texto) {
  const elemento = document.createElement(etiqueta);
  if (clase) elemento.className = clase;
  if (texto) elemento.textContent = texto;
  return elemento;
}

// Menú móvil

const cabecera = $("[data-cabecera]");
const botonMenu = $("[data-boton-menu]");

function abrirMenu(abrir) {
  cabecera.classList.toggle("abierta", abrir);
  botonMenu.setAttribute("aria-expanded", abrir);
  botonMenu.setAttribute("aria-label", abrir ? "Cerrar menú" : "Abrir menú");
}

botonMenu.addEventListener("click", () => {
  abrirMenu(!cabecera.classList.contains("abierta"));
});

$("[data-menu]").addEventListener("click", (evento) => {
  if (evento.target.closest("a")) abrirMenu(false);
});

document.addEventListener("click", (evento) => {
  if (!cabecera.contains(evento.target)) abrirMenu(false);
});

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && cabecera.classList.contains("abierta")) {
    abrirMenu(false);
    botonMenu.focus();
  }
});

matchMedia("(min-width: 768px)").addEventListener("change", () => abrirMenu(false));

// La cabecera toma fondo en cuanto se deja atrás la parte superior

new IntersectionObserver(([entrada]) => {
  cabecera.classList.toggle("con-fondo", !entrada.isIntersecting);
}).observe($("[data-marcador]"));

// Marca en el menú la sección que cruza el centro de la pantalla

const enlacesMenu = $$(".menu-lista a");
const enlacePorSeccion = new Map(
  enlacesMenu.map((enlace) => [enlace.hash.slice(1), enlace])
);

function marcarActual(actual) {
  for (const enlace of enlacesMenu) {
    enlace.classList.toggle("actual", enlace === actual);
    ariaActivo(enlace, "aria-current", enlace === actual);
  }
}

const vigiaSecciones = new IntersectionObserver((entradas) => {
  for (const entrada of entradas) {
    if (entrada.isIntersecting) marcarActual(enlacePorSeccion.get(entrada.target.id));
  }
}, { rootMargin: "-50% 0px -50% 0px" });

// La portada no tiene enlace: al volver arriba no queda ninguno marcado
for (const seccion of $$("main > section")) vigiaSecciones.observe(seccion);

// Proyectos

function tarjetaProyecto(proyecto) {
  const tarjeta = crear("article", "tarjeta tarjeta-proyecto aparecer");

  const meta = crear("div", "tarjeta-meta");
  meta.append(crear("span", "etiqueta", proyecto.estado));
  if (proyecto.provisional) meta.append(crear("span", "etiqueta etiqueta-provisional", "Provisional"));

  const tecnologias = crear("ul", "tecnologias");
  tecnologias.setAttribute("aria-label", "Tecnologías");
  for (const nombre of proyecto.tecnologias ?? []) tecnologias.append(crear("li", "", nombre));

  let enlace;
  if (proyecto.enlace) {
    enlace = crear("a", "tarjeta-enlace", "Ver proyecto →");
    enlace.href = proyecto.enlace;
    enlace.target = "_blank";
    enlace.setAttribute("aria-label", `Ver proyecto ${proyecto.titulo} (se abre en otra pestaña)`);
  } else {
    enlace = crear("p", "tarjeta-enlace pendiente", "Enlace disponible pronto");
  }

  tarjeta.append(
    meta,
    crear("h3", "tarjeta-titulo", proyecto.titulo),
    crear("p", "", proyecto.descripcion),
    tecnologias,
    enlace
  );
  return tarjeta;
}

const proyectos = datos.proyectos ?? [];
$("[data-proyectos]").replaceChildren(
  ...(proyectos.length
    ? proyectos.map(tarjetaProyecto)
    : [crear("p", "suave", "Pronto publicaremos aquí nuestros primeros proyectos.")])
);

// WhatsApp

const contacto = datos.contacto ?? {};
const numero = String(contacto.whatsapp ?? "").replace(/\D/g, "");

const enlaceWhatsApp = (mensaje) =>
  `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

const enlacesWhatsApp = $$("[data-whatsapp]");

if (numero) {
  for (const enlace of enlacesWhatsApp) {
    const servicio = enlace.dataset.whatsapp;
    enlace.href = enlaceWhatsApp(
      servicio ? `Hola, ECLYVOR. Me interesa el servicio de ${servicio}.` : contacto.mensaje
    );
    enlace.target = "_blank";
  }
} else {
  // Sin número los enlaces siguen llevando a #contacto, donde se explica el motivo
  const aviso = $("[data-aviso-whatsapp]");
  aviso.hidden = false;
  for (const enlace of enlacesWhatsApp) {
    enlace.setAttribute("aria-disabled", "true");
    enlace.setAttribute("aria-describedby", aviso.id);
  }
}

// Formulario: compone el mensaje y lo abre en WhatsApp. No se guarda ni se envía nada más.

const formulario = $("[data-formulario]");

function marcarInvalido(campo) {
  ariaActivo(campo, "aria-invalid", !campo.validity.valid);
}

formulario.addEventListener("focusout", (evento) => {
  if (evento.target.required) marcarInvalido(evento.target);
});

formulario.addEventListener("invalid", (evento) => marcarInvalido(evento.target), true);

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();
  if (!numero) return;

  const { nombre, negocio, servicio, detalle } = Object.fromEntries(new FormData(formulario));
  const mensaje = [
    `Hola, ECLYVOR. Soy ${nombre.trim()}${negocio.trim() ? ` (${negocio.trim()})` : ""}.`,
    `Me interesa: ${servicio}.`,
    detalle.trim()
  ].join("\n");

  window.open(enlaceWhatsApp(mensaje), "_blank");
});

// Correo y redes

if (contacto.correo) {
  const correo = $("[data-correo]");
  correo.href = `mailto:${contacto.correo}`;
  correo.textContent = contacto.correo;
  correo.closest("[hidden]").hidden = false;
}

for (const red of datos.redes ?? []) {
  const enlace = crear("a", "", red.nombre);
  enlace.href = red.enlace;
  enlace.target = "_blank";
  const item = crear("li");
  item.append(enlace);
  $("[data-redes]").append(item);
}

$("[data-anio]").textContent = new Date().getFullYear();
