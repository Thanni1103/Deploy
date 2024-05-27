// Espera a que el documento HTML esté completamente cargado antes de ejecutar el código
$(document).ready(function() {

    // Obtiene el usuario actualmente autenticado del almacenamiento local o establece false si no hay usuario autenticado
    const userSuccess = JSON.parse(localStorage.getItem('login_success')) || false

    // Asigna un evento de clic al elemento con id 'loginLink'
    $('#loginLink').click(function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del enlace
        // Redirige a la página de inicio de sesión
        window.location.href = '/login';
    });

    // Asigna un evento de clic al elemento con id 'registerLink'
    $('#registerLink').click(function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del enlace
        // Redirige a la página de registro
        window.location.href = '/register';
    });

    // Asigna un evento de envío al formulario con id 'loginForm'
    $('#loginForm').submit(function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        // Obtiene los valores de los campos de entrada
        let username = $('#user').val();
        let password = $('#password').val();

        // Realiza una solicitud POST al servidor con los datos de inicio de sesión
        $.post('/login', {username: username, password: password}, function(response) {
            // Verifica si el usuario existe en la respuesta del servidor
            if (response.exists) {
                // Redirige a la página de inicio
                localStorage.setItem('login_success', JSON.stringify(username))
                window.location.href = '/';
            } else {
                // Muestra un mensaje de error utilizando la librería Swal
                Swal.fire('Usuario no encontrado', 'El usuario no existe.', 'error');
            }
        });
    });

    // Asigna un evento de envío al formulario con id 'registerForm'
    $('#registerForm').submit(function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        // Obtiene los valores de los campos de entrada
        let nombresApellidos = $('#nombresApellidos').val();
        let usuario = $('#usuario').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let confirmPassword = $('#confirmPassword').val();
        let tipoDocumento = $('#tipoDocumento').val();
        let documento = $('#documento').val();

    
        // Verifica si las contraseñas coinciden
        if (password !== confirmPassword) {
            // Muestra un mensaje de error utilizando la librería Swal
            Swal.fire('Contraseñas no coinciden', 'Las contraseñas no coinciden.', 'error');
            return; // Sale de la función si las contraseñas no coinciden
        }
    
        // Realiza una solicitud AJAX al servidor para registrar un nuevo usuario
        $.ajax({
            url: '/register',
            type: 'POST',
            data: { nombresApellidos: nombresApellidos, 
                usuario:usuario,
                email:email,
                password:password,
                confirmPassword:confirmPassword,
                tipoDocumento:tipoDocumento,
                documento:documento,
             },
            // Función a ejecutar si la solicitud es exitosa
            success: function(response) {
                // Verifica si el usuario se registró correctamente
                if (response.registered) {
                    // Muestra un mensaje de éxito utilizando la librería Swal
                    Swal.fire('Registro exitoso', '¡Usuario registrado correctamente!', 'success').then(() => {
                        // Redirige a la página de inicio de sesión después de que se cierre el mensaje de éxito
                        window.location.href = '/login';
                    });
                } else {
                    // Muestra un mensaje de error utilizando la librería Swal
                    Swal.fire('Error', 'La creación del usuario fallo', 'error');
                }
            },
            // Función a ejecutar si hay un error en la solicitud
            error: function(xhr, status, error) {
                // Muestra un mensaje de error utilizando la librería Swal
                Swal.fire('Error', 'El usuario ya está registrado.', 'error');
            }
        });
    });
});

