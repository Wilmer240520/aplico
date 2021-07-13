const controlador = {}
var bcrypt = require('bcrypt')

controlador.loginSupervisor = (req, res, next) => {
	var consulta = 
		`SELECT 
			idSupervisor,
			primerNombre, 
			segundoNombre, 
			primerApellido, 
			segundoApellido, 
			foto, 
			contrasena
	 	FROM supervisor 
	 	WHERE correo="${req.body.correo}"`
	req.getConnection((err, conn) => {
		if (!err) {
			conn.query(consulta, (err, conn) => {
				if (err) {
					console.log(err)
					res.status(404).send('error en la petición')
				}else{
					bcrypt.compare(req.body.contrasena, conn[0].contrasena).then((comparar) => {
						if (comparar) {
							res.status(200).json(
								{"token": comparar,
								"idSupervisor" : conn[0].idSupervisor,  
								"primerNombre": conn[0].primerNombre, 
								"segundoNombre": conn[0].segundoNombre, 
								"primerApellido": conn[0].primerApellido, 
								"segundoApellido": conn[0].segundoApellido, 
								"foto": conn[0].foto
								}
							)
						}else{
							res.status(200).json({"token": comparar })
						}
					}).catch(err => {
						res.status(200).send('error')
					})
				}
			})
		}
	})
}

controlador.trabajos =  (req, res) => {
	var consulta = 
		`SELECT 
			idTrabajo,
			codigoLibre,
		    tipoTrabajo,
		    fecha,
		    codigoTrabajo,
		    ubicacion,
		    completado
	 	FROM trabajo 
	 	INNER JOIN supervisor
	 	ON trabajo.idSupervisor = supervisor.idSupervisor
	 	WHERE correo = "${req.body.correo}" AND completado=0`
	req.getConnection((err, conn) => {
		conn.query(consulta, (err, conn) => {
			if(!err){
				res.status(200).send(conn)
			}else{
				res.status(200).send(err)
			}
		})
	})
}

controlador.secciones = async (req, res) => {
	var consulta1 = 
		`SELECT 
			datosTrabajoSeccion1.idTrabajo,
			seccion,
			datosTrabajoSeccion1.equipo,
		    datosTrabajoSeccion1.fecha,
		    humedadRelativa,
		    temperaturaAmbiental,
		    temperaturaPlaca,
		    puntoRocio,
		    rugosidad,
		    Aplica,
		    datoAplica,
		    espesor,
		    observacion,
		    imagen
	 	FROM datosTrabajoSeccion1 
	 	WHERE datosTrabajoSeccion1.idTrabajo = "${req.body.idTrabajo}"`
 	var consulta2 = 
		`SELECT 
			datosTrabajoSeccion2.idTrabajo,
			seccion,
		    datosTrabajoSeccion2.equipo,
		    datosTrabajoSeccion2.fecha,
		    humedadRelativa,
		    temperaturaAmbiental,
		    temperaturaPlaca,
		    puntoRocio,
		    Aplica,
		    datoAplica,
		    espesor,
		    observacion,
		    imagen
	 	FROM datosTrabajoSeccion2 
	 	WHERE datosTrabajoSeccion2.idTrabajo = "${req.body.idTrabajo}"`
 	var consulta3 = 
		`SELECT 
			datosTrabajoSeccion3.idTrabajo,
		    seccion,
		    datosTrabajoSeccion3.equipo,
		    datosTrabajoSeccion3.fecha,
		    observacion,
		    imagen
	 	FROM datosTrabajoSeccion3 
	 	WHERE datosTrabajoSeccion3.idTrabajo = "${req.body.idTrabajo}"`
 	var s1 = [], s2 = [], s3 = [];
	await req.getConnection((err, conn) => {
		conn.query(consulta1, (err, conn) => {
			if(!err){
				for (var i = 0; i < conn.length; i++) {
					s1.push(conn[i])
				}
			}else{
				res.status(200).send(err)
			}
		})
	})
	await req.getConnection((err, conn) => {
		conn.query(consulta2, (err, conn) => {
			if(!err){
				for (var i = 0; i < conn.length; i++) {
					s2.push(conn[i])
				}
			}else{
				res.status(200).send(err)
			}
		})
	})
	await req.getConnection((err, conn) => {
		conn.query(consulta3, (err, conn) => {
			if(!err){
				for (var i = 0; i < conn.length; i++) {
					s3.push(conn[i])
				}
				var json = 
				[	
					{
						"seccion1" : {
							s1
						},
						"seccion2" : {
							s2
						},
						"seccion3" : {
							s3
						}
					}
				]
				console.log(json)
				res.status(200).send(json)
			}else{
				res.status(200).send(err)
			}
		})
	})
}

controlador.guardarTrabajo = async (req, res) => {
	var idTrabajo = Math.floor(Math.random()*2147483648)+100
	var consulta = 
		`INSERT INTO trabajo
		(idTrabajo, idSupervisor, codigoLibre, tipoTrabajo, fecha, codigoTrabajo, ubicacion, completado)
		VALUES
		("${idTrabajo}", "${req.body.idSupervisor}", "${req.body.codigoLibre}", "${req.body.tipoTrabajo}",
		"${req.body.fecha}", "${req.body.codigoTrabajo}", "${req.body.ubicacion}", "${req.body.completado}")`
	await req.getConnection((err, conn) => {
		conn.query(`SELECT COUNT(*) as r from trabajo where idTrabajo = "${idTrabajo}"`, (err, conn) => {
			if(!err){
				if (parseInt(JSON.stringify(conn[0])[5]) != 0) {
					res.status(200).send("error1")
				}
			}else{
				res.status(200).send(err)
			}
		})
	})
	await req.getConnection((err, conn) => {
		conn.query(consulta, (err, conn) => {
			if(!err){
				res.status(200).send({"idTrabajo": idTrabajo})
			}else{
				res.status(200).send(err)
			}
		})
	})
}

controlador.guardarSesion1 = (req, res) => {
	var consulta = 
		`INSERT INTO datostrabajoseccion1
		(idTrabajo, seccion, equipo, fecha, humedadRelativa, temperaturaAmbiental, temperaturaPlaca, 
		puntoRocio, rugosidad, Aplica, datoAplica, espesor, observacion, imagen)
		VALUES
		("${req.body.idTrabajo}", "1", "${req.body.equipo}", "${req.body.fecha}", "${req.body.humedadRelativa}", 
		"${req.body.temperaturaAmbiental}", "${req.body.temperaturaPlaca}", "${req.body.puntoRocio}", 
		"${req.body.rugosidad}", "${req.body.Aplica}", "${req.body.datoAplica}", "${req.body.espesor}", 
		"${req.body.observacion}", "${req.body.imagen}")`
	req.getConnection((err, conn) => {
		conn.query(consulta, (err, conn) => {
			if(!err){
				res.status(200).send("exitoso")
			}else{
				res.status(200).send(err)
			}
		})
	})
}

controlador.guardarSesion2 = async (req, res) => {
	var consulta = 
		`INSERT INTO datostrabajoseccion2
		(idTrabajo, seccion, equipo, fecha, humedadRelativa, temperaturaAmbiental, temperaturaPlaca,
		  puntoRocio, Aplica, datoAplica, espesor, observacion, imagen)
		VALUES
		("${req.body.idTrabajo}", "2", "${req.body.equipo}", "${req.body.fecha}", "${req.body.humedadRelativa}", 
		"${req.body.temperaturaAmbiental}", "${req.body.temperaturaPlaca}", "${req.body.puntoRocio}", 
		 "${req.body.Aplica}", "${req.body.datoAplica}", "${req.body.espesor}", "${req.body.observacion}", 
		 "${req.body.imagen}")`
	await req.getConnection((err, conn) => {
		conn.query(`SELECT Aplica from datostrabajoseccion1 where idTrabajo = "${req.body.idTrabajo}"`, (err, conn) => {
			if(!err){
				if (JSON.parse(JSON.stringify(conn['0']))['Aplica'] == 0) {
					res.status(200).send("Esta seccion no se puede llenar, la seccion 1 no aplico")
				}else{
					console.log(JSON.parse(JSON.stringify(conn['0']))['Aplica'])
				}
			}else{
				res.status(200).send(err)
			}
		})
	})
	await req.getConnection((err, conn) => {
		conn.query(consulta, (err, conn) => {
			if(!err){
				res.status(200).send("exitoso")
			}else{
				res.status(200).send(err)
			}
		})
	})
}

controlador.guardarSesion3 = async (req, res) => {
	var consulta = 
		`INSERT INTO datostrabajoseccion3
		(idTrabajo, seccion, equipo, fecha, observacion, imagen)
		VALUES
		("${req.body.idTrabajo}", "3", "${req.body.equipo}", "${req.body.fecha}", "${req.body.observacion}", 
		 "${req.body.imagen}")`
	await req.getConnection((err, conn) => {
		conn.query(`SELECT Aplica from datostrabajoseccion2 where idTrabajo = "${req.body.idTrabajo}"`, (err, conn) => {
			if(!err){
				if (JSON.parse(JSON.stringify(conn['0']))['Aplica'] == 0) {
					res.status(200).send("Esta seccion no se puede llenar, la seccion 1 no aplico")
				}else{
					console.log(JSON.parse(JSON.stringify(conn['0']))['Aplica'])
				}
			}else{
				res.status(200).send(err)
			}
		})
	})
	await req.getConnection((err, conn) => {
		conn.query(consulta, (err, conn) => {
			if(!err){
				res.status(200).send("exitoso")
			}else{
				res.status(200).send(err)
			}
		})
	})
}

controlador.encriptar = (req,res) => {
	bcrypt.hash('123', 10).then((e) => {
		res.status(200).send(e)
	})
}

module.exports = controlador