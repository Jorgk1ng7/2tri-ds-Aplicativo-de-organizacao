const cardapio = {

    segunda: {
        dia: "Segunda-feira",
        lanche: "Pão com margarina e leite com achocolatado.",
        saida: "Biscoito."
    },

    terca: {
        dia: "Terça-feira",
        lanche: "Bolo de chocolate e leite.",
        saida: "Fruta."
    },

    quarta: {
        dia: "Quarta-feira",
        lanche: "Pão com queijo e suco.",
        saida: "Biscoito."
    },

    quinta: {
        dia: "Quinta-feira",
        lanche: "Arroz, feijão e carne.",
        saida: "Fruta."
    },

    sexta: {
        dia: "Sexta-feira",
        lanche: "Pão com margarina e leite.",
        saida: "Biscoito."
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
            <strong>12:25 - Lanche da saída:</strong><br>
            ${dados.saida}
        </p>
    `;
}
