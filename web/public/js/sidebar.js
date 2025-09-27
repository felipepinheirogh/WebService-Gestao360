// web/public/js/sidebar.js
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
          <a href="#" class="nav-link text-dark" onclick="loadView('${item.view}')">
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
