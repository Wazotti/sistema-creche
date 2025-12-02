const API_URL = "http://localhost:3334/api";

// Função auxiliar para POST
function postData(endpoint, payload) {
  fetch(`${API_URL}/${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(res => res.json())
  .then(data => console.log("Resposta:", data))
  .catch(err => console.error("Erro:", err));
}

// Botões (checando se existem antes de usar)
const btnCheckin = document.getElementById("btnCheckin");
if (btnCheckin) {
  btnCheckin.addEventListener("click", () => {
    postData("checkin", { nomeCrianca: "Lucas", hora: "08:00" });
  });
}

const btnCheckout = document.getElementById("btnCheckout");
if (btnCheckout) {
  btnCheckout.addEventListener("click", () => {
    postData("checkout", { nomeCrianca: "Lucas", hora: "17:30", retiradoPor: "Tia Ana" });
  });
}

const btnStatus = document.getElementById("btnStatus");
if (btnStatus) {
  btnStatus.addEventListener("click", () => {
    postData("status", { nomeCrianca: "Lucas", descricao: "Está dormindo" });
  });
}

const btnAlerta = document.getElementById("btnAlerta");
if (btnAlerta) {
  btnAlerta.addEventListener("click", () => {
    postData("alerta", { nomeCrianca: "Lucas" });
  });
}

/***** Frases de impacto com efeito de digitação suave *****/
const phrases = [
  "Transparência que acolhe.",
  "Excelência no cuidado, todos os dias.",
  "Elegância na informação.",
  "Tecnologia a serviço do afeto."
];
const rotateEl = document.getElementById('impact-rotate');
if (rotateEl) {
  let phraseIndex = 0, charIndex = 0, deleting = false;
  const typeEffect = () => {
    const current = phrases[phraseIndex];
    if (!deleting) {
      rotateEl.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length) { deleting = true; setTimeout(typeEffect, 1400); return; }
    } else {
      rotateEl.textContent = current.slice(0, --charIndex);
      if (charIndex === 0) { deleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; }
    }
    setTimeout(typeEffect, deleting ? 28 : 42);
  };
  typeEffect();
}

/***** Lazy loading com blur-up *****/
const lazyImgs = document.querySelectorAll('img.lazy');
if (lazyImgs.length) {
  const lazyObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');
        if (src) {
          const hiRes = new Image();
          hiRes.src = src;
          hiRes.onload = () => { img.src = src; img.classList.add('loaded'); };
        }
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '200px 0px', threshold: 0.01 });
  lazyImgs.forEach(img => lazyObserver.observe(img));
}

/***** Revelar elementos ao scroll *****/
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));
}

/***** Parallax suave *****/
const parallaxEls = document.querySelectorAll('.parallax img');
if (parallaxEls.length) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY || window.pageYOffset;
    parallaxEls.forEach(img => { img.style.transform = `translateY(${y * 0.15}px) scale(1.02)`; });
  });
}

/***** Smooth scroll para navbar *****/
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  });
});

/***** Microinterações em botões *****/
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('pointerenter', () => {
    btn.style.transform = 'translateY(-1px)';
    btn.style.boxShadow = '0 14px 28px rgba(0,0,0,0.12)';
  });
  btn.addEventListener('pointerleave', () => {
    btn.style.transform = 'translateY(0)';
    btn.style.boxShadow = '';
  });
});

/***** Controle de acesso admin *****/
if (window.location.pathname.includes("admin.html")) {
  const isAdmin = localStorage.getItem("isAdmin");
  if (isAdmin !== "true") {
    window.location.href = "login.html";
  }
}

if (document.getElementById("logoutBtn")) {
  (document.getElementById("logoutBtn")).addEventListener("click", () => {
    localStorage.removeItem("isAdmin");
    window.location.href = "login.html";
  });
}


/* Admin page only */
const loginSection = document.getElementById('loginSection');
const dashboardSection = document.getElementById('dashboardSection');
const logoutBtn = document.getElementById('logoutBtn');

if (document.getElementById("logoutBtn")) {
  (document.getElementById("logoutBtn")).addEventListener('click', () => { clearAuth(); window.location.href = 'index.html'; });
}

if (loginSection && dashboardSection) {
  const auth = getAuth();
  if (auth.logged) {
    loginSection.classList.add('d-none');
    dashboardSection.classList.remove('d-none');
    document.getElementById('adminRole').textContent = auth.user?.role || 'Admin';
    document.getElementById('welcomeAdmin').textContent = `Bem-vinda(o), ${auth.user?.name || 'Admin'}!`;
    initDashboard();
  } else {
    // Login
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', e => {
      e.preventDefault();
      const username = document.getElementById('username').value.trim();
      const password = document.getElementById('password').value.trim();
      // Protótipo: validação simples
      if (username && password) {
        setAuth({ name: username, role: 'Administrador(a)' });
        loginSection.classList.add('d-none');
        dashboardSection.classList.remove('d-none');
        document.getElementById('adminRole').textContent = 'Administrador(a)';
        document.getElementById('welcomeAdmin').textContent = `Bem-vinda(o), ${username}!`;
        initDashboard();
      } else {
        alert('Informe usuário e senha.');
      }
    });
  }
}
function initDashboard() {
  const data = loadData();
  const classSelect = document.getElementById('classSelect');
  const childClassSelect = document.getElementById('childClassSelect');
  const childrenBody = document.getElementById('childrenBody');
  const searchChild = document.getElementById('searchChild');

  // Popular turmas
  classSelect.innerHTML = '';
  data.classes.forEach(cls => {
    const opt = document.createElement('option');
    opt.value = cls.id;
    opt.textContent = cls.name;
    classSelect.appendChild(opt);
  });

  // Child modal turmas
  childClassSelect.innerHTML = '';
  data.classes.forEach(cls => {
    const opt = document.createElement('option');
    opt.value = cls.id;
    opt.textContent = cls.name;
    childClassSelect.appendChild(opt);
  });

  // Render children por turma + busca
  function renderChildren() {
    const currentClass = classSelect.value;
    const term = (searchChild.value || '').toLowerCase();
    const filtered = data.children.filter(
      ch => ch.classId === currentClass && ch.name.toLowerCase().includes(term)
    );

    childrenBody.innerHTML = '';
    filtered.forEach(ch => {
      const tr = document.createElement('tr');

      // Nome
      const tdName = document.createElement('td');
      tdName.textContent = ch.name;

      // Status
      const tdStatus = document.createElement('td');
      const select = document.createElement('select');
      select.className = 'form-select form-select-sm';
      select.innerHTML = `
        <option value="present">Presente</option>
        <option value="absent">Ausente</option>
      `;
      select.value = ch.status || 'absent';

      const chip = document.createElement('span');
      chip.className = 'chip ' + (ch.status === 'present' ? 'chip--present' : 'chip--absent');
      chip.textContent = ch.status === 'present' ? 'Presente' : 'Ausente';

      tdStatus.appendChild(chip);
      tdStatus.appendChild(document.createElement('br'));
      tdStatus.appendChild(select);

      select.addEventListener('change', () => {
        ch.status = select.value;
        chip.className = 'chip ' + (ch.status === 'present' ? 'chip--present' : 'chip--absent');
        chip.textContent = ch.status === 'present' ? 'Presente' : 'Ausente';
        saveData(data);
      });

      // Observações
      const tdNotes = document.createElement('td');
      const notes = document.createElement('textarea');
      notes.className = 'form-control';
      notes.rows = 2;
      notes.placeholder = 'Observações do dia, alimentação, humor...';
      notes.value = ch.notes || '';
      notes.addEventListener('change', () => {
        ch.notes = notes.value;
        saveData(data);
      });
      tdNotes.appendChild(notes);

      // Retirada antecipada (checkbox + hora)
      const tdEarly = document.createElement('td');
      const earlyCheck = document.createElement('input');
      earlyCheck.type = 'checkbox';
      earlyCheck.className = 'form-check-input me-2';
      earlyCheck.checked = !!ch.earlyPickup;

      const timeInput = document.createElement('input');
      timeInput.type = 'time';
      timeInput.className = 'form-control form-control-sm mt-2';
      timeInput.value = ch.earlyPickup?.time || '';
      timeInput.disabled = !earlyCheck.checked;

      tdEarly.appendChild(earlyCheck);
      const label = document.createElement('span');
      label.textContent = 'Retirada antecipada';
      tdEarly.appendChild(label);
      tdEarly.appendChild(timeInput);

      // Autorizado (somente pessoas cadastradas)
      const tdAuth = document.createElement('td');
      const authSelect = document.createElement('select');
      authSelect.className = 'form-select form-select-sm';
      authSelect.innerHTML = `<option value="">Selecione autorizado</option>`;
      (ch.authorized || []).forEach(person => {
        const opt = document.createElement('option');
        opt.value = person;
        opt.textContent = person;
        authSelect.appendChild(opt);
      });
      authSelect.value = ch.earlyPickup?.by || '';
      tdAuth.appendChild(authSelect);

      // Listeners dependentes (agora authSelect já existe)
      earlyCheck.addEventListener('change', () => {
        if (earlyCheck.checked) {
          ch.earlyPickup = { time: timeInput.value || '', by: authSelect.value || '' };
          timeInput.disabled = false;
        } else {
          ch.earlyPickup = null;
          timeInput.disabled = true;
          authSelect.value = '';
        }
        saveData(data);
        renderChildren();
      });

      timeInput.addEventListener('change', () => {
        if (ch.earlyPickup) {
          ch.earlyPickup.time = timeInput.value;
          saveData(data);
        }
      });

      authSelect.addEventListener('change', () => {
        if (!earlyCheck.checked) {
          alert('Marque "Retirada antecipada" e informe o horário antes de selecionar o autorizado.');
          authSelect.value = '';
          return;
        }
        ch.earlyPickup = ch.earlyPickup || { time: timeInput.value || '', by: '' };
        ch.earlyPickup.by = authSelect.value;
        saveData(data);
      });

      // Ações
      const tdActions = document.createElement('td');
      const saveBtn = document.createElement('button');
      saveBtn.className = 'btn btn-primary btn-sm me-2';
      saveBtn.textContent = 'Salvar';
      saveBtn.addEventListener('click', () => {
        saveData(data);
        saveBtn.textContent = 'Salvo ✓';
        setTimeout(() => (saveBtn.textContent = 'Salvar'), 1200);
      });

      const clearEarlyBtn = document.createElement('button');
      clearEarlyBtn.className = 'btn btn-outline-dark btn-sm';
      clearEarlyBtn.textContent = 'Limpar retirada';
      clearEarlyBtn.addEventListener('click', () => {
        ch.earlyPickup = null;
        saveData(data);
        renderChildren();
      });

      tdActions.appendChild(saveBtn);
      tdActions.appendChild(clearEarlyBtn);

      tr.appendChild(tdName);
      tr.appendChild(tdStatus);
      tr.appendChild(tdNotes);
      tr.appendChild(tdEarly);
      tr.appendChild(tdAuth);
      tr.appendChild(tdActions);

      childrenBody.appendChild(tr);
    });
  }

  classSelect.addEventListener('change', renderChildren);
  searchChild.addEventListener('input', renderChildren);

  // Inicial
  classSelect.value = data.classes[0]?.id || '';
  renderChildren();

  // Modais de criação
  const classModal = new bootstrap.Modal(document.getElementById('classModal'));
  const childModal = new bootstrap.Modal(document.getElementById('childModal'));

  document.getElementById('addClassBtn').addEventListener('click', () => {
    document.getElementById('classNameInput').value = '';
    classModal.show();
  });

  document.getElementById('saveClassBtn').addEventListener('click', () => {
    const name = document.getElementById('classNameInput').value.trim();
    if (!name) return alert('Informe o nome da turma.');
    if (data.classes.some(c => c.id === name)) return alert('Já existe uma turma com esse identificador.');
    data.classes.push({ id: name, name });
    saveData(data);
    initDashboard();
    classModal.hide();
  });

  document.getElementById('addChildBtn').addEventListener('click', () => {
    childClassSelect.innerHTML = '';
    data.classes.forEach(cls => {
      const opt = document.createElement('option');
      opt.value = cls.id;
      opt.textContent = cls.name;
      childClassSelect.appendChild(opt);
    });
    document.getElementById('childNameInput').value = '';
    document.getElementById('childAuthorizedInput').value = '';
    childModal.show();
  });

  document.getElementById('saveChildBtn').addEventListener('click', () => {
    const name = document.getElementById('childNameInput').value.trim();
    const classId = document.getElementById('childClassSelect').value;
    const authorizedRaw = document.getElementById('childAuthorizedInput').value.trim();
    if (!name || !classId) return alert('Informe o nome e a turma.');
    const authorized = authorizedRaw
      ? authorizedRaw.split(/;|\n/).map(s => s.trim()).filter(Boolean)
      : [];
    const id = 'c' + Date.now();
    data.children.push({ id, name, classId, status: 'absent', notes: '', earlyPickup: null, authorized });
    saveData(data);
    initDashboard();
    childModal.hide();
  });
}
/* ========================================
   STORAGE & AUTH FUNCTIONS
   ======================================== */

function getAuth() {
  const auth = localStorage.getItem("adminAuth")
  return auth ? JSON.parse(auth) : { logged: false, user: null }
}

function setAuth(user) {
  localStorage.setItem("adminAuth", JSON.stringify({ logged: true, user }))
}

function clearAuth() {
  localStorage.removeItem("adminAuth")
}

function loadData() {
  const data = localStorage.getItem("crecheData")
  if (!data) return getDefaultData()
  return JSON.parse(data)
}

function saveData(data) {
  localStorage.setItem("crecheData", JSON.stringify(data))
}

function getDefaultData() {
  return {
    classes: [
      { id: "maternal", name: "Maternal (6m - 1a)" },
      { id: "mini", name: "Mini Grupo (1a - 2a)" },
      { id: "etapa1", name: "Etapa 1 (2a - 3a)" },
    ],
    children: [
      {
        id: "c1",
        name: "Lucas Silva",
        classId: "maternal",
        status: "absent",
        notes: "",
        earlyPickup: null,
        authorized: ["Avó Maria", "Tio João"],
      },
      {
        id: "c2",
        name: "Sofia Costa",
        classId: "maternal",
        status: "absent",
        notes: "",
        earlyPickup: null,
        authorized: ["Mãe Juliana", "Pai Carlos"],
      },
      {
        id: "c3",
        name: "Pedro Oliveira",
        classId: "mini",
        status: "absent",
        notes: "",
        earlyPickup: null,
        authorized: ["Avó Teresa", "Tia Lucia"],
      },
    ],
  }
}

/* ========================================
   LAZY LOADING WITH BLUR-UP EFFECT
   ======================================== */

function initLazyLoading() {
  const lazyImages = document.querySelectorAll(".lazy-img")

  if (!("IntersectionObserver" in window)) {
    lazyImages.forEach((img) => {
      const src = img.getAttribute("data-src")
      if (src) img.src = src
      img.classList.add("loaded")
    })
    return
  }

  const imageObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target
          const src = img.getAttribute("data-src")
          if (src) {
            const tempImg = new Image()
            tempImg.crossOrigin = "anonymous"
            tempImg.onload = () => {
              img.src = src
              img.classList.add("loaded")
            }
            tempImg.onerror = () => {
              img.classList.add("loaded")
            }
            tempImg.src = src
          }
          imageObserver.unobserve(img)
        }
      })
    },
    { rootMargin: "100px", threshold: 0.01 },
  )

  lazyImages.forEach((img) => imageObserver.observe(img))
}

/* ========================================
   SCROLL REVEAL ANIMATIONS
   ======================================== */

function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal-fade")

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((el) => el.classList.add("visible"))
    return
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible")
          revealObserver.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.1, rootMargin: "50px" },
  )

  revealElements.forEach((el) => revealObserver.observe(el))
}

/* ========================================
   PARALLAX EFFECT
   ======================================== */

function initParallax() {
  const parallaxWrappers = document.querySelectorAll(".parallax-wrapper, .hero-image-wrapper")
  if (!parallaxWrappers.length) return

  let ticking = false

  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrollY = window.scrollY || window.pageYOffset
        parallaxWrappers.forEach((wrapper) => {
          const imgs = wrapper.querySelectorAll("img")
          imgs.forEach((img) => {
            const rect = wrapper.getBoundingClientRect()
            const offset = (rect.top - window.innerHeight) * 0.05
            img.style.transform = `translateY(${offset}px) scale(1.01)`
          })
        })
        ticking = false
      })
      ticking = true
    }
  })
}

/* ========================================
   SMOOTH SCROLL
   ======================================== */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href")
      if (href === "#") return

      e.preventDefault()
      const target = document.querySelector(href)

      if (target) {
        const navHeight = document.querySelector(".header")?.offsetHeight || 80
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse?.classList.contains("show")) {
          const Collapse = window.bootstrap.Collapse
          new Collapse(navbarCollapse).hide()
        }
      }
    })
  })
}

/* ========================================
   BUTTON EFFECTS
   ======================================== */

function initButtonEffects() {
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)"
    })
    btn.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
    })
  })
}

/* ========================================
   FORM HANDLING
   ======================================== */

function initForms() {
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()
      alert("Obrigado por sua mensagem! Responderemos em breve.")
      contactForm.reset()
    })
  }
}

/* ========================================
   ADMIN PANEL
   ======================================== */

let classModalInstance, childModalInstance

function initAdmin() {
  const loginSection = document.getElementById("loginSection")
  const dashboardSection = document.getElementById("dashboardSection")

  if (!loginSection || !dashboardSection) return

  const auth = getAuth()

  if (auth.logged) {
    showDashboard(auth.user)
  } else {
    initLoginForm()
  }

  classModalInstance = new window.bootstrap.Modal(
    document.getElementById("classModal") || document.createElement("div"),
  )
  childModalInstance = new window.bootstrap.Modal(
    document.getElementById("childModal") || document.createElement("div"),
  )

  const logoutBtn = document.getElementById("logoutBtn")
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      clearAuth()
      window.location.href = "index.html"
    })
  }
}

function initLoginForm() {
  const loginForm = document.getElementById("loginForm")
  if (!loginForm) return

  loginForm.addEventListener("submit", (e) => {
    e.preventDefault()
    const username = document.getElementById("username")?.value.trim()
    const password = document.getElementById("password")?.value.trim()

    if (username && password) {
      setAuth({ name: username, role: "Administrador(a)" })
      showDashboard({ name: username, role: "Administrador(a)" })
    } else {
      alert("Por favor, informe usuário e senha.")
    }
  })
}

function showDashboard(user) {
  const loginSection = document.getElementById("loginSection")
  const dashboardSection = document.getElementById("dashboardSection")

  if (loginSection) loginSection.classList.add("d-none")
  if (dashboardSection) dashboardSection.classList.remove("d-none")

  const welcomeAdmin = document.getElementById("welcomeAdmin")
  if (welcomeAdmin) {
    const gender = user.name?.includes("a") || user.role?.includes("a") ? "a" : "o"
    welcomeAdmin.textContent = `Bem-vind${gender}, ${user.name}!`
  }

  initDashboard()
}

function initDashboard() {
  const data = loadData()
  const classSelect = document.getElementById("classSelect")
  const childrenBody = document.getElementById("childrenBody")
  const searchChild = document.getElementById("searchChild")
  const emptyState = document.getElementById("emptyState")

  if (!classSelect || !childrenBody) return

  classSelect.innerHTML = ""
  data.classes.forEach((cls) => {
    const option = document.createElement("option")
    option.value = cls.id
    option.textContent = cls.name
    classSelect.appendChild(option)
  })

  function renderChildren() {
    const currentClass = classSelect.value
    const searchTerm = (searchChild?.value || "").toLowerCase()

    const filtered = data.children.filter(
      (child) => child.classId === currentClass && child.name.toLowerCase().includes(searchTerm),
    )

    childrenBody.innerHTML = ""

    if (filtered.length === 0) {
      if (emptyState) emptyState.classList.remove("d-none")
      return
    }

    if (emptyState) emptyState.classList.add("d-none")

    filtered.forEach((child) => {
      const tr = document.createElement("tr")

      // Name
      const tdName = document.createElement("td")
      tdName.innerHTML = `<strong>${child.name}</strong>`
      tr.appendChild(tdName)

      // Status
      const tdStatus = document.createElement("td")
      const chip = document.createElement("span")
      chip.className = `chip mb-2 ${child.status === "present" ? "chip--present" : "chip--absent"}`
      chip.textContent = child.status === "present" ? "✓ Presente" : "✗ Ausente"

      const select = document.createElement("select")
      select.className = "form-select form-select-sm rounded-2 mt-2"
      select.innerHTML = `<option value="present">Presente</option><option value="absent">Ausente</option>`
      select.value = child.status || "absent"

      select.addEventListener("change", () => {
        child.status = select.value
        chip.className = `chip mb-2 ${child.status === "present" ? "chip--present" : "chip--absent"}`
        chip.textContent = child.status === "present" ? "✓ Presente" : "✗ Ausente"
        saveData(data)
      })

      tdStatus.appendChild(chip)
      tdStatus.appendChild(document.createElement("br"))
      tdStatus.appendChild(select)
      tr.appendChild(tdStatus)

      // Notes
      const tdNotes = document.createElement("td")
      const notes = document.createElement("textarea")
      notes.className = "form-control form-control-sm rounded-2"
      notes.rows = 2
      notes.placeholder = "Observações..."
      notes.value = child.notes || ""
      notes.addEventListener("change", () => {
        child.notes = notes.value
        saveData(data)
      })
      tdNotes.appendChild(notes)
      tr.appendChild(tdNotes)

      // Early Pickup
      const tdEarly = document.createElement("td")
      const earlyCheckbox = document.createElement("input")
      earlyCheckbox.type = "checkbox"
      earlyCheckbox.className = "form-check-input"
      earlyCheckbox.checked = !!child.earlyPickup

      const earlyTime = document.createElement("input")
      earlyTime.type = "time"
      earlyTime.className = "form-control form-control-sm rounded-2 mt-2"
      earlyTime.value = child.earlyPickup?.time || ""
      earlyTime.disabled = !earlyCheckbox.checked

      earlyCheckbox.addEventListener("change", () => {
        if (earlyCheckbox.checked) {
          child.earlyPickup = { time: earlyTime.value || "", by: "" }
          earlyTime.disabled = false
        } else {
          child.earlyPickup = null
          earlyTime.disabled = true
        }
        saveData(data)
        renderChildren()
      })

      earlyTime.addEventListener("change", () => {
        if (child.earlyPickup) {
          child.earlyPickup.time = earlyTime.value
          saveData(data)
        }
      })

      tdEarly.appendChild(earlyCheckbox)
      tdEarly.appendChild(document.createElement("br"))
      tdEarly.appendChild(earlyTime)
      tr.appendChild(tdEarly)

      // Authorized
      const tdAuth = document.createElement("td")
      const authSelect = document.createElement("select")
      authSelect.className = "form-select form-select-sm rounded-2"
      authSelect.innerHTML = `<option value="">Selecionar</option>`
      ;(child.authorized || []).forEach((person) => {
        const opt = document.createElement("option")
        opt.value = person
        opt.textContent = person
        authSelect.appendChild(opt)
      })

      authSelect.value = child.earlyPickup?.by || ""
      authSelect.addEventListener("change", () => {
        if (!earlyCheckbox.checked) {
          alert("Marque a retirada antecipada e defina a hora antes.")
          authSelect.value = ""
          return
        }
        child.earlyPickup = child.earlyPickup || { time: earlyTime.value || "", by: "" }
        child.earlyPickup.by = authSelect.value
        saveData(data)
      })

      tdAuth.appendChild(authSelect)
      tr.appendChild(tdAuth)

      // Actions
      const tdActions = document.createElement("td")
      const saveBtn = document.createElement("button")
      saveBtn.className = "btn btn-sm btn-primary rounded-2 me-1"
      saveBtn.textContent = "Salvar"
      saveBtn.addEventListener("click", () => {
        saveData(data)
        saveBtn.textContent = "✓ Salvo"
        setTimeout(() => (saveBtn.textContent = "Salvar"), 1500)
      })

      const clearBtn = document.createElement("button")
      clearBtn.className = "btn btn-sm btn-outline-secondary rounded-2"
      clearBtn.textContent = "Limpar"
      clearBtn.addEventListener("click", () => {
        child.earlyPickup = null
        saveData(data)
        renderChildren()
      })

      tdActions.appendChild(saveBtn)
      tdActions.appendChild(clearBtn)
      tr.appendChild(tdActions)

      childrenBody.appendChild(tr)
    })
  }

  classSelect.addEventListener("change", renderChildren)
  if (searchChild) searchChild.addEventListener("input", renderChildren)
  classSelect.value = data.classes[0]?.id || ""
  renderChildren()

  // Add Class
  const addClassBtn = document.getElementById("addClassBtn")
  if (addClassBtn) {
    addClassBtn.addEventListener("click", () => {
      const input = document.getElementById("classNameInput")
      if (input) input.value = ""
      classModalInstance?.show()
    })
  }

  const saveClassBtn = document.getElementById("saveClassBtn")
  if (saveClassBtn) {
    saveClassBtn.addEventListener("click", () => {
      const name = document.getElementById("classNameInput")?.value.trim()
      if (!name) {
        alert("Informe o nome da turma.")
        return
      }
      if (data.classes.some((c) => c.name === name)) {
        alert("Turma já existe.")
        return
      }
      data.classes.push({ id: "c" + Date.now(), name })
      saveData(data)
      classModalInstance?.hide()
      initDashboard()
    })
  }

  // Add Child
  const addChildBtn = document.getElementById("addChildBtn")
  if (addChildBtn) {
    addChildBtn.addEventListener("click", () => {
      const childClassSelect = document.getElementById("childClassSelect")
      if (childClassSelect) {
        childClassSelect.innerHTML = ""
        data.classes.forEach((cls) => {
          const opt = document.createElement("option")
          opt.value = cls.id
          opt.textContent = cls.name
          childClassSelect.appendChild(opt)
        })
      }
      const inputs = [document.getElementById("childNameInput"), document.getElementById("childAuthorizedInput")]
      inputs.forEach((input) => {
        if (input) input.value = ""
      })
      childModalInstance?.show()
    })
  }

  const saveChildBtn = document.getElementById("saveChildBtn")
  if (saveChildBtn) {
    saveChildBtn.addEventListener("click", () => {
      const name = document.getElementById("childNameInput")?.value.trim()
      const classId = document.getElementById("childClassSelect")?.value
      const authorizedRaw = document.getElementById("childAuthorizedInput")?.value.trim()

      if (!name || !classId) {
        alert("Informe o nome e a turma.")
        return
      }

      const authorized = authorizedRaw
        ? authorizedRaw
            .split(/;|\n/)
            .map((s) => s.trim())
            .filter(Boolean)
        : []

      data.children.push({
        id: "c" + Date.now(),
        name,
        classId,
        status: "absent",
        notes: "",
        earlyPickup: null,
        authorized,
      })

      saveData(data)
      childModalInstance?.hide()
      initDashboard()
    })
  }
}

/* ========================================
   INITIALIZATION
   ======================================== */

document.addEventListener("DOMContentLoaded", () => {
  initLazyLoading()
  initScrollReveal()
  initParallax()
  initSmoothScroll()
  initButtonEffects()
  initForms()

  if (document.getElementById("dashboardSection")) {
    initAdmin()
  }
})

window.addEventListener("load", () => {
  initLazyLoading()
  initScrollReveal()
})
