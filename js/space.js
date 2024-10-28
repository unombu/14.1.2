document.getElementById('btnBuscar').addEventListener('click', buscarImagenes);

//hace que la funcion sea asincronica para poder usar await
async function buscarImagenes() {
    const busqueda = document.getElementById('inputBuscar').value;

    try {
        //await sirve para pausar la ejecución de la función hasta que se resuelva la promesa
        const response = await fetch(`https://images-api.nasa.gov/search?q=${busqueda}`);
        const data = await response.json();
        mostrarResultados(data.collection.items);
    } catch (error) {
        console.error('Error al buscar imágenes:', error);
    }
}

function mostrarResultados(imagenes) {
    const contenedor = document.getElementById('contenedor');
    contenedor.innerHTML = ''; 

    imagenes.forEach(item => {
        const { links, data } = item;

        if (links && data.length > 0) {
            const { title, description, date_created } = data[0];
            const imagen = links[0].href;

            const tarjeta = `
                <div class="col">
                    <div class="card mb-4">
                        <img src="${imagen}" class="card-img-top" alt="Img Not Found"></img>
                        <div class="card-body overflow-auto">
                            <h4 class="card-title">Titulo : ${title}</h4>
                            <p class="card-text"> Descripción : ${description} </p>
                            <p class="card-text">Fecha: ${date_created}</p>
                        </div>
                    </div>
                </div>
            `;

            contenedor.innerHTML += tarjeta;
        }
    });
}