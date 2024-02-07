import { TipoTransacao } from "../types/TipoTransacao.js";
let saldo = 0;
const Conta = {
    getsaldo() {
        return saldo;
    },
    getDataAcesso() {
        return new Date();
    },
    registrarTransacao(novaTransacao) {
        if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
            saldo += novaTransacao.valor;
        }
        else if (novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA || TipoTransacao.PAGAMENTO_BOLETO) {
            saldo -= novaTransacao.valor;
        }
        else {
            alert('Tipo de transacao inivalida');
            return;
        }
    }
};
export default Conta;
