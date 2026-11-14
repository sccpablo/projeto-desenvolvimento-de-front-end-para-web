
const perguntas = [
  {
    pais: "Alemanha",
    imagem: "imagens/alemanha.png",
    erradas: ["Áustria", "Polônia", "Egito"]
  },
  {
    pais: "França",
    imagem: "imagens/franca.png",
    erradas: ["Itália", "Suíça", "Marrocos"]
  },
  {
    pais: "Bélgica",
    imagem: "imagens/belgica.png",
    erradas: ["Holanda", "Espanha", "Quênia"]
  },
  {
    pais: "Canadá",
    imagem: "imagens/canada.png",
    erradas: ["Estados Unidos", "Cuba", "Egito"]
  },
  {
    pais: "Argentina",
    imagem: "imagens/argentina.png",
    erradas: ["Chile", "Uruguai", "Nigéria"]
  },
  {
    pais: "Brasil",
    imagem: "imagens/brasil.png",
    erradas: ["Paraguai", "Venezuela", "Índia"]
  },
  {
    pais: "Turquia",
    imagem: "imagens/turquia.png",
    erradas: ["Irã", "Iraque", "Portugal"]
  },
  {
    pais: "Rússia",
    imagem: "imagens/russia.png",
    erradas: ["Ucrânia", "Sérvia", "Austrália"]
  },
  {
    pais: "China",
    imagem: "imagens/china.png",
    erradas: ["Japão", "Coreia do Sul", "Egito"]
  }
];

let atual = 0;

const divBandeira = document.getElementById("bandeira");
const divOpcoes = document.getElementById("opcoes");
const textoContador = document.getElementById("contador");
const textoMensagem = document.getElementById("mensagem");
const btnRecomecar = document.getElementById("btnRecomecar");


function embaralhar(lista) {
  for (let i = lista.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = lista[i];
    lista[i] = lista[j];
    lista[j] = temp;
  }
  return lista;
}

function mostrarPergunta() {
  let p = perguntas[atual];

  textoContador.textContent = "Pergunta " + (atual + 1) + " de " + perguntas.length;
  textoMensagem.textContent = "";
  divBandeira.innerHTML = '<img src="' + p.imagem + '" alt="Não achei: ' + p.imagem + '">';
  divOpcoes.innerHTML = "";

  let opcoes = embaralhar([p.pais, ...p.erradas]);

  for (let i = 0; i < opcoes.length; i++) {
    let botao = document.createElement("button");
    botao.textContent = opcoes[i];
    botao.addEventListener("click", function () {
      responder(botao, opcoes[i] === p.pais);
    });
    divOpcoes.appendChild(botao);
  }
}

function travarBotoes() {
  let botoes = divOpcoes.querySelectorAll("button");
  for (let i = 0; i < botoes.length; i++) {
    botoes[i].disabled = true;
  }
}

function responder(botao, acertou) {
  travarBotoes();

  if (acertou) {
    botao.classList.add("certo");
    atual++;

    setTimeout(function () {
      if (atual < perguntas.length) {
        mostrarPergunta();
      } else {
        fimDeJogo();
      }
    }, 800);
  } else {
    botao.classList.add("errado");
    textoMensagem.textContent = "Você errou";
    btnRecomecar.classList.remove("escondido");
  }
}

function fimDeJogo() {
  divBandeira.innerHTML = "";
  divOpcoes.innerHTML = "";
  textoContador.textContent = "";
  textoMensagem.textContent = "Você acertou todas. Parabéns!";
  btnRecomecar.classList.remove("escondido");
}

function recomecar() {
  atual = 0;
  embaralhar(perguntas);
  btnRecomecar.classList.add("escondido");
  mostrarPergunta();
}

btnRecomecar.addEventListener("click", recomecar);

embaralhar(perguntas);
mostrarPergunta();