function registrarInformacoes(){
    const select = document.querySelector('.Funcionarios')
    const valorFuncionario = select.value

    const dinheiro = document.getElementById('valor')
    const valorDinheiro = Number(dinheiro.value)

    const data = document.getElementById('data')
    const valorData = data.value

    const Tabela = document.querySelector(".tabela-informacoes")
    const tr = document.createElement('tr')
    const funcionarioTabela = document.createElement('td')
    const dinheiroTabela = document.createElement('td')
    const dataTabela = document.createElement('td')

    function verificarvalores(){
        if(valorFuncionario === "" || valorData === "" || isNaN(valorDinheiro)){
            alert("INSIRA TODOS OS VALORES")
            return false
        }else if(valorDinheiro < 0){
            alert("VALORES NEGATIVOS NÃO SÃO PERMITIDOS")
            return false
        }else{
            const confirmar = confirm(`Confira os valores: \n Funcionário: ${valorFuncionario} \n Valor: ${valorDinheiro} \nData: ${valorData}`)
            
            if (!confirmar) return false;

            return true
        }}

    if (!verificarvalores())return;

    funcionarioTabela.textContent = valorFuncionario
    dinheiroTabela.textContent = 'R$ ' + valorDinheiro
    dataTabela.textContent = valorData

    tr.appendChild(funcionarioTabela)
    tr.appendChild(dinheiroTabela)
    tr.appendChild(dataTabela)
    Tabela.appendChild(tr)

    document.querySelector('.Funcionarios').value = ""
    document.getElementById('valor').value = ""
    document.getElementById('data').value = ""
}