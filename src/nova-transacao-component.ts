const elementoFormulario = document.querySelector('.block-nova-transacao form') as HTMLFormElement

elementoFormulario.addEventListener('submit', function(e) {
    e.preventDefault()
    if(!elementoFormulario.checkValidity()) {
        alert('Por favor, preencha todos os campos da transacao!')
        return
    }

const inputTipoTransacao = elementoFormulario.querySelector('#tipoTransacao') as HTMLSelectElement
const inputValor = elementoFormulario.querySelector('#valor') as HTMLInputElement
const inputData = elementoFormulario.querySelector('#data') as HTMLInputElement

let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao
let valor: number = inputValor.valueAsNumber
let data: Date = new Date(inputData.value) 

if(tipoTransacao == 'Depósito') {
    saldo += valor
} else if(tipoTransacao == TipoTransacao.TRANSFERENCIA || TipoTransacao.PAGAMENTO_BOLETO) {
    saldo -= valor
} else {
    alert('Tipo de transacao inivalida')
    return
}

elementoSaldo.textContent = saldo.toLocaleString('pt-br', 
{currency: "BRL", style: "currency"})

const novaTransacao: Transacao = {
    tipoTransacao: tipoTransacao,
    valor: valor,
    data: data
}

console.log(novaTransacao)

elementoFormulario.reset();
})