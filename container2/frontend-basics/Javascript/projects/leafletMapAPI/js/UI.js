class UI {
    constructor() {

        //Instanciar API
        this.api = new API();

        // Crear markers con layerGroup
        this.markers = new L.layerGroup();

        // Iniciar el mapa
        this.mapa = this.inicializarMapa();

    }

    inicializarMapa() {
         // Inicializar y obtener la propiedad del mapa
         const map = L.map('mapa').setView([19.390519, -99.3739778], 6);
         const enlaceMapa = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
         L.tileLayer(
             'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; ' + enlaceMapa + ' Contributors',
             maxZoom: 18,
             }).addTo(map);

         return map;

    }

    mostrarEstablecimientos(){
        this.api.obtenerDatos()
            .then(datos => {
                const resultados = datos.results;

                this.mostrarPines(resultados);
            });
    }

    mostrarPines(datos){
        // Limpiar marcadores
        this.markers.clearLayers();

        // Recorrer establecimientos
        datos.forEach(dato => {
            // Destructuring
            const {latitude, longitude, calle, regular, premium} = dato;

            // Crear popup
            const opcionesPopUp = L.popup()
                .setContent(`<p>Calle: ${calle}</p>
                            <p><b>Regular:</b> $${regular}</p>
                            <p><b>Premium:</b> $${premium}</p>
                `);

            // Agregar pin
            const marker = new L.marker([
                parseFloat(latitude),
                parseFloat(longitude)
            ]).bindPopup(opcionesPopUp);
            this.markers.addLayer(marker);
        });

        this.markers.addTo(this.mapa);
    }

    obtenerSugerencias(busqueda){
        this.api.obtenerDatos()
            .then(datos => {
                const resultados = datos.results;

                // Filtrar busqueda
                this.filtrarSugerencias(resultados, busqueda);
            });
    }

    // Filtra sugerencias
    filtrarSugerencias(datos, busqueda) {
        const filtro = datos.filter(establecimiento => establecimiento.calle.indexOf(busqueda) !== -1);

        // Mostrar mostrar
        this.mostrarPines(filtro);
    }
}
