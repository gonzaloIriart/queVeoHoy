var connection = require('../lib/conexionbd');

function peliculas(req, res){
    let query= `SELECT * FROM pelicula `;
    console.log(req.query.genero)
    if(req.query.genero !== undefined){
      query = query + `WHERE genero_id = ${req.query.genero} `; 
    }if(req.query.titulo !== undefined){
      query = query + `AND titulo LIKE "%${req.query.titulo}%" `;
    }if(req.query.anio !== undefined){
      query = query + `AND anio = ${req.query.anio} `;
    }if(req.query.order !== undefined){
      query = query +`ORDER BY ${req.query.order} `;
    }
    connection.query(query, function (err, result, fields) {
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