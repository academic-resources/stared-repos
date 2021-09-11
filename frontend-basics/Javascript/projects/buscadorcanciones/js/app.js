import * as UI from './interfaz.js';
import { API } from './api.js'

UI.formBuscar.addEventListener('submit', (e) => {
    e.preventDefault();

    // Leer formulario
    const artista = document.querySelector('#artista').value,
          cancion = document.querySelector('#cancion').value;

    if (artista === '' || cancion === ''){
        UI.divMensajes.innerHTML = 'Por favor llenar todos campos!';
        UI.divMensajes.classList.add('error');

        setTimeout(() => {
            UI.divMensajes.innerHTML = '';
            UI.divMensajes.classList.remove('error');
        }, 3000);
    } else {
        const api = new API(artista, cancion);
        api.consultarAPI()
            .then(data => {
                if(data.lyrics){
                    UI.divResultado.textContent = data.lyrics;

                } else {
                    UI.divMensajes.innerHTML = 'No se han encontrado resultados.';
                    UI.divMensajes.classList.add('error');

                    setTimeout(() => {
                        UI.divMensajes.innerHTML = '';
                        UI.divMensajes.classList.remove('error');
                        UI.formBuscar.reset();
                    }, 3000);
                }
            });
    }
});
