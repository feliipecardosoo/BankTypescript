import { Transacao  } from "./Transacao.js"

export class Conta {
    nome: string
    saldo: number = JSON.parse(localStorage.getItem("saldo")) || 0
    transacoes: Transacao[] = JSON.parse(localStorage.getItem("transacoes"), (key: string, value: string) => {
        if (key === "data") {
            return new Date(value);
        }
    }) || []

    constructor(nome: string) {
        this.nome = nome
    }
}

const conta = new Conta('AIIIIIIIIIIII LIPEZINNNN GOSTOZINNNN')

export default conta