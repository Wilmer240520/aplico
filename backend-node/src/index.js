const express =  require('express')
const app = express()
const mysql = require('mysql')
const myConnection =  require('express-myconnection')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const multer =  require('multer')
const storage = multer.diskStorage({
	destination: path.join(__dirname, 'publico/imagenes'),
	filename: (req, file, cb) =>  {
		cb(null, file.originalname)
	}
})

//establecemos variables
app.set('port', process.env.PORT || 3000)
app.set('views',  path.join(__dirname, 'vistas'))
app.set('view engine', 'ejs')

//inicializamos el servidor express
app.listen(app.get('port'), () => {
	console.log('exito')
})

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

//configuracion de cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//conexion con mysql
const datosConexion = {
	host: 'localhost',
	user: 'root',
	password: '',
	port: 3306,
	database: 'aplico'
}
app.use(myConnection(mysql, datosConexion, 'single'))

//configuracion de morgan
app.use(morgan('dev'))

//configuracion de los archivos estaticos
app.use(express.static(path.join(__dirname, 'publico')))

//middleware para imagenes con Multer
app.use(multer({
	storage: storage,
	dest: path.join(__dirname, 'publico/imagenes')
}).single('imagen'))

app.get('', (req, res) => {
	res.render('index')
})

//configuracion de rutas
const rutas =  require('./rutas/ruta')
app.use('/', rutas)