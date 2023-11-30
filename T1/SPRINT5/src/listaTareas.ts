const tarea = document.getElementById('tarea') as HTMLButtonElement;
const importante = document.getElementById('importante') as HTMLButtonElement;
const titulo = document.getElementById('titulo') as HTMLParagraphElement;


tarea.addEventListener('click', () => {
    titulo.textContent = 'Tareas';
});

importante.addEventListener('click', () => {
    titulo.textContent = 'Tareas';
});