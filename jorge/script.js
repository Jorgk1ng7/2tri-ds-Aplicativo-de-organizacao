document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menuBtn");
    const sidebar = document.getElementById("sidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");


    // =========================
    // ABRIR / FECHAR SIDEBAR
    // =========================

    menuBtn.addEventListener("click", function () {

        sidebar.classList.toggle("show");
        sidebarOverlay.classList.toggle("show");

    });


    // =========================
    // FECHAR CLICANDO FORA
    // =========================

    sidebarOverlay.addEventListener("click", function () {

        sidebar.classList.remove("show");
        sidebarOverlay.classList.remove("show");

    });


    // =========================
    // FECHAR AO CLICAR EM UM LINK
    // =========================

    const sidebarLinks = sidebar.querySelectorAll("a");

    sidebarLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            sidebar.classList.remove("show");
            sidebarOverlay.classList.remove("show");

        });

    });


    // =========================
    // BARRA DE PESQUISA
    // =========================

    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");
    const avisos = document.querySelectorAll(".aviso-card");


    function pesquisarAvisos() {

        const textoPesquisa = searchInput.value
            .toLowerCase()
            .trim();


        avisos.forEach(function (aviso) {

            const textoAviso = aviso.textContent.toLowerCase();


            if (textoAviso.includes(textoPesquisa)) {

                aviso.style.display = "";

            } else {

                aviso.style.display = "none";

            }

        });

    }


    // Pesquisa enquanto digita
    searchInput.addEventListener("input", pesquisarAvisos);


    // Pesquisa ao clicar no botão
    searchForm.addEventListener("submit", function (event) {

        event.preventDefault();

        pesquisarAvisos();

    });

});


// =========================
// JANELA DE AVISOS
// =========================

function abrirAviso(tipo) {

    const modal = document.getElementById("modalAviso");
    const titulo = document.getElementById("tituloAviso");
    const mensagem = document.getElementById("mensagemAviso");
    const icone = document.getElementById("iconeAviso");


    // =========================
    // AVISO DA DIREÇÃO
    // =========================

    if (tipo === "direcao") {

        icone.textContent = "📢";

        titulo.textContent = "Avisos da Direção";

        mensagem.textContent =
            "A direção informa que na próxima sexta-feira, dia 28 de agosto, haverá uma reunião geral com os alunos no auditório da escola. A participação de todos é importante.";

    }


    // =========================
    // AVISO DO PROFESSOR
    // =========================

    else if (tipo === "professor") {

        icone.textContent = "👨‍🏫";

        titulo.textContent = "Avisos do Professor";

        mensagem.textContent =
            "Trabalho de programação a ser realizado nessa semana, leve seus materiais escolares de programação.";

    }


    // =========================
    // AVISO PARA A FAMÍLIA
    // =========================

    else if (tipo === "familia") {

        icone.textContent = "👨‍👩‍👧";

        titulo.textContent = "Avisos Para a Família";

        mensagem.textContent =
            "Lembramos às famílias que na próxima semana acontecerá a reunião de responsáveis. A reunião será realizada na escola e terá início às 19h.";

    }


    // Mostrar a janela
    modal.classList.add("mostrar");

}


// =========================
// FECHAR AVISO
// =========================

function fecharAviso() {

    const modal = document.getElementById("modalAviso");

    modal.classList.remove("mostrar");

}


// =========================
// FECHAR CLICANDO FORA
// =========================

document.addEventListener("click", function (event) {

    const modal = document.getElementById("modalAviso");

    if (event.target === modal) {

        fecharAviso();

    }

});