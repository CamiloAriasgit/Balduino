// fetch-inmuebles.js

document.addEventListener('DOMContentLoaded', () => {
    const inmueblesContainer = document.getElementById('inmuebles-container');
    const loadingMessage = document.getElementById('loading-message');

    // Función para obtener los inmuebles desde la API
    async function fetchInmuebles() {
        try {
            // Muestra el mensaje de carga
            loadingMessage.textContent = 'Cargando inmuebles...';
            loadingMessage.classList.remove('hidden');
            inmueblesContainer.innerHTML = ''; // Limpiar el contenedor antes de cargar

            // Realiza la solicitud GET a tu API
            const response = await fetch('http://localhost:8080/api/inmuebles');

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const inmuebles = await response.json(); // Parsear la respuesta JSON

            // Oculta el mensaje de carga
            loadingMessage.classList.add('hidden');

            if (inmuebles.length === 0) {
                inmueblesContainer.innerHTML = '<p class="col-span-full text-center text-gray-400">No hay inmuebles disponibles. ¡Crea uno!</p>';
                return;
            }

            // Itera sobre cada inmueble y crea su tarjeta HTML
            inmuebles.forEach(inmueble => {
                const inmuebleCard = `
                    <div class="group relative bg-gray-800 p-4 rounded-lg shadow-lg">
                        <div class="aspect-square w-full overflow-hidden rounded-md bg-gray-700 group-hover:opacity-75 lg:aspect-auto lg:h-80">
                            <img src="${inmueble.imagenUrl || 'https://via.placeholder.com/400x300/333333/666666?text=No+Image'}"
                                alt="Imagen de ${inmueble.nombre}"
                                class="h-full w-full object-cover object-center">
                        </div>
                        <div class="mt-4 flex justify-between">
                            <div>
                                <h3 class="text-lg font-semibold text-gray-200">
                                    <a href="#">
                                        <span aria-hidden="true" class="absolute inset-0"></span>
                                        ${inmueble.nombre}
                                    </a>
                                </h3>
                                <p class="mt-1 text-sm text-gray-400">${inmueble.descripcion}</p>
                            </div>
                            <p class="text-lg font-medium text-gray-300">${inmueble.metrosCuadrados}</p>
                        </div>
                    </div>
                `;
                inmueblesContainer.innerHTML += inmuebleCard; // Añade la tarjeta al contenedor
            });

        } catch (error) {
            console.error('Error al obtener los inmuebles:', error);
            loadingMessage.classList.remove('hidden');
            loadingMessage.textContent = `Error al cargar los inmuebles: ${error.message}. Asegúrate de que la API está funcionando.`;
            loadingMessage.classList.add('text-red-500'); // Estilo para mensaje de error
        }
    }

    // Llama a la función para cargar los inmuebles al cargar la página
    fetchInmuebles();
});
