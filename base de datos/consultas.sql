/* 
	operaciones del administrador 
*/

/* registrar un administrador*/
insert into 
administrador(
	idAdmin,
    cedula,
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    genero,
    foto,
    correo,
    contrasena) 
values (1, 1000000000, 'pedro', '', 'hernandez', 'parra', 'm', 'http://foto.com/profile.jpg', 'example@gmail.com', 'encriptada');

/* actualizar información del administrador */
/* actualizar foto */
update administrador set foto = 'http://foto.com/profile1.jpg' where cedula = 1000000000;
/* actualizar contraseña */
update administrador set contrasena = 'encriptada1' where cedula = 1000000000;
/* actualizar correo */
update administrador set correo = 'example1@gmail.com' where cedula = 1000000000;
/* seleccionar datos */
select cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, genero, foto, correo from administrador where cedula = 1000000000;


/* 
	operaciones del supervisor 
*/

/* Registrar supervisores */
insert into 
supervisor(
	idSupervisor,
    idAdmin,
    cedula,
    primerNombre,
    segundoNombre,
    primerApellido,
    segundoApellido,
    genero,
    foto,
    correo,
    contrasena) 
values (1, 1, 1000000001, 'pedro', '', 'hernandez', 'parra', 'm', 'http://foto.com/profile.jpg', 'example@gmail.com', 'encriptada');

/* actualizar información del supervisor */
/* actualizar foto */
update supervisor set foto = 'http://foto.com/profile1.jpg' where cedula = 1000000001;
/* actualizar contraseña */
update supervisor set contrasena = 'encriptada1' where cedula = 1000000001;
/* actualizar correo */
update supervisor set correo = 'example1@gmail.com' where cedula = 1000000001;
/* seleccionar datos */
select cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, genero, foto, correo from supervisor where cedula = 1000000001;

/*
	registrar trabajos del supervisor
*/
/* insertar trabajos */
insert into trabajo(
	idTrabajo,
	idSupervisor,
    codigoLibre,
    tipoTrabajo,
    fecha,
    codigoTrabajo,
    ubicacion,
    completado) 
values (103, 1, 'a001', 'linea de tuberia', CURDATE(), 'a0s5', '100.278.45', 0);
/* seleccionar trabajos */
select t.codigoLibre, t.tipoTrabajo, t.fecha, t.codigoTrabajo, t.ubicacion, t.completado
from supervisor s
inner join trabajo t
on t.idSupervisor = s.idSupervisor
where s.cedula = 1000000001;

/* seccion 1 */
insert into datosTrabajoSeccion1(
	idTrabajo,
	seccion,
    equipo,
    fecha,
    humedadRelativa,
    temperaturaAmbiental,
    temperaturaPlaca,
    puntoRocio,
    rugosidad,
    Aplica,
    datoAplica,
    espesor,
    observacion,
    imagen) 
values (101, 1, 'ssssssssss',  CURDATE(), 20, 12, 14, 5, 1, 1, 5, 20, 'buen trabajo', 'http://foto.com/trabajo.jpg');
/* seleccionar datos del trabajo en la seccion 1 */
select s.seccion, s.equipo, s.fecha, s.humedadRelativa, s.temperaturaAmbiental, s.temperaturaPlaca, s.puntoRocio, s.rugosidad, s.Aplica, s.datoAplica,
    s.espesor, s.observacion, s.imagen 
from datosTrabajoSeccion1 s
inner join trabajo t
on t.idTrabajo = s.idTrabajo
where t.codigoTrabajo = 'a0s2';

/* seccion 2 */
insert into datosTrabajoSeccion2(
	idTrabajo,
	seccion,
    equipo,
    fecha,
    humedadRelativa,
    temperaturaAmbiental,
    temperaturaPlaca,
    puntoRocio,
    Aplica,
    datoAplica,
    espesor,
    observacion,
    imagen) 
values (101, 1, 'ssssssssss',  CURDATE(), 20, 12, 14, 1, 1, 5, 20, 'buen trabajo', 'http://foto.com/trabajo.jpg');
/* seleccionar datos del trabajo en la seccion 2 */
select s.seccion, s.equipo, s.fecha, s.humedadRelativa, s.temperaturaAmbiental, s.temperaturaPlaca, s.puntoRocio, s.Aplica, s.datoAplica,
    s.espesor, s.observacion, s.imagen 
from datosTrabajoSeccion2 s
inner join trabajo t
on t.idTrabajo = s.idTrabajo
where t.codigoTrabajo = 'a0s2';

/* seccion 3 */
insert into datosTrabajoSeccion3(
	idTrabajo,
	seccion,
    equipo,
    fecha,
    observacion,
    imagen) 
values (101, 1, 'ssssssssss',  CURDATE(), 'buen trabajo', 'http://foto.com/trabajo.jpg');
/* seleccionar datos del trabajo en la seccion 1 */
select s.seccion, s.equipo, s.fecha, s.observacion, s.imagen 
from datosTrabajoSeccion3 s
inner join trabajo t
on t.idTrabajo = s.idTrabajo
where t.codigoTrabajo = 'a0s2';

create trigger trabajoCompleto
after insert
on datosTrabajoSeccion3
for each row
update trabajo t
inner join datosTrabajoSeccion3 d
on t.idTrabajo = d.idTrabajo
set completado = 1 
where t.idTrabajo = new.idTrabajo;