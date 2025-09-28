/* ======================= MENU DINÂMICO ======================= */
const MENU_ITEMS = [
  { title: "Visão Geral", view: "/views/dashboard/dashboard.html", roles: ["admin", "user"] },
  { title: "Clientes", view: "/views/cliente/cliente.html", roles: ["admin"] },
  { title: "Licenças", view: "/views/licenca/licenca.html", roles: ["admin"] },
  { title: "Usuários", view: "/views/usuario/usuario.html", roles: ["admin"] },
  { title: "Revenda", view: "/views/revenda/revenda.html", roles: ["admin"] },
  { title: "Configurações", view: "/views/configuracoes/configuracoes.html", roles: ["admin",'user'] },
  { title: "Integração", view: "/views/integracao/settings.html", roles: ["admin"] },
];

/* ======================= FUNÇÃO CARREGAR VIEW ======================= */
async function loadView(view) {
  try {
    const res = await fetch(view);
    if (!res.ok) throw new Error(`Erro ao carregar view: ${view}`);
    const html = await res.text();
    const appDiv = document.getElementById("app");
    appDiv.innerHTML = html;
    // Executa scripts embutidos na view
    appDiv.querySelectorAll("script").forEach(script => eval(script.innerText));
  } catch (err) {
    console.error(err);
    document.getElementById("app").innerHTML = `<div class="text-danger p-3">Erro ao carregar a página: ${err.message}</div>`;
  }
}

/* ======================= VARIÁVEIS GLOBAIS ======================= */
const token = localStorage.getItem("token");
const role = localStorage.getItem("role") || "user";

/* ======================= FUNÇÃO RENDER MENU ======================= */
function renderSidebar(role) {
  const menuContainer = document.getElementById("menuItems");
  if (!menuContainer) return;

  menuContainer.innerHTML = ""; // limpa menu

  MENU_ITEMS.forEach(item => {
    if (item.roles.includes(role)) {
      const li = document.createElement("li");
      li.classList.add("nav-item");

      const a = document.createElement("a");
      a.classList.add("nav-link");
      a.href = "#";
      a.textContent = item.title;

      a.addEventListener("click", () => {
        // Marca ativo
        document.querySelectorAll("#menuItems .nav-link").forEach(el => el.classList.remove("active"));
        a.classList.add("active");

        loadView(item.view);

        // Fecha sidebar no mobile ao clicar
        const sidebarEl = document.getElementById("sidebar");
        if (window.innerWidth <= 768) {
          sidebarEl.classList.remove("show");
        }
      });

      li.appendChild(a);
      menuContainer.appendChild(li);
    }
  });
}

/* ======================= INICIALIZAÇÃO ======================= */
if (token) {
  document.body.innerHTML = `
    <div id="header"></div>
    <div class="d-flex">
      <div id="sidebar" class="flex-shrink-0"></div>
      <div id="app" class="flex-grow-1 p-3"></div>
    </div>
  `;

  const headerEl = document.getElementById("header");
  const sidebarEl = document.getElementById("sidebar");
  const appEl = document.getElementById("app");

  // Carrega header
  fetch("/partials/_header.html")
    .then(r => r.text())
    .then(html => {
      headerEl.innerHTML = html;

      // Toggle sidebar
      const sidebarToggleBtn = document.getElementById("sidebarToggle");
      if (sidebarToggleBtn && sidebarEl && appEl) {
        sidebarToggleBtn.addEventListener("click", () => {
          if (window.innerWidth <= 768) {
            sidebarEl.classList.toggle("show");
          } else {
            sidebarEl.classList.toggle("collapsed");
            appEl.classList.toggle("sidebar-collapsed");
          }
        });

        // Clique fora para fechar sidebar no mobile
        document.addEventListener("click", (e) => {
          if (window.innerWidth <= 768 && sidebarEl.classList.contains("show")) {
            const isClickInside = sidebarEl.contains(e.target);
            const isClickToggle = sidebarToggleBtn.contains(e.target);
            if (!isClickInside && !isClickToggle) {
              sidebarEl.classList.remove("show");
            }
          }
        });
      }
    });

  // Carrega sidebar
  fetch("/partials/_sidebar.html")
    .then(r => r.text())
    .then(html => {
      sidebarEl.innerHTML = html;
      renderSidebar(role);

      // Botão logout no bottom
      const logoutBtn = document.getElementById("logoutBtnSidebar");
      if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          location.reload();
        });
      }

      // Botão de alternar tema no bottom
      const themeToggle = document.getElementById("themeToggle");
      if (themeToggle) {
        themeToggle.addEventListener("click", () => {
          const body = document.body;
          const currentTheme = body.classList.contains("theme-dark") ? "dark" : "light";
          const newTheme = currentTheme === "dark" ? "light" : "dark";
          body.classList.remove(`theme-${currentTheme}`);
          body.classList.add(`theme-${newTheme}`);

          // Alterna logo
          const logo = document.querySelector("#mainNavbar .navbar-brand img");
          if (logo) {
            logo.src = newTheme === "dark" ? "/public/img/Gestao360-logo.svg" : "/public/img/Gestao360-logo.svg";
          }
        });
      }
    });

  // Carrega view inicial
  loadView("/views/dashboard/dashboard.html");

} else {
  // Usuário não logado
  loadView("/views/auth/login.html");
}
