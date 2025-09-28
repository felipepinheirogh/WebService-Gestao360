// web/public/js/licenca.js
const LicencaModule = (() => {
  let tabela;

  const mockData = [
    { id: 5001, status: "Ativa", expira: "2025-12-31", cliente: "Empresa Alpha", revenda: "Revenda A", erp: "ERP Pro" },
    { id: 5002, status: "Expirada", expira: "2024-03-15", cliente: "Beta Soluções", revenda: "Revenda B", erp: "ERP Lite" },
    { id: 5003, status: "A Expirar", expira: "2025-09-30", cliente: "Gamma Tech", revenda: "Revenda C", erp: "ERP Pro" },
    { id: 5004, status: "Solicitação", expira: "2025-10-10", cliente: "Delta Sistemas", revenda: "Revenda A", erp: "ERP Lite" }
  ];

  const initTable = () => {
    tabela = $('#tabelaLicencas').DataTable({
      data: mockData,
      columns: [
        { data: null, render: renderAcoes },
        { data: "id" },
        { data: "status", render: renderStatusBadge },
        { data: "expira" },
        { data: "cliente" },
        { data: "revenda" },
        { data: "erp" }
      ],
      order: [[1,'asc']]
    });
  };

  const renderAcoes = (data,row) => {
    return `
      <button class="btn btn-sm btn-success me-1 btn-ativar">Ativar/Desativar</button>
      <button class="btn btn-sm btn-warning me-1 btn-renovar">Renovar</button>
      <button class="btn btn-sm btn-primary btn-editar">Editar</button>
    `;
  };

  const renderStatusBadge = (status) => {
    let color = "secondary";
    if(status === "Ativa") color = "success";
    else if(status === "Solicitação") color = "info";
    else if(status === "A Expirar") color = "warning";
    else if(status === "Expirada") color = "danger";
    return `<span class="badge bg-${color}">${status}</span>`;
  };

  const attachEvents = () => {
    // Small boxes filter
    $('.click-filter').off('click').on('click', function(){
      const type = $(this).data('type');
      const status = $(this).data('status');
      tabela.column(type==='cliente'?4:5).search(type==='cliente'?status:status).draw();
    });

    // Botões de ação
    $('#tabelaLicencas tbody').off('click').on('click','button',function(){
      const rowData = tabela.row($(this).parents('tr')).data();
      if($(this).hasClass('btn-ativar')){
        if(confirm(`Deseja alterar status da licença ${rowData.id}?`)){
          alert("Status alterado (mock)");
        }
      } else if($(this).hasClass('btn-renovar')){
        $('#licencaID').val(rowData.id);
        $('#nomeCliente').text(rowData.cliente);
        $('#dataExpira').val(rowData.expira);
        $('#diasRestantes').text("N/A"); // mock
        $('#modalRenovar').modal('show');
      } else if($(this).hasClass('btn-editar')){
        loadView('/views/licenca/licenca-form.html');
      }
    });

    // Renovar modal
    $('#btnSalvarRenovacao').off('click').on('click',function(){
      alert("Renovação salva (mock)");
      $('#modalRenovar').modal('hide');
    });

    $('#btnGerarToken').off('click').on('click',function(){
      const token = Math.random().toString(36).substring(2,12).toUpperCase();
      $('#tokenGerado').text(token);
    });
  };

  const updateCounters = () => {
    const clientes = mockData.filter(d=>true); // mock todos
    $('#totalClientes').text(clientes.length);
    $('#clientesAtivos').text(clientes.filter(c=>c.status==="Ativa").length);
    $('#clientesSolicitacoes').text(clientes.filter(c=>c.status==="Solicitação").length);
    $('#clientesExpirar').text(clientes.filter(c=>c.status==="A Expirar").length);
    $('#clientesExpirados').text(clientes.filter(c=>c.status==="Expirada").length);
    $('#clientesBloqueados').text(clientes.filter(c=>c.status==="Bloqueada").length);

    const revendas = mockData.filter(d=>true); // mock todos
    $('#totalRevendas').text(revendas.length);
    $('#revendasAtivos').text(revendas.filter(c=>c.status==="Ativa").length);
    $('#revendasSolicitacoes').text(revendas.filter(c=>c.status==="Solicitação").length);
    $('#revendasExpirar').text(revendas.filter(c=>c.status==="A Expirar").length);
    $('#revendasExpirados').text(revendas.filter(c=>c.status==="Expirada").length);
    $('#revendasBloqueados').text(revendas.filter(c=>c.status==="Bloqueada").length);
  };

  const init = () => {
    initTable();
    attachEvents();
    updateCounters();
  };

  return { init };
})();


