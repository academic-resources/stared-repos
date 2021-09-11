form = document.querySelector('#generar-nombre').addEventListener('submit', loadNames);

// Main function

function loadNames(e){
    e.preventDefault();

    // Read HTML

    const origin = document.getElementById('origen');
    const selectedOrigin = origin.options[origen.selectedIndex].value;

    const gender = document.getElementById('genero');
    const selectedGender = gender.options[gender.selectedIndex].value;

    const amount = document.getElementById('numero').value;

    // Construct URL
    let url = '';
    url += 'https://uinames.com/api/?';

    if(selectedOrigin !== ''){
        url+= `region=${selectedOrigin}&`;
    }
    if(selectedGender !== ''){
        url+= `gender=${selectedGender}&`;
    }
    if(amount !== ''){
        url+= `amount=${amount}&`;
    }

    console.log(url);

    // Connecting AJAX (XMLHTTPRequest)
    const xhr = new XMLHttpRequest();

    xhr.open('GET', url, true);

    // Printing data
    xhr.onload = function() {
        if(this.status === 200) {
            const names = JSON.parse(this.responseText);
            // Construct html
            let htmlNames = '<h2>Generated Names:</h2>';
            htmlNames += '<ul class="lista">';

            names.forEach(function(name) {
                htmlNames += `
                            <li>${name.name} ${name.surname}</li>
                            `;
            });

            htmlNames += '</ul>';

            document.getElementById('resultado').innerHTML = htmlNames;
        }
    }

    xhr.send();
}
