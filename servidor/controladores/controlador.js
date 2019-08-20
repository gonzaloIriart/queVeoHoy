var connection = require('../lib/conexionbd');

function peliculas(req, res){
  
    connection.query("SELECT * FROM pelicula", function (err, result, fields) {
      if (err) throw err;
      var respuesta = {
        peliculas: result
      }
      res.send(JSON.stringify(respuesta));
      
    });
  }

function generos(req,res){
  connection.query("SELECT * FROM genero", function (err, result, fields) {
    if (err) throw err;
    console.log(JSON.stringify(result));
    var respuesta = {
      generos: result
    }
    res.send(JSON.stringify(respuesta));
    
  });
}


module.exports= {
  peliculas: peliculas,
  generos: generos
};