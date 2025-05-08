CREATE DATABASE proyecto_seab;

USE proyecto_seab;

CREATE TABLE categorias(id_categoria INT PRIMARY KEY IDENTITY(1,1),categoria VARCHAR(45) NOT NULL);

CREATE TABLE sexos(id_sexo INT PRIMARY KEY IDENTITY(1,1),sexo VARCHAR(10) NOT NULL);

CREATE TABLE tipos_usuarios(id_tipo_usuario INT PRIMARY KEY IDENTITY(1,1),tipo_usuario VARCHAR(45) NOT NULL);

CREATE TABLE libros(id_libros INT PRIMARY KEY IDENTITY(1,1),titulo VARCHAR(255) NOT NULL,autor VARCHAR(255) NOT NULL,lenguaje VARCHAR(100) NOT NULL,editorial VARCHAR(100) NOT NULL,ejemplares VARCHAR(100) NOT NULL,descargable BIT NOT NULL,codigo_libro VARCHAR(100) NOT NULL,id_categoria INT NOT NULL,FOREIGN KEY (id_categoria) REFERENCES categorias(id_categoria) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE usuarios (id_usuario UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),nombre VARCHAR(255) NOT NULL,cedula VARCHAR(20) NULL,correo VARCHAR(255) UNIQUE NOT NULL,contrasenia VARCHAR(255) NOT NULL,fecha_nacimiento DATE NOT NULL,municipio VARCHAR(100) NULL,pais VARCHAR(100) NULL,departamento VARCHAR(100) NULL,id_sexo INT NOT NULL,id_tipo_usuario INT NOT NULL,FOREIGN KEY (id_sexo) REFERENCES sexos(id_sexo) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY (id_tipo_usuario) REFERENCES tipos_usuarios(id_tipo_usuario) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE TABLE prestamos(id_prestamo INT PRIMARY KEY IDENTITY(1,1),cantidad INT NOT NULL,devolucion BIT NOT NULL,id_usuario UNIQUEIDENTIFIER  NOT NULL,id_libros INT NOT NULL,FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario) ON DELETE CASCADE ON UPDATE CASCADE,FOREIGN KEY (id_libros) REFERENCES libros(id_libros) ON DELETE CASCADE ON UPDATE CASCADE);

CREATE PROCEDURE sp_crear_usuario @nombre VARCHAR(255), @correo VARCHAR(255), @contrasenia VARCHAR(512), @fecha_nacimiento DATE, @id_sexo INT AS BEGIN SET NOCOUNT ON; IF EXISTS (SELECT 1 FROM usuarios WHERE correo = @correo) BEGIN THROW 50001, 'El correo ya está registrado.', 1; END INSERT INTO usuarios (id_usuario, nombre, correo, contrasenia, fecha_nacimiento, id_sexo, id_tipo_usuario) VALUES (NEWID(), @nombre, @correo, @contrasenia, @fecha_nacimiento, @id_sexo, 2); END;

INSERT INTO sexos VALUES('masculino');
INSERT INTO sexos VALUES('femenino');

INSERT INTO tipos_usuarios VALUES('bibliotecario');
INSERT INTO tipos_usuarios VALUES('cliente');
INSERT INTO tipos_usuarios VALUES('administrador');