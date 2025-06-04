document.addEventListener('DOMContentLoaded', () => {
    const alumnosTableBody = document.querySelector('#alumnos-table tbody');
    const addAlumnoBtn = document.getElementById('add-alumno-btn');
    const alumnoFormContainer = document.getElementById('alumno-form-container');
    const alumnoForm = document.getElementById('alumno-form');
    const cancelAlumnoBtn = document.getElementById('cancel-alumno-btn');
    const saveAlumnoBtn = document.getElementById('save-alumno-btn');

    // Referencias a los campos del formulario
    const alumnoIdInput = document.getElementById('alumno-id');
    const nombreAlumnoInput = document.getElementById('nombre-alumno');
    const apellidoAlumnoInput = document.getElementById('apellido-alumno');
    const dniAlumnoInput = document.getElementById('dni-alumno'); // Nuevo
    const correoAlumnoInput = document.getElementById('correo-alumno'); // Nombre de ID ajustado
    const idCursoAlumnoSelect = document.getElementById('id-curso-alumno'); // Nuevo select

    // --- Datos Simulados para Alumnos y Cursos ---
    // (Estos datos simulan lo que vendría de tus APIs de Alumnos y Cursos)
    let alumnos = [
        {
            ID_ALUMNO: 101,
            NOMBRE: 'Ana',
            APELLIDO: 'García',
            DNI: '30123456', // Agregado DNI
            CORREO: 'ana.garcia@example.com',
            ID_CURSO: 1 // Agregado ID_CURSO
        },
        {
            ID_ALUMNO: 102,
            NOMBRE: 'Juan',
            APELLIDO: 'Pérez',
            DNI: '28765432',
            CORREO: 'juan.perez@example.com',
            ID_CURSO: 2
        },
        {
            ID_ALUMNO: 103,
            NOMBRE: 'María',
            APELLIDO: 'Rodríguez',
            DNI: '35987654',
            CORREO: 'maria.rodriguez@example.com',
            ID_CURSO: 1
        }
    ];

    // Datos simulados de cursos para llenar el select (necesarios para referenciar el nombre del curso)
    const cursosSimulados = [
        {
            ID_CURSO: 1,
            NOMBRE_CURSO: 'Introducción al Diseño de Jardines'
        },
        {
            ID_CURSO: 2,
            NOMBRE_CURSO: 'Botánica para Paisajistas'
        },
        {
            ID_CURSO: 3,
            NOMBRE_CURSO: 'Sistemas de Riego Eficientes'
        }
    ];

    let currentAlumnoId = null;

    // --- Funciones del CRUD (Simuladas) ---

    // Función para obtener el nombre del curso a partir de su ID
    function getNombreCursoById(cursoId) {
        const curso = cursosSimulados.find(c => c.ID_CURSO === cursoId);
        return curso ? curso.NOMBRE_CURSO : 'Desconocido';
    }

    // Llenar el select de cursos
    function populateCursosSelect() {
        idCursoAlumnoSelect.innerHTML = '<option value="">Seleccione un curso</option>'; // Opción por defecto
        cursosSimulados.forEach(curso => {
            const option = document.createElement('option');
            option.value = curso.ID_CURSO;
            option.textContent = curso.NOMBRE_CURSO;
            idCursoAlumnoSelect.appendChild(option);
        });
    }

    // Mostrar todos los alumnos en la tabla
    function displayAlumnos() {
        alumnosTableBody.innerHTML = ''; // Limpiar la tabla
        alumnos.forEach(alumno => {
            const row = alumnosTableBody.insertRow();
            row.dataset.id = alumno.ID_ALUMNO;

            row.insertCell(0).textContent = alumno.ID_ALUMNO;
            row.insertCell(1).textContent = alumno.NOMBRE; // Nombre del modelo
            row.insertCell(2).textContent = alumno.APELLIDO; // Apellido del modelo
            row.insertCell(3).textContent = alumno.DNI; // Nuevo campo DNI
            row.insertCell(4).textContent = alumno.CORREO; // Email del modelo
            row.insertCell(5).textContent = getNombreCursoById(alumno.ID_CURSO); // Nombre del curso

            const actionsCell = row.insertCell(6); // Columna de acciones (ahora es la 6ta)
            const editBtn = document.createElement('button');
            editBtn.textContent = 'Editar';
            editBtn.classList.add('action-btn', 'edit-btn');
            editBtn.addEventListener('click', () => editAlumno(alumno.ID_ALUMNO));
            actionsCell.appendChild(editBtn);

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Eliminar';
            deleteBtn.classList.add('action-btn', 'delete-btn');
            deleteBtn.addEventListener('click', () => deleteAlumno(alumno.ID_ALUMNO));
            actionsCell.appendChild(deleteBtn);
        });
    }

    // Abrir formulario para un nuevo alumno
    function openNewAlumnoForm() {
        currentAlumnoId = null;
        alumnoForm.reset();
        alumnoIdInput.value = ''; // Asegurar que el ID esté vacío para nuevos
        saveAlumnoBtn.textContent = 'Guardar Inscripción';
        document.querySelector('#alumno-form-container h2').textContent = 'Formulario de Inscripción';
        alumnoFormContainer.style.display = 'block';
        populateCursosSelect(); // Rellenar el select de cursos cada vez
    }

    // Editar un alumno existente
    function editAlumno(id) {
        currentAlumnoId = id;
        const alumnoToEdit = alumnos.find(a => a.ID_ALUMNO === id);
        if (alumnoToEdit) {
            alumnoIdInput.value = alumnoToEdit.ID_ALUMNO;
            nombreAlumnoInput.value = alumnoToEdit.NOMBRE;
            apellidoAlumnoInput.value = alumnoToEdit.APELLIDO;
            dniAlumnoInput.value = alumnoToEdit.DNI;
            correoAlumnoInput.value = alumnoToEdit.CORREO;
            idCursoAlumnoSelect.value = alumnoToEdit.ID_CURSO; // Seleccionar el curso correcto

            saveAlumnoBtn.textContent = 'Actualizar Inscripción';
            document.querySelector('#alumno-form-container h2').textContent = 'Editar Inscripción';
            alumnoFormContainer.style.display = 'block';
            populateCursosSelect(); // Rellenar el select de cursos
        }
    }

    // Eliminar un alumno
    function deleteAlumno(id) {
        if (confirm('¿Estás seguro de que quieres eliminar este alumno?')) {
            alumnos = alumnos.filter(a => a.ID_ALUMNO !== id);
            displayAlumnos();
            alert('Alumno eliminado (simulado).');
        }
    }

    // Manejar el envío del formulario (crear o actualizar)
    alumnoForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const nuevoAlumno = {
            ID_ALUMNO: currentAlumnoId ? parseInt(currentAlumnoId) : (alumnos.length > 0 ? Math.max(...alumnos.map(a => a.ID_ALUMNO)) + 1 : 1),
            NOMBRE: nombreAlumnoInput.value,
            APELLIDO: apellidoAlumnoInput.value,
            DNI: dniAlumnoInput.value,
            CORREO: correoAlumnoInput.value,
            ID_CURSO: parseInt(idCursoAlumnoSelect.value) // Obtener el ID del curso seleccionado
        };

        if (currentAlumnoId) {
            const index = alumnos.findIndex(a => a.ID_ALUMNO === currentAlumnoId);
            if (index !== -1) {
                alumnos[index] = nuevoAlumno;
                alert('Inscripción actualizada (simulada).');
            }
        } else {
            alumnos.push(nuevoAlumno);
            alert('Alumno inscrito (simulado).');
        }

        alumnoFormContainer.style.display = 'none';
        displayAlumnos();
    });

    // Manejar el botón de cancelar en el formulario
    cancelAlumnoBtn.addEventListener('click', () => {
        alumnoFormContainer.style.display = 'none';
    });

    // --- Inicialización ---
    addAlumnoBtn.addEventListener('click', openNewAlumnoForm);
    populateCursosSelect(); // Llenar el select de cursos al inicio
    displayAlumnos(); // Cargar los alumnos al iniciar la página
});