const API_URL = "http://localhost:3334/api";

// --- LOGIN ---
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("username", username);
        window.location.href = "admin.html";
      } else {
        alert("Login inválido");
      }
    } catch (err) {
      console.error("Erro no login:", err);
      alert("Erro ao conectar com o servidor.");
    }
  });
}

// --- PAINEL ADMIN ---
const loginSection = document.getElementById("loginSection");
const dashboardSection = document.getElementById("dashboardSection");
const role = localStorage.getItem("role");
const username = localStorage.getItem("username");

if (loginSection && dashboardSection) {
  if (role === "admin") {
    loginSection.classList.add("d-none");
    dashboardSection.classList.remove("d-none");
    const welcomeAdmin = document.getElementById("welcomeAdmin");
    if (welcomeAdmin && username) {
      welcomeAdmin.textContent = `Bem-vinda(o), ${username}!`;
    }
  } else {
    loginSection.classList.remove("d-none");
    dashboardSection.classList.add("d-none");
  }
}

// --- LOGOUT ---
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.clear();
    window.location.href = "index.html";
  });
}

// --- NOVA TURMA ---
const btnNovaTurma = document.getElementById("btnNovaTurma");
const saveClassBtn = document.getElementById("saveClassBtn");
const classNameInput = document.getElementById("classNameInput");

if (btnNovaTurma && saveClassBtn) {
  btnNovaTurma.addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("classModal"));
    modal.show();
  });

  saveClassBtn.addEventListener("click", async () => {
    const nomeTurma = classNameInput.value.trim();
    if (!nomeTurma) return alert("Digite o nome da turma!");

    try {
      const res = await fetch(`${API_URL}/turmas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nomeTurma })
      });
      const data = await res.json();
      alert("Turma criada com sucesso!");

      const classSelect = document.getElementById("classSelect");
      const childClassSelect = document.getElementById("childClassSelect");
      const editChildClassSelect = document.getElementById("editChildClassSelect");

      [classSelect, childClassSelect, editChildClassSelect].forEach(select => {
        if (select) {
          const option = document.createElement("option");
          option.value = data.nome;
          option.textContent = data.nome;
          select.appendChild(option);
        }
      });

      bootstrap.Modal.getInstance(document.getElementById("classModal")).hide();
      classNameInput.value = "";
    } catch (err) {
      console.error(err);
      alert("Erro ao criar turma");
    }
  });
}

// --- ADICIONAR CRIANÇA ---
const btnAdicionarCrianca = document.getElementById("btnAdicionarCrianca");
const saveChildBtn = document.getElementById("saveChildBtn");
const childNameInput = document.getElementById("childNameInput");
const childClassSelect = document.getElementById("childClassSelect");
const childAuthorizedInput = document.getElementById("childAuthorizedInput");

if (btnAdicionarCrianca && saveChildBtn) {
  btnAdicionarCrianca.addEventListener("click", () => {
    const modal = new bootstrap.Modal(document.getElementById("childModal"));
    modal.show();
  });

  saveChildBtn.addEventListener("click", async () => {
    const nome = childNameInput.value.trim();
    const turma = childClassSelect.value;
    const autorizados = (childAuthorizedInput.value || "")
      .split("\n")
      .map(a => a.trim())
      .filter(a => a);

    if (!nome || !turma) return alert("Preencha todos os campos!");

    try {
      const res = await fetch(`${API_URL}/criancas`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, turma, autorizados })
      });

      if (!res.ok) throw new Error("Erro na resposta do servidor");

      const data = await res.json();
      alert("Criança adicionada com sucesso!");

      const tbody = document.getElementById("childrenBody");
      if (!tbody) {
        console.warn("Elemento tbody#childrenBody não encontrado para inserir a criança");
      } else {
        const tr = document.createElement("tr");
        tr.dataset.id = data.id; // usa ID real do backend
        tr.innerHTML = `
          <td class="child-name">${data.nome}</td>
          <td class="child-class">${data.turma}</td>
          <td class="child-auth">${(data.autorizados || []).join(", ")}</td>
          <td>
            <button class="btn btn-sm btn-outline-secondary editar-btn">Editar</button>
            <button class="btn btn-sm btn-outline-danger excluir-btn">Excluir</button>
          </td>
        `;
        tbody.appendChild(tr);
        document.getElementById("emptyState")?.classList.add("d-none");
      }

      bootstrap.Modal.getInstance(document.getElementById("childModal")).hide();
      childNameInput.value = "";
      childAuthorizedInput.value = "";
    } catch (err) {
      console.error("Erro ao adicionar criança:", err);
      alert("Erro ao adicionar criança");
    }
  });
}

// --- LISTAR CRIANÇAS (carregamento inicial) ---
async function carregarCriancas() {
  const childrenBody = document.getElementById("childrenBody");
  const emptyState = document.getElementById("emptyState");
  if (!childrenBody) return;

  try {
    const res = await fetch(`${API_URL}/criancas`);
    const lista = await res.json();

    childrenBody.innerHTML = "";
    lista.forEach(data => {
      const tr = document.createElement("tr");
      tr.dataset.id = data.id; // garante ID real
      tr.innerHTML = `
        <td class="child-name">${data.nome}</td>
        <td class="child-class">${data.turma}</td>
        <td class="child-auth">${(data.autorizados || []).join(", ")}</td>
        <td>
          <button class="btn btn-sm btn-outline-secondary editar-btn">Editar</button>
          <button class="btn btn-sm btn-outline-danger excluir-btn">Excluir</button>
        </td>
      `;
      childrenBody.appendChild(tr);
    });

    if (emptyState) emptyState.classList.toggle("d-none", lista.length > 0);
  } catch (err) {
    console.error("Erro ao carregar crianças:", err);
    alert("Erro ao carregar lista de crianças");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (role === "admin") {
    carregarCriancas();
  }
});

// --- EDITAR CRIANÇA ---
document.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("editar-btn")) return;

    const tr = e.target.closest("tr");
    const id = tr?.dataset?.id;
    if (!id) return alert("ID da criança não encontrado");

    const modalEl = document.getElementById("editChildModal");
    if (!modalEl) {
      console.error("Modal editChildModal não encontrado no DOM.");
      return alert("Erro ao abrir modal de edição");
    }

    const nomeInput = modalEl.querySelector("#editChildNameInput");
    const turmaSelect = modalEl.querySelector("#editChildClassSelect");
    const autorizadosInput = modalEl.querySelector("#editChildAuthorizedInput");

    if (!nomeInput || !turmaSelect || !autorizadosInput) {
      console.error("Campos do modal ausentes:", { nomeInput, turmaSelect, autorizadosInput });
      return alert("Erro ao abrir modal de edição");
    }

    const nomeAtual = tr.querySelector(".child-name")?.textContent || "";
    const turmaAtual = tr.querySelector(".child-class")?.textContent || "";
    const autorizadosAtual = tr.querySelector(".child-auth")?.textContent || "";

    nomeInput.value = nomeAtual;
    turmaSelect.value = turmaAtual;
    autorizadosInput.value = autorizadosAtual
      ? autorizadosAtual.split(",").map(s => s.trim()).join("\n")
      : "";

    // Se a turma atual não estiver nas opções, adiciona dinamicamente
    if (turmaAtual && ![...turmaSelect.options].some(opt => opt.value === turmaAtual)) {
      const opt = document.createElement("option");
      opt.value = turmaAtual;
      opt.textContent = turmaAtual;
      turmaSelect.appendChild(opt);
      turmaSelect.value = turmaAtual;
    }

    modalEl.dataset.id = id;
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  });

  // --- SALVAR EDIÇÃO ---
  const saveEditChildBtn = document.getElementById("saveEditChildBtn");
  if (saveEditChildBtn) {
    saveEditChildBtn.addEventListener("click", async () => {
      const modalEl = document.getElementById("editChildModal");
      const id = modalEl?.dataset?.id;
      if (!modalEl || !id) return alert("Erro: modal ou ID não encontrado");

      const nomeInput = modalEl.querySelector("#editChildNameInput");
      const turmaSelect = modalEl.querySelector("#editChildClassSelect");
      const autorizadosInput = modalEl.querySelector("#editChildAuthorizedInput");

      if (!nomeInput || !turmaSelect || !autorizadosInput) {
        console.error("Campos do modal ausentes:", { nomeInput, turmaSelect, autorizadosInput });
        return alert("Erro ao salvar edição");
      }

      const nome = nomeInput.value.trim();
      const turma = turmaSelect.value;
      const autorizados = (autorizadosInput.value || "")
        .split("\n")
        .map(a => a.trim())
        .filter(a => a);

      if (!nome || !turma) return alert("Preencha todos os campos!");

      try {
        const res = await fetch(`${API_URL}/criancas/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nome, turma, autorizados })
        });

        if (!res.ok) throw new Error("Erro ao atualizar");

        const atualizada = await res.json();

        // Atualiza a linha na tabela sem recarregar
        const tr = document.querySelector(`tr[data-id="${id}"]`);
        if (tr) {
          tr.querySelector(".child-name").textContent = atualizada.nome;
          tr.querySelector(".child-class").textContent = atualizada.turma;
          tr.querySelector(".child-auth").textContent = (atualizada.autorizados || []).join(", ");
        }

        bootstrap.Modal.getInstance(modalEl).hide();
        alert("Criança atualizada com sucesso!");
      } catch (err) {
        console.error("Erro ao editar criança:", err);
        alert("Erro ao editar criança");
      }
    });
  }
});

// --- EXCLUIR CRIANÇA ---
async function excluirCrianca(id, tr) {
  try {
    const res = await fetch(`${API_URL}/criancas/${id}`, { method: "DELETE" });

    // Captura resposta mesmo quando não for JSON (ex.: HTML de erro)
    const text = await res.text();
    let payload;
    try { payload = JSON.parse(text); } catch { payload = { mensagem: text }; }

    if (!res.ok) {
      alert(payload.error || payload.mensagem || "Erro ao excluir criança");
      return;
    }

    alert(payload.mensagem || "Criança excluída com sucesso");
    tr.remove();

    const childrenBody = document.getElementById("childrenBody");
    const emptyState = document.getElementById("emptyState");
    if (childrenBody && emptyState) {
      emptyState.classList.toggle("d-none", childrenBody.querySelectorAll("tr").length > 0);
    }
  } catch (err) {
    console.error("Erro na requisição DELETE:", err);
    alert("Erro ao excluir criança");
  }
}

// --- LISTENERS: editar/excluir ---
document.addEventListener("click", (e) => {
  const tr = e.target.closest("tr");
  const id = tr?.dataset?.id;

  if (e.target.classList.contains("excluir-btn")) {
    if (!id) return alert("ID da criança não encontrado");
    if (!confirm("Tem certeza que deseja excluir esta criança?")) return;
    excluirCrianca(id, tr);
  }
});

// --- FILTRO DE CRIANÇAS ---
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchChild");
  const classSelect = document.getElementById("classSelect");
  const childrenBody = document.getElementById("childrenBody");
  const emptyState = document.getElementById("emptyState");

  function filtrarTabela() {
    const termo = (searchInput?.value || "").toLowerCase().trim();
    const turmaSelecionada = classSelect?.value || "";
    let algumaVisivel = false;

    [...childrenBody.querySelectorAll("tr")].forEach(tr => {
      const nome = tr.querySelector(".child-name")?.textContent.toLowerCase() || "";
      const turma = tr.querySelector(".child-class")?.textContent || "";

      const correspondeNome = termo === "" || nome.includes(termo);
      const correspondeTurma = turmaSelecionada === "" || turma === turmaSelecionada;

      if (correspondeNome && correspondeTurma) {
        tr.style.display = "";
        algumaVisivel = true;
      } else {
        tr.style.display = "none";
      }
    });

    if (!algumaVisivel) {
      emptyState.classList.remove("d-none");
    } else {
      emptyState.classList.add("d-none");
    }
  }

  if (searchInput) searchInput.addEventListener("input", filtrarTabela);
  if (classSelect) classSelect.addEventListener("change", filtrarTabela);
});