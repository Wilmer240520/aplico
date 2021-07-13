const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')
const controlador = {}

controlador.contrasena = async (req, res, next) => {
	var contrasena = req.body.contrasena
	var contrasenaEncriptada = ''
	await bcrypt.hash(contrasena, 10).then((hash) => {
		contrasenaEncriptada = hash
	}).catch((err) => {
		res.status(404).send('error al guardar la contraseña')
	})
	req.getConnection((err, conn) => {
		conn.query(`INSERT INTO contrasenaglobal(contrasena, correo) VALUES ('${contrasenaEncriptada}', '${req.body.correo}')`, (err, q) => {
			if (err) {
				res.status(404).send('error con la base de datos')
			}else{
				res.status(200).send('contraseña agregada')
			}
		})
	})
}

controlador.validarContrasenaGlobal = (req, res) => {
	var contrasena =  req.body.contrasena
	console.log(req.body)
	req.getConnection((err, conn) => {
		conn.query('SELECT * FROM contrasenaGlobal LIMIT 1', async (err, q) => {
			if (err) {
				res.status(404).send('error con la base de datos')
			}else{
				await bcrypt.compare(contrasena, q[0].contrasena).then((resultado) =>{
					if(resultado){
						if(req.body.correo == JSON.parse(JSON.stringify(q[0]))['correo']){
							jwt.sign({'token': ''}, 'secreto', (err, token) => {
								console.log(req.body, JSON.parse(JSON.stringify(q[0]))['correo'])
								res.status(200).json({
									token
								})
							})
						}else{
							res.status(200).send('Correo incorrecto')
						}
					}else{
						res.status(200).send('Contraseña incorrecta')
					}
				}).catch((err) => {
					res.status(200).send(err)
				})
			}
		})
	})
}

controlador.administradores = (req, res, next) => {
	jwt.verify(req.token, 'secreto', (err, data) => {
		if(err){
			res.sendStatus(403)
		}else{
			req.getConnection((err, conn) => {
				if(err){
					res.sendStatus(504)
				}else{
					conn.query('SELECT cedula, primerNombre, segundoNombre, primerApellido,	segundoApellido, genero, correo, contrasena FROM administrador', (err, datas) => {
						res.status(200).send(datas)
					})
				}
			})
		}
	})
}

controlador.registrarAdministradores =  (req, res) => {
	var contrasenaEncriptada
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
						await conn.query(
							`INSERT INTO administrador
							(cedula, primerNombre, segundoNombre, primerApellido, segundoApellido, genero,  
							correo, contrasena)
							VALUES 
							('${req.body.cedula}','${req.body.primerNombre}','${req.body.segundoNombre}',
							'${req.body.primerApellido}','${req.body.segundoApellido}','${req.body.genero}',
							'${req.body.correo}','${contrasenaEncriptada}')`,
							(err, datas) => {
								if (err) {
									console.log(req.body)
									console.log('aqui tambien perro')
									res.sendStatus(504)
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
module.exports = controlador