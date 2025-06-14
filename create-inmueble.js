// create-inmueble.js

document.addEventListener('DOMContentLoaded', () => {
    // Obtener una referencia al formulario y al div de mensajes
    const inmuebleForm = document.getElementById('inmuebleForm');
    const messageDiv = document.getElementById('message');

    // Escuchar el evento de envío del formulario
    inmuebleForm.addEventListener('submit', async (event) => {
        // Prevenir el comportamiento por defecto del formulario (recarga de la página)
        event.preventDefault();

        // Limpiar mensajes previos
        messageDiv.textContent = '';
        messageDiv.classList.remove('text-green-500', 'text-red-500');

        // Recopilar los datos del formulario
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const metrosCuadrados = document.getElementById('metrosCuadrados').value;
        const imagenUrl = document.getElementById('imagenUrl').value;

        // Crear un objeto con los datos, asegurándose de que los nombres de las propiedades
        // coincidan con los campos de tu modelo InmuebleIndustrial en Java.
        const inmuebleData = {
            nombre: nombre,
            descripcion: descripcion,
            metrosCuadrados: metrosCuadrados,
            imagenUrl: imagenUrl
        };

        try {
            // Realizar la solicitud POST a tu API
            // La URL de tu API en Spring Boot
            const response = await fetch('http://localhost:8080/api/inmuebles', {
                method: 'POST', // Método HTTP para crear un recurso
                headers: {
                    'Content-Type': 'application/json' // Indicamos que el cuerpo de la solicitud es JSON
                },
                body: JSON.stringify(inmuebleData) // Convertir el objeto JavaScript a una cadena JSON
            });

            // Verificar si la solicitud fue exitosa (código de estado 2xx)
            if (response.ok) {
                const nuevoInmueble = await response.json(); // Parsear la respuesta JSON del servidor
                messageDiv.textContent = `Inmueble "${nuevoInmueble.nombre}" creado con éxito. ID: ${nuevoInmueble.id}`;
                messageDiv.classList.add('text-green-500');

                // Opcional: Limpiar el formulario después de un envío exitoso
                inmuebleForm.reset();

                // Opcional: Redirigir a la página principal después de un tiempo
                // setTimeout(() => {
                //     window.location.href = 'index.html'; // Asegúrate de que esta es la ruta a tu página principal
                // }, 2000);

            } else {
                // Si la respuesta no fue OK, intentar obtener el mensaje de error del servidor
                const errorData = await response.json(); // Intenta leer el cuerpo de error
                messageDiv.textContent = `Error al crear el inmueble: ${errorData.message || response.statusText}`;
                messageDiv.classList.add('text-red-500');
            }
        } catch (error) {
            // Capturar errores de red o cualquier otra excepción
            messageDiv.textContent = `Error de conexión: ${error.message}`;
            messageDiv.classList.add('text-red-500');
            console.error('Error al enviar el formulario:', error);
        }
    });
});
