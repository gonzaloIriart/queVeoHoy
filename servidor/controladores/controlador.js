var connection = require('../lib/conexionbd');

function pelicula(req, res){
  var id = parseInt(req.params.id);
  console.log(req.params.id);
  let respuesta = new Object();
  let query1 = `SELECT nombre from actor a
   INNER JOIN actor_pelicula ap ON ap.actor_id = a.id
   INNER JOIN pelicula p on p.id = ap.pelicula_id
   WHERE p.id = ${id}`;
   let query2 = `SELECT * from pelicula p
   INNER JOIN genero g on p.genero_id = g.id
   WHERE p.id = ${id}`
  /*

[{"id":401,"titulo":"Narc","genero_id":6,"anio":2002,"duracion":105,"director":"Joe Carnahan","fecha_lanzamiento":"2003-01-10T03:00:00.000Z","puntuacion":7,"poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYjVhMWI2ZjgtNzNiNy00Mjc2LTljZDQtNGYwMzYwMTlhZGFhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg","trama":"When the trail goes cold on a murder investigation of a policeman an undercover narcotics officer is lured back to the force to help solve the case.","actor_id":401,"pelicula_id":1,"nombre":"Dan Leis"},{"id":871,"titulo":"Narc","genero_id":6,"anio":2002,"duracion":105,"director":"Joe Carnahan","fecha_lanzamiento":"2003-01-10T03:00:00.000Z","puntuacion":7,"poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYjVhMWI2ZjgtNzNiNy00Mjc2LTljZDQtNGYwMzYwMTlhZGFhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg","trama":"When the trail goes cold on a murder investigation of a policeman an undercover narcotics officer is lured back to the force to help solve the case.","actor_id":871,"pelicula_id":1,"nombre":"Jason Patric"},{"id":1238,"titulo":"Narc","genero_id":6,"anio":2002,"duracion":105,"director":"Joe Carnahan","fecha_lanzamiento":"2003-01-10T03:00:00.000Z","puntuacion":7,"poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYjVhMWI2ZjgtNzNiNy00Mjc2LTljZDQtNGYwMzYwMTlhZGFhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg","trama":"When the trail goes cold on a murder investigation of a policeman an undercover narcotics officer is lured back to the force to help solve the case.","actor_id":1238,"pelicula_id":1,"nombre":"Lloyd Adams"},{"id":1397,"titulo":"Narc","genero_id":6,"anio":2002,"duracion":105,"director":"Joe Carnahan","fecha_lanzamiento":"2003-01-10T03:00:00.000Z","puntuacion":7,"poster":"https://images-na.ssl-images-amazon.com/images/M/MV5BYjVhMWI2ZjgtNzNiNy00Mjc2LTljZDQtNGYwMzYwMTlhZGFhXkEyXkFqcGdeQXVyNDk3NzU2MTQ@._V1_SX300.jpg","trama":"When the trail goes cold on a murder investigation of a policeman an undercover narcotics officer is lured back to the force to help solve the case.","actor_id":1397,"pelicula_id":1,"nombre":"Meagan Issa"}]
  */
  connection.query(query1, function (err, result, fields) {
    if (err) throw err;
    //console.log(JSON.stringify(result));    
    respuesta.actores = result;    
  });

  connection.query(query2, function (err, result, fields) {
    if (err) throw err;
    //console.log(JSON.stringify(result));    
    respuesta.pelicula = result;
  });
  console.log(respuesta)
  res.send(JSON.stringify(respuesta));
    
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