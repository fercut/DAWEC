"use strict";
var tarea = document.getElementById('tarea');
var importante = document.getElementById('importante');
var titulo = document.getElementById('titulo');
tarea.addEventListener('click', function () {
    titulo.textContent = 'Tareas';
});
importante.addEventListener('click', function () {
    titulo.textContent = 'Tareas';
});
