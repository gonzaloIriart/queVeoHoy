var connection = require('../lib/conexionbd');

function pelicula(req, res){
  var id = parseInt(req.params.id);
  let respuesta = {};
  let query = `SELECT a.nombre as nombreActor,g.nombre,p.* from pelicula p
  INNER JOIN actor_pelicula ap ON ap.pelicula_id = p.id
  INNER JOIN genero g on g.id = p.genero_id
  INNER JOIN actor a on a.id = ap.actor_id
  WHERE p.id = ${id}`;
 
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
    //El array check almacenara las querys que no esten undefined
    let check = [];
    let {genero,anio,titulo,columna_orden} = req.query;
    let query = ``;
    //Si no tenemos parametros, el query no tendrá where
    if(genero == undefined && anio == undefined && titulo == undefined){
      query = `SELECT * FROM pelicula`;
    }else{     
      //Si tenemos parametros el query seguira con un where y por cada parametro adicional definido agregamos un and. 
      query= `SELECT * FROM pelicula WHERE `;
      if(genero !== undefined){
        check.push(` genero_id = ${genero} `);
      }if(titulo !== undefined){
        check.push(` titulo REGEXP "${titulo}" `);
      }if(anio !== undefined){
       check.push(`anio = ${anio}`);
      }
      for(let i =0 ; i<check.length;i++){
        query = query + check[i];
        if(i+1 < check.length){
          query = query + ` AND `;
        }
      }
    }
    query = query + ` ORDER BY ${columna_orden}`;
    connection.query(query,check , function (err, result, fields) {
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

function recomendacion(req,res){
  let {genero,anio_inicio,anio_fin,puntuacion} = req.query;
  console.log(genero,anio_inicio,anio_fin,puntuacion)
}

module.exports= {
  peliculas: peliculas,
  generos: generos,
  pelicula: pelicula,
  recomendacion:recomendacion
};