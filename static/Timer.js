function Timer(){
    const minhaDiv = document.createElement('div');
    minhaDiv.innerHTML = '300s'
    document.body.appendChild(minhaDiv);

    const Timer = document.getElementById("meuContainer");
    Timer.appendChild(minhaDiv.cloneNode(true)); //Adiciona uma cópia da div
}