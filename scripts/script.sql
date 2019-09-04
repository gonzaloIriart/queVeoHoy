CREATE TABLE pelicula (
    id INT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    duracion INT,
    director VARCHAR(70),
    anio INT,
    fecha_lanzamiento DATE,
    puntuacion INT,
    poster VARCHAR(300),
    trama VARCHAR(700)
    PRIMARY KEY (id)
);

CREATE TABLE genero (
id INT NOT NULL AUTO_INCREMENT,
nombre VARCHAR(30),
PRIMARY KEY (id)
);

ALTER TABLE pelicula (
    ADD genero_id INTEGER,
    FOREIGN KEY(genero_id) REFERENCES genero(id);
);

CREATE TABLE actor (
id INT NOT NULL AUTO_INCREMENT,
nombre VARCHAR(70),
PRIMARY KEY (id)
);

CREATE TABLE actor_pelicula (
id INT NOT NULL AUTO_INCREMENT,
actor_id INT,
pelicula_id INT,
PRIMARY KEY (id),
FOREIGN KEY (actor_id) REFERENCES actor(id),
FOREIGN KEY (pelicula_id) REFERENCES pelicula(id)
);