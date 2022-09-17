const multer = require('multer')
const path = require('path')
const fs = require("fs");
const { decode } = require('punycode');
const imagen = {}

const storage = multer.diskStorage({
	destination: path.join(__dirname, 'publico/imagenes'),
	filename: (req, file, cb) =>  {
console.log( "image x2",req.body.convertImage)
		cb(null, file.originalname)
	}
})

//middleware para imagenes con Multer

const convertImage = (req, res, next) => {

	var img = req.body.image;
	if( img ) {
		var realFile = Buffer.from(img,"base64");
		req.body.convertImage = realFile;
		//console.log( "image",req.body.convertImage)

		fs.writeFileSync(""+__dirname+"/publico/imagenes" + req.body.nameImage, realFile, 'utf8')
			//var url = ""+__dirname+"/publico/imagenes" + req.body.nameImage;
			var url =  path.join(__dirname, 'publico/imagenes') + req.body.nameImage;
			req.body.url = url;
			console.log(req.body.url)
		}
	next()
}
const uploapImage = multer({
	storage: multer.diskStorage({
		destination: path.join(__dirname, 'publico/imagenes'),
			filename: (req, file, cb) =>  {
			console.log( "image x2",req.body.convertImage)
			cb(null, file.originalname)
		}}),
	dest: path.join(__dirname, 'publico/imagenes'),
}).single('convertImage')


module.exports = {
	convertImage,
	uploapImage
}