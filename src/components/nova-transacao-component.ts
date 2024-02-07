import { Transacao } from "../types/Transacao.js"
import { TipoTransacao } from "../types/TipoTransacao.js"
import saldoComponentes  from "../components/saldo-component.js"
import Conta from "../types/conta.js"


const elementoFormulario = document.querySelector('.block-nova-transacao form') as HTMLFormElement

elementoFormulario.addEventListener('submit', function(e) {
   try {
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
   
   
       const novaTransacao: Transacao = {
           tipoTransacao: tipoTransacao,
           valor: valor,
           data: data
       }
   
       Conta.registrarTransacao(novaTransacao)
       saldoComponentes.atualizar()
       elementoFormulario.reset();
       } 
       catch (erro){
        alert(erro.message)
       }
    })