/* Insurence constructor */

class Insurance{

    constructor(brand, year, type){
        this.brand = brand;
        this.year = year;
        this.type = type;
    }

    quoteInsurance(){

        let price;
        const base = 2000;

        switch(this.brand){
            case 'Americano':
                price = base * 1.15;
                break;
            case 'Asiatico':
                price = base * 1.05;
                break;
            case 'Europeo':
                price = base * 1.35;
                break;
        }

        console.log(`Applying brand: ${price}`);

        const difference = new Date().getFullYear() - this.year;
        price *= (1 + 0.3 * difference);

        console.log(`Applying antiquity: ${price}`);

        if(this.type === 'basico'){
            price *= 1.30;
        } else {
            price *= 1.50;
        }

        console.log(`Applying type: ${price}`);

        return price;
    }

}

// Everything being shown
class Interface {

    showMessage(message, type){
        const div = document.createElement('div');

        if(type === 'error') {
            div.classList.add('mensaje', 'error');
        } else {
            div.classList.add('mensaje', 'correcto');
        }
        div.innerHTML = `${message}`;
        form.insertBefore(div, document.querySelector('.form-group'));

        setTimeout(function() {
            document.querySelector('.mensaje').remove();
        }, 3000);
    }

    showResult(insurance, price){
        const result = document.getElementById('resultado');

        const div = document.createElement('div');
        div.innerHTML = `
            <p class="header">Cotizacion</p>
            <p>Marca: ${insurance.brand}</p>
            <p>Fecha: ${insurance.year}</p>
            <p>Tipo: ${insurance.type}</p>
            <p>Total: $${price}</p>
        `;

        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';

        setTimeout(function() {
            spinner.style.display = 'none';
            result.appendChild(div);
        }, 3000);
    }

}

// EventListeners

const form = document.getElementById('cotizar-seguro');

form.addEventListener('submit', function(e){
    e.preventDefault();

    // Get Data
    const brand = document.getElementById('marca');
    const selectedBrand = brand.options[brand.selectedIndex].innerHTML;

    const year = document.getElementById('anio');
    const selectedYear = year.options[year.selectedIndex].value;

    const type = document.querySelector('input[name="tipo"]:checked').value;

    // Create interface
    const interface = new Interface();

    // Check filled-inputs
    if (selectedBrand === '- Seleccionar -' || selectedYear === '' || type === ''){
        interface.showMessage('Faltan datos, revisa el formulario!', 'error');
    } else {
        interface.showMessage('Cotizando...', 'correcto');

        // Clear previous insurance quotations
        const results = document.querySelector('#resultado div');
        if (results != null){
            results.remove();
        }

        // Initialize insurance
        const insurance = new Insurance(selectedBrand, selectedYear, type);

        // Quote insurance
        const price = insurance.quoteInsurance(insurance);

        // Show insurance quote in interface
        interface.showResult(insurance, price);
    }
});

// Select options
const max = new Date().getFullYear(),
      min = max - 20;

const selectYears = document.getElementById('anio');

for(let i = max; i > min; i--){
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectYears.appendChild(option);
}
