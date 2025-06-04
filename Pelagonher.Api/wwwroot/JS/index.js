document.addEventListener('DOMContentLoaded', async () => {
    const cursosListContainer = document.getElementById('cursos-list-container');

    // Función para cargar los cursos desde la API
    async function loadCursos() {
        cursosListContainer.innerHTML = '<p>Cargando cursos...</p>'; // Mensaje de carga

        try {
            // Asumiendo que tu API está corriendo localmente en un puerto como 5000 o 7000
            // y que los DNS de producción aún no están listos.
            // Necesitarás cambiar esta URL cuando tu API esté en un dominio real.
            const response = await fetch('http://localhost:5500/api/Cursos'); // O http://localhost:5500/api/Cursos, etc.

            if (!response.ok) {
                // Si la respuesta no es 2xx, lanzar un error
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const cursos = await response.json(); // Convertir la respuesta a JSON

            if (cursos.length === 0) {
                cursosListContainer.innerHTML = '<p>No hay cursos disponibles en este momento.</p>';
                return;
            }

            cursosListContainer.innerHTML = ''; // Limpiar el mensaje de carga

            // Iterar sobre los cursos y crear una tarjeta para cada uno
            cursos.forEach(curso => {
                const cursoCard = document.createElement('div');
                cursoCard.classList.add('curso-card');

                // Formatear la fecha
                const fechaInicio = curso.fecha_INICIO ? new Date(curso.fecha_INICIO).toLocaleDateString() : 'N/A';

                cursoCard.innerHTML = `
                    <h3>${curso.nombre_CURSO}</h3>
                    <p>${curso.descripcion_CURSO || 'Sin descripción.'}</p>
                    <p class="duracion">Duración: ${curso.duracion || 'N/A'}</p>
                    <p class="fecha-inicio">Fecha de Inicio: ${fechaInicio}</p>
                    <a href="#" class="ver-detalles-btn">Ver Detalles</a>
                `;
                // NOTA: 'Ver Detalles' por ahora es un enlace vacío.
                // Podríamos hacerlo llevar a una página de detalle de curso si la creamos,
                // o mostrar más información en un modal. Por ahora, es un placeholder.

                cursosListContainer.appendChild(cursoCard);
            });

        } catch (error) {
            console.error('Error al cargar los cursos:', error);
            cursosListContainer.innerHTML = '<p>Error al cargar los cursos. Por favor, intente de nuevo más tarde.</p>';
        }
    }

    // Cargar los cursos cuando el DOM esté listo
    loadCursos();
});