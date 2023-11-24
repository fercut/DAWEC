"use strict";
function saludo(nombre, edad) {
    return "Hola! me llamo ".concat(nombre, " y tengo ").concat(edad, " a\u00F1os");
}
console.log(saludo('Fermin', 34));
