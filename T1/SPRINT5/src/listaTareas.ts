const tarea = document.getElementById('tarea') as HTMLButtonElement;
const importante = document.getElementById('importante') as HTMLButtonElement;
const titulo = document.getElementById('titulo') as HTMLParagraphElement;
const contenido = document.getElementById('contenido') as HTMLDivElement;

const tareas: string[] = [];
const importantes: string[] = [];

const mostrarMenuTarea = () => {
    titulo.textContent = 'Tareas';
    contenido.innerHTML = '';

    const inputTarea = document.createElement('input');
    inputTarea.type = 'text';
    inputTarea.placeholder = 'Describa su tarea';

    const btnAgregar = document.createElement('button');
    btnAgregar.textContent = 'Añadir';
    btnAgregar.addEventListener('click', () => {
        const nuevaTarea = inputTarea.value.trim();

        if (nuevaTarea) {
            tareas.push(nuevaTarea);
            mostrarTareas();
            tarea.click();
        } else {
            alert('Agregue una tarea previamente.');
        }
    });

    contenido.appendChild(inputTarea);
    contenido.appendChild(btnAgregar);

    mostrarTareas();
};

const mostrarTareas = () => {
    const listaTareas = document.createElement('ul');

    tareas.forEach((tarea, indice) => {
        const li = document.createElement('li');
        li.textContent = tarea;

        const btnAgregarImportante = document.createElement('button');
        btnAgregarImportante.textContent = 'Añadir a Importante';
        btnAgregarImportante.addEventListener('click', () => {
            agregarAImportante(indice);
        });

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => {
            eliminarDeTareas(indice);
        });

        li.appendChild(btnAgregarImportante);
        li.appendChild(btnEliminar);

        listaTareas.appendChild(li);
    });

    contenido.appendChild(listaTareas);
    tarea.click(); // actualiza la lista para que no se muestre duplicada
};

const agregarAImportante = (indice: number) => {
    const tareaSeleccionada = tareas[indice];
    if (tareaSeleccionada) {
        importantes.push(tareaSeleccionada);
        mostrarMenuImportante();
    }
};

const eliminarDeTareas = (indice: number) => {
    tareas.splice(indice, 1);
    mostrarTareas();
};

const mostrarMenuImportante = () => {
    titulo.textContent = 'Importante';
    contenido.innerHTML = '';

    const listaImportantes = document.createElement('ul');

    importantes.forEach((importante, indice) => {
        const li = document.createElement('li');
        li.textContent = importante;

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.addEventListener('click', () => {
            eliminarDeImportantes(indice);
        });

        li.appendChild(btnEliminar);

        listaImportantes.appendChild(li);
    });

    contenido.appendChild(listaImportantes);
};

const eliminarDeImportantes = (indice: number) => {
    importantes.splice(indice, 1);
    mostrarMenuImportante();
};

document.addEventListener("DOMContentLoaded", () => {
    titulo.textContent = 'Bienvenido a su lista de tareas.';
});

tarea.addEventListener('click', () => {
    mostrarMenuTarea();
});

importante.addEventListener('click', () => {
    mostrarMenuImportante();
});
