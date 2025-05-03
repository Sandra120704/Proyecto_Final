CREATE DATABASE tiendaL;

USE tienda;

CREATE TABLE autores(
	Id_Autores INT PRIMARY KEY,
    Nombre	   VARCHAR(100)
)ENGINE = INNODB;
ALTER TABLE autores MODIFY Id_Autores INT NOT NULL AUTO_INCREMENT;


CREATE TABLE Libros(
	Id_Libros INT PRIMARY KEY,
    Id_Autores INT NOT NULL,
    Titulo    VARCHAR(100) NOT NULL,
    Editorial VARCHAR(100) NOT NULL,
    Fecha_P	  DATE,
    Genero 	  ENUM('Ficcion', 'Animado', 'Cientificos', 'Dramatico', 'Didacticos'),
    CONSTRAINT fk_idautores FOREIGN KEY (Id_Autores) REFERENCES autores(Id_Autores)
)ENGINE = INNODB;
ALTER TABLE Libros MODIFY Id_Libros INT NOT NULL AUTO_INCREMENT;
ALTER TABLE Libros ADD COLUMN Descripcion TEXT;
ALTER TABLE Libros ADD COLUMN Precio DECIMAL(10,2);
ALTER TABLE Libros ADD COLUMN Estado ENUM('Disponible', 'Vendido') DEFAULT 'Disponible';


INSERT INTO autores (Nombre) VALUES
    ('Charles John Huffam Dickens'),
    ('Juan Ruiz De Alarcon'),
    ('Arthur C. Clarke'),
    ('Santiago Fabregat Barrios');

INSERT INTO Libros (Id_Autores, Titulo, Editorial, Fecha_P, Genero) VALUES
(1, 'Oliver Twist', 'Penguin Classics', '1838-02-01', 'Ficcion'),
(2, 'La Verdad Sospechosa', 'Editorial Porrúa', '1634-01-01', 'Dramatico'),
(3, '2001: A Space Odyssey', 'New American Library', '1968-07-01', 'Cientificos'),
(4, 'La Evolución de las Especies', 'Ediciones B', '2005-03-15', 'Didacticos');

 SELECT 
	Libros.Id_Libros, 
    Libros.Titulo,
    Libros.Editorial, 
    Libros.Fecha_P, 
    Libros.Genero, 
    autores.Nombre AS Autor
    FROM Libros
    INNER JOIN autores ON Libros.Id_Autores = autores.Id_Autores;
    
     SELECT 
        Libros.Id_Libros, 
        Libros.Titulo,
        Libros.Editorial, 
        DATE_FORMAT(Libros.Fecha_P, '%Y/%m/%d') AS Fecha_P,
        Libros.Genero, 
        autores.Nombre AS Autor,
        Libros.Estado
      FROM Libros
      INNER JOIN autores ON Libros.Id_Autores = autores.Id_Autores
      WHERE Libros.Estado = 'Disponible'
    




