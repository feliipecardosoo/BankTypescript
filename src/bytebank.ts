let saldo = 10;

const elementoSaldo = document.querySelector('.saldo-valor .valor') as HTMLElement;

if(elementoSaldo != null) {
    elementoSaldo.textContent = saldo.toString()
}

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

let tipoTransacao: string = inputTipoTransacao.value 
let valor: number = inputValor.valueAsNumber
let data: Date = new Date(inputData.value) 

console.log(tipoTransacao)
console.log(valor)
console.log(data)

if(tipoTransacao == 'Depósito') {
    saldo += valor
} else if(tipoTransacao == 'Transferência' || 'Pagamento de Boleto') {
    saldo -= valor
} else {
    alert('Tipo de transacao inivalida')
    return
}

elementoSaldo.textContent = saldo.toString()

const novaTransacao = {
    tipoTransacao: tipoTransacao,
    valor: valor,
    data: data
}

console.log(novaTransacao)
elementoFormulario.reset();
})