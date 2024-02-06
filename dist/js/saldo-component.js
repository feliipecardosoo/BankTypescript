let saldo = 100;
const elementoSaldo = document.querySelector('.saldo-valor .valor');
const elementoDataAcesso = document.querySelector('.block-saldo time');
if (elementoSaldo != null) {
    elementoSaldo.textContent = saldo.toLocaleString('pt-br', { currency: "BRL", style: "currency" });
}
if (elementoDataAcesso != null) {
    const dataAcesso = new Date();
    elementoDataAcesso.textContent = dataAcesso.toLocaleDateString('pt-br', {
        weekday: "long",
        day: '2-digit',
        month: "2-digit",
        year: "numeric"
    });
}
