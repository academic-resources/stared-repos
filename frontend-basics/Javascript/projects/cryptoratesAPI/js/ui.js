class Interface {

    constructor(){
        this.init();
    }
    init() {
        this.buildSelect();
    }

    buildSelect(){
        APICoins.getCryptocoinsAPI()
            .then(coins => {

                const select = document.querySelector('#criptomoneda');

                for (const [key,value] of Object.entries(coins.Data)){

                    const option = document.createElement('option');
                    option.value = value.Symbol;
                    option.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(option);
                }
            });
    }

    showMessage(message, clases){
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(message));

        const divMessage = document.querySelector('.mensajes');
        divMessage.appendChild(div);

        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);

    }

    showResult(result, currency, crypto){

        const previousResult = document.querySelector('#resultado > div');
        if(previousResult){
            previousResult.remove();
        }

        let rate = result[currency].toFixed(2);

        let templateHTML = `
            <div class="card bg-warning">
                <div class ="card-body text-light">
                    <h2 class ="card-title">Resultado:</h2>
                    <p>El Precio de ${crypto} en moneda ${currency}
                    es de: $ ${rate}</p>
                </div>
            </div>
        `;

        this.showSpinner('block');

        setTimeout(() => {
            this.showSpinner('none');
            document.querySelector('#resultado').innerHTML = templateHTML;
        }, 3000);
    }

    showSpinner(display) {
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = display;
    }

}
