const cardapio = {

    segunda: {
        dia: "Segunda-feira",
        lanche: "Pão com margarina e leite com achocolatado.",
        saida: "arroz, feijão e carne."
    },

    terca: {
        dia: "Terça-feira",
        lanche: "Bolo de chocolate e leite.",
        saida: "arroz feijao e ovo"
    },

    quarta: {
        dia: "Quarta-feira",
        lanche: "Pão com queijo e suco.",
        saida: "polenta branca com frango."
    },

    quinta: {
        dia: "Quinta-feira",
        lanche: "Arroz, feijão e carne.",
        saida: "arroz, feijao, salada com ovo cuzido."
    },

    sexta: {
        dia: "Sexta-feira",
        lanche: "Pão com margarina e leite.",
        saida: "café com pao de forma com margarina."
    }

};


function mostrarDia(dia) {

    const prato = document.getElementById("prato");
    const dados = cardapio[dia];

    prato.innerHTML = `
        <h3>${dados.dia}</h3>

        <p>
            <strong>07:00 - Lanche da manhã:</strong><br>
            ${dados.lanche}
        </p>

        <br>

        <p>
            <strong>10:00 - almoço/lanche</strong><br>
            ${dados.saida}
        </p>
    `;
}
function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("show");
  }

 // Elementos
const menuBtn = document.getElementById("menuBtn");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");


// Abrir / fechar menu
menuBtn.addEventListener("click", function () {

    sidebar.classList.toggle("show");
    sidebarOverlay.classList.toggle("show");

});


// Fechar clicando no fundo escuro
sidebarOverlay.addEventListener("click", function () {

    sidebar.classList.remove("show");
    sidebarOverlay.classList.remove("show");

});


