let saldo = 1;
const elementoSaldo = document.querySelector('.saldo-valor .valor');
if (elementoSaldo != null) {
    elementoSaldo.textContent = saldo.toString();
}
const elementoFormulario = document.querySelector('.block-nova-transacao form');
elementoFormulario.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!elementoFormulario.checkValidity()) {
        alert('Por favor, preencha todos os campos da transacao!');
        return;
    }
    const inputTipoTransacao = elementoFormulario.querySelector('#tipoTransacao');
    const inputValor = elementoFormulario.querySelector('#valor');
    const inputData = elementoFormulario.querySelector('#data');
    let tipoTransacao = inputTipoTransacao.value;
    let valor = inputValor.valueAsNumber;
    let data = new Date(inputData.value);
    console.log(tipoTransacao);
    console.log(valor);
    console.log(data);
    if (tipoTransacao == 'Depósito') {
        saldo += valor;
    }
    else if (tipoTransacao == 'Transferência' || 'Pagamento de Boleto') {
        saldo -= valor;
    }
    else {
        alert('Tipo de transacao inivalida');
        return;
    }
    elementoSaldo.textContent = saldo.toString();
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: valor,
        data: data
    };
    console.log(novaTransacao);
    elementoFormulario.reset();
});
