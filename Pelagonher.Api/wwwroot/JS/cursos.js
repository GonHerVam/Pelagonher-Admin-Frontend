document.addEventListener('DOMContentLoaded', () => {
    const cursosTableBody = document.querySelector('#cursos-table tbody');
    const addCursoBtn = document.getElementById('add-curso-btn');
    const cursoFormContainer = document.getElementById('curso-form-container');
    const cursoForm = document.getElementById('curso-form');
    const cancelCursoBtn = document.getElementById('cancel-curso-btn');
    const saveCursoBtn = document.getElementById('save-curso-btn');
    const cursoIdInput = document.getElementById('curso-id');
    const nombreCursoInput = document.getElementById('nombre-curso');
    const descripcionCursoInput = document.getElementById('descripcion-curso');
    const duracionCursoInput = document.getElementById('duracion-curso');
    const fechaInicioCursoInput = document.getElementById('fecha-inicio-curso');
    const API_BASE_URL = 'https://pelagonher.com.ar/api/cursos'; // URL base de la API (simulada)

    // --- Datos Simulados (¡Aquí simulamos la API!) ---
    let cursos = [
        {
            ID_CURSO: 1,
            NOMBRE_CURSO: 'Introducción al Diseño de Jardines',
            DESCRIPCION_CURSO: 'Aprende los principios básicos del diseño de espacios verdes.',
            DURACION: '40 horas',
            FECHA_INICIO: '2025-08-01'
        },
        {
            ID_CURSO: 2,
            NOMBRE_CURSO: 'Botánica para Paisajistas',
            DESCRIPCION_CURSO: 'Identificación y uso de especies vegetales en el paisajismo.',
            DURACION: '60 horas',
            FECHA_INICIO: '2025-09-15'
        },
        {
            ID_CURSO: 3,
            NOMBRE_CURSO: 'Sistemas de Riego Eficientes',
            DESCRIPCION_CURSO: 'Diseño e implementación de sistemas de riego automáticos.',
            DURACION: '30 horas',
            FECHA_INICIO: '2025-10-01'
        }
    ];

    let currentCursoId = null; // Para saber si estamos editando o creando

    // --- Funciones del CRUD (Simuladas) ---

    // Mostrar todos los cursos en la tabla
    function displayCursos() {
        cursosTableBody.innerHTML = ''; // Limpiar la tabla
        cursos.forEach(curso => {
            const row = cursosTableBody.insertRow();
            row.dataset.id = curso.ID_CURSO; // Para identificar la fila al editar/eliminar

            row.insertCell(0).textContent = curso.ID_CURSO;
            row.insertCell(1).textContent = curso.NOMBRE_CURSO;
            row.insertCell(2).textContent = curso.DESCRIPCION_CURSO;
            row.insertCell(3).textContent = curso.DURACION;
            // Formatear la fecha para que se vea bien
            const fecha = new Date(curso.FECHA_INICIO);
            row.insertCell(4).textContent = fecha.toLocaleDateString('es-AR');

            const actionsCell = row.insertCell(5);
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.classList.add('action-btn', 'edit-btn'); // Añade una clase para estilos si quieres
            editBtn.addEventListener('click', () => editCurso(curso.ID_CURSO));
            actionsCell.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.classList.add('action-btn', 'delete-btn'); // Añade una clase para estilos si quieres
            deleteBtn.addEventListener('click', () => deleteCurso(curso.ID_CURSO));
            actionsCell.appendChild(deleteBtn);
        });
    }

    // Abrir formulario para un nuevo curso
    function openNewCursoForm() {
        currentCursoId = null; // No hay curso seleccionado para edición
        cursoForm.reset(); // Limpiar formulario
        saveCursoBtn.textContent = 'Guardar Curso';
        cursoFormContainer.style.display = 'block'; // Mostrar el formulario
    }

    // Editar un curso existente
    function editCurso(id) {
        currentCursoId = id;
        const cursoToEdit = cursos.find(c => c.ID_CURSO === id);
        if (cursoToEdit) {
            cursoIdInput.value = cursoToEdit.ID_CURSO;
            nombreCursoInput.value = cursoToEdit.NOMBRE_CURSO;
            descripcionCursoInput.value = cursoToEdit.DESCRIPCION_CURSO;
            duracionCursoInput.value = cursoToEdit.DURACION;
            // Formatear la fecha para el input type="date" (YYYY-MM-DD)
            fechaInicioCursoInput.value = cursoToEdit.FECHA_INICIO;

            saveCursoBtn.textContent = 'Actualizar Curso';
            cursoFormContainer.style.display = 'block';
        }
    }

    // Eliminar un curso
    function deleteCurso(id) {
        if (confirm('¿Estás seguro de que quieres eliminar este curso?')) {
            cursos = cursos.filter(c => c.ID_CURSO !== id); // Filtrar para eliminar
            displayCursos(); // Volver a mostrar la tabla
            alert('Curso eliminado (simulado).');
        }
    }

    // Manejar el envío del formulario (crear o actualizar)
    cursoForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Evitar el envío por defecto del formulario

        const nuevoCurso = {
            ID_CURSO: currentCursoId || (cursos.length > 0 ? Math.max(...cursos.map(c => c.ID_CURSO)) + 1 : 1), // Generar nuevo ID si es necesario
            NOMBRE_CURSO: nombreCursoInput.value,
            DESCRIPCION_CURSO: descripcionCursoInput.value,
            DURACION: duracionCursoInput.value,
            FECHA_INICIO: fechaInicioCursoInput.value
        };

        if (currentCursoId) {
            // Actualizar curso existente
            const index = cursos.findIndex(c => c.ID_CURSO === currentCursoId);
            if (index !== -1) {
                cursos[index] = nuevoCurso;
                alert('Curso actualizado (simulado).');
            }
        } else {
            // Crear nuevo curso
            cursos.push(nuevoCurso);
            alert('Curso agregado (simulado).');
        }

        cursoFormContainer.style.display = 'none'; // Ocultar formulario
        displayCursos(); // Recargar la tabla
    });

    // Manejar el botón de cancelar en el formulario
    cancelCursoBtn.addEventListener('click', () => {
        cursoFormContainer.style.display = 'none'; // Ocultar formulario
    });

    // --- Inicialización ---
    addCursoBtn.addEventListener('click', openNewCursoForm); // Al hacer clic en "Agregar Nuevo Curso"
    displayCursos(); // Cargar los cursos al iniciar la página
});