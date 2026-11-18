// Barbearia BruninDucorte — site estático, sem back-end.
// Os agendamentos ficam salvos neste navegador (localStorage) e o painel
// admin/ lê os mesmos dados. Não há cobrança de sinal nem Pix: o pagamento
// é só na barbearia.

var WHATS_BARBEARIA = "5511986407967";
var STORAGE_AGENDAMENTOS = "brunin:agendamentos";

var SERVICOS = [
  { id: "corte", nome: "Corte", preco: 40, minutos: 28, detalhe: "Degradê, social, tesoura", img: "images/corte-1.jpg" },
  { id: "pigmentacao", nome: "Pigmentação", preco: 30, minutos: 20, detalhe: "", img: "images/corte-2.jpg" },
  { id: "selagem", nome: "Selagem", preco: 50, minutos: 20, detalhe: "", img: "images/corte-3.jpg" },
  { id: "penteado", nome: "Penteado", preco: 20, minutos: 15, detalhe: "Dimil, selado, mandrake, bonezinho", img: "images/penteado.jpg", icone: "penteado" },
  { id: "barba", nome: "Barba", preco: 30, minutos: 15, detalhe: "", img: "images/corte-4.jpg" },
  { id: "corte-barba", nome: "Corte+Barba", preco: 60, minutos: 45, detalhe: "", img: "images/corte-1.jpg" },
  { id: "sobrancelha", nome: "Sobrancelha", preco: 10, minutos: 1, detalhe: "", img: "images/corte-2.jpg", icone: "sobrancelha" },
  { id: "bigode", nome: "Bigode", preco: 5, minutos: 1, detalhe: "", img: "images/corte-3.jpg", icone: "bigode" },
  { id: "progressiva", nome: "Progressiva", preco: 80, minutos: 29, detalhe: "", img: "images/corte-4.jpg" },
  { id: "luzes", nome: "Luzes", preco: 80, minutos: 59, detalhe: "", img: "images/corte-1.jpg" },
  { id: "platinado", nome: "Platinado", preco: 100, minutos: 60, detalhe: "", img: "images/corte-2.jpg" },
  { id: "alisamento", nome: "Alisamento", preco: 30, minutos: 15, detalhe: "", img: "images/corte-3.jpg" },
  { id: "hidratacao", nome: "Hidratação", preco: 15, minutos: 15, detalhe: "", img: "images/corte-4.jpg" },
  { id: "pezinho", nome: "Pezinho", preco: 15, minutos: 10, detalhe: "", img: "images/corte-1.jpg" },
  { id: "corte-barba-sobrancelha", nome: "Corte+Barba+Sobrancelha", preco: 70, minutos: 50, detalhe: "", img: "images/corte-2.jpg" }
];

var PROFISSIONAIS = [
  { id: "brunin", nome: "BruninDucorte", papel: "Dono · Cortes e visagismo", inicial: "B" },
  { id: "karl", nome: "Karl", papel: "Especialista em corte degradê", inicial: "K" },
  { id: "tz", nome: "TZ Barbeiro", papel: "Cortes, barba e penteados", inicial: "T" }
];

var ICONES = {
  bigode: '<svg class="icone-bigode" viewBox="0 0 32 16" aria-hidden="true"><path d="M2 8 C6 2 12 2 16 7 C20 2 26 2 30 8 C26 13 20 13 16 9 C12 13 6 13 2 8 Z" fill="#ffc400"/></svg>',
  sobrancelha: '<svg class="icone-sobrancelha" viewBox="0 0 32 16" aria-hidden="true"><path d="M4 12 Q16 2 28 11" stroke="#ffc400" stroke-width="3" fill="none" stroke-linecap="round"/></svg>',
  penteado: '<svg class="icone-penteado" viewBox="0 0 32 16" aria-hidden="true"><path d="M3 13 Q6 3 14 4 Q22 5 29 12 Q20 9 14 9 Q7 9 3 13 Z" fill="#ffc400"/></svg>'
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
      '<img src="' + s.img + '" alt="' + s.nome + '" />' +
      '<span class="servico-corpo">' +
      '<span class="servico-nome">' + s.nome + "</span><br />" +
      '<span class="servico-preco">' + brl(s.preco) + '</span> <span class="servico-tempo">· ' + s.minutos + " min</span>" +
      detalhe + icone +
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

  if (estado.passo === 1) {
    html += '<p class="passo-titulo">1 · Escolha o serviço</p><div class="opcoes">';
    SERVICOS.forEach(function (s) {
      html += '<button class="opcao' + (estado.servico === s.id ? " selecionado" : "") + '" data-escolher-servico="' + s.id + '">' + s.nome + " — " + brl(s.preco) + " · " + s.minutos + " min</button>";
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
      document.querySelectorAll(".card-servico").forEach(function (c) {
        c.classList.toggle("selecionado", c.getAttribute("data-servico") === estado.servico);
      });
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
