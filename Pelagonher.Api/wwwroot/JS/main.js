// Frontend/JS/main.js

document.addEventListener('DOMContentLoaded', () => {
    // Función para cargar un componente HTML
    async function loadComponent(placeholderId, componentPath) {
        try {
            const response = await fetch(componentPath);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const html = await response.text();
            document.getElementById(placeholderId).innerHTML = html;
            return true; // Indicamos que la carga fue exitosa
        } catch (error) {
            console.error(`Error al cargar el componente ${componentPath}:`, error);
            return false; // Indicamos que hubo un error
        }
    }

    // --- Lógica para el manejo de Skins ---

    // Función auxiliar para actualizar el texto del botón del tema
    function updateThemeToggleText(skin) {
        const btn = document.getElementById('theme-toggle-btn');
        if (btn) {
            if (skin === 'skin-ciberpunk') {
                btn.textContent = 'Cambiar a Desierto';
            } else {
                btn.textContent = 'Cambiar a Ciberpunk';
            }
        }
    }

    // Inicializar y cargar los componentes
    async function initializeApp() {
        // Cargar Header y luego inicializar la lógica del tema
        const headerLoaded = await loadComponent('header-placeholder', 'JS/Components/header.html'); // Asumo que header.html está en la raíz o ajusta la ruta
        if (headerLoaded) {
            const themeToggleBtn = document.getElementById('theme-toggle-btn');
            if (themeToggleBtn) {
                // Leer el skin guardado en localStorage o usar 'skin-desierto' como predeterminado
                const currentSkin = localStorage.getItem('appSkin') || 'skin-desierto';
                document.body.classList.add(currentSkin); // Aplicar el skin al cargar la página

                // Actualizar el texto del botón según el skin actual
                updateThemeToggleText(currentSkin);

                themeToggleBtn.addEventListener('click', () => {
                    const body = document.body;
                    let newSkin = '';

                    // Si actualmente es "Desierto", cambiar a "Ciberpunk"
                    if (body.classList.contains('skin-desierto')) {
                        body.classList.remove('skin-desierto');
                        newSkin = 'skin-ciberpunk';
                    }
                    // Si actualmente es "Ciberpunk", cambiar a "Desierto"
                    else if (body.classList.contains('skin-ciberpunk')) {
                        body.classList.remove('skin-ciberpunk');
                        newSkin = 'skin-desierto';
                    } else {
                        // Si no tiene ninguna clase de skin, por defecto va a Desierto
                        newSkin = 'skin-desierto';
                    }

                    body.classList.add(newSkin); // Añadir la nueva clase de skin
                    localStorage.setItem('appSkin', newSkin); // Guardar la preferencia en localStorage
                    updateThemeToggleText(newSkin); // Actualizar el texto del botón
                });
            } else {
                console.warn('Botón de cambio de tema (theme-toggle-btn) no encontrado en el header.');
            }
        }

        // Cargar Sidebar y Footer (pueden cargarse en paralelo o después del header)
        await loadComponent('sidebar-placeholder', 'JS/Components/sidebar.html'); // Asumo que sidebar.html está en la raíz o ajusta la ruta
        await loadComponent('footer-placeholder', 'JS/Components/footer.html');   // Asumo que footer.html está en la raíz o ajusta la ruta
    }

    // Iniciar la aplicación
    initializeApp();
});