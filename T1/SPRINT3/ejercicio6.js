const estudiantes = [
    { nombre: "Juan", ciudad: "Madrid", beca: false, edad: 21, calificaciones: { matematicas: 5, fisica: 7, historia: 6 } },
    { nombre: "Ana", ciudad: "Barcelona", beca: true, edad: 20, calificaciones: { matematicas: 9, fisica: 6, historia: 8 } },
    { nombre: "Pedro", ciudad: "Madrid", beca: false, edad: 23, calificaciones: { matematicas: 4, fisica: 5, historia: 7 } },
    { nombre: "Maria", ciudad: "Sevilla", beca: true, edad: 19, calificaciones: { matematicas: 8, fisica: 7, historia: 9 } },
    { nombre: "Jose", ciudad: "Madrid", beca: false, edad: 22, calificaciones: { matematicas: 6, fisica: 7, historia: 5 } },
    { nombre: "Isabel", ciudad: "Valencia", beca: true, edad: 20, calificaciones: { matematicas: 5, fisica: 8, historia: 7 } },
    { nombre: "David", ciudad: "Bilbao", beca: false, edad: 24, calificaciones: { matematicas: 7, fisica: 6, historia: 8 } },
    { nombre: "Laura", ciudad: "Barcelona", beca: true, edad: 19, calificaciones: { matematicas: 6, fisica: 8, historia: 7 } },
    { nombre: "Miguel", ciudad: "Sevilla", beca: false, edad: 21, calificaciones: { matematicas: 7, fisica: 7, historia: 8 } },
    { nombre: "Sara", ciudad: "Madrid", beca: true, edad: 20, calificaciones: { matematicas: 6, fisica: 5, historia: 9 } },
    { nombre: "Daniela", ciudad: "Valencia", beca: false, edad: 22, calificaciones: { matematicas: 8, fisica: 9, historia: 6 } },
    { nombre: "Alberto", ciudad: "Bilbao", beca: true, edad: 23, calificaciones: { matematicas: 5, fisica: 8, historia: 6 } },
    { nombre: "Gabriel", ciudad: "Sevilla", beca: false, edad: 19, calificaciones: { matematicas: 8, fisica: 5, historia: 7 } },
    { nombre: "Carmen", ciudad: "Barcelona", beca: true, edad: 24, calificaciones: { matematicas: 9, fisica: 9, historia: 9 } },
    { nombre: "Roberto", ciudad: "Madrid", beca: false, edad: 20, calificaciones: { matematicas: 4, fisica: 5, historia: 5 } },
    { nombre: "Carolina", ciudad: "Valencia", beca: true, edad: 22, calificaciones: { matematicas: 5, fisica: 7, historia: 6 } },
    { nombre: "Alejandro", ciudad: "Bilbao", beca: false, edad: 23, calificaciones: { matematicas: 9, fisica: 8, historia: 8 } },
    { nombre: "Lucia", ciudad: "Barcelona", beca: true, edad: 21, calificaciones: { matematicas: 7, fisica: 7, historia: 7 } },
    { nombre: "Ricardo", ciudad: "Sevilla", beca: false, edad: 19, calificaciones: { matematicas: 6, fisica: 5, historia: 6 } },
    { nombre: "Marina", ciudad: "Madrid", beca: true, edad: 20, calificaciones: { matematicas: 5, fisica: 9, historia: 8 } }
];
document.addEventListener("DOMContentLoaded", function() {
    table();
});

const table = () =>{
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = '';

    for(let i=0; i<estudiantes.length; i++){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${estudiantes[i].nombre}</td>
        <td>${estudiantes[i].ciudad}</td>
        <td>${estudiantes[i].beca ? "Si" : "No"}</td>
        <td>${estudiantes[i].edad}</td>
        <td>${estudiantes[i].calificaciones.matematicas}</td>
        <td>${estudiantes[i].calificaciones.fisica}</td>
        <td>${estudiantes[i].calificaciones.historia}</td>
        `;
        tableBody.appendChild(row);
    }
}
const estudiantesDestacados = () => {
    const asignatura = document.getElementById('estudiantesDestacados').value.toLowerCase();
    estudiantesDestacadosPorAsignatura(estudiantes,asignatura);
}
function estudiantesDestacadosPorAsignatura(estudiante,asignatura) {
    // Devuelve un array con los 3 estudiantes con las mejores notas en la asignatura dada    
    const estudiantesDestacados = [];
    estudiantes.sort((a,b) => b.calificaciones[asignatura] - a.calificaciones[asignatura]);
    for(let i=0; i<3;i++){
        estudiantesDestacados[i]=estudiantes[i].nombre;
    } 
    return alert(`Los mejores alumnos de ${asignatura} son ${estudiantesDestacados.join(', ')}`)
    
}
function asignaturaMenorRendimiento() {
    // Identifica la asignatura con el promedio de calificación más bajo
    let mediaMatematicas = 0;
    let mediaFisica = 0;
    let mediaHistoria = 0;
    let media = 0;
    for(let i=0; i<estudiantes.length; i++){
        media += estudiantes[i].calificaciones.matematicas;
    }
    mediaMatematicas = media / estudiantes.length;
    
    media = 0;
    for(let i=0; i<estudiantes.length; i++){
        media += estudiantes[i].calificaciones.fisica;
    }
    mediaFisica = media / estudiantes.length;
    
    media = 0;
    for(let i=0; i<estudiantes.length; i++){
        media += estudiantes[i].calificaciones.historia;
    }
    mediaHistoria = media / estudiantes.length;

    if (mediaMatematicas <= mediaFisica && mediaMatematicas <= mediaHistoria) {
        return alert(`La asignatura con el menor rendimiento es matematicas con una media ${mediaMatematicas}`);
      } else if (mediaFisica <= mediaMatematicas && mediaFisica <= mediaHistoria) {
        return alert(`La asignatura con el menor rendimiento es fisica con una media de ${mediaFisica}`);
      } else {
        return alert(`La asignatura con el menor rendimiento es historia con una media de ${mediaHistoria}`);
      }

}
function mejoraNotasBeca() {
    // Aumenta todas las notas de los estudiantes con beca en un 10% (máximo 10)
    for(let i=0; i<estudiantes.length; i++){
        if(estudiantes[i].beca){
            if(estudiantes[i].calificaciones.matematicas < 10) {
                estudiantes[i].calificaciones.matematicas = (1.1 * estudiantes[i].calificaciones.matematicas).toFixed(2);
                if(estudiantes[i].calificaciones.matematicas > 10){
                    estudiantes[i].calificaciones.matematicas = 10;
                }
            }
            if(estudiantes[i].calificaciones.fisica < 10) {
                estudiantes[i].calificaciones.fisica = (1.1 * estudiantes[i].calificaciones.fisica).toFixed(2);
                if(estudiantes[i].calificaciones.fisica > 10){
                    estudiantes[i].calificaciones.fisica = 10;
                }
            }
            if(estudiantes[i].calificaciones.historia < 10) {
                estudiantes[i].calificaciones.historia = (1.1 * estudiantes[i].calificaciones.historia).toFixed(2);
                if(estudiantes[i].calificaciones.historia > 10){
                    estudiantes[i].calificaciones.historia = 10;
                }
            }
        }
    }
    table();
}

const ciudadAsignatura = () => {
    const ciudad = document.getElementById('ciudadListaAsignatura').value;
    const asignatura = document.getElementById('asignatura').value.toLowerCase();
    filtrarPorCiudadYAsignatura(ciudad,asignatura);
}

function filtrarPorCiudadYAsignatura(ciudad, asignatura) {
    // Devuelve la lista de estudiantes de una ciudad ordenados descendentemente por la nota de la asignatura dada

    const city = ciudad.charAt(0).toUpperCase() + ciudad.slice(1).toLowerCase(); // seVillA  => Sevilla
    const nombres = [];
    
    for(let i=0; i<estudiantes.length; i++){
        if(estudiantes[i].ciudad === city){
            nombres.push({ key: estudiantes[i].nombre, value: estudiantes[i].calificaciones[asignatura] });
        }
    }

    const theadElement = document.querySelector('table thead');
    const nuevoEncabezado = document.createElement('tr');
    nuevoEncabezado.innerHTML = `<td>Nombre</td><td>Calificacion en ${asignatura}</td>`;
    theadElement.innerHTML = '';
    theadElement.appendChild(nuevoEncabezado);


    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = '';
    
    //ordena por notas
    nombres.sort((a, b) => b.value - a.value);

    for(let i=0; i<nombres.length; i++){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>${nombres[i].key}</td>
        <td>${nombres[i].value}</td>
        `;
        tableBody.appendChild(row);
    }
}
const estudiantesSinBeca = () => {
    const ciudad = document.getElementById('alumnosSinBeca').value;
    estudiantesSinBecaPorCiudad(ciudad);
}
function estudiantesSinBecaPorCiudad(ciudad) {
    // Devuelve la cantidad de estudiantes sin beca en la ciudad dada
    const city = ciudad.charAt(0).toUpperCase() + ciudad.slice(1).toLowerCase(); // seVillA  => Sevilla
    const nombres = [];
    
    for(let estudiante of estudiantes){
        if(estudiante.ciudad === city && !estudiante.beca) nombres.push(estudiante.nombre);
    }
    return alert(`Los estudiantes sin beca en la ciudad de ${city} son ${nombres.join(', ')}`)
    
}
function promedioEdadEstudiantesConBeca() {
    // Devuelve el promedio de edad de los estudiantes con beca
    let media = 0;
    for(let estudiante of estudiantes) media += estudiante.edad;
    const edadMedia = media / estudiantes.length;
    return alert(`El promedio de edad de los alumnos sin beca es de ${Math.floor(edadMedia)}`);
}
function mejoresEstudiantes() {
    // Devuelve un array con los 2 estudiantes con el mejor promedio general
    let mediaAlumnos = [];
    for(let estudiante of estudiantes){
        let nombre = estudiante.nombre;
        let notaMedia = (estudiante.calificaciones.fisica + estudiante.calificaciones.historia + estudiante.calificaciones.matematicas) /3 
        mediaAlumnos.push({key:nombre, value:notaMedia});
    }
    console.log(mediaAlumnos);
    mediaAlumnos.sort((a, b) => b.value - a.value);
    const mejoresDos = mediaAlumnos.slice(0, 2);

    const nombres = mejoresDos.map(estudiante => estudiante.key).join(', ');
    const notasMedias = mejoresDos.map(estudiante => estudiante.value.toFixed(2)).join(' y ');

    alert(`Los mejores alumnos son: ${nombres} con notas medias respectivas de: ${notasMedias}`);
}
function estudiantesAprobados() {
    // Devuelve un array con los nombres de los estudiantes que hayan aprobado todas las materias
    let aprobados = [];

    for(let estudiante of estudiantes){
        if(estudiante.calificaciones.fisica >= 5 && estudiante.calificaciones.historia >= 5 && estudiante.calificaciones.matematicas >= 5){
            aprobados.push(estudiante.nombre);
        }
    }
    return alert(`Los estudiantes con todas las asignaturas aprobadas son ${aprobados.join(', ')}. Enhorabuena!!`)
}
