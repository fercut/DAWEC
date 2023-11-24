"use strict";
function datos(usuario) {
    return "El usuario ".concat(usuario.nombre, " tiene ").concat(usuario.edad, " a\u00F1os y su correo es ").concat(usuario.correo);
}
var usuario1 = {
    nombre: 'Juan',
    edad: 25,
    correo: 'juan@gmail.com',
};
var usuario2 = {
    nombre: 'María',
    edad: 30,
    correo: 'maria@gmail.com',
};
var usuario3 = {
    nombre: 'Pedro',
    edad: 22,
    correo: 'pedro@gmail.com',
};
var usuario4 = {
    nombre: 'Fermin',
    edad: 33,
    correo: 'fermin@gmail.com',
};
var usuario5 = {
    nombre: 'Alvaro',
    edad: 62,
    correo: 'alvaro@gmail.com',
};
console.log(datos(usuario1));
console.log(datos(usuario2));
console.log(datos(usuario3));
console.log(datos(usuario4));
console.log(datos(usuario5));
