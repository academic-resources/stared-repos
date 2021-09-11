class API {
    constructor(apikey) {
        this.apikey = apikey;
    }

    // GET Criptocoins names
    async getCryptocoinsAPI(){
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apikey}`;

        const urlGetCoins = await fetch(url);

        const coins = await urlGetCoins.json();

        return coins;

    }

    // Get Exchange Rate with proper currency
    async getExchangeRate(currency, cryptocoin){
        const url = `https://min-api.cryptocompare.com/data/price?fsym=${cryptocoin}&tsyms=${currency}&api_key=${this.apikey}`;

        const dataResponse = await fetch(url);

        const result = await dataResponse.json();

        return result;

    }
}
