$(document).ready(function () {
    $('#administradores').click(function (e) { 
        $('#formularioRegistrar').hide()
        $('#verAdministradores').show()
        $.post("http://localhost:3000/administradores", {'token': localStorage.getItem('token')}).done((data) => {
            var fila = ``
            for (let i in data) {
                //cedula, primerNombre, segundoNombre, primerApellido,	segundoApellido, genero, foto, correo
                fila += `<tr class="trTable">`
                fila += `<td class="tdTable"> ${data[i].cedula} </td>`
                fila += `<td class="tdTable"> ${data[i].primerNombre} </td>`
                fila += `<td class="tdTable"> ${data[i].segundoNombre} </td>`
                fila += `<td class="tdTable"> ${data[i].primerApellido} </td>`
                fila += `<td class="tdTable"> ${data[i].segundoApellido} </td>`
                fila += `<td class="tdTable"> ${data[i].genero} </td>`
                fila += `<td class="tdTable"> ${data[i].correo} </td>`
                fila += `</tr>`
            }
            $('#dataTable tbody').html(fila)
        }).catch((e) => {
            console.log(e)
        })
    });
    $('#registrar').click(function (e) { 
        $('#formularioRegistrar').show()
        $('#verAdministradores').hide()
    });
    $("#enviar").click(function (e) {
        e.preventDefault();
        var validar = true
        for (let i = 0; i < 7; i++) {
            if ($('input').eq(i).val() == '') {
                if (i != 2 ) {
                    console.log($('input').eq(i).val(), i)
                    validar = false
                    break;
                }
            }
        }
        if (!validar) {
            alert('hay campos vacios')
        }else{
            $.post("http://localhost:3000/registrar-administradores", {'cedula': $('input').eq(0).val(),'primerNombre': $('input').eq(1).val(),
            'segundoNombre': $('input').eq(2).val(),'primerApellido': $('input').eq(3).val(),
            'segundoApellido': $('input').eq(4).val(), 'genero': $('#cars').val(),
            'correo': $('input').eq(5).val(), 'contrasena': $('input').eq(6).val(),
            'token': localStorage.getItem('token')}
            ).done((data) => {
                $('input[type="text"], input[type="number"], input[type="email"], input[type="password"]').val('')
                alert('administrador agregador')
            }).catch((e) => {
                console.log(e)
            });
        }
    });
    $('#logout').click(function (e) { 
        localStorage.removeItem('token')
        localStorage.removeItem('usuario')
    });
});