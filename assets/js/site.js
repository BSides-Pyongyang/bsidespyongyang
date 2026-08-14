(function () {
  const root = document.documentElement;
  const savedTheme = localStorage.getItem("bsides-theme");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  root.dataset.theme = savedTheme || (systemDark ? "dark" : "light");

  document.addEventListener("DOMContentLoaded", function () {
    const themeToggle = document.querySelector("[data-theme-toggle]");
    const menuToggle = document.querySelector("[data-menu-toggle]");
    const nav = document.querySelector("[data-nav]");
    const header = document.querySelector("[data-header]");

    function syncThemeLabel() {
      const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
      themeToggle.setAttribute("aria-label", "Use " + nextTheme + " theme");
    }

    syncThemeLabel();

    themeToggle.addEventListener("click", function () {
      root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";
      localStorage.setItem("bsides-theme", root.dataset.theme);
      syncThemeLabel();
    });

    menuToggle.addEventListener("click", function () {
      const open = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!open));
      menuToggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
      nav.toggleAttribute("data-open", !open);
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        nav.removeAttribute("data-open");
      }
    });

    function syncHeader() {
      header.toggleAttribute("data-scrolled", window.scrollY > 24);
    }

    syncHeader();
    window.addEventListener("scroll", syncHeader, { passive: true });
  });
})();

