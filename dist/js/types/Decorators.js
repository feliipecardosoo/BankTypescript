export function ValidaDebito(target, propertyKey, descriptor) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (ValidaDebito) {
        if (ValidaDebito <= 0) {
            throw new Error('O valor a ser debitado precisa ser maior que 0');
        }
        if (ValidaDebito > this.saldo) {
            throw new Error('Seu saldo é insuficiente para realizar a operacao');
        }
        return metodoOriginal.apply(this, [ValidaDebito]);
    };
    return descriptor;
}
export function ValidaDeposito(target, propertyKey, descriptor) {
    const metodoOriginal = descriptor.value;
    descriptor.value = function (ValidaDeposito) {
        if (ValidaDeposito <= 0) {
            throw new Error('O Valor a ser depositado deve ser maior do que zero!');
        }
        return metodoOriginal.apply(this, [ValidaDeposito]);
    };
    return descriptor;
}
