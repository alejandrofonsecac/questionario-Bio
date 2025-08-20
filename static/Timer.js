function Timer(){
    const timerElement = document.getElementById("Timer");
    timerElement.style.display = "block";

    let timeLeft = 300; // 5 minutes in seconds
    const timerText = document.querySelector(".timerText");

    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            timerText.textContent = "Tempo esgotado!";
            // Aqui você pode adicionar lógica para finalizar o quiz
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerText.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            timeLeft--;
        }
    }, 1000);

    
}