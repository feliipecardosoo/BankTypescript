export class Armazenador {
    private constructor() {}
    
    salvar(chave: string, valor: any): void {
        const ValorString = JSON.stringify(valor)
        localStorage.setItem(chave, ValorString)
    }

    obter(chave: string, reviver?: (this: any, key: string, value: any) => any) {
        const valor = localStorage.getItem(chave)

        if (valor === null) {
            return null
        }

        if (reviver) {
            return JSON.parse(valor, reviver)
        }

        return JSON.parse(valor)
    }
}