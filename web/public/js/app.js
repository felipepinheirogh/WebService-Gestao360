// ==================== Função para carregar views ====================
async function loadView(view) {
  try {
    const res = await fetch(view);
    if (!res.ok) throw new Error(`Erro ao carregar view: ${view}`);
    const html = await res.text();
    const appDiv = document.getElementById('app');
    appDiv.innerHTML = html;

    // Executa scripts embutidos na view
    appDiv.querySelectorAll('script').forEach(script => eval(script.innerText));
  } catch (err) {
    console.error(err);
    document.getElementById('app').innerHTML = `<div class="text-danger p-3">Erro ao carregar a página: ${err.message}</div>`;
  }
}

// ==================== Função de Tema ====================
function applyTheme(theme) {
  document.body.classList.remove('theme-light', 'theme-dark');
  document.body.classList.add(`theme-${theme}`);

  // Altera ícone do toggle
  const themeBtn = document.getElementById('themeToggle');
  if(themeBtn) {
    themeBtn.innerHTML = theme === 'light' 
      ? '<i class="bi bi-moon-fill"></i>' 
      : '<i class="bi bi-sun-fill"></i>';
  }

  // Troca a logo no header
  const logoImg = document.getElementById('logoHeader');
  if(logoImg) {
    logoImg.src = theme === 'light' 
      ? '/public/img/Gestao360-logo-dark.svg' 
      : '/public/img/Gestao360-logo-white.svg';
  }
}

// ==================== Menu ====================
const MENU_ITEMS = [
  { title: "Dashboard", icon: "bi-speedometer2", view: "/views/dashboard/dashboard.html", roles: ["admin","user"] },
  { 
    title: "Clientes", icon: "bi-people", roles: ["admin"],
    children: [
      { title: "Lista de Clientes", view: "/views/cliente/cliente.html", roles: ["admin"] },
      { title: "Adicionar Cliente", view: "/views/cliente/cliente_add.html", roles: ["admin"] }
    ]
  },
  { 
    title: "Usuários", icon: "bi-person-badge", roles: ["admin"],
    children: [
      { title: "Lista de Usuários", view: "/views/usuario/usuario.html", roles: ["admin"] },
      { title: "Adicionar Usuário", view: "/views/usuario/usuario_add.html", roles: ["admin"] }
    ]
  },
  { title: "Licenças", icon: "bi-card-checklist", view: "/views/licenca/licenca.html", roles: ["admin","user"] },
  { 
    title: "Configurações", icon: "bi-gear", roles: ["admin"],
    children: [
      { title: "Integrações", view: "/views/integracao/settings.html", roles: ["admin"] },
      { title: "Sistema", view: "/views/configuracoes/configuracoes.html", roles: ["admin"] }
    ]
  }
];

function renderSidebar(userRole) {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  function renderItem(item) {
    if (!item.roles.includes(userRole)) return "";

    if (item.children && item.children.length) {
      const childHtml = item.children.map(renderItem).join("");
      const collapseId = `collapse-${item.title.replace(/\s+/g,'')}`;
      return `
        <li class="nav-item mb-1">
          <a class="nav-link d-flex justify-content-between align-items-center" data-bs-toggle="collapse" href="#${collapseId}">
            <span><i class="bi ${item.icon} me-2"></i>${item.title}</span>
            <i class="bi bi-caret-down-fill"></i>
          </a>
          <div class="collapse ps-3" id="${collapseId}">
            <ul class="nav flex-column mb-0">${childHtml}</ul>
          </div>
        </li>
      `;
    } else {
      return `
        <li class="nav-item mb-1">
          <a href="#" class="nav-link" onclick="loadView('${item.view}')">
            <i class="bi ${item.icon} me-2"></i>${item.title}
          </a>
        </li>
      `;
    }
  }

  sidebar.innerHTML = `<ul class="nav flex-column">${MENU_ITEMS.map(renderItem).join("")}</ul>`;

  // Inicializa collapsos do Bootstrap
  const collapseElList = [].slice.call(document.querySelectorAll('#sidebar .collapse'));
  collapseElList.map(collapseEl => new bootstrap.Collapse(collapseEl, { toggle: false }));
}

// ==================== Inicialização SPA ====================
const token = localStorage.getItem('token');
const role = localStorage.getItem('role') || 'user';

if(token) {
  // Layout principal
  document.body.innerHTML = `
    <div id="header"></div>
    <div class="d-flex">
      <div id="sidebar" class="flex-shrink-0"></div>
      <div id="app" class="flex-grow-1 p-3"></div>
    </div>
  `;

  // Header
  fetch('/partials/_header.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('header').innerHTML = html;

      // Aplica tema salvo somente depois do header estar no DOM
      const savedTheme = localStorage.getItem('theme') || 'light';
      applyTheme(savedTheme);

      // Logout
      const logoutBtn = document.getElementById('logoutBtnHeader');
      if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          localStorage.removeItem('token');
          localStorage.removeItem('role');
          location.reload();
        });
      }

      // Toggle do tema
      const themeBtn = document.getElementById('themeToggle');
      if(themeBtn) {
        themeBtn.addEventListener('click', () => {
          const newTheme = document.body.classList.contains('theme-light') ? 'dark' : 'light';
          localStorage.setItem('theme', newTheme);
          applyTheme(newTheme);
        });
      }
    });

  // Sidebar + menu
  fetch('/partials/_sidebar.html')
    .then(r => r.text())
    .then(html => {
      document.getElementById('sidebar').innerHTML = html;
      renderSidebar(role);
    });

  // Dashboard inicial
  loadView('/views/dashboard/dashboard.html');

} else {
  // Se não logado, carrega login
  loadView('/views/auth/login.html');
}

// // ==================== Função para carregar views ====================
// async function loadView(view) {
//   try {
//     const res = await fetch(view);
//     if (!res.ok) throw new Error(`Erro ao carregar view: ${view}`);
//     const html = await res.text();
//     const appDiv = document.getElementById('app');
//     appDiv.innerHTML = html;

//     // Executa scripts embutidos na view
//     appDiv.querySelectorAll('script').forEach(script => eval(script.innerText));
//   } catch (err) {
//     console.error(err);
//     document.getElementById('app').innerHTML = `<div class="text-danger p-3">Erro ao carregar a página: ${err.message}</div>`;
//   }
// }

// // ==================== Função de Tema ====================
// function applyTheme(theme) {
//   document.body.classList.remove('theme-light', 'theme-dark');
//   document.body.classList.add(`theme-${theme}`);

//   // Altera ícone do toggle
//   const themeBtn = document.getElementById('themeToggle');
//   if(themeBtn) {
//     themeBtn.innerHTML = theme === 'light' 
//       ? '<i class="bi bi-moon-fill"></i>' 
//       : '<i class="bi bi-sun-fill"></i>';
//   }

//   // Troca a logo no header
//   const logoImg = document.getElementById('logoHeader');
//   if(logoImg) {
//     logoImg.src = theme === 'light' 
//       ? '/public/img/Gestao360-logo-dark.svg' 
//       : '/public/img/Gestao360-logo-white.svg';
//   }
// }

// // ==================== Menu ====================
// const MENU_ITEMS = [
//   { title: "Dashboard", icon: "bi-speedometer2", view: "/views/dashboard/dashboard.html", roles: ["admin","user"] },
//   { 
//     title: "Clientes", icon: "bi-people", roles: ["admin"],
//     children: [
//       { title: "Lista de Clientes", view: "/views/cliente/cliente.html", roles: ["admin"] },
//       { title: "Adicionar Cliente", view: "/views/cliente/cliente_add.html", roles: ["admin"] }
//     ]
//   },
//   { 
//     title: "Usuários", icon: "bi-person-badge", roles: ["admin"],
//     children: [
//       { title: "Lista de Usuários", view: "/views/usuario/usuario.html", roles: ["admin"] },
//       { title: "Adicionar Usuário", view: "/views/usuario/usuario_add.html", roles: ["admin"] }
//     ]
//   },
//   { title: "Licenças", icon: "bi-card-checklist", view: "/views/licenca/licenca.html", roles: ["admin","user"] },
//   { 
//     title: "Configurações", icon: "bi-gear", roles: ["admin"],
//     children: [
//       { title: "Integrações", view: "/views/integracao/settings.html", roles: ["admin"] },
//       { title: "Sistema", view: "/views/configuracoes/configuracoes.html", roles: ["admin"] }
//     ]
//   }
// ];

// function renderSidebar(userRole) {
//   const sidebar = document.getElementById("sidebar");
//   if (!sidebar) return;

//   function renderItem(item) {
//     if (!item.roles.includes(userRole)) return "";

//     if (item.children && item.children.length) {
//       const childHtml = item.children.map(renderItem).join("");
//       const collapseId = `collapse-${item.title.replace(/\s+/g,'')}`;
//       return `
//         <li class="nav-item mb-1">
//           <a class="nav-link d-flex justify-content-between align-items-center" data-bs-toggle="collapse" href="#${collapseId}">
//             <span><i class="bi ${item.icon} me-2"></i>${item.title}</span>
//             <i class="bi bi-caret-down-fill"></i>
//           </a>
//           <div class="collapse ps-3" id="${collapseId}">
//             <ul class="nav flex-column mb-0">${childHtml}</ul>
//           </div>
//         </li>
//       `;
//     } else {
//       return `
//         <li class="nav-item mb-1">
//           <a href="#" class="nav-link" onclick="loadView('${item.view}')">
//             <i class="bi ${item.icon} me-2"></i>${item.title}
//           </a>
//         </li>
//       `;
//     }
//   }

