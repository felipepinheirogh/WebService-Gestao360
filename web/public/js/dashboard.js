document.addEventListener("DOMContentLoaded", () => {
  // Verifica se o usuário está logado
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "../auth/login.html";
    return;
  }

  // Simulação de dados vindos da API
  const dashboardData = {
    vendas: "R$ 12.350,00",
    clientes: 48,
    licencas: 32,
    relatorios: [
      { title: "Relatório de vendas - Setembro", status: "Gerado" },
      { title: "Clientes inativos", status: "Pendente" },
    ],
  };

  // Atualiza cards
  const cards = {
    vendas: document.querySelector("main .card span.h4:nth-of-type(1)"),
    clientes: document.querySelector("main .card span.h4:nth-of-type(2)"),
    licencas: document.querySelector("main .card span.h4:nth-of-type(3)"),
  };

  if (cards.vendas) cards.vendas.textContent = dashboardData.vendas;
  if (cards.clientes) cards.clientes.textContent = dashboardData.clientes;
  if (cards.licencas) cards.licencas.textContent = dashboardData.licencas;

  // Atualiza Relatórios
  const relatoriosContainer = document.querySelector("main div.mt-4 .card-body");
  if (relatoriosContainer) {
    relatoriosContainer.innerHTML = "";
    dashboardData.relatorios.forEach((rpt) => {
      const div = document.createElement("div");
      div.classList.add("mb-2");
      div.innerHTML = `<strong>${rpt.title}</strong> - <em>${rpt.status}</em>`;
      relatoriosContainer.appendChild(div);
    });
  }

  // Logout
  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.href = "../auth/login.html";
  });
});
