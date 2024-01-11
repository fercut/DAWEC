"use strict";
function datos(usuario) {
    return `El usuario ${usuario.nombre} tiene ${usuario.edad} años y su correo es ${usuario.correo}`;
}
const usuario1 = {
    nombre: 'Juan',
    edad: 25,
    correo: 'juan@gmail.com',
};
const usuario2 = {
    nombre: 'María',
    edad: 30,
    correo: 'maria@gmail.com',
};
const usuario3 = {
    nombre: 'Pedro',
    edad: 22,
    correo: 'pedro@gmail.com',
};
const usuario4 = {
    nombre: 'Fermin',
    edad: 33,
    correo: 'fermin@gmail.com',
};
const usuario5 = {
    nombre: 'Alvaro',
    edad: 62,
    correo: 'alvaro@gmail.com',
};
console.log(datos(usuario1));
console.log(datos(usuario2));
console.log(datos(usuario3));
console.log(datos(usuario4));
console.log(datos(usuario5));
