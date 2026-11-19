// Barbearia BruninDucorte — site estático, sem back-end.
// Os agendamentos ficam salvos neste navegador (localStorage) e o painel
// admin/ lê os mesmos dados. Não há cobrança de sinal nem Pix: o pagamento
// é só na barbearia.
//
// Interação a cada clique: cada serviço tem foto própria (img) e um ícone SVG
// próprio (icone) que anima ao clicar/selecionar — a animação é definida em
// styles.css e escolhida por --anim em cada ícone (ver ICONES).

var WHATS_BARBEARIA = "5511986407967";
var STORAGE_AGENDAMENTOS = "brunin:agendamentos";

var SERVICOS = [
  { id: "corte", nome: "Corte", preco: 40, minutos: 28, detalhe: "Degradê, social, tesoura", img: "images/corte-1.jpg", icone: "tesoura" },
  { id: "pigmentacao", nome: "Pigmentação", preco: 30, minutos: 20, detalhe: "", img: "images/corte-2.jpg", icone: "pigmento" },
  { id: "selagem", nome: "Selagem", preco: 50, minutos: 20, detalhe: "", img: "images/corte-3.jpg", icone: "brilho" },
  { id: "penteado", nome: "Penteado", preco: 20, minutos: 15, detalhe: "Dimil, selado, mandrake, bonezinho", img: "images/penteado.jpg", icone: "pente" },
  { id: "barba", nome: "Barba", preco: 30, minutos: 15, detalhe: "", img: "images/corte-4.jpg", icone: "navalha" },
  { id: "corte-barba", nome: "Corte+Barba", preco: 60, minutos: 45, detalhe: "", img: "images/corte-1.jpg", icone: "combo" },
  { id: "sobrancelha", nome: "Sobrancelha", preco: 10, minutos: 1, detalhe: "", img: "images/corte-2.jpg", icone: "sobrancelha" },
  { id: "bigode", nome: "Bigode", preco: 5, minutos: 1, detalhe: "", img: "images/corte-3.jpg", icone: "bigode" },
  { id: "progressiva", nome: "Progressiva", preco: 80, minutos: 29, detalhe: "", img: "images/corte-4.jpg", icone: "chapinha" },
  { id: "luzes", nome: "Luzes", preco: 80, minutos: 59, detalhe: "", img: "images/corte-1.jpg", icone: "luzes" },
  { id: "platinado", nome: "Platinado", preco: 100, minutos: 60, detalhe: "", img: "images/corte-2.jpg", icone: "platinado" },
  { id: "alisamento", nome: "Alisamento", preco: 30, minutos: 15, detalhe: "", img: "images/corte-3.jpg", icone: "alisamento" },
  { id: "hidratacao", nome: "Hidratação", preco: 15, minutos: 15, detalhe: "", img: "images/corte-4.jpg", icone: "gota" },
  { id: "pezinho", nome: "Pezinho", preco: 15, minutos: 10, detalhe: "", img: "images/corte-1.jpg", icone: "pezinho" },
  { id: "corte-barba-sobrancelha", nome: "Corte+Barba+Sobrancelha", preco: 70, minutos: 50, detalhe: "", img: "images/corte-2.jpg", icone: "combo3" }
];

var PROFISSIONAIS = [
  { id: "brunin", nome: "BruninDucorte", papel: "Dono · Cortes e visagismo", inicial: "B" },
  { id: "karl", nome: "Karl", papel: "Especialista em corte degradê", inicial: "K" },
  { id: "tz", nome: "TZ Barbeiro", papel: "Cortes, barba e penteados", inicial: "T" }
];

// Ícones SVG de cada serviço (stroke/fill em currentColor: a cor vem do CSS).
// --anim diz qual keyframe de styles.css anima o ícone ao clicar/selecionar.
var ICONES = {
  tesoura: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--anim:anim-tesoura" aria-hidden="true"><circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M8.2 7.6 20 19M8.2 16.4 20 5"/></svg>',
  pigmento: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--anim:anim-pigmento" aria-hidden="true"><path d="M12 3c3.4 3.9 5.8 6.8 5.8 9.8a5.8 5.8 0 1 1-11.6 0C6.2 9.8 8.6 6.9 12 3z"/><circle cx="12" cy="13.5" r="2" fill="currentColor" stroke="none"/></svg>',
  brilho: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--anim:anim-brilho" aria-hidden="true"><path d="M12 3l1.7 5.1L19 9.8l-5.3 1.7L12 16.6l-1.7-5.1L5 9.8l5.3-1.7z"/><path d="M18.6 15.2l.7 1.9 1.9.7-1.9.7-.7 1.9-.7-1.9-1.9-.7 1.9-.7z"/></svg>',
  pente: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--anim:anim-pente" aria-hidden="true"><path d="M4 4h16v4H4z"/><path d="M6.5 8v5M10 8v7M13.5 8v7M17 8v5M20 8v3"/></svg>',
  navalha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--anim:anim-navalha" aria-hidden="true"><path d="M3.5 20.5 15 9l3.5-3.5L21 8l-3.5 3.5L6 20.5z"/><path d="M15 9l3-3"/></svg>',
  combo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--anim:anim-combo" aria-hidden="true"><circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><path d="M8.2 7.6 20 19M8.2 16.4 20 5"/><path d="M19.5 2.5l.6 1.6 1.6.6-1.6.6-.6 1.6-.6-1.6-1.6-.6 1.6-.6z"/></svg>',
  sobrancelha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" style="--anim:anim-sobrancelha" aria-hidden="true"><path d="M3 15 Q12 6 21 14"/></svg>',
  bigode: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--anim:anim-bigode" aria-hidden="true"><path d="M2 9 C6 3.5 11.5 3.5 12 8 C12.5 3.5 18 3.5 22 9 C18.5 13.5 13.5 13.5 12 9.5 C10.5 13.5 5.5 13.5 2 9 Z" fill="currentColor" stroke="none"/></svg>',
  chapinha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--anim:anim-chapinha" aria-hidden="true"><path d="M8 3h8v18H8z"/><path d="M12 3v18"/><path d="M9.5 21h5"/></svg>',
  luzes: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--anim:anim-luzes" aria-hidden="true"><path d="M12 3v3.5M12 17.5V21M3 12h3.5M17.5 12H21"/><path d="M5.6 5.6l2.5 2.5M15.9 15.9l2.5 2.5M18.4 5.6l-2.5 2.5M8.1 15.9l-2.5 2.5"/></svg>',
  platinado: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--anim:anim-platinado" aria-hidden="true"><circle cx="12" cy="12" r="3.6"/><path d="M12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5M5 5l1.8 1.8M17.2 17.2 19 19M19 5l-1.8 1.8M6.8 17.2 5 19"/></svg>',
  alisamento: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--anim:anim-alisamento" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  gota: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--anim:anim-gota" aria-hidden="true"><path d="M12 3c3.4 3.9 5.8 6.8 5.8 9.8a5.8 5.8 0 1 1-11.6 0C6.2 9.8 8.6 6.9 12 3z"/><path d="M9.5 13.5a2.8 2.8 0 0 0 2 3.4"/></svg>',
  pezinho: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--anim:anim-pezinho" aria-hidden="true"><path d="M3 18h18"/><path d="M8 18l1.5-6h5L16 18"/><path d="M12 12V4"/></svg>',
  combo3: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="--anim:anim-combo3" aria-hidden="true"><circle cx="6" cy="5" r="2"/><circle cx="6" cy="13" r="2"/><path d="M7.6 6.4 17 14M7.6 12.4 17 5"/><path d="M4 20 Q12 15.5 20 20"/></svg>'
};

function brl(valor) {
  return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function servicoPorId(id) {
  for (var i = 0; i < SERVICOS.length; i++) if (SERVICOS[i].id === id) return SERVICOS[i];
  return null;
}

function profissionalPorId(id) {
  for (var i = 0; i < PROFISSIONAIS.length; i++) if (PROFISSIONAIS[i].id === id) return PROFISSIONAIS[i];
  return null;
}

function hojeISO() {
  var d = new Date();
  function p(n) { return String(n).padStart(2, "0"); }
  return d.getFullYear() + "-" + p(d.getMonth() + 1) + "-" + p(d.getDate());
}

function dataBR(iso) {
  var partes = iso.split("-");
  return partes[2] + "/" + partes[1] + "/" + partes[0];
}

function subtrairMinutos(hhmm, minutos) {
  var partes = hhmm.split(":");
  var total = Number(partes[0]) * 60 + Number(partes[1]) - minutos;
  if (total < 0) total += 1440;
  function p(n) { return String(n).padStart(2, "0"); }
  return p(Math.floor(total / 60)) + ":" + p(total % 60);
}

function carregarAgendamentos() {
  try { return JSON.parse(localStorage.getItem(STORAGE_AGENDAMENTOS) || "[]"); }
  catch (e) { return []; }
}

function salvarAgendamentos(lista) {
  try { localStorage.setItem(STORAGE_AGENDAMENTOS, JSON.stringify(lista)); }
  catch (e) { /* armazenamento indisponível: segue sem salvar */ }
}

function copiarTexto(texto, botao) {
  function pronto() {
    botao.textContent = "Copiado!";
    setTimeout(function () { botao.textContent = "Copiar texto"; }, 1500);
  }
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(texto).then(pronto, function () { copiarFallback(texto, pronto); });
  } else {
    copiarFallback(texto, pronto);
  }
}

function copiarFallback(texto, pronto) {
  var area = document.createElement("textarea");
  area.value = texto;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  try { document.execCommand("copy"); pronto(); }
  catch (e) { /* sem permissão de cópia */ }
  document.body.removeChild(area);
}

// ---------- Grade de serviços ----------
function renderServicos() {
  var grade = document.getElementById("servicos-grade");
  if (!grade) return;
  var html = "";
  SERVICOS.forEach(function (s) {
    var icone = s.icone ? '<span class="servico-icone">' + ICONES[s.icone] + "</span>" : "";
    var detalhe = s.detalhe ? '<p class="servico-detalhe">' + s.detalhe + "</p>" : "";
    html += '<button class="card-servico" data-servico="' + s.id + '">' +
      '<span class="servico-foto"><img src="' + s.img + '" alt="' + s.nome + '" />' + icone + "</span>" +
      '<span class="servico-corpo">' +
      '<span class="servico-nome">' + s.nome + "</span>" +
      '<span class="servico-linha"><span class="servico-preco">' + brl(s.preco) + '</span> <span class="servico-tempo">' + s.minutos + " min</span></span>" +
      detalhe +
      "</span></button>";
  });
  grade.innerHTML = html;
  grade.querySelectorAll("[data-servico]").forEach(function (botao) {
    botao.addEventListener("click", function () {
      selecionarServico(botao.getAttribute("data-servico"), botao);
    });
  });
}

function selecionarServico(id, cartao) {
  estado.servico = id;
  document.querySelectorAll(".card-servico").forEach(function (c) {
    c.classList.toggle("selecionado", c.getAttribute("data-servico") === id);
  });
  if (cartao) {
    cartao.classList.add("mexer");
    setTimeout(function () { cartao.classList.remove("mexer"); }, 800);
  }
  estado.passo = proximoPassoPendente();
  renderWizard();
  document.getElementById("agendar").scrollIntoView({ behavior: "smooth" });
}

// ---------- Agendamento em 5 passos ----------
var estado = { passo: 1, servico: null, profissional: null, data: "", horario: "", nome: "", whatsapp: "" };

function passoCompleto(n) {
  if (n === 1) return !!estado.servico;
  if (n === 2) return !!estado.profissional;
  if (n === 3) return !!estado.data && estado.data >= hojeISO();
  if (n === 4) return !!estado.horario;
  if (n === 5) return estado.nome.trim().length > 1 && estado.whatsapp.replace(/\D/g, "").length >= 8;
  return false;
}

function proximoPassoPendente() {
  for (var n = 1; n <= 5; n++) if (!passoCompleto(n)) return n;
  return 5;
}

function horariosDisponiveis() {
  var lista = [];
  for (var h = 9; h <= 19; h++) {
    [0, 30].forEach(function (m) {
      if (h === 19 && m === 30) return;
      lista.push(String(h).padStart(2, "0") + ":" + String(m).padStart(2, "0"));
    });
  }
  return lista;
}

function renderPassos() {
  document.querySelectorAll("#passos li").forEach(function (li) {
    var n = Number(li.getAttribute("data-passo"));
    li.classList.toggle("ativo", n === estado.passo);
    li.classList.toggle("concluido", n < estado.passo || (n !== estado.passo && passoCompleto(n)));
  });
}

function renderWizard() {
  var wizard = document.getElementById("wizard");
  if (!wizard) return;
  renderPassos();
  var html = "";
  var servico = servicoPorId(estado.servico);
  var profissional = profissionalPorId(estado.profissional);

  // Prévia do serviço escolhido: a foto aparece junto com o ícone animado.
  if (servico) {
    var iconeDestaque = servico.icone ? '<span class="servico-icone">' + ICONES[servico.icone] + "</span>" : "";
    var detalheDestaque = servico.detalhe ? '<span class="destaque-detalhe">' + servico.detalhe + "</span>" : "";
    html += '<div class="servico-destaque">' +
      '<img src="' + servico.img + '" alt="' + servico.nome + '" />' + iconeDestaque +
      '<div class="destaque-info"><strong>' + servico.nome + "</strong>" +
      "<span>" + brl(servico.preco) + " · " + servico.minutos + " min" + (profissional ? " · com " + profissional.nome : "") + "</span>" +
      detalheDestaque + "</div>" +
      '<button type="button" id="btn-trocar-servico">Trocar serviço</button></div>';
  }

  if (estado.passo === 1) {
    html += '<p class="passo-titulo">1 · Escolha o serviço</p><div class="opcoes">';
    SERVICOS.forEach(function (s) {
      var iconeOpcao = s.icone ? '<span class="opcao-icone">' + ICONES[s.icone] + "</span>" : "";
      html += '<button class="opcao' + (estado.servico === s.id ? " selecionado" : "") + '" data-escolher-servico="' + s.id + '">' + iconeOpcao + s.nome + " — " + brl(s.preco) + " · " + s.minutos + " min</button>";
    });
    html += "</div>";
  } else if (estado.passo === 2) {
    html += '<p class="passo-titulo">2 · Escolha o profissional</p><div class="opcoes">';
    PROFISSIONAIS.forEach(function (p) {
      html += '<button class="opcao' + (estado.profissional === p.id ? " selecionado" : "") + '" data-escolher-profissional="' + p.id + '">' + p.nome + " — " + p.papel + "</button>";
    });
    html += "</div>";
  } else if (estado.passo === 3) {
    html += '<p class="passo-titulo">3 · Escolha a data</p>' +
      '<div class="campo"><label for="campo-data">Data do atendimento</label>' +
      '<input type="date" id="campo-data" min="' + hojeISO() + '" value="' + estado.data + '" /></div>' +
      '<p class="nota">Segunda a sábado, 9h às 20h.</p>';
  } else if (estado.passo === 4) {
    html += '<p class="passo-titulo">4 · Escolha o horário</p><div class="opcoes">';
    horariosDisponiveis().forEach(function (hora) {
      html += '<button class="opcao' + (estado.horario === hora ? " selecionado" : "") + '" data-escolher-horario="' + hora + '">' + hora + "</button>";
    });
    html += "</div>";
    if (servico) html += '<p class="nota">O horário é a hora de chegada; o serviço dura ' + servico.minutos + " min.</p>";
  } else {
    html += '<p class="passo-titulo">5 · Seus dados</p>';
    html += '<div class="resumo"><p><strong>Serviço:</strong> ' + (servico ? servico.nome + " — " + brl(servico.preco) + " · " + servico.minutos + " min" : "—") + "</p>" +
      "<p><strong>Profissional:</strong> " + (profissional ? profissional.nome : "—") + "</p>" +
      "<p><strong>Data:</strong> " + (estado.data ? dataBR(estado.data) : "—") + "</p>" +
      "<p><strong>Horário:</strong> " + (estado.horario || "—") + "</p></div>";
    html += '<div class="campo"><label for="campo-nome">Seu nome</label>' +
      '<input type="text" id="campo-nome" placeholder="Ex.: Carlos Silva" value="' + estado.nome.replace(/"/g, "&quot;") + '" /></div>' +
      '<div class="campo"><label for="campo-whats">Seu WhatsApp</label>' +
      '<input type="tel" id="campo-whats" placeholder="Ex.: (11) 98640-7967" value="' + estado.whatsapp.replace(/"/g, "&quot;") + '" /></div>' +
      '<p class="nota">Sem sinal — o pagamento é só na barbearia.</p>';
  }

  html += '<div class="wizard-nav">';
  if (estado.passo > 1) html += '<button class="btn-voltar" id="btn-voltar">Voltar</button>';
  if (estado.passo < 5) {
    html += '<button class="btn-continuar" id="btn-continuar"' + (passoCompleto(estado.passo) ? "" : " disabled") + ">Continuar</button>";
  } else {
    html += '<button class="btn-continuar" id="btn-confirmar"' + (passoCompleto(5) ? "" : " disabled") + ">Confirmar agendamento</button>";
  }
  html += "</div>";
  wizard.innerHTML = html;

  wizard.querySelectorAll("[data-escolher-servico]").forEach(function (b) {
    b.addEventListener("click", function () {
      estado.servico = b.getAttribute("data-escolher-servico");
      var cartao = document.querySelector('[data-servico="' + estado.servico + '"]');
      document.querySelectorAll(".card-servico").forEach(function (c) {
        c.classList.toggle("selecionado", c.getAttribute("data-servico") === estado.servico);
      });
      if (cartao) {
        cartao.classList.add("mexer");
        setTimeout(function () { cartao.classList.remove("mexer"); }, 800);
      }
      renderWizard();
    });
  });
  wizard.querySelectorAll("[data-escolher-profissional]").forEach(function (b) {
    b.addEventListener("click", function () {
      estado.profissional = b.getAttribute("data-escolher-profissional");
      renderWizard();
    });
  });
  wizard.querySelectorAll("[data-escolher-horario]").forEach(function (b) {
    b.addEventListener("click", function () {
      estado.horario = b.getAttribute("data-escolher-horario");
      renderWizard();
    });
  });
  var campoData = document.getElementById("campo-data");
  if (campoData) campoData.addEventListener("change", function () { estado.data = campoData.value; renderWizard(); });
  var campoNome = document.getElementById("campo-nome");
  if (campoNome) campoNome.addEventListener("input", function () { estado.nome = campoNome.value; atualizarConfirmar(); });
  var campoWhats = document.getElementById("campo-whats");
  if (campoWhats) campoWhats.addEventListener("input", function () { estado.whatsapp = campoWhats.value; atualizarConfirmar(); });
  var btnTrocar = document.getElementById("btn-trocar-servico");
  if (btnTrocar) btnTrocar.addEventListener("click", function () { estado.passo = 1; renderWizard(); });
  var btnVoltar = document.getElementById("btn-voltar");
  if (btnVoltar) btnVoltar.addEventListener("click", function () { estado.passo = Math.max(1, estado.passo - 1); renderWizard(); });
  var btnContinuar = document.getElementById("btn-continuar");
  if (btnContinuar) btnContinuar.addEventListener("click", function () { estado.passo = Math.min(5, estado.passo + 1); renderWizard(); });
  var btnConfirmar = document.getElementById("btn-confirmar");
  if (btnConfirmar) btnConfirmar.addEventListener("click", confirmarAgendamento);
}

function atualizarConfirmar() {
  var botao = document.getElementById("btn-confirmar");
  if (botao) botao.disabled = !passoCompleto(5);
}

function confirmarAgendamento() {
  if (!passoCompleto(5)) return;
  var servico = servicoPorId(estado.servico);
  var profissional = profissionalPorId(estado.profissional);
  var agendamento = {
    id: "ag-" + Date.now(),
    servicoId: servico.id,
    servicoNome: servico.nome,
    preco: servico.preco,
    minutos: servico.minutos,
    profissionalId: profissional.id,
    profissionalNome: profissional.nome,
    data: estado.data,
    horario: estado.horario,
    nome: estado.nome.trim(),
    whatsapp: estado.whatsapp.trim(),
    criadoEm: new Date().toISOString()
  };
  var lista = carregarAgendamentos();
  lista.push(agendamento);
  salvarAgendamentos(lista);
  mostrarConfirmacao(agendamento);
}

function mostrarConfirmacao(a) {
  var wizard = document.getElementById("wizard");
  var confirmacao = document.getElementById("confirmacao");
  wizard.hidden = true;
  var msgConfirmacao = "Olá, Barbearia BruninDucorte! Sou " + a.nome + " e agendei " + a.servicoNome + " com " + a.profissionalNome + " no dia " + dataBR(a.data) + " às " + a.horario + ". Meu WhatsApp é " + a.whatsapp + ". Sem sinal, certo? Pagamento na barbearia. Valeu!";
  var msg2h = "Olá, " + a.nome + "! Passando para lembrar do seu horário na Barbearia BruninDucorte: " + a.servicoNome + " com " + a.profissionalNome + ", hoje (" + dataBR(a.data) + ") às " + a.horario + ". Te esperamos na Rua Rossini 37, Casa Grande, Diadema – SP. Qualquer coisa chama no (11) 98640-7967.";
  var msg30 = "Olá, " + a.nome + "! Seu horário na BruninDucorte é daqui a 30 minutinhos (" + a.horario + "). Já pode vir chegando — Rua Rossini 37, Casa Grande. Até já!";
  var linkWhats = "https://wa.me/" + WHATS_BARBEARIA + "?text=" + encodeURIComponent(msgConfirmacao);
  confirmacao.innerHTML =
    "<h3>Agendamento registrado!</h3>" +
    "<p><strong>" + a.servicoNome + "</strong> com " + a.profissionalNome + " · " + dataBR(a.data) + " às " + a.horario + " · " + brl(a.preco) + " · " + a.minutos + " min</p>" +
    "<p>Cliente: " + a.nome + " · WhatsApp: " + a.whatsapp + "</p>" +
    "<p><strong>Mensagem de confirmação (para enviar à barbearia):</strong></p>" +
    '<div class="msg-caixa" id="msg-confirmacao"></div>' +
    '<a class="btn-amarelo" href="' + linkWhats + '" target="_blank" rel="noopener">Enviar confirmação no WhatsApp</a> ' +
    '<button class="btn-copiar" data-copiar="msg-confirmacao">Copiar texto</button>' +
    "<p><strong>Lembretes para a barbearia enviar ao cliente (textos prontos, sem envio automático):</strong></p>" +
    "<p>2h antes — enviar às " + subtrairMinutos(a.horario, 120) + ":</p>" +
    '<div class="msg-caixa" id="msg-2h"></div>' +
    '<button class="btn-copiar" data-copiar="msg-2h">Copiar texto</button>' +
    "<p>30min antes — enviar às " + subtrairMinutos(a.horario, 30) + ":</p>" +
    '<div class="msg-caixa" id="msg-30min"></div>' +
    '<button class="btn-copiar" data-copiar="msg-30min">Copiar texto</button>' +
    '<p><button class="btn-escuro" id="btn-novo-agendamento">Fazer outro agendamento</button></p>';
  confirmacao.querySelector("#msg-confirmacao").textContent = msgConfirmacao;
  confirmacao.querySelector("#msg-2h").textContent = msg2h;
  confirmacao.querySelector("#msg-30min").textContent = msg30;
  confirmacao.querySelectorAll("[data-copiar]").forEach(function (b) {
    b.addEventListener("click", function () {
      copiarTexto(confirmacao.querySelector("#" + b.getAttribute("data-copiar")).textContent, b);
    });
  });
  confirmacao.querySelector("#btn-novo-agendamento").addEventListener("click", function () {
    estado = { passo: 1, servico: null, profissional: null, data: "", horario: "", nome: "", whatsapp: "" };
    document.querySelectorAll(".card-servico").forEach(function (c) { c.classList.remove("selecionado"); });
    confirmacao.hidden = true;
    confirmacao.innerHTML = "";
    wizard.hidden = false;
    renderWizard();
  });
  confirmacao.hidden = false;
  confirmacao.scrollIntoView({ behavior: "smooth" });
}

// ---------- Assistente BruninDucorte ----------
var OPCOES_RAPIDAS = ["Quero degradê", "Quero barba", "Quero penteado", "Quero clarear o cabelo", "Só aparar / pezinho"];

function normalizar(texto) {
  return texto.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function recomendarServico(texto) {
  var t = normalizar(texto);
  if (/platinado|loiro|clarear|descolor/.test(t)) return "platinado";
  if (/luzes|mechas/.test(t)) return "luzes";
  if (/progressiva/.test(t)) return "progressiva";
  if (/alisamento|alisar|escova/.test(t)) return "alisamento";
  if (/penteado|dimil|mandrake|selado|bonezinho|topete/.test(t)) return "penteado";
  if (/pigment/.test(t)) return "pigmentacao";
  if (/selagem/.test(t)) return "selagem";
  if (/hidrat/.test(t)) return "hidratacao";
  if (/sobrancelha/.test(t)) return "sobrancelha";
  if (/bigode/.test(t)) return "bigode";
  if (/pezinho|aparar|acabamento/.test(t)) return "pezinho";
  if (/barba/.test(t) && /corte/.test(t)) return "corte-barba";
  if (/barba/.test(t)) return "barba";
  if (/degrade|fade|corte/.test(t)) return "corte";
  return null;
}

function msgAssistente(texto, quem, servicoId) {
  var area = document.getElementById("assistente-mensagens");
  var div = document.createElement("div");
  div.className = "msg " + quem;
  div.textContent = texto;
  if (servicoId) {
    var s = servicoPorId(servicoId);
    var botao = document.createElement("button");
    botao.className = "btn-escuro";
    botao.textContent = "Agendar " + s.nome + " — " + brl(s.preco);
    botao.addEventListener("click", function () {
      fecharAssistente();
      selecionarServico(s.id, document.querySelector('[data-servico="' + s.id + '"]'));
    });
    div.appendChild(document.createElement("br"));
    div.appendChild(botao);
  }
  area.appendChild(div);
  area.scrollTop = area.scrollHeight;
}

function responderAssistente(texto) {
  msgAssistente(texto, "usuario");
  var id = recomendarServico(texto);
  if (id) {
    var s = servicoPorId(id);
    var detalhe = s.detalhe ? " · " + s.detalhe : "";
    msgAssistente("Para o que você quer, o ideal é " + s.nome + " — " + brl(s.preco) + " · " + s.minutos + " min" + detalhe + ". Quer agendar esse?", "bot", id);
  } else {
    msgAssistente("Não entendi bem — me diz de outro jeito ou toca numa opção abaixo que eu te indico o serviço certo.", "bot");
  }
}

function abrirAssistente() {
  var painel = document.getElementById("assistente");
  painel.hidden = false;
  var area = document.getElementById("assistente-mensagens");
  if (!area.hasChildNodes()) {
    msgAssistente("E aí! Sou o assistente BruninDucorte. Me diz o que você tá querendo hoje que eu te indico o serviço certo.", "bot");
    var opcoes = document.getElementById("assistente-opcoes");
    OPCOES_RAPIDAS.forEach(function (texto) {
      var b = document.createElement("button");
      b.className = "opcao";
      b.textContent = texto;
      b.addEventListener("click", function () { responderAssistente(texto); });
      opcoes.appendChild(b);
    });
  }
}

function fecharAssistente() {
  document.getElementById("assistente").hidden = true;
}

// ---------- Inicialização ----------
document.addEventListener("DOMContentLoaded", function () {
  var ano = document.getElementById("ano");
  if (ano) ano.textContent = new Date().getFullYear();
  renderServicos();
  renderWizard();
  document.querySelectorAll("[data-escolher-prof]").forEach(function (b) {
    b.addEventListener("click", function () {
      estado.profissional = b.getAttribute("data-escolher-prof");
      estado.passo = proximoPassoPendente();
      renderWizard();
      document.getElementById("agendar").scrollIntoView({ behavior: "smooth" });
    });
  });
  // Foto da Porsche: ao clicar, alterna zoom + brilho amarelo + revelação da legenda.
  document.querySelectorAll(".porsche-foto").forEach(function (foto) {
    foto.addEventListener("click", function () { foto.classList.toggle("ativo"); });
  });
  document.getElementById("assistente-botao").addEventListener("click", abrirAssistente);
  document.getElementById("assistente-fechar").addEventListener("click", fecharAssistente);
  document.getElementById("assistente-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var input = document.getElementById("assistente-input");
    var texto = input.value.trim();
    if (!texto) return;
    input.value = "";
    responderAssistente(texto);
  });
});
// ---------- Regras de reprodução dos vídeos (18/11/2026) ----------
// Herói: roda sempre, em loop, sem parar.
// Porsche (v1): roda só uma vez — ao chegar na seção do Bruninho e ao tocar no play. Sem loop.
document.addEventListener("DOMContentLoaded", function () {
  // Vídeo do herói: nunca pode parar — se pausar ou terminar, volta a tocar.
  var heroVideo = document.querySelector(".hero-video");
  if (heroVideo) {
    heroVideo.loop = true;
    heroVideo.muted = true;
    var tocarHeroi = function () {
      if (heroVideo.paused) {
        var p = heroVideo.play();
        if (p && p.catch) p.catch(function () {});
      }
    };
    var tentarHeroi = function () { tocarHeroi(); };
    heroVideo.addEventListener("pause", tocarHeroi);
    heroVideo.addEventListener("ended", tocarHeroi);
    heroVideo.addEventListener("play", function () {
      document.removeEventListener("pointerdown", tentarHeroi);
      document.removeEventListener("keydown", tentarHeroi);
    });
    document.addEventListener("pointerdown", tentarHeroi);
    document.addEventListener("keydown", tentarHeroi);
    document.addEventListener("visibilitychange", function () {
      if (!document.hidden) tocarHeroi();
    });
    tocarHeroi();
  }

  // Vídeo da Porsche (v1): sem loop; toca uma vez ao chegar na seção e ao tocar no play.
  var porscheVideo = document.querySelector(".porsche-video");
  if (porscheVideo) {
    porscheVideo.loop = false;
    porscheVideo.removeAttribute("loop");
    porscheVideo.removeAttribute("autoplay");
    var porscheTocou = false;
    var tocarPorsche = function (comSom) {
      if (comSom) porscheVideo.muted = false;
      if (porscheVideo.ended) porscheVideo.currentTime = 0;
      var p = porscheVideo.play();
      if (p && p.catch) p.catch(function () {});
      porscheTocou = true;
    };

    // Botão de play sobre o vídeo (tocar na tela).
    var midia = porscheVideo.parentElement;
    var capa = document.createElement("div");
    capa.className = "porsche-video-capa";
    midia.insertBefore(capa, porscheVideo);
    capa.appendChild(porscheVideo);
    var botaoPlay = document.createElement("button");
    botaoPlay.type = "button";
    botaoPlay.className = "porsche-play";
    botaoPlay.setAttribute("aria-label", "Assistir ao clipe da Porsche");
    botaoPlay.textContent = "▶";
    capa.appendChild(botaoPlay);
    var mostrarPlay = function (mostrar) {
      botaoPlay.hidden = !mostrar;
    };
    botaoPlay.addEventListener("click", function () {
      tocarPorsche(true);
    });
    porscheVideo.addEventListener("play", function () { mostrarPlay(false); });
    porscheVideo.addEventListener("pause", function () { mostrarPlay(true); });
    porscheVideo.addEventListener("ended", function () { mostrarPlay(true); });

    // Toca uma vez (sem som) quando a seção entra na tela.
    if ("IntersectionObserver" in window) {
      var observador = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting && !porscheTocou) {
            tocarPorsche(false);
            observador.disconnect();
          }
        });
      }, { threshold: 0.4 });
      observador.observe(porscheVideo);
    }
  }

  // Fotos do Sobre (Bruninho de perto e na moto): ao clicar, alterna zoom + brilho amarelo.
  document.querySelectorAll(".sobre-fotos img").forEach(function (foto) {
    foto.addEventListener("click", function () { foto.classList.toggle("ativo"); });
    foto.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        foto.classList.toggle("ativo");
      }
    });
  });
});
// ---------- Vídeo real "Um dia na Barbearia" (18/11/2026) ----------
// Toca COM SOM ao tocar no play. Sem loop, sem autoplay.
document.addEventListener("DOMContentLoaded", function () {
  var umDiaVideo = document.querySelector(".um-dia-video");
  if (umDiaVideo) {
    umDiaVideo.loop = false;
    umDiaVideo.removeAttribute("loop");
    umDiaVideo.removeAttribute("autoplay");
    umDiaVideo.removeAttribute("muted");
    umDiaVideo.muted = false;

    // Botão de play sobre o vídeo (tocar na tela).
    var midia = umDiaVideo.parentElement;
    var capa = document.createElement("div");
    capa.className = "um-dia-video-capa";
    midia.insertBefore(capa, umDiaVideo);
    capa.appendChild(umDiaVideo);
    var botaoPlay = document.createElement("button");
    botaoPlay.type = "button";
    botaoPlay.className = "um-dia-play";
    botaoPlay.setAttribute("aria-label", "Assistir ao vídeo Um dia na Barbearia, com som");
    botaoPlay.textContent = "▶";
    capa.appendChild(botaoPlay);
    var mostrarPlay = function (mostrar) {
      botaoPlay.hidden = !mostrar;
    };
    botaoPlay.addEventListener("click", function () {
      if (umDiaVideo.ended) umDiaVideo.currentTime = 0;
      var p = umDiaVideo.play();
      if (p && p.catch) p.catch(function () {});
    });
    umDiaVideo.addEventListener("play", function () { mostrarPlay(false); });
    umDiaVideo.addEventListener("pause", function () { mostrarPlay(true); });
    umDiaVideo.addEventListener("ended", function () { mostrarPlay(true); });
  }
});
/* ---------- Foto do Karl na escolha de profissional (18/11/2026) ---------- */
/* O Karl é o único profissional com foto: ela aparece na escolha de
   profissional do agendamento (passo 2) e na seção do time (index.html).
   Brunin e TZ continuam com a inicial. A foto fica num círculo com borda
   amarela sobre fundo neutro dark — o fundo claro da foto original fica
   dentro do círculo; para fundo realmente preto seria preciso editar a imagem. */
document.addEventListener("DOMContentLoaded", function () {
  var FOTO_KARL = "images/karl.jpg";
  function fotoOuInicial(p) {
    if (p.id === "karl") return '<img class="opcao-foto" src="' + FOTO_KARL + '" alt="Foto de Karl">';
    return '<span class="opcao-inicial">' + p.inicial + "</span>";
  }
  function decorarProfissionais() {
    var botoes = wizard.querySelectorAll("[data-escolher-profissional]");
    botoes.forEach(function (botao) {
      if (botao.querySelector(".opcao-foto, .opcao-inicial")) return;
      var p = profissionalPorId(botao.getAttribute("data-escolher-profissional"));
      if (!p) return;
      botao.insertAdjacentHTML("afterbegin", fotoOuInicial(p));
      botao.classList.add("opcao-prof");
    });
  }
  var renderWizardBase = renderWizard;
  renderWizard = function () {
    renderWizardBase();
    decorarProfissionais();
  };
  decorarProfissionais();
});
