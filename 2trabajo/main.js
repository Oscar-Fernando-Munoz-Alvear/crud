function validarFormulario(event) {
            // Prevenir el envío del formulario por defecto para manejar la validación con JS
            event.preventDefault();

            // Limpiar mensajes de error previos
            document.getElementById('errorNombre').textContent = '';
            document.getElementById('errorCorreo').textContent = '';
            document.getElementById('errorContrasena').textContent = '';
            document.getElementById('errorEdad').textContent = '';
            document.getElementById('errorTelefono').textContent = '';
            document.getElementById('mensajeExito').textContent = '';

            // Obtener los valores de los campos
            const nombreCompleto = document.getElementById('nombreCompleto').value.trim();
            const correo = document.getElementById('correo').value.trim();
            const contrasena = document.getElementById('contrasena').value; // No trimear contraseña
            const edad = document.getElementById('edad').value; // Es un número, no trimear directamente el valor
            const telefono = document.getElementById('telefono').value.trim();

            let esValido = true; // Variable para controlar si el formulario es válido

            // 1. Validación: Nombre completo
            // Obligatorio, mínimo 3 caracteres
            if (nombreCompleto === '') {
                document.getElementById('errorNombre').textContent = 'El nombre completo es obligatorio.';
                esValido = false;
            } else if (nombreCompleto.length < 3) {
                document.getElementById('errorNombre').textContent = 'El nombre completo debe tener al menos 3 caracteres.';
                esValido = false;
            }

            // 2. Validación: Correo
            // Obligatorio, formato de correo válido
            const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (correo === '') {
                document.getElementById('errorCorreo').textContent = 'El correo es obligatorio.';
                esValido = false;
            } else if (!regexCorreo.test(correo)) {
                document.getElementById('errorCorreo').textContent = 'El formato del correo no es válido.';
                esValido = false;
            }

            // 3. Validación: Contraseña
            // Obligatoria, mínimo 6 caracteres
            if (contrasena === '') {
                document.getElementById('errorContrasena').textContent = 'La contraseña es obligatoria.';
                esValido = false;
            } else if (contrasena.length < 6) {
                document.getElementById('errorContrasena').textContent = 'La contraseña debe tener al menos 6 caracteres.';
                esValido = false;
            }

            // 4. Validación: Edad
            // Obligatoria, debe ser mayor de 12 años
            const edadNum = parseInt(edad, 10); // Convertir a número entero
            if (edad === '') {
                document.getElementById('errorEdad').textContent = 'La edad es obligatoria.';
                esValido = false;
            } else if (isNaN(edadNum) || edadNum <= 0) { // Comprobar si no es un número válido o es cero/negativo
                document.getElementById('errorEdad').textContent = 'La edad debe ser un número válido.';
                esValido = false;
            } else if (edadNum < 12) {
                document.getElementById('errorEdad').textContent = 'Debe ser mayor de 12 años.';
                esValido = false;
            }

            // 5. Validación: Teléfono
            // Solo números, exactamente 10 dígitos
            const regexTelefono = /^\d{10}$/; // Expresión regular para 10 dígitos numéricos
            if (telefono === '') {
                document.getElementById('errorTelefono').textContent = 'El teléfono es obligatorio.';
                esValido = false;
            } else if (!regexTelefono.test(telefono)) {
                document.getElementById('errorTelefono').textContent = 'El teléfono debe contener exactamente 10 dígitos numéricos.';
                esValido = false;
            }

            // Si todas las validaciones pasan
            if (esValido) {
                document.getElementById('mensajeExito').textContent = '¡Formulario enviado con éxito!';
                // Aquí podrías agregar lógica para enviar los datos a un servidor
                // Por ejemplo: form.submit(); o fetch(...)
                console.log("Formulario válido. Datos:", {
                    nombreCompleto,
                    correo,
                    edad: edadNum,
                    telefono,
                    // No mostrar la contraseña en la consola por seguridad
                });
                // Opcional: limpiar el formulario después del envío exitoso
                document.getElementById('registroForm').reset();
            }

            return esValido; // Devuelve true si es válido, false si no
        }