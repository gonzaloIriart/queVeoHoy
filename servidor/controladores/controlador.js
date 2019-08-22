var connection = require('../lib/conexionbd');

function pelicula(req, res){
  var id = parseInt(req.params.id);
  let respuesta = {};
  let query = `SELECT a.nombre as nombreActor,g.nombre,p.* from pelicula p
  INNER JOIN actor_pelicula ap ON ap.pelicula_id = p.id
  INNER JOIN genero g on g.id = p.genero_id
  INNER JOIN actor a on a.id = ap.actor_id
  WHERE p.id = ${id}`
 
  connection.query(query, function (err, result, fields) {
    if (err) throw err;
    //console.log(JSON.stringify(result));  
    respuesta.pelicula = result[0];
    respuesta.actores = result.map(actor => actor.nombreActor);  
    console.log(respuesta)    
    res.send(JSON.stringify(respuesta));
    });
  }

  

function peliculas(req, res){
    let query= `SELECT * FROM pelicula `;
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
    var respuesta = {
      generos: result
    }
    res.send(JSON.stringify(respuesta));
    
  });
}


module.exports= {
  peliculas: peliculas,
  generos: generos,
  pelicula: pelicula
};