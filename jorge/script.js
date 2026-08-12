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


// Fechar menu quando clicar em um link
const sidebarLinks = sidebar.querySelectorAll("a");

sidebarLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        sidebar.classList.remove("show");
        sidebarOverlay.classList.remove("show");

    });

});

function redirecionar() {

    window.location.href = 'https://dontpad.com/Avisos-Direção';
  }
  function mover() {

    window.location.href = 'https://dontpad.com/Avisos-Professor';
  }
function ate()  {
    window.location.href = 'https://dontpad.com/Avisos-Para-A-Família';
}