// =========================
// VARIÁVEL DOS REGISTROS
// =========================

let registros = JSON.parse(localStorage.getItem("registros")) || [];

// =========================
// REGISTRAR INFORMAÇÕES
// =========================

function registrarInformacoes() {

    const select = document.querySelector(".Funcionarios");
    const valorFuncionario = select.value;

    const dinheiro = document.getElementById("valor");
    const valorDinheiro = Number(dinheiro.value);

    const data = document.getElementById("data");
    const valorData = data.value;


    // =========================
    // VALIDAÇÃO
    // =========================

    if (valorFuncionario === "") {

        alert("Selecione um funcionário.");
        return;
    }


    if (dinheiro.value === "" || isNaN(valorDinheiro)) {

        alert("Digite um valor válido.");
        return;
    }


    if (valorDinheiro < 0) {

        alert("Valores negativos não são permitidos.");
        return;
    }


    if (valorData === "") {

        alert("Selecione uma data.");
        return;
    }


    // =========================
    // CONFIRMAÇÃO
    // =========================

    const confirmar = confirm(
        `Confira os valores:\n\n` +
        `Funcionário: ${valorFuncionario}\n` +
        `Valor: ${formatarMoeda(valorDinheiro)}\n` +
        `Data: ${formatarData(valorData)}`
    );


    if (!confirmar) {
        return;
    }


    // =========================
    // CRIA REGISTRO
    // =========================

    const registro = {

        id: Date.now(),
        funcionario: valorFuncionario,
        valor: valorDinheiro,
        data: valorData

    };


    // Adiciona o registro na lista

    registros.push(registro);


    // =========================
    // SALVA NO LOCALSTORAGE
    // =========================

    localStorage.setItem(
        "registros",
        JSON.stringify(registros)
    );


    // =========================
    // ATUALIZA A TABELA
    // =========================

    mostrarRegistros();


    // =========================
    // LIMPA OS CAMPOS
    // =========================

    select.value = "";

    dinheiro.value = "";

    data.value = "";
}


// =========================
// MOSTRAR REGISTROS
// =========================

function mostrarRegistros() {

    const tabela = document.querySelector(".tabela-informacoes");
    const semRegistros = document.getElementById("sem-registros");


    // Limpa a tabela

    tabela.innerHTML = "";


    // Se não existir nenhum registro

    if (registros.length === 0) {

        semRegistros.style.display = "block";

        atualizarTotal();

        return;
    }


    semRegistros.style.display = "none";


    // Cria cada linha

    registros.forEach(function (registro) {

        const tr = document.createElement("tr");


        // Funcionário

        const funcionario = document.createElement("td");
        funcionario.textContent = registro.funcionario;


        // Valor

        const valor = document.createElement("td");
        valor.textContent = formatarMoeda(registro.valor);


        // Data

        const data = document.createElement("td");
        data.textContent = formatarData(registro.data);


        // Botão excluir

        const acao = document.createElement("td");
        const botaoExcluir = document.createElement("button");

        botaoExcluir.classList.add("btn-excluir");
        botaoExcluir.innerHTML = '<i class="bi bi-trash-fill"></i>';
        botaoExcluir.title = "Excluir registro";

        botaoExcluir.addEventListener("click", function () {

            excluirRegistro(registro.id);

        });


        acao.appendChild(botaoExcluir);


        // Monta a linha

        tr.appendChild(funcionario);
        tr.appendChild(valor);
        tr.appendChild(data);
        tr.appendChild(acao);

        tabela.appendChild(tr);

    });


    atualizarTotal();
}


// =========================
// EXCLUIR REGISTRO
// =========================

function excluirRegistro(id) {

    const confirmar = confirm(
        "Deseja realmente excluir este registro?"
    );


    if (!confirmar) {
        return;
    }


    registros = registros.filter(function (registro) {

        return registro.id !== id;

    });


    // Atualiza o localStorage

    localStorage.setItem(
        "registros",
        JSON.stringify(registros)
    );


    // Atualiza a tabela

    mostrarRegistros();
}


// =========================
// FORMATAR MOEDA
// =========================

function formatarMoeda(valor) {

    return valor.toLocaleString("pt-BR", {

        style: "currency",

        currency: "BRL"

    });

}


// =========================
// FORMATAR DATA
// =========================

function formatarData(data) {

    const partes = data.split("-");

    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}


// =========================
// CALCULAR TOTAL
// =========================

function atualizarTotal() {

    let total = 0;


    registros.forEach(function (registro) {

        total += registro.valor;

    });


    const elementoTotal =
        document.getElementById("total-valores");


    elementoTotal.textContent =
        formatarMoeda(total);
}


// =========================
// CARREGAR AO ABRIR A PÁGINA
// =========================

mostrarRegistros();