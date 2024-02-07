import { Transacao } from "./Transacao.js"
import { TipoTransacao } from "../types/TipoTransacao.js"

let saldo: number = 0

function debitar (valor:number): void {
    if (valor <= 0) {
        throw new Error ('O valor a ser debitado deve ser maior que zero!')
    }
    if (valor > saldo) {
        throw new Error ('Saldo insuficiente')
    }
    saldo -= valor
}

function depositar (valor:number): void {
    if (valor <= 0) {
        throw new Error ('O valor a ser depositado deve ser maior que zero!')
    }
    saldo += valor
}

const Conta = {
    getsaldo(): number {
        return saldo
    },

    getDataAcesso(): Date {
        return new Date()
    },

    registrarTransacao(novaTransacao: Transacao): void {
        if(novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            depositar(novaTransacao.valor)
        } 
        else if(novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || TipoTransacao.PAGAMENTO_BOLETO) {
            debitar(novaTransacao.valor)
        } 
        else {
            throw new Error ('Tipo de transacao inivalida')
        }
    }
}

export default Conta