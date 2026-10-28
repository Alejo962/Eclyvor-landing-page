/* ==========================================================================
   Comportamiento de la página
   ========================================================================== */

(function () {
  "use strict";

  var config = window.ECLYVOR_CONFIG || {};
  var DESKTOP_QUERY = window.matchMedia("(min-width: 768px)");

  /* Menú móvil ------------------------------------------------------------ */

  function initNav() {
    var header = document.querySelector("[data-header]");
    var toggle = document.querySelector("[data-nav-toggle]");
    var nav = document.querySelector("[data-nav]");
    if (!header || !toggle || !nav) return;

    var label = toggle.querySelector(".visually-hidden");

    function setOpen(open) {
      header.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      if (label) label.textContent = open ? "Cerrar menú" : "Abrir menú";
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    // Cierra al elegir un enlace
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    // Cierra con Escape y devuelve el foco al botón
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && header.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Al pasar a escritorio el panel deja de existir
    DESKTOP_QUERY.addEventListener("change", function (event) {
      if (event.matches) setOpen(false);
    });
  }

  /* Header con fondo al hacer scroll --------------------------------------- */

  function initHeaderScroll() {
    var header = document.querySelector("[data-header]");
    var sentinel = document.querySelector("[data-header-sentinel]");
    if (!header || !sentinel || !("IntersectionObserver" in window)) return;

    new IntersectionObserver(function (entries) {
      header.classList.toggle("is-scrolled", !entries[0].isIntersecting);
    }).observe(sentinel);
  }

  /* Enlace activo en el menú (scrollspy) ----------------------------------- */

  function initScrollSpy() {
    var links = Array.prototype.slice.call(document.querySelectorAll(".nav-list a"));
    if (!links.length || !("IntersectionObserver" in window)) return;

    // Marca visual (.is-current) y semántica (aria-current) a la vez
    function markCurrent(current) {
      links.forEach(function (link) {
        var active = link === current;
        link.classList.toggle("is-current", active);
        if (active) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    }

    var byId = {};
    links.forEach(function (link) {
      var section = document.querySelector(link.getAttribute("href"));
      if (section) byId[section.id] = link;
    });

    // La sección "activa" es la que cruza la línea central de la pantalla.
    // El hero no tiene enlace, así que al volver arriba no queda ninguno marcado.
    var sections = [document.getElementById("inicio")].concat(
      Object.keys(byId).map(function (id) { return document.getElementById(id); })
    ).filter(Boolean);

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) markCurrent(byId[entry.target.id] || null);
      });
    }, { rootMargin: "-50% 0px -50% 0px", threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* Proyectos desde config.js ---------------------------------------------- */

  function createEl(tag, className, text) {
    var el = document.createElement(tag);
    if (className) el.className = className;
    if (text) el.textContent = text;
    return el;
  }

  function renderProjects() {
    var grid = document.querySelector("[data-projects]");
    var projects = config.projects || [];
    if (!grid) return;

    grid.textContent = "";

    if (!projects.length) {
      grid.appendChild(createEl("p", "muted", "Pronto publicaremos aquí nuestros primeros proyectos."));
      return;
    }

    projects.forEach(function (project) {
      var card = createEl("article", "card project-card reveal");

      var meta = createEl("div", "card-meta");
      if (project.status) meta.appendChild(createEl("span", "badge", project.status));
      if (project.placeholder) meta.appendChild(createEl("span", "badge badge-placeholder", "Provisional"));
      card.appendChild(meta);

      card.appendChild(createEl("h3", "card-title", project.title));
      card.appendChild(createEl("p", "", project.description));

      if (project.tags && project.tags.length) {
        var tags = createEl("ul", "tags");
        tags.setAttribute("aria-label", "Tecnologías");
        project.tags.forEach(function (tag) {
          tags.appendChild(createEl("li", "tag", tag));
        });
        card.appendChild(tags);
      }

      var link;
      if (project.url) {
        link = createEl("a", "card-link", "Ver proyecto →");
        link.href = project.url;
        link.target = "_blank";
        link.rel = "noopener";
      } else {
        link = createEl("span", "card-link", "Enlace disponible pronto");
        link.setAttribute("aria-disabled", "true");
      }
      card.appendChild(link);

      grid.appendChild(card);
    });
  }

  /* Contacto: WhatsApp y correo -------------------------------------------- */

  function initContact() {
    var contact = config.contact || {};
    var waLink = document.querySelector("[data-whatsapp-link]");
    var waNote = document.querySelector("[data-whatsapp-note]");
    var number = String(contact.whatsappNumber || "").replace(/\D/g, "");

    if (waLink) {
      if (number) {
        var text = contact.whatsappMessage ? "?text=" + encodeURIComponent(contact.whatsappMessage) : "";
        waLink.href = "https://wa.me/" + number + text;
        waLink.target = "_blank";
        waLink.rel = "noopener";
      } else {
        // Sin número configurado: el botón queda desactivado y se avisa
        waLink.removeAttribute("href");
        waLink.setAttribute("aria-disabled", "true");
        waLink.setAttribute("role", "link");
        if (waNote) {
          waNote.textContent = "Provisional: el número de WhatsApp aún no está configurado (js/config.js).";
          waNote.hidden = false;
        }
      }
    }

    var emailWrap = document.querySelector("[data-email-wrap]");
    var emailLink = document.querySelector("[data-email-link]");
    if (contact.email && emailWrap && emailLink) {
      emailLink.href = "mailto:" + contact.email;
      emailLink.textContent = contact.email;
      emailWrap.hidden = false;
    }
  }

  /* Footer ----------------------------------------------------------------- */

  function renderSocial() {
    var list = document.querySelector("[data-social]");
    if (!list) return;
    (config.social || []).forEach(function (item) {
      if (!item || !item.url) return;
      var li = document.createElement("li");
      var a = createEl("a", "", item.label || item.url);
      a.href = item.url;
      a.target = "_blank";
      a.rel = "noopener";
      li.appendChild(a);
      list.appendChild(li);
    });
  }

  function setYear() {
    var year = document.querySelector("[data-year]");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  initNav();
  initHeaderScroll();
  renderProjects();
  initScrollSpy();
  initContact();
  renderSocial();
  setYear();
})();
