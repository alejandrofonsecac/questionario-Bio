let nomeJogador = "";
let pontuacao = 0;

// Iniciar quiz
document.getElementById("iniciar-quiz").addEventListener("click", () => {
    nomeJogador = document.getElementById("nome-jogador").value.trim();
    if (!nomeJogador) {
        alert("Por favor, digite seu nome!");
        return;
    }
    document.getElementById("form-jogador").style.display = "none";
    document.getElementById("quiz").style.display = "block";
});

// Verificar respostas
document.querySelectorAll(".opcao").forEach(botao => {
    botao.addEventListener("click", (e) => {
        if (e.target.dataset.correta === "true") {
            pontuacao += 1;
            e.target.style.background = "#a3e9a4"; // Verde se acertar
        } else {
            e.target.style.background = "#ffb3b3"; // Vermelho se errar
        }
        e.target.disabled = true; // Desativa o botão após clicar
    });
});

document.getElementById("enviar-respostas").addEventListener("click", async () => {
    // Verifica se pelo menos uma resposta foi selecionada
    if (pontuacao === 0) {
        alert("Responda pelo menos uma pergunta!");
        return;
    }

    try {
        // Envia os dados para o Flask
        const response = await fetch("http://localhost:5000/salvar_jogador", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome: nomeJogador, pontuacao: pontuacao }),
        });

        if (!response.ok) throw new Error("Falha ao salvar os dados");

        // Oculta o quiz e mostra o ranking
        document.getElementById("quiz").style.display = "none";
        document.getElementById("ranking").style.display = "block";
        
        // Atualiza a tabela de ranking
        await atualizarRanking();
    } catch (error) {
        console.error("Erro:", error);
        alert("Ocorreu um erro ao enviar as respostas.");
    }
});

// Função para buscar e exibir o ranking
async function atualizarRanking() {
    try {
        const response = await fetch("http://localhost:5000/ranking");
        const ranking = await response.json();
        
        const tabela = document.querySelector("#tabela-ranking tbody");
        tabela.innerHTML = ranking.map((jogador, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${jogador.nome}</td>
                <td>${jogador.pontuacao}/3</td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Erro ao carregar ranking:", error);
    }
}

    // Salva no banco de dados
    await fetch("http://localhost:5000/salvar_jogador", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nomeJogador, pontuacao: pontuacao })
    });

    // Mostra o ranking
    document.getElementById("quiz").style.display = "none";
    document.getElementById("ranking").style.display = "block";
    atualizarRanking();


// Atualiza a tabela de ranking
async function atualizarRanking() {
    const resposta = await fetch("http://localhost:5000/ranking");
    const ranking = await resposta.json();
    const tabela = document.querySelector("#tabela-ranking tbody");
    
    tabela.innerHTML = ranking.map((jogador, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${jogador.nome}</td>
            <td>${jogador.pontuacao}/3</td>
        </tr>
    `).join("");
}