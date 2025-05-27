SET IDENTITY_INSERT dbo.categorias ON;

INSERT INTO dbo.categorias (id_categoria, categoria) VALUES (000, 'Generalidades');
INSERT INTO dbo.categorias (id_categoria, categoria) VALUES (100, 'Filosofía y Psicología');
INSERT INTO dbo.categorias (id_categoria, categoria) VALUES (200, 'Religión');
INSERT INTO dbo.categorias (id_categoria, categoria) VALUES (300, 'Ciencias Sociales');
INSERT INTO dbo.categorias (id_categoria, categoria) VALUES (400, 'Lenguas');
INSERT INTO dbo.categorias (id_categoria, categoria) VALUES (500, 'Ciencias Naturales y Matemáticas');
INSERT INTO dbo.categorias (id_categoria, categoria) VALUES (600, 'Tecnología (Ciencias Aplicadas)');
INSERT INTO dbo.categorias (id_categoria, categoria) VALUES (700, 'Artes y Recreación');
INSERT INTO dbo.categorias (id_categoria, categoria) VALUES (800, 'Literatura');
INSERT INTO dbo.categorias (id_categoria, categoria) VALUES (900, 'Historia y Geografía');

SET IDENTITY_INSERT dbo.categorias OFF;

select *from categorias
