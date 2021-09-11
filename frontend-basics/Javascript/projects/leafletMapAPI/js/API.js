class API {

    async obtenerDatos() {

        const total = 1000;

        const datos = await fetch(`https://api.datos.gob.mx/v1/precio.gasolina.publico?pageSize=${total}`);

        console.log("Datos obtenidos")
        const respuestaJSON = await datos.json();

        return respuestaJSON;
    }
}
