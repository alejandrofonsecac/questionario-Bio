let nomeJogador = "";
let pontuacao = 0;


let perguntas = [
    {<div class="pergunta">
        <h3>1. Em que era geológica está o Período Quaternário?</h3>
        <button class="opcao">Mesozoica</button>
        <button class="opcao" data-correta="true">Cenozoica</button>
        <button class="opcao">Paleozoica</button>
        <button class="opcao">Arqueana</button>
        </div>
    },
    {2},
    {3},
    {4},
    {5},
    {6},
    {7},
    {8},
    {9},
    {10},
    {11},
    {12},
    {13},
    {14},
    {15},
]

// Iniciar quiz
document.getElementById("iniciar-quiz").addEventListener("click", () => {
    nomeJogador = document.getElementById("nome-jogador").value.trim();
    if (!nomeJogador) {
        alert("Por favor, digite seu nome!");
        return;
    }
    document.getElementById("form-jogador").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    document.getElementById
});

// Controle de respostas
document.querySelectorAll(".pergunta").forEach((perguntaEl) => {
    perguntaEl.querySelectorAll(".opcao").forEach((botao) => {
        botao.addEventListener("click", (e) => {
            // Desativa todos os botões dessa pergunta após resposta
            perguntaEl.querySelectorAll(".opcao").forEach(b => b.disabled = true);

            if (e.target.dataset.correta === "true") {
                pontuacao += 1;
                e.target.style.background = "#a3e9a4"; // Verde
            } else {
                e.target.style.background = "#ffb3b3"; // Vermelho
            }
        });
    });
});

// Enviar respostas e mostrar ranking
document.getElementById("enviar-respostas").addEventListener("click", async () => {
    
    const totalPerguntas = document.querySelectorAll(".pergunta").length;
    const respondidas = document.querySelectorAll(".opcao:disabled").length / 3; // 3 opções por pergunta

        if (respondidas < totalPerguntas) {
            alert("Responda todas as perguntas!");
            return;
        }


    try {
        const response = await fetch("/salvar_jogador", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: nomeJogador, pontuacao: pontuacao })
        });

        if (!response.ok) throw new Error("Falha ao salvar os dados");

        // Esconde quiz, mostra ranking
        document.getElementById("quiz").style.display = "none";
        document.getElementById("ranking").style.display = "block";

        // Atualiza ranking
        await atualizarRanking();
    } catch (error) {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao enviar as respostas.");
    }
});

// Função para atualizar ranking
async function atualizarRanking() {
    try {
        const response = await fetch("/ranking");
        if (!response.ok) throw new Error("Falha ao carregar ranking");

        const ranking = await response.json();
        const tabela = document.querySelector("#tabela-ranking tbody");

        tabela.innerHTML = ranking.map((jogador, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${jogador.nome}</td>
                <td>${jogador.pontuacao}/10</td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Erro ao carregar ranking:", error);
    }
}


