const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const controlador = {}

controlador.login = (req, res, next) => {
	var contrasena =  req.body.contrasena
	req.getConnection((err, conn) => {
		conn.query(`SELECT idAdmin,contrasena, primerNombre, primerApellido FROM administrador where correo = '${req.body.correo}'`, async (err, q) => {
			if (err) {
				res.status(404).send('error con la base de datos')
			}else{
				if(q[0]){
					await bcrypt.compare(contrasena, q[0].contrasena).then((resultado) =>{
						if(resultado){
							jwt.sign({'correo': req.body.correo, 'idAdmin': JSON.parse(JSON.stringify(q[0]))['idAdmin']}, 'secreto', (err, token) => {
								res.status(200).json({
									token,
									'nombre': JSON.parse(JSON.stringify(q[0]))['primerNombre'],
									'apellido': JSON.parse(JSON.stringify(q[0]))['primerApellido']
								})
							})
						}else{
							res.status(200).send('Contraseña incorrecta')
						}
					}).catch((err) => {
						res.status(200).send(err)
					})
				}else{
					res.status(200).send('el correo no se encuentra registrado')
				}
			}
		})
	})
}

controlador.registrar = (req, res, next) =>{
	var contrasenaEncriptada
	console.log(req.body)
	var id
	jwt.verify(req.token, 'secreto', (err, data) => {
		if(err){
			res.sendStatus(403)
		}else{
			req.getConnection( (err, conn) => {
				if(err){
					console.log('aqui perro')
					res.sendStatus(504)
				}else{
					bcrypt.hash(req.body.contrasena, 10).then(async (hash) => {
						contrasenaEncriptada = hash
						console.log(data['idAdmin'])
						await conn.query(
							`INSERT INTO supervisor
							(idAdmin, cedula, primerNombre,segundoNombre, primerApellido, segundoApellido, genero, correo, contrasena)
							VALUES
							("${data['idAdmin']}", "${req.body.cedula}",
							"${req.body.primerNombre}", "${req.body.segundoNombre}", "${req.body.primerApellido}", 
							"${req.body.segundoNombre}",
							"${req.body.genero}", "${req.body.correo}", "${contrasenaEncriptada}")`,
							(err, datas) => {
								console.log(data)
								if (err) {
									console.log(req.body)
									console.log('aqui tambien perro')
									res.send(err)
								}else{
									res.status(200).send(true)
								}
						})
					}).catch((err) => {
						res.status(404).send('error al guardar la contraseña')
					})
				}
			})
		}
	})
}

controlador.supervisor = (req, res, next) => {
	jwt.verify(req.token, 'secreto', (err, data) => {
		if(err){
			res.sendStatus(403)
		}else{
			req.getConnection((err, conn) => {
				if(err){
					res.sendStatus(504)
				}else{
					conn.query(`SELECT cedula, primerNombre, segundoNombre, primerApellido,	segundoApellido, genero, correo, contrasena 
					FROM supervisor where idAdmin = ${data['idAdmin']}`, 
					(err, datas) => {
						res.status(200).send(datas)
					})
				}
			})
		}
	})
}

controlador.trabajos = (req, res) => {
	jwt.verify(req.token, 'secreto', (err, data) => {
		if(err){
			res.sendStatus(403)
		}else{
			req.getConnection((err, conn) => {
				if(err){
					res.sendStatus(504)
				}else{
					conn.query(`SELECT codigoLibre,	tipoTrabajo,fecha,codigoTrabajo,ubicacion,completado 
					FROM trabajo t
					inner join supervisor s
					ON t.idSupervisor = s.idSupervisor
					where correo = '${req.body.correo}'`, 
					(err, datas) => {
						console.log(datas)
						res.status(200).send(datas)
					})
				}
			})
		}
	})
}

controlador.pdf = (req, res) => {
	console.log(req.body.idTrabajo)
	var consulta1 = `SELECT 
						s.cedula, s.primerNombre, s.segundoNombre, s.primerApellido, 
						s.segundoApellido, s.genero, s.correo 
					FROM trabajo t 
					inner join supervisor s 
					on t.idSupervisor = s.idSupervisor 
					WHERE idTrabajo = ${req.body.idTrabajo}`
	var consulta2 = `SELECT 
						codigoLibre, tipoTrabajo, fecha, codigoTrabajo, ubicacion, completado 
					FROM trabajo 
					WHERE idTrabajo = ${req.body.idTrabajo}`
	var consulta3 = `SELECT d1.seccion, d1.equipo, d1.fecha, d1.humedadRelativa, d1.temperaturaAmbiental,
						d1.temperaturaPlaca,d1.puntoRocio,d1.rugosidad,d1.Aplica,d1.datoAplica,
						d1.espesor,d1.observacion,d1.imagen 
					FROM datostrabajoseccion1 d1 
					inner join trabajo t 
					on d1.idTrabajo = t.idTrabajo
					WHERE t.idTrabajo = ${req.body.idTrabajo}`
	var consulta4 = `SELECT d1.seccion, d1.equipo, d1.fecha, d1.humedadRelativa, d1.temperaturaAmbiental,
						d1.temperaturaPlaca,d1.puntoRocio,d1.Aplica,d1.datoAplica,
						d1.espesor,d1.observacion,d1.imagen 
					FROM datostrabajoseccion2 d1 
					inner join trabajo t 
					on d1.idTrabajo = t.idTrabajo
					WHERE t.idTrabajo = ${req.body.idTrabajo}`
	var consulta5 = `SELECT d1.seccion, d1.equipo, d1.fecha, d1.observacion,d1.imagen 
					FROM datostrabajoseccion3 d1 
					inner join trabajo t 
					on d1.idTrabajo = t.idTrabajo
					WHERE t.idTrabajo = ${req.body.idTrabajo}`
	var datos = []
	req.getConnection(async (err, conn) => {
		if (!err) {
			conn.query(consulta1, (err, query) => {
				if (!err) {
					datos.push(query)
					conn.query(consulta2, (err, query) => {
						datos.push(query)
						conn.query(consulta3, (err, query) => {
							datos.push(query)
							conn.query(consulta4, (err, query) => {
								datos.push(query)
								conn.query(consulta5, (err, query) => {
									datos.push(query)
									res.send(datos)
								})
							})
						})
					})
					
				}else{
					res.send(err)
				}
			})
		}else{
			res.sendStatus(403)
		}
	})

}

module.exports = controlador