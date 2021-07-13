$(document).ready(function () {
    $('#nombreUsuario').text(localStorage.getItem('nombre'));
    $("#registrar").click(function (e) {
        $("#verSupervisor" ).hide();
        $("#buscar").hide();
        $("#verInforme").hide();
        $("#registrarTabla").show();
        
        e.preventDefault();
        
    });

    $("#ver").click(function (e) {
        $("#registrarTabla").hide();
        $("#verInforme").hide();
        $("#verSupervisor" ).show();
        $("#buscar").hide();
        $.post("http://localhost:3000/verSupervisores", {'token': localStorage.getItem('token')}).done((data) => {
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
        e.preventDefault();
    });

    $("#informes").click(function (e) {
        $("#registrarTabla").hide();
        $("#verSupervisor" ).hide();
        $("#verInforme").show();
        $("#buscar").show();
        e.preventDefault();
        
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
            $.post("http://localhost:3000/administradores-registrar", {'cedula': $('input').eq(0).val(),'primerNombre': $('input').eq(1).val(),
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

    $('#btn-buscar').click(function (e) { 
        if ($('#inputCorreo').val() != '') {
            $.post("http://localhost:3000/vertrabajos", {'correo': $('#inputCorreo').val(),'token': localStorage.getItem('token')}
            ).done((data) => {
                var estado, fecha
                var plantilla = ``
                for (let i = 0; i < data.length; i++) {
                    console.log(data[i])
                    if (data[i].completado) {
                        estado = 'completado'
                    }else{
                        estado = 'en proceso'
                    }
                    fecha = data[i].fecha.split('T')[0]
                    plantilla += `
                    <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 my-2 trabajo" >
                        <div class="titulo py-3">
                            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12" style="display: inline-block;">trabajo: ${i}</div>
                            <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12" style="display: inline-block;">
                                fecha: ${fecha}
                            </div>
                        </div>
                        <div class="cuerpo px-5 py-3">
                            <div>codigo libre: ${data[i].codigoLibre}</div>
                            <div>tipo de trabajo: ${data[i].tipoTrabajo}</div>
                            <div>codigo de trabajo: ${data[i].codigoTrabajo}</div>
                            <div>ubicacion: ${data[i].ubicacion}</div>
                            <div>estado: ${estado}</div>
                        </div>
                        <div id="${data[i].idTrabajo}" class="col-lg-12 col-md-12 col-sm-12 col-xs-12 my-4 pdf" style="text-align: center; cursor: pointer;"> Descargar <i class="fa fa-download" aria-hidden="true"></i></div>
                    </div>
                        <script>
                            $('#'+${data[i].idTrabajo}).click(function(e){
                                window.open('verInforme.html', '_blank')
                                localStorage.setItem('pdf', e.currentTarget.id)
                            })
                        </script>

                     `
                }   
                $('#verInforme').html(plantilla);
            }).catch((e) => {
                console.log(e)
            });
        }else{
            alert('el campo esta vacio')
        }
    });

});