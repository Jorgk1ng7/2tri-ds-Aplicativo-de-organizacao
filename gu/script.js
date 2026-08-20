

let agendamentos = JSON.parse(localStorage.getItem('agendamentos')) || [];


function agendar() {
    let lab = document.getElementById('lab').value;
    let data = document.getElementById('data').value;
    let horario = document.getElementById('horario').value;
    let nome = document.getElementById('nome').value;

    if (data === '') {
        document.getElementById('resultado').innerHTML = 
            '<span class="vermelho"> Escolha uma data primeiro!</span>';
        return;
    }

    if (nome === '') {
        document.getElementById('resultado').innerHTML = 
            '<span class="vermelho"> Digite o nome da pessoa!</span>';
        return;
    }

    let jaExiste = agendamentos.some(a => 
        a.lab === lab && a.data === data && a.horario === horario
    );

    if (jaExiste) {
        document.getElementById('resultado').innerHTML = 
            `<span class="vermelho"> ${lab} já está ocupado no dia ${data} no período da ${horario}!</span>`;
        return;
    }

    let novoAgendamento = { lab, data, horario, nome };
    agendamentos.push(novoAgendamento);

    localStorage.setItem('agendamentos', JSON.stringify(agendamentos));

    document.getElementById('resultado').innerHTML = 
        `<span class="verde"> Agendado com sucesso! ${nome} - ${lab} - ${data} - ${horario}</span>`;

    document.getElementById('data').value = '';
    document.getElementById('nome').value = '';
}

function listarAgendamentos() {
    let lista = document.getElementById('listaAgendamentos');

    if (agendamentos.length === 0) {
        lista.innerHTML = '<p> Nenhum agendamento ainda.</p>';
        return;
    }

    let html = '<h3> Agendamentos salvos:</h3><ul>';
    for (let a of agendamentos) {
        html += `<li>🔹 ${a.nome} - ${a.lab} - ${a.data} - ${a.horario}</li>`;
    }
    html += '</ul>';

    html += `<button onclick="limparTudo()" class="btn-excluir"> Limpar todos os agendamentos</button>`;

    lista.innerHTML = html;
}

function limparTudo() {
    if (confirm('Tem certeza que quer apagar todos os agendamentos?')) {
        agendamentos = [];
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
        listarAgendamentos();
        document.getElementById('resultado').innerHTML = '<span class="vermelho"> Todos os agendamentos foram removidos.</span>';
    }
}
