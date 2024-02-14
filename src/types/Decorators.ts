export function ValidaDebito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metodoOriginal = descriptor.value

    descriptor.value = function (ValidaDebito: number) {
        if(ValidaDebito <= 0 ) {
            throw new Error('O valor a ser debitado precisa ser maior que 0'); 
        }
        if(ValidaDebito > this.saldo) {
            throw new Error('Seu saldo é insuficiente para realizar a operacao');
        }

        return metodoOriginal.apply(this, [ValidaDebito])
    }

    return descriptor
}

export function ValidaDeposito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const metodoOriginal = descriptor.value

    descriptor.value = function (ValidaDeposito: number) {
        if(ValidaDeposito <= 0) {
            throw new Error('O Valor a ser depositado deve ser maior do que zero!')
        }

        return metodoOriginal.apply(this, [ValidaDeposito])
    }
    
    return descriptor
}