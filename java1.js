document.getElementById('botoncito').addEventListener('click', function () {
    const contraseñaCorrecta = 'NEXORDEV';

    const valor = document.getElementById('contraseña__buton').value.toUpperCase();

    if (valor === contraseñaCorrecta) {
        window.location.href = 'inicio.html';
    }
});




