// web/public/js/menu.js
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
