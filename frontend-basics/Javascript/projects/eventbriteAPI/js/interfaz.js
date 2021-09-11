class Interfaz {
    constructor() {
        this.init();
        this.listado = document.getElementById('resultado-eventos');
    }

    init() {
        this.imprimirCategorias();
    }

    imprimirCategorias(){
        const listaCategorias = eventbrite.obtenerCategorias()
            .then(categorias => {
                const cats = categorias.categories;
                const selectCategoria = document.getElementById('listado-categorias');
                cats.forEach(cat => {
                    const option = document.createElement('option');
                    option.value = cat.id;
                    option.appendChild(document.createTextNode(cat.name_localized));
                    selectCategoria.appendChild(option);
                });
            });
    }

    mostrarEventos(eventos){

        // Limpiar listado de eventos previo
        this.listado.innerHTML = '';

        const listaEventos = eventos.events;
        console.log(listaEventos);

        listaEventos.forEach(evento => {
            this.listado.innerHTML += `
                <div class="col-md-4 mb-4">
                    <div class="card">
                        <div class="card-body">
                            <img class="img-fluid mb-2" src="${evento.logo !== null ? evento.logo.url: ''}">
                        </div>
                        <div class="card-body">
                            <div class="card-text">
                                <h2 class="text-center">${evento.name.text}</h2>
                                <p class="lead text-info">Informacion del evento</p>
                                <p>${evento.description.text.substring(0,280)}...</p>
                                <span class="badge badge-primary">Capacidad: ${evento.capacity} </span>
                                <span class="badge badge-secondary">Fecha y hora: ${evento.start.local}</span>
                                <a href="${evento.url}" target="_blank" class="btn btn-primary btn-block mt-4">Comprar boletos</a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    }

    mostrarMensaje(mensaje, clases){
        const div = document.createElement('div');
        div.classList = clases;
        div.appendChild(document.createTextNode(mensaje));

        const buscadorDiv = document.querySelector('#buscador');
        buscadorDiv.appendChild(div);

        setTimeout(() => {
            document.querySelector('#buscador .alert').remove();
        },3000);
    }
}