//   sidebar.innerHTML = `<ul class="nav flex-column">${MENU_ITEMS.map(renderItem).join("")}</ul>`;

//   // Inicializa collapsos do Bootstrap
//   const collapseElList = [].slice.call(document.querySelectorAll('#sidebar .collapse'));
//   collapseElList.map(collapseEl => new bootstrap.Collapse(collapseEl, { toggle: false }));
// }

// // ==================== Inicialização SPA ====================
// const token = localStorage.getItem('token');
// const role = localStorage.getItem('role') || 'user';

// if(token) {
//   // Layout principal
//   document.body.innerHTML = `
//     <div id="header"></div>
//     <div class="d-flex">
//       <div id="sidebar" class="flex-shrink-0"></div>
//       <div id="app" class="flex-grow-1 p-3"></div>
//     </div>
//   `;

//   // Header
//   fetch('/partials/_header.html')
//     .then(r => r.text())
//     .then(html => {
//       document.getElementById('header').innerHTML = html;

//       // Logout
//       const logoutBtn = document.getElementById('logoutBtnHeader');
//       if(logoutBtn) {
//         logoutBtn.addEventListener('click', () => {
//           localStorage.removeItem('token');
//           localStorage.removeItem('role');
//           location.reload();
//         });
//       }

//       // Theme toggle
//       const themeBtn = document.getElementById('themeToggle');
//       if(themeBtn) {
//         themeBtn.addEventListener('click', () => {
//           const newTheme = document.body.classList.contains('theme-light') ? 'dark' : 'light';
//           localStorage.setItem('theme', newTheme);
//           applyTheme(newTheme);
//         });
//       }

//       // Aplica tema salvo
//       const savedTheme = localStorage.getItem('theme') || 'light';
//       applyTheme(savedTheme);
//     });

//   // Sidebar + menu
//   fetch('/partials/_sidebar.html')
//     .then(r => r.text())
//     .then(html => {
//       document.getElementById('sidebar').innerHTML = html;
//       renderSidebar(role);
//     });

//   // Dashboard inicial
//   loadView('/views/dashboard/dashboard.html');

// } else {
//   // Se não logado, carrega login
//   loadView('/views/auth/login.html');
// }


// // // web/public/js/app.js
// // async function loadView(view) {
// //   try {
// //     const res = await fetch(view);
// //     if (!res.ok) throw new Error(`Erro ao carregar view: ${view}`);
// //     const html = await res.text();
// //     const appDiv = document.getElementById('app');
// //     appDiv.innerHTML = html;

// //     // Executa scripts embutidos na view
// //     appDiv.querySelectorAll('script').forEach(script => eval(script.innerText));
// //   } catch (err) {
// //     console.error(err);
// //     document.getElementById('app').innerHTML = `<div class="text-danger p-3">Erro ao carregar a página: ${err.message}</div>`;
// //   }
// // }

// // const token = localStorage.getItem('token');
// // const role = localStorage.getItem('role') || 'user';

// // if (token) {
// //   document.body.innerHTML = `
// //     <div id="header"></div>
// //     <div class="d-flex">
// //       <div id="sidebar" class="flex-shrink-0"></div>
// //       <div id="app" class="flex-grow-1 p-3"></div>
// //     </div>
// //   `;

// //   // Header
// //   fetch('/partials/_header.html')
// //     .then(r => r.text())
// //     .then(html => {
// //       document.getElementById('header').innerHTML = html;
// //       const logoutBtn = document.getElementById('logoutBtnHeader');
// //       if(logoutBtn) {
// //         logoutBtn.addEventListener('click', () => {
// //           localStorage.removeItem('token');
// //           localStorage.removeItem('role');
// //           location.reload();
// //         });
// //       }
// //     });

// //   // Sidebar + menu
// //   fetch('/partials/_sidebar.html')
// //     .then(r => r.text())
// //     .then(html => {
// //       document.getElementById('sidebar').innerHTML = html;
// //       renderSidebar(role); // menu dinâmico
// //     });

// //   // Dashboard inicial
// //   loadView('/views/dashboard/dashboard.html');

// // } else {
// //   loadView('/views/auth/login.html');
// // }
