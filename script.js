// Selecionando os elementos do HTML

const formulario = document.querySelector("#sorteadorForm");
const listaEntrada = document.getElementById("listaEntrada");

const resultadoBox = document.getElementById("resultadoBox");
const resultado = document.getElementById("resultado");

const btnLimpar = document.getElementById("btnLimpar");
const status = document.getElementById("status");

const historicoBox = document.getElementById("historicoBox");
const historico = document.getElementById("historico");

// Função para pegar e organizar os itens digitados

function obterItens() {
  return listaEntrada.value
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter((item) => item !== "");
}

// Função para escolher um item aleatório

function sortear(itens) {
  const indiceSorteado = Math.floor(Math.random() * itens.length);

  return itens[indiceSorteado];
}

// Função para mostrar o vencedor na tela

function exibirResultado(vencedor) {
  resultado.textContent = vencedor;

  resultadoBox.classList.remove("hidden");

  // Reinicia a animação para que ela funcione em todos os sorteios.

  resultado.classList.remove("revelar");

  void resultado.offsetWidth;

  resultado.classList.add("revelar");
}

// Função extra: adicionar o vencedor ao histórico

function adicionarAoHistorico(vencedor) {
  const itemHistorico = document.createElement("li");

  itemHistorico.textContent = vencedor;

  historico.appendChild(itemHistorico);

  historicoBox.classList.remove("hidden");
}

// Evento executado quando o formulário é enviado

formulario.addEventListener("submit", (event) => {
  // Impede que a página recarregue.

  event.preventDefault();

  status.textContent = "";

  // Pega os itens digitados.

  const itens = obterItens();

  // Verifica se existe algum item válido.

  if (itens.length === 0) {
    resultadoBox.classList.add("hidden");

    status.textContent = "Digite pelo menos um nome ou item para sortear.";

    listaEntrada.focus();

    return;
  }

  // Realiza o sorteio.

  const vencedor = sortear(itens);

  // Exibe o resultado.

  exibirResultado(vencedor);

  // Registra o vencedor no histórico.

  adicionarAoHistorico(vencedor);
});

// Evento do botão Limpar

btnLimpar.addEventListener("click", () => {
  // Limpa o campo de entrada.

  listaEntrada.value = "";

  // Reseta o texto do resultado.

  resultado.textContent = "---";

  // Esconde o resultado e o histórico.

  resultadoBox.classList.add("hidden");
  historicoBox.classList.add("hidden");

  // Limpa as mensagens.

  status.textContent = "";

  // Apaga os vencedores anteriores.

  historico.textContent = "";

  // Retorna o foco para o campo de entrada.

  listaEntrada.focus();
});
