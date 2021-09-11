const ui = new UI();

document.addEventListener('DOMContentLoaded', () => {
    ui.mostrarEstablecimientos();
});

// Habilitar busqueda de Establecimientos

const buscador = document.querySelector('#buscar input');

buscador.addEventListener('input', () => {
    console.log("Escribiendo busqueda...", buscador.value);

    if(buscador.value.length > 4) {
        //buscar en la api
        ui.obtenerSugerencias(buscador.value);
    } else {
        ui.mostrarEstablecimientos();
    }
});
