function Oneclick(){
    const element = document.getElementById("meuElemento");
    element.addEventListener("click", minhaFuncao, {once: true});

    function minhaFuncao(evento) {
        console.log("O evento foi acionado pela primeira vez!");
        // Seu código aqui, que será executado apenas uma vez
    }
}