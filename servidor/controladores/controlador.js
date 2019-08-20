var connection = require('../lib/conexionbd');

function peliculas(req, res){
  
    connection.query("SELECT * FROM pelicula", function (err, result, fields) {
      if (err) throw err;
      console.log(JSON.stringify(result[0]));
      var respuesta = {
        peliculas: result
      }
      res.send(JSON.stringify(result));
      
    });
  }


module.exports= {
  peliculas: peliculas
};