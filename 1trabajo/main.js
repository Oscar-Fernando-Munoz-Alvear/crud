let usuarios = []; // Cambiamos el nombre de la variable a 'usuarios'
let editandoIndex = -1; // Cambiamos el nombre de la variable a 'editandoIndex'

function mostrarUsuarios() {
    const tabla = document.getElementById("listaUsuarios");
    tabla.innerHTML = ''; // Limpiar la tabla antes de renderizar

    usuarios.forEach((usuario, index) => {
        tabla.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.edad}</td>
                <td>${usuario.direccion}</td>
                <td>${usuario.telefono}</td>
                <td>${usuario.ocupacion}</td>
                <td class="acciones">
                    <button onclick="editarUsuario(${index})">Editar</button>
                    <button onclick="eliminarUsuario(${index})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}

function agregarUsuario() {
    // Obtener los valores de todos los campos
    const nombre = document.getElementById("nombre").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const edad = document.getElementById("edad").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const ocupacion = document.getElementById("ocupacion").value.trim();

    // Validar que al menos el nombre y correo no estén vacíos (puedes añadir más validaciones)
    if (nombre === "" || correo === "") {
        return alert("Por favor, ingresa el nombre y el correo.");
    }

    // Crear un objeto usuario
    const nuevoUsuario = {
        nombre: nombre,
        correo: correo,
        edad: edad,
        direccion: direccion,
        telefono: telefono,
        ocupacion: ocupacion
    };

    if (editandoIndex === -1) {
        usuarios.push(nuevoUsuario); // Crear nuevo usuario
    } else {
        usuarios[editandoIndex] = nuevoUsuario; // Actualizar usuario existente
        editandoIndex = -1; // Restablecer el estado de edición
    }

    // Limpiar todos los campos del formulario
    document.getElementById("nombre").value = "";
    document.getElementById("correo").value = "";
    document.getElementById("edad").value = "";
    document.getElementById("direccion").value = "";
    document.getElementById("telefono").value = "";
    document.getElementById("ocupacion").value = "";

    mostrarUsuarios(); // Actualizar la tabla
}

function editarUsuario(index) {
    const usuarioAEditar = usuarios[index];

    // Cargar los datos del usuario en los campos del formulario
    document.getElementById("nombre").value = usuarioAEditar.nombre;
    document.getElementById("correo").value = usuarioAEditar.correo;
    document.getElementById("edad").value = usuarioAEditar.edad;
    document.getElementById("direccion").value = usuarioAEditar.direccion;
    document.getElementById("telefono").value = usuarioAEditar.telefono;
    document.getElementById("ocupacion").value = usuarioAEditar.ocupacion;

    editandoIndex = index; // Establecer el índice del usuario que se está editando
}

function eliminarUsuario(index) {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
        usuarios.splice(index, 1); // Eliminar el usuario del arreglo
        mostrarUsuarios(); // Actualizar la tabla
    }
}

// Llama a mostrarUsuarios al cargar la página para mostrar cualquier dato inicial (si lo hubiera)
document.addEventListener('DOMContentLoaded', mostrarUsuarios);