import { Transacao  } from "./Transacao.js"
import { GrupoTransacao } from "./GrupoTransacao.js"
import { TipoTransacao } from "./TipoTransacao.js"
import { Armazenador } from "./Armazenador.js"
import { ValidaDebito } from "./Decorators.js"

export class Conta {
    protected nome: string
    protected saldo: number = Armazenador.obter<number>('saldo') || 0
    private transacoes: Transacao[] = Armazenador.obter<Transacao[]>(("transacoes"), (key: string, value: string) => {
        if (key === "data") {
            return new Date(value);
        }
    }) || []

    constructor(nome: string) {
        this.nome = nome
    }
    
    public getNome(): string {
        return this.nome
    }

    getGruposTransacoes(): GrupoTransacao[] {
        const gruposTransacoes: GrupoTransacao[] = [];
        const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
        const transacoesOrdenadas: Transacao[] = listaTransacoes.sort((t1, t2) => t2.data.getTime() - t1.data.getTime());
        let labelAtualGrupoTransacao: string = "";

        for (let transacao of transacoesOrdenadas) {
            let labelGrupoTransacao: string = transacao.data.toLocaleDateString("pt-br", { month: "long", year: "numeric" });
            if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
                labelAtualGrupoTransacao = labelGrupoTransacao;
                gruposTransacoes.push({
                    label: labelGrupoTransacao,
                    transacoes: []
                });
            }
            gruposTransacoes.at(-1).transacoes.push(transacao);
        }

        return gruposTransacoes;
    }

    getSaldo(): number {
        return this.saldo
    }

    getDataAcesso(): Date {
        return new Date()
    }

    @ValidaDebito
    debitar(valor: number): void {
        this.saldo -= valor;
        Armazenador.salvar("saldo", this.saldo.toString());
    }

    depositar(valor: number): void {
        if (valor <= 0) {
            throw new Error("O valor a ser depositado deve ser maior que zero!");
        }
    
        this.saldo += valor;
        Armazenador.salvar("saldo", this.saldo.toString());
    }

    registrarTransacao(novaTransacao: Transacao): void {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            this.depositar(novaTransacao.valor);
        } 
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
            this.debitar(novaTransacao.valor);
            novaTransacao.valor *= -1;
        } 
        else {
            throw new Error("Tipo de Transação é inválido!");
        }

        this.transacoes.push(novaTransacao);
        console.log(this.getGruposTransacoes());
        Armazenador.salvar("transacoes", JSON.stringify(this.transacoes));
    }
}

export class ContaPremium extends Conta{
    registrarTransacao(transacao: Transacao): void {
        if(transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
            console.log('Ganhou um bonus')
            transacao.valor += 0.5
        }
        super.registrarTransacao(transacao)
    }
}

const conta = new Conta('Felipe')
const contaPremium = new ContaPremium('Felipe')

export default conta