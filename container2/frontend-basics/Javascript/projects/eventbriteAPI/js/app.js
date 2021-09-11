const eventbrite = new EventBrite();
const ui = new Interfaz();

// Listener al formulario
document.getElementById('buscarBtn').addEventListener('click', (e) => {
    e.preventDefault();

    const textoBuscador = document.getElementById('evento').value;
    const categorias = document.getElementById('listado-categorias');
    const categoriaSeleccionada = categorias.options[categorias.selectedIndex].value;

    if(textoBuscador !== ''){
        console.log('Referencia:', textoBuscador, '\nCat:', categoriaSeleccionada, '\nBuscando...');
        eventbrite.obtenerEventos(textoBuscador, categoriaSeleccionada)
            .then(eventos => {
                if(eventos.events.length > 0){
                    ui.mostrarEventos(eventos);
                } else {
                    ui.mostrarMensaje('No hay resultados', 'alert alert-danger mt-4');
                }
            });
    } else {
        ui.mostrarMensaje('No hay nada que buscar', 'alert alert-danger mt-4');
    }
});
