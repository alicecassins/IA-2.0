const caixaPrincipal = document.querySelector(".caixa-principal");
const caixaPerguntas = document.querySelector(".caixa-perguntas");
const caixaAlternativas = document.querySelector(".caixa-alternativas");
const caixaResultado = document.querySelector(".caixa-resultado");
const textoResultado = document.querySelector(".texto-resultado");
const botaoReiniciar = document.querySelector(".botao-reiniciar");
const progressoAtual = document.querySelector(".progresso-atual");
const progressoTotal = document.querySelector(".progresso-total");

const perguntas = [
    {
        enunciado: "Hoje começou um novo projeto na escola: uma aula de culinária usando tecnologia! A professora apresenta um aplicativo que usa IA para sugerir receitas com base nos ingredientes disponíveis. Qual é sua reação?",
        alternativas: [
            {
                texto: "Achei incrível! Quero testar com os ingredientes da minha casa.",
                afirmacao: "Você ficou empolgada com a ideia e logo quis experimentar receitas novas usando a IA como assistente."
            },
            {
                texto: "Prefiro seguir receitas tradicionais de livros e anotações antigas.",
                afirmacao: "Você sentiu que as receitas clássicas ainda têm um valor especial e decidiu usá-las como base."
            }
        ]
    },
    {
        enunciado: "A professora propõe um desafio: criar um prato inédito usando a IA como ajuda. O que você faz?",
        alternativas: [
            {
                texto: "Pede para a IA gerar uma receita criativa e adapta com seu toque pessoal.",
                afirmacao: "Você mostrou criatividade ao unir tecnologia e sua intuição culinária para criar algo único."
            },
            {
                texto: "Reúne ideias com colegas, faz testes na cozinha e depois compara com sugestões da IA.",
                afirmacao: "Você valorizou o trabalho em equipe e testou receitas na prática antes de considerar a tecnologia."
            }
        ]
    },
    {
        enunciado: "Na hora da preparação do prato, um colega usa IA para cronometrar e dar dicas em tempo real. Você:",
        alternativas: [
            {
                texto: "Decide usar a mesma ferramenta e vê que ela realmente ajuda no preparo.",
                afirmacao: "Você percebeu como a IA pode facilitar processos na cozinha e melhorar seus resultados."
            },
            {
                texto: "Prefere seguir o preparo do prato no seu tempo e com sua organização.",
                afirmacao: "Você percebeu que confia mais em sua experiência e organização própria ao cozinhar."
            }
        ]
    },
    {
        enunciado: "Durante a aula, a professora pede uma apresentação do prato com imagem digital. Como você cria isso?",
        alternativas: [
            {
                texto: "Faz um desenho digital no Paint com os ingredientes e etapas do preparo.",
                afirmacao: "Você usou ferramentas simples para expressar visualmente sua receita e ajudar outras pessoas a replicarem."
            },
            {
                texto: "Gera uma imagem realista com IA mostrando como seu prato ficou.",
                afirmacao: "Você usou a IA para criar uma imagem atraente do prato e inspirar outras pessoas a quererem prová-lo."
            }
        ]
    },
    {
        enunciado: "Na última etapa, um grupo entrega um prato copiado exatamente da IA, sem modificações. O que você faz?",
        alternativas: [
            {
                texto: "Acha que não tem problema, pois usar IA já é uma forma de criar.",
                afirmacao: "Você passou a usar a IA como principal fonte de criação, mesmo sem adicionar suas ideias pessoais."
            },
            {
                texto: "Acredita que é importante personalizar e revisar qualquer receita sugerida pela IA.",
                afirmacao: "Você entendeu que a IA é uma aliada, mas que sua criatividade é essencial para dar identidade ao prato."
            }
        ]
    }
];

let atual = 0;
let perguntaAtual;
let historiaFinal = localStorage.getItem("historiaCulinaria") || "";

function inicia() {
    progressoTotal.textContent = perguntas.length;
    if (historiaFinal && atual >= perguntas.length) {
        mostraResultado();
    } else {
        mostraPergunta();
    }
}

function mostraPergunta() {
    if (atual >= perguntas.length) {
        mostraResultado();
        return;
    }

    perguntaAtual = perguntas[atual];
    caixaPerguntas.textContent = perguntaAtual.enunciado;
    caixaAlternativas.textContent = "";
    caixaResultado.style.display = "none";
    textoResultado.textContent = "";
    progressoAtual.textContent = atual + 1;

    mostraAlternativas();
}

function mostraAlternativas() {
    for (const alternativa of perguntaAtual.alternativas) {
        const botaoAlternativas = document.createElement("button");
        botaoAlternativas.textContent = alternativa.texto;
        botaoAlternativas.addEventListener("click", () => respostaSelecionada(alternativa));
        caixaAlternativas.appendChild(botaoAlternativas);
    }
}

function respostaSelecionada(opcaoSelecionada) {
    const afirmacoes = opcaoSelecionada.afirmacao;
    historiaFinal += afirmacoes + " ";
    localStorage.setItem("historiaCulinaria", historiaFinal);
    atual++;
    caixaPrincipal.style.opacity = 0;
    setTimeout(() => {
        mostraPergunta();
        caixaPrincipal.style.opacity = 1;
    }, 300);
}

function mostraResultado() {
    caixaPerguntas.textContent = "Sua jornada na cozinha digital...";
    textoResultado.textContent = historiaFinal;
    caixaAlternativas.textContent = "";
    caixaResultado.style.display = "block";
    botaoReiniciar.style.display = "inline-block";
}

botaoReiniciar.addEventListener("click", () => {
    atual = 0;
    historiaFinal = "";
    localStorage.removeItem("historiaCulinaria");
    botaoReiniciar.style.display = "none";
    caixaPrincipal.style.opacity = 0;
    setTimeout(() => {
        mostraPergunta();
        caixaPrincipal.style.opacity = 1;
    }, 300);
});

inicia();