$(document).ready(function (){
    $('#acceder').click(async function (e) {
        if ($('#Password').val() != ''){
            if($('#Email').val() != ''){
                var correo = $('#Email').val(), contrasena = $('#Password').val()
                await $.post("http://localhost:3000/validar-contrasena-global", 
                {contrasena : contrasena, correo : correo}).done(
                    (data) =>{
                        if(data['token']){
                            localStorage.setItem('token', data['token'])
                            localStorage.setItem('usuario', 's')
                            location.href = "paginas/super-usuario/administracion.html"
                        }
                    }
                )
                if(localStorage.getItem('token') === null){
                    await $.post("http://localhost:3000/login", 
                    {contrasena : contrasena, correo : correo}).done(
                        (data) =>{
                            if(data['token']){
                                localStorage.setItem('token', data['token'])
                                localStorage.setItem('usuario', 'a')
                                localStorage.setItem('nombre', data['nombre'] + ' ' + data['apellido'])
                                location.href = "paginas/administrador/administracion.html"
                            }
                        }
                    )
                }
                if(localStorage.getItem('token') === null){
                    alert('datos incorrectos')
                }
            }else{
                alert('El correo no puede estar vacio')
            }
        }else{
            alert('La contraseña no puede estar vacia')
        }
    })
})