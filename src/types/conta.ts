import { Transacao } from "./Transacao.js"
import { TipoTransacao } from "../types/TipoTransacao.js"

let saldo: number = 0

const Conta = {
    getsaldo(): number {
        return saldo
    },

    getDataAcesso(): Date {
        return new Date()
    },

    registrarTransacao(novaTransacao: Transacao): void {
        if(novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            saldo += novaTransacao.valor
        } 
        else if(novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || TipoTransacao.PAGAMENTO_BOLETO) {
            saldo -= novaTransacao.valor
        } 
        else {
            alert('Tipo de transacao inivalida')
            return
        }
    }
}

export default Conta