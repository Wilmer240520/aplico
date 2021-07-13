$(document).ready(function (){
	$.post("http://localhost:3000/pdf", {idTrabajo: localStorage.getItem('pdf')})
	.done(
        (data) =>{
            $("#cedula").html(data[0][0].cedula)
            $("#genero").html(data[0][0].genero)
            $("#nombre").html(data[0][0].primerNombre + " " + data[0][0].segundoNombre)
            $("#apellido").html(data[0][0].primerApellido + " " + data[0][0].segundoApellido)
            $("#correo").html(data[0][0].correo)

            $("#fecha").html(data[1][0].fecha)
            $("#ubicacion").html(data[1][0].fecha)
            $("#codigo").html(data[1][0].codigoLibre)
            $("#codigot").html(data[1][0].codigoTrabajo)
            $("#estado").html(data[1][0].completado)
            $("#tipo").html(data[1][0].tipoTrabajo)

            if (data[2].length > 0) {
                $("#fecha1").html(data[2][0].fecha)
                $("#equipo1").html(data[2][0].equipo)
                $("#seccion1").html(data[2][0].seccion)
                $("#humedad1").html(data[2][0].humedadRelativa)
                $("#ambiental1").html(data[2][0].temperaturaAmbiental)
                $("#placa1").html(data[2][0].temperaturaPlaca)
                $("#calculo1").html(data[2][0].datoAplica)
                $("#punto1").html(data[2][0].puntoRocio)
                $("#rugosidad1").html(data[2][0].rugosidad)
                $("#aplica1").html(data[2][0].Aplica)
                $("#espesor1").html(data[2][0].espesor)
                $("#observacion1").html(data[2][0].observacion)
                $("#imagen1").attr('src',data[2][0].tipoTrabajo)
            }

            if (data[3].length > 0) {
                $("#fecha2").html(data[3][0].fecha)
                $("#equipo2").html(data[3][0].equipo)
                $("#seccion2").html(data[3][0].seccion)
                $("#humedad2").html(data[3][0].humedadRelativa)
                $("#ambiental2").html(data[3][0].temperaturaAmbiental)
                $("#placa2").html(data[3][0].temperaturaPlaca)
                $("#calculo2").html(data[3][0].datoAplica)
                $("#punto2").html(data[3][0].puntoRocio)
                $("#aplica2").html(data[3][0].Aplica)
                $("#espesor2").html(data[3][0].espesor)
                $("#observacion2").html(data[3][0].observacion)
                $("#imagen2").attr('src',data[3][0].tipoTrabajo)
            }

            if (data[4].length > 0) {
                $("#fecha3").html(data[4][0].fecha)
                $("#equipo3").html(data[4][0].equipo)
                $("#seccion3").html(data[4][0].seccion)
                
                $("#observacion3").html(data[4][0].observacion)
                $("#imagen3").attr('src',data[4][0].tipoTrabajo)
            }
        }
    )
})