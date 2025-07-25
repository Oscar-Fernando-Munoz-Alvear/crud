let peliculas = []; // Array para almacenar los objetos de películas
        let indiceEditando = -1; // -1 indica que no se está editando

        // Función para mostrar/actualizar la tabla de películas
        function mostrarPeliculas() {
            const tbody = document.getElementById('listaPeliculas');
            tbody.innerHTML = ''; // Limpiar el contenido actual de la tabla

            if (peliculas.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #777;">No hay películas registradas aún.</td></tr>';
                return;
            }

            peliculas.forEach((pelicula, index) => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${pelicula.titulo}</td>
                    <td>${pelicula.director}</td>
                    <td>${pelicula.anioEstreno}</td>
                    <td>${pelicula.genero}</td>
                    <td>${pelicula.calificacion}</td>
                    <td class="actions-cell">
                        <button class="edit-btn" onclick="editarPelicula(${index})">Editar</button>
                        <button class="delete-btn" onclick="eliminarPelicula(${index})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(fila);
            });
        }

        // Función para validar los campos del formulario
        function validarCampos(titulo, director, anioEstreno, genero, calificacion) {
            let isValid = true;

            // Limpiar mensajes de error previos
            document.getElementById('errorTitulo').textContent = '';
            document.getElementById('errorDirector').textContent = '';
            document.getElementById('errorAnioEstreno').textContent = '';
            document.getElementById('errorGenero').textContent = '';
            document.getElementById('errorCalificacion').textContent = '';

            // Validar Título
            if (titulo === '') {
                document.getElementById('errorTitulo').textContent = 'El título es obligatorio.';
                isValid = false;
            }

            // Validar Director
            if (director === '') {
                document.getElementById('errorDirector').textContent = 'El director es obligatorio.';
                isValid = false;
            }

            // Validar Año de estreno (número y valor razonable)
            const anioNum = parseInt(anioEstreno, 10);
            const currentYear = new Date().getFullYear();
            if (anioEstreno === '') {
                document.getElementById('errorAnioEstreno').textContent = 'El año de estreno es obligatorio.';
                isValid = false;
            } else if (isNaN(anioNum) || anioNum < 1888 || anioNum > currentYear + 5) { // Primera película conocida es de 1888
                document.getElementById('errorAnioEstreno').textContent =
  `El año debe ser un número válido (ej: 2020) entre 1888 y ${currentYear + 5}.`;
                isValid = false;
            }

            // Validar Género
            if (genero === '') {
                document.getElementById('errorGenero').textContent = 'El género es obligatorio.';
                isValid = false;
            }

            // Validar Calificación (número entre 1 y 10)
            const calificacionNum = parseInt(calificacion, 10);
            if (calificacion === '') {
                document.getElementById('errorCalificacion').textContent = 'La calificación es obligatoria.';
                isValid = false;
            } else if (isNaN(calificacionNum) || calificacionNum < 1 || calificacionNum > 10) {
                document.getElementById('errorCalificacion').textContent = 'La calificación debe ser un número entre 1 y 10.';
                isValid = false;
            }

            return isValid;
        }

        // Función para guardar (agregar o actualizar) una película
        function guardarPelicula() {
            const tituloInput = document.getElementById('titulo');
            const directorInput = document.getElementById('director');
            const anioEstrenoInput = document.getElementById('anioEstreno');
            const generoInput = document.getElementById('genero');
            const calificacionInput = document.getElementById('calificacion');

            const titulo = tituloInput.value.trim();
            const director = directorInput.value.trim();
            const anioEstreno = anioEstrenoInput.value.trim();
            const genero = generoInput.value.trim();
            const calificacion = calificacionInput.value.trim();

            if (!validarCampos(titulo, director, anioEstreno, genero, calificacion)) {
                return; // Detener la ejecución si la validación falla
            }

            const nuevaPelicula = {
                titulo: titulo,
                director: director,
                anioEstreno: parseInt(anioEstreno, 10),
                genero: genero,
                calificacion: parseInt(calificacion, 10)
            };

            if (indiceEditando === -1) {
                // Modo "Crear"
                peliculas.push(nuevaPelicula);
            } else {
                // Modo "Actualizar"
                peliculas[indiceEditando] = nuevaPelicula;
                indiceEditando = -1; // Resetear el modo edición
                document.querySelector('button[onclick="guardarPelicula()"]').textContent = 'Guardar Película';
                document.getElementById('titulo').focus();
            }

            // Limpiar formulario
            tituloInput.value = '';
            directorInput.value = '';
            anioEstrenoInput.value = '';
            generoInput.value = '';
            calificacionInput.value = '';

            mostrarPeliculas(); // Actualizar la vista de la tabla
        }

        // Función para cargar una película en el formulario para editar
        function editarPelicula(index) {
            const peliculaAEditar = peliculas[index];

            document.getElementById('titulo').value = peliculaAEditar.titulo;
            document.getElementById('director').value = peliculaAEditar.director;
            document.getElementById('anioEstreno').value = peliculaAEditar.anioEstreno;
            document.getElementById('genero').value = peliculaAEditar.genero;
            document.getElementById('calificacion').value = peliculaAEditar.calificacion;

            indiceEditando = index; // Establecer el índice para el modo edición
            document.querySelector('button[onclick="guardarPelicula()"]').textContent = 'Actualizar Película';
            document.getElementById('titulo').focus();
        }

        // Función para eliminar una película
        function eliminarPelicula(index) {
            if (confirm('¿Estás seguro de eliminar la película "' + peliculas[index].titulo + '"?')){
                peliculas.splice(index, 1); // Eliminar el elemento del array
                mostrarPeliculas(); // Actualizar la vista
                // Si estábamos editando la película eliminada, salir del modo edición
                if (indiceEditando === index) {
                    indiceEditando = -1;
                    document.querySelector('button[onclick="guardarPelicula()"]').textContent = 'Guardar Película';
                    // Limpiar formulario si la película editada fue eliminada
                    document.getElementById('titulo').value = '';
                    document.getElementById('director').value = '';
                    document.getElementById('anioEstreno').value = '';
                    document.getElementById('genero').value = '';
                    document.getElementById('calificacion').value = '';
                    // Limpiar mensajes de error previos al salir del modo edición
                    document.getElementById('errorTitulo').textContent = '';
                    document.getElementById('errorDirector').textContent = '';
                    document.getElementById('errorAnioEstreno').textContent = '';
                    document.getElementById('errorGenero').textContent = '';
                    document.getElementById('errorCalificacion').textContent = '';
                }
            }
        }

        // Inicializar la tabla al cargar la página
        document.addEventListener('DOMContentLoaded', mostrarPeliculas);