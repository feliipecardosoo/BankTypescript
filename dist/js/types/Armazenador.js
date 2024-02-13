export class Armazenador {
    constructor() { }
    salvar(chave, valor) {
        const ValorString = JSON.stringify(valor);
        localStorage.setItem(chave, ValorString);
    }
    obter(chave, reviver) {
        const valor = localStorage.getItem(chave);
        if (valor === null) {
            return null;
        }
        if (reviver) {
            return JSON.parse(valor, reviver);
        }
        return JSON.parse(valor);
    }
}
