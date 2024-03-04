# Proyecto Final del curso de Angular.

Mi nombre es Lucas Aspee .

Este es mi proyecto final del curso de Angular para CoderHouse.

Se trata de una app web creada con Angular y diferentes librerias que se mencionan al final.
La app tiene como finalidad ser un gestor y administrador de datos para un instituto de ingles.
La persona puede logearse a la misma ingresando su correo y password correspondiente en el login. Existes 2 roles que habilitan diferentes funciones dentro de la app segun con cual se haya logeado. El rol de admin permite acceso total a la aplicacion es decir que puede :
-Ver la lista de usuarios, agregar uno nuevo, editar ,borrar y ver detalles.
-Ver la lista de alumnos, agregar uno nuevo, editar ,borrar , ver detalles y gestionar desde alli los cursos a los cuales esta inscripto.
-Ver la lista de cursos , agregar uno nuevo, editar ,borrar , ver detalles y gestionar desde alli los alumnos los cuales esta inscripto a cada uno.
-Realizar la inscripcion o dar la baja de un alumno a un curso determinado.

El rol de usuario tiene los siguientes permisos:
-Solo tiene acesso de lectura a la lista de usuarios,alumnos,cursos sin poder agregar,eliminar,editar o ver datos sencibles de cada lista.
-Realizar la inscripcion o dar la baja de un alumno a un curso determinado.

## Requerimientos


1- Para el correcto funcionamiento es necesario instalar las dependencias figuradas en el package.json
```
- npm i
```


## Modo de ejecucion
En la consola escribir el siguiente comando :
```
- ng serve -o
- npx json-server db.json --watch
```

NOTA: El segundo comando es para levantar la base de datos (libreria json watch server) y poder ingresar tanto a los datos del usarios como toda la informacion de la app.


## Usuarios de demostracion para logearse

 Rol admin :
 -User : lucasaspe@gmail.com   
 -Pass :test

 Rol usuario:
-User : ptobalda@gmail.com  
-Pass :123456

## Demo de navegabilidad

```
https://www.youtube.com/watch?v=knOtX4YymCY

```


## Creado con :

* [Angular] https://angular.io/
* [AngularMaterial] https://material.angular.io/
* [Sweet-Alert2] https://sweetalert2.github.io/
* [Ngrx] https://ngrx.io/
* [RxJS] https://rxjs.dev/
* [TypeScript] https://www.typescriptlang.org/


## Autor

- [LucasAspee]