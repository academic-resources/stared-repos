const APICoins = new API('15a57e0d20ff26a50e561e7c64693beada53e44bd65fe4ebfb00af69cb6e26d1');
const ui = new Interface();

const form = document.querySelector('#formulario');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const currencySelect = document.querySelector('#moneda');
    const selectedCurrency = currencySelect.options[currencySelect.selectedIndex].value;

    const coinSelect = document.querySelector('#criptomoneda');
    const selectedCoin = coinSelect.options[coinSelect.selectedIndex].value;

    if(selectedCurrency === '' || selectedCoin === ''){
        ui.showMessage('Ambos campos son obligatorios', 'alert bg-danger text-center');
    } else {
        console.log("Data OK, consultando API");
        APICoins.getExchangeRate(selectedCurrency, selectedCoin)
            .then(data => {ui.showResult(data, selectedCurrency, selectedCoin);});
    }

});
