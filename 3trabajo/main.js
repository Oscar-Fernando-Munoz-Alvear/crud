let libros = []; // Array para almacenar los objetos de libros
        let indiceEditando = -1; // -1 indica que no se está editando, cualquier otro número es el índice del libro a editar

        // Función para mostrar/actualizar la tabla de libros
        function mostrarLibros() {
            const tbody = document.getElementById('listaLibros');
            tbody.innerHTML = ''; // Limpiar el contenido actual de la tabla

            if (libros.length === 0) {
                tbody.innerHTML = '<tr><td colspan="7" style="text-align: center;">No hay libros registrados aún.</td></tr>';
                return;
            }

            libros.forEach((libro, index) => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${libro.titulo}</td>
                    <td>${libro.autor}</td>
                    <td>${libro.anio}</td>
                    <td>${libro.genero}</td>
                    <td>${libro.isbn}</td>
                    <td class="actions-cell">
                        <button class="edit-btn" onclick="editarLibro(${index})">Editar</button>
                        <button class="delete-btn" onclick="eliminarLibro(${index})">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(fila);
            });
        }

        // Función para validar los campos del formulario
        function validarCampos(titulo, autor, anio, genero, isbn) {
            let isValid = true;

            // Limpiar mensajes de error previos
            document.getElementById('errorTitulo').textContent = '';
            document.getElementById('errorAutor').textContent = '';
            document.getElementById('errorAnio').textContent = '';
            document.getElementById('errorGenero').textContent = '';
            document.getElementById('errorIsbn').textContent = '';

            // Validar Título
            if (titulo === '') {
                document.getElementById('errorTitulo').textContent = 'El título es obligatorio.';
                isValid = false;
            }

            // Validar Autor
            if (autor === '') {
                document.getElementById('errorAutor').textContent = 'El autor es obligatorio.';
                isValid = false;
            }

            // Validar Año (número y valor razonable)
            const anioNum = parseInt(anio, 10);
            const currentYear = new Date().getFullYear();
            if (anio === '') {
                document.getElementById('errorAnio').textContent = 'El año es obligatorio.';
                isValid = false;
            } else if (isNaN(anioNum) || anioNum < 1000 || anioNum > currentYear + 5) { // Un rango razonable
                document.getElementById('errorAnio').textContent = 'El año debe ser un número válido (ej: 1984).';
                isValid = false;
            }

            // Validar Género
            if (genero === '') {
                document.getElementById('errorGenero').textContent = 'El género es obligatorio.';
                isValid = false;
            }

            // Validar ISBN (10 o 13 caracteres, solo texto/números, sin espacios)
            const isbnSanitized = isbn.replace(/[-\s]/g, ''); // Eliminar guiones y espacios para la validación
            if (isbn === '') {
                document.getElementById('errorIsbn').textContent = 'El ISBN es obligatorio.';
                isValid = false;
            } else if (!/^[A-Za-z0-9]+$/.test(isbnSanitized)) {
                document.getElementById('errorIsbn').textContent = 'El ISBN solo debe contener caracteres alfanuméricos.';
                isValid = false;
            } else if (isbnSanitized.length !== 10 && isbnSanitized.length !== 13) {
                document.getElementById('errorIsbn').textContent = 'El ISBN debe tener exactamente 10 o 13 caracteres (sin contar guiones).';
                isValid = false;
            }

            return isValid;
        }

        // Función para guardar (agregar o actualizar) un libro
        function guardarLibro() {
            const tituloInput = document.getElementById('titulo');
            const autorInput = document.getElementById('autor');
            const anioInput = document.getElementById('anio');
            const generoInput = document.getElementById('genero');
            const isbnInput = document.getElementById('isbn');

            const titulo = tituloInput.value.trim();
            const autor = autorInput.value.trim();
            const anio = anioInput.value.trim();
            const genero = generoInput.value.trim();
            const isbn = isbnInput.value.trim();

            if (!validarCampos(titulo, autor, anio, genero, isbn)) {
                return; // Detener la ejecución si la validación falla
            }

            const nuevoLibro = {
                titulo: titulo,
                autor: autor,
                anio: parseInt(anio, 10), // Guardar como número
                genero: genero,
                isbn: isbn
            };

            if (indiceEditando === -1) {
                // Modo "Crear"
                libros.push(nuevoLibro);
            } else {
                // Modo "Actualizar"
                libros[indiceEditando] = nuevoLibro;
                indiceEditando = -1; // Resetear el modo edición
                // Cambiar el texto del botón si lo deseas (opcional)
                document.querySelector('button[onclick="guardarLibro()"]').textContent = 'Guardar Libro';
                document.getElementById('titulo').focus(); // Volver a enfocar el primer campo
            }

            // Limpiar formulario
            tituloInput.value = '';
            autorInput.value = '';
            anioInput.value = '';
            generoInput.value = '';
            isbnInput.value = '';

            mostrarLibros(); // Actualizar la vista de la tabla
        }

        // Función para cargar un libro en el formulario para editar
        function editarLibro(index) {
            const libroAEditar = libros[index];

            document.getElementById('titulo').value = libroAEditar.titulo;
            document.getElementById('autor').value = libroAEditar.autor;
            document.getElementById('anio').value = libroAEditar.anio;
            document.getElementById('genero').value = libroAEditar.genero;
            document.getElementById('isbn').value = libroAEditar.isbn;

            indiceEditando = index; // Establecer el índice para el modo edición
            // Opcional: Cambiar el texto del botón para indicar que se está editando
            document.querySelector('button[onclick="guardarLibro()"]').textContent = 'Actualizar Libro';
            document.getElementById('titulo').focus(); // Mover el foco al primer campo del formulario
        }

        // Función para eliminar un libro
        function eliminarLibro(index) {
            if (confirm('¿Estás seguro de eliminar el libro "' + libros[index].titulo + '"?')) {
                libros.splice(index, 1); // Eliminar el elemento del array
                mostrarLibros(); // Actualizar la vista
                // Si estábamos editando el libro eliminado, salir del modo edición
                if (indiceEditando === index) {
                    indiceEditando = -1;
                    document.querySelector('button[onclick="guardarLibro()"]').textContent = 'Guardar Libro';
                    // Limpiar formulario si el libro editado fue eliminado
                    document.getElementById('titulo').value = '';
                    document.getElementById('autor').value = '';
                    document.getElementById('anio').value = '';
                    document.getElementById('genero').value = '';
                    document.getElementById('isbn').value = '';
                     // Limpiar mensajes de error previos al salir del modo edición
                    document.getElementById('errorTitulo').textContent = '';
                    document.getElementById('errorAutor').textContent = '';
                    document.getElementById('errorAnio').textContent = '';
                    document.getElementById('errorGenero').textContent = '';
                    document.getElementById('errorIsbn').textContent = '';
                }
            }
        }

        // Inicializar la tabla al cargar la página
        document.addEventListener('DOMContentLoaded', mostrarLibros);