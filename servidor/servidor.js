//paquetes necesarios para el proyecto
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var controlador = require('../servidor/controladores/controlador');
var app = express();

app.use(cors());

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', function(req, res){
  res.sendFile( __dirname + "/cliente/html" + "index.html" );
});

app.get('/peliculas', controlador.peliculas);

app.get('/peliculas/recomendacion', controlador.recomendacion);

app.get('/peliculas/:id' , controlador.pelicula);

app.get('/generos', controlador.generos);

//seteamos el puerto en el cual va a escuchar los pedidos la aplicación
var puerto = process.env.PORT || 8080;

app.listen(puerto, function () {
  console.log( "Escuchando en el puerto " + puerto );
});

