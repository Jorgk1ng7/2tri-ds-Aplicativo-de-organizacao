function mostrarDia() {
    const dias = ["domingo", "segunda", "terca", "quarta", "quinta", "sexta", "sabado"];
    const hoje = new Date().getDay();

    // Remove destaque dos cards
    document.querySelectorAll(".card").forEach(card => {
        card.classList.remove("destaque");
    });

    // Destaca o card correspondente ao dia atual
    const cardHoje = document.getElementById(dias[hoje]);

    if (cardHoje) {
        cardHoje.classList.add("destaque");
    } else {
        alert("Hoje não há aula.");
    }
}
function mostrarPrato(dia) {
    let card = document.getElementById(dia);
    let prato = card.querySelector(".prato");

    if (prato.style.display === "block") {
        prato.style.display = "none";
    } else {
        prato.style.display = "block";
    }
}