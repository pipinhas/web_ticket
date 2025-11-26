// filas

let filaPrioridade = [];
let filaExame = [];
let filaGeral = [];

// contadores
let contP = 1;
let contE = 1;
let contG = 1;

// historico
let ultimasChamadas = [];

// capturar elementos

const senhaDaVez = document.querySelector(".senha_vez");
const listaChamadas = document.querySelector(".lista_senha");

const btnPrioridade = document.querySelector(".botao_sp");
const btnExame = document.querySelector(".botao_se");
const btnGeral = document.querySelector(".botao_sg");

const btnChamar = document.querySelector(".botao_iniciar");
const btnFinalizar = document.querySelector(".botao_finalizar");

// atualizar lista do atendente

function atualizarLista() {
  if (!listaChamadas) return;

  listaChamadas.innerHTML = "";
  ultimasChamadas.forEach((senha) => {
    const li = document.createElement("li");
    li.innerHTML = `<h3>${senha}</h3>`;
    listaChamadas.appendChild(li);
  });
}

// gerar senhas

// prioridade
if (btnPrioridade) {
  btnPrioridade.addEventListener("click", () => {
    const senha = `SP-${String(contP).padStart(3, "0")}`;
    contP++;
    filaPrioridade.push(senha);
    alert("Senha gerada: " + senha);
  });
}

// exame
if (btnExame) {
  btnExame.addEventListener("click", () => {
    const senha = `SE-${String(contE).padStart(3, "0")}`;
    contE++;
    filaExame.push(senha);
    alert("Senha gerada: " + senha);
  });
}

// geral
if (btnGeral) {
  btnGeral.addEventListener("click", () => {
    const senha = `SG-${String(contG).padStart(3, "0")}`;
    contG++;
    filaGeral.push(senha);
    alert("Senha gerada: " + senha);
  });
}

// chamar proxima senha

if (btnChamar) {
  btnChamar.addEventListener("click", () => {
    let senhaChamando = null;

    // ordem de prioridade
    if (filaPrioridade.length > 0) {
      senhaChamando = filaPrioridade.shift();
    } else if (filaExame.length > 0) {
      senhaChamando = filaExame.shift();
    } else if (filaGeral.length > 0) {
      senhaChamando = filaGeral.shift();
    }

    // sem senhas disponiveis
    if (!senhaChamando) {
      if (senhaDaVez) senhaDaVez.textContent = "Nenhuma senha";
      localStorage.setItem("senhaAtual", "");
      return;
    }

    // atualiza no atendente
    if (senhaDaVez) senhaDaVez.textContent = senhaChamando;

    // atualiza historico
    ultimasChamadas.unshift(senhaChamando);
    if (ultimasChamadas.length > 5) ultimasChamadas.pop();

    atualizarLista();

    // salva no localstorage
    localStorage.setItem("senhaAtual", senhaChamando);
    localStorage.setItem("historico", JSON.stringify(ultimasChamadas));
  });
}

// finalizar atendimento

if (btnFinalizar) {
  btnFinalizar.addEventListener("click", () => {
    // limpa senha atual
    localStorage.setItem("senhaAtual", "");

    // atualiza tela do atendente
    if (senhaDaVez) senhaDaVez.textContent = "Nenhuma senha";

    // atualiza tela do cliente imediatamente
    atualizarTelaCliente();
  });
}

// tela do cliente

function atualizarTelaCliente() {
  const senhaAtual = localStorage.getItem("senhaAtual");
  const historico = JSON.parse(localStorage.getItem("historico") || "[]");

  const telaSenha = document.querySelector(".senha_vez");
  const lista = document.querySelector(".lista_senha");

  if (telaSenha) {
    if (!senhaAtual) {
      telaSenha.textContent = "Nenhuma senha";
    } else {
      telaSenha.textContent = senhaAtual;
    }
  }

  if (lista) {
    lista.innerHTML = "";
    historico.forEach((senha) => {
      const li = document.createElement("li");
      li.innerHTML = `<h3>${senha}</h3>`;
      lista.appendChild(li);
    });
  }
}

// atualização automática do cliente
setInterval(atualizarTelaCliente, 800);
atualizarTelaCliente();