// $(function() {
//   // Inicializa DataTable
//   const tabela = $("#tabelaLicencas").DataTable({
//     // "ajax": "/api/licenca/listar", // backend retorna JSON
//     "columns": [
//       { "data": null, "render": function(data) {
//         return `
//           <button class="btn btn-sm btn-success btn-ativar">Ativar/Desativar</button>
//           <button class="btn btn-sm btn-warning btn-renovar">Renovar</button>
//           <button class="btn btn-sm btn-primary btn-editar">Editar</button>
//         `;
//       }},
//       { "data": "id" },
//       { "data": "status", "render": function(status) {
//         const classes = { Ativa:'bg-success', Expirada:'bg-danger', 'A Expirar':'bg-warning', Bloqueada:'bg-secondary', Solicitação:'bg-info' };
//         return `<span class="badge ${classes[status] || 'bg-secondary'}">${status}</span>`;
//       }},
//       { "data": "expira" },
//       { "data": "cliente" },
//       { "data": "revenda" },
//       { "data": "erp" }
//     ]
//   });

//   // Filtro Small boxes
//   $(".click-filter").on("click", function() {
//     const tipo = $(this).data("type");
//     const status = $(this).data("status");

//     tabela.column(tipo === "cliente" ? 4 : 5).search("").draw();
//     if(status) tabela.column(tipo === "cliente" ? 4 : 5).search(status).draw();
//   });

//   // Ações rápidas na tabela
//   $("#tabelaLicencas").on("click", ".btn-ativar, .btn-renovar, .btn-editar", function() {
//     const tr = $(this).closest("tr");
//     const data = tabela.row(tr).data();

//     if($(this).hasClass("btn-ativar")) {
//       const acao = data.status === "Ativa" ? "desativar" : "ativar";
//       if(confirm(`Deseja realmente ${acao} a licença ${data.id}?`)) {
//         $.post("/api/licenca/ativar", { id: data.id }, function() {
//           tabela.ajax.reload();
//         });
//       }
//     }

//     if($(this).hasClass("btn-renovar")) {
//       $("#licencaID").val(data.id);
//       $("#nomeCliente").val(data.cliente || data.revenda);
//       $("#dataExpira").val("");
//       $("#diasRestantes").text("0");
//       $("#tokenGerado").text("");
//       $("#modalRenovar").modal("show");
//     }

//     if($(this).hasClass("btn-editar")) {
//       window.location.href = `licenca-form.html?id=${data.id}`;
//     }
//   });

//   // Modal Renovação: calcular dias restantes
//   $("#dataExpira").on("change", function() {
//     const novaData = new Date($(this).val());
//     const hoje = new Date();
//     hoje.setHours(0,0,0,0);
//     if(novaData < hoje) {
//       alert("Data de expiração não pode ser retroativa.");
//       $(this).val("");
//       $("#diasRestantes").text("0");
//       return;
//     }
//     const diff = Math.ceil((novaData - hoje) / (1000*60*60*24));
//     $("#diasRestantes").text(diff);
//   });

//   // Gerar token de ativação
//   $("#btnGerarToken").on("click", function() {
//     const idLicenca = $("#licencaID").val();
//     const token = btoa(`${idLicenca}-${new Date().getTime()}`).slice(0,16);
//     $("#tokenGerado").text(token);
//   });

//   // Salvar renovação
//   $("#btnSalvarRenovacao").on("click", function() {
//     const id = $("#licencaID").val();
//     const dataNova = $("#dataExpira").val();
//     if(!dataNova) { alert("Escolha uma nova data."); return; }

//     $.ajax({
//       url: "/api/licenca/renovar",
//       method: "POST",
//       data: { id, dataExpira: dataNova },
//       success: function() {
//         alert("Licença renovada com sucesso!");
//         $("#modalRenovar").modal("hide");
//         tabela.ajax.reload();
//       },
//       error: function() {
//         alert("Erro ao renovar a licença.");
//       }
//     });
//   });
// });
