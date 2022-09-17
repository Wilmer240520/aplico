const express =  require('express')
const rutas =  express.Router()
const controladorAdmin = require('../controladores/controlador-admin')
const controlador = require('../controladores/controlador-contrasenaGlobal')
const controladorGlobal = require('../controladores/controlador-contrasenaGlobal')
const controladorSupervisor = require('../controladores/controlador-supervisor')
const middlewareImagen = require('../middleware/imagen')
const {
    convertImage,
    uploapImage
} = require('../middleware/imagen')

//rutas de contraseña global
rutas.post('/contrasena-global', controladorGlobal.contrasena) 
rutas.post('/validar-contrasena-global', controladorGlobal.validarContrasenaGlobal)
rutas.post('/administradores', verificartoken,controladorGlobal.administradores)
rutas.post('/registrar-administradores', verificartoken,controladorGlobal.registrarAdministradores)

function verificartoken(req, res, next){
    const bearerHeader = req.body.token
    if(bearerHeader !== undefined){
        req.token = bearerHeader
        next()
    }else{
        res.sendStatus(403)
    }
} 

//rutas administrador
rutas.post('/administradores-registrar', verificartoken,controladorAdmin.registrar)
rutas.post('/login', controladorAdmin.login)
rutas.post('/verSupervisores', verificartoken, controladorAdmin.supervisor)
rutas.post('/vertrabajos', verificartoken, controladorAdmin.trabajos)
rutas.post('/verDatosTrabajos', verificartoken, controladorAdmin.supervisor)
rutas.post('/pdf', controladorAdmin.pdf)

//rutas de supervisor
rutas.post('/login-supervisor', controladorSupervisor.loginSupervisor)
rutas.post('/trabajos-supervisor', controladorSupervisor.trabajos)
rutas.get('/e', controladorSupervisor.encriptar)
rutas.post('/secciones', controladorSupervisor.secciones)
rutas.post('/guardartrabajo', controladorSupervisor.guardarTrabajo)
rutas.post('/seccion1', convertImage, controladorSupervisor.guardarSesion1)
rutas.post('/seccion2', convertImage, controladorSupervisor.guardarSesion2)
rutas.post('/seccion3', convertImage, controladorSupervisor.guardarSesion3)

module.exports = rutas