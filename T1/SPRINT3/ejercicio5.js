let tabla = [
    {
        Nombre: "Ana",
        Edad: 25,
        DNI: "45678912B",
        Hijos: "Tiene",
        Nacimiento: "12/05/1998"
    },
    {
        Nombre: "Carlos",
        Edad: 30,
        DNI: "12345678A",
        Hijos: "No tiene",
        Nacimiento: "05/02/1993"
    },
    {
        Nombre: "Berta",
        Edad: 28,
        DNI: "98765432C",
        Hijos: "Tiene",
        Nacimiento: "20/03/1995"
    },
    {
        Nombre: "David",
        Edad: 31,
        DNI: "11223344D",
        Hijos: "Tiene",
        Nacimiento: "18/08/1992"
    },
    {
        Nombre: "Elena",
        Edad: 26,
        DNI: "56781234E",
        Hijos: "No tiene",
        Nacimiento: "15/10/1997"
    },
    {
        Nombre: "Fernando",
        Edad: 33,
        DNI: "87654321F",
        Hijos: "Tiene",
        Nacimiento: "02/12/1989"
    },
    {
        Nombre: "Gemma",
        Edad: 29,
        DNI: "23456789G",
        Hijos: "No tiene",
        Nacimiento: "10/09/1994"
    },
    {
        Nombre: "Hugo",
        Edad: 27,
        DNI: "76543212H",
        Hijos: "Tiene",
        Nacimiento: "25/06/1996"
    },
    {
        Nombre: "Irene",
        Edad: 32,
        DNI: "34561234I",
        Hijos: "No tiene",
        Nacimiento: "14/04/1991"
    },
    {
        Nombre: "Juan",
        Edad: 35,
        DNI: "65432123J",
        Hijos: "Tiene",
        Nacimiento: "28/07/1988"
    },
    {
        Nombre: "Quintín",
        Edad: 28,
        DNI: "45678912Q",
        Hijos: "Tiene",
        Nacimiento: "14/08/1995"
    },
    {
        Nombre: "Luisa",
        Edad: 29,
        DNI: "87654321L",
        Hijos: "Tiene",
        Nacimiento: "08/11/1993"
    },
    {
        Nombre: "Mario",
        Edad: 34,
        DNI: "34561234M",
        Hijos: "No tiene",
        Nacimiento: "19/09/1989"
    },
    {
        Nombre: "Natalia",
        Edad: 27,
        DNI: "65432123N",
        Hijos: "Tiene",
        Nacimiento: "30/03/2003"
    },
    {
        Nombre: "Sergio",
        Edad: 33,
        DNI: "98765432S",
        Hijos: "Tiene",
        Nacimiento: "22/02/1989"
    },
    {
        Nombre: "Oscar",
        Edad: 31,
        DNI: "23456789O",
        Hijos: "No tiene",
        Nacimiento: "07/06/1992"
    },
    {
        Nombre: "Patricia",
        Edad: 30,
        DNI: "76543212P",
        Hijos: "Tiene",
        Nacimiento: "25/12/1992"
    },
    {
        Nombre: "Rosa",
        Edad: 32,
        DNI: "12345678R",
        Hijos: "No tiene",
        Nacimiento: "03/04/1991"
    },
    {
        Nombre: "Teresa",
        Edad: 26,
        DNI: "11223344T",
        Hijos: "Tiene",
        Nacimiento: "11/01/1997"
    },
    {
        Nombre: "Uriel",
        Edad: 30,
        DNI: "87654321U",
        Hijos: "No tiene",
        Nacimiento: "29/05/1993"
    }
    ];

    document.addEventListener("DOMContentLoaded", function() {
        table();
    });
    
    const table = () =>{
        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = '';

        for(let i=0; i<tabla.length; i++){
            const row = document.createElement('tr');
            row.innerHTML = `
            <td>${tabla[i].Nombre}</td>
            <td>${tabla[i].Edad}</td>
            <td>${tabla[i].DNI}</td>
            <td>${tabla[i].Hijos}</td>
            <td>${tabla[i].Nacimiento}</td>
            `;
            tableBody.appendChild(row);
        }
    }

    let ordenNombre = true;
    let ordenEdad = true;
    let ordenDni = true;
    let ordenHijos = true;
    let ordenNacimiento = true;

    const nom = () =>{
        if(ordenNombre){
            tabla.sort((a,b) => {
                const nombreA = a.Nombre.toLowerCase();
                const nombreB = b.Nombre.toLowerCase();
                
                if (nombreA < nombreB) return -1;
                if (nombreA > nombreB) return 1;

                if (nombreA.startsWith("a") && !nombreB.startsWith("a")) return -1;
                if (!nombreA.startsWith("a") && nombreB.startsWith("a")) return 1;
                return 0;
            });
            table();
            ordenNombre=false;
        }else{
            tabla.sort((b,a) => {
                const nombreA = a.Nombre.toLowerCase();
                const nombreB = b.Nombre.toLowerCase();
                
                if (nombreA < nombreB) return -1;
                if (nombreA > nombreB) return 1;

                if (nombreA.startsWith("a") && !nombreB.startsWith("a")) return -1;
                if (!nombreA.startsWith("a") && nombreB.startsWith("a")) return 1;
                return 0;
            });
            table();
            ordenNombre=true;
        }
    }

    const edad = () =>{
        if(ordenEdad){
            tabla.sort((a, b) => a.Edad - b.Edad);
            table()
            ordenEdad = false;
        }else{
            tabla.sort((b, a) => a.Edad - b.Edad);
            table()
            ordenEdad = true;
        }
    }

    const dni = () =>{
        if(ordenDni){
            tabla.sort((a, b) => {
                const numeroDNI_A = parseInt(a.DNI.slice(0, 8), 10);
                const numeroDNI_B = parseInt(b.DNI.slice(0, 8), 10);
                if (numeroDNI_A < numeroDNI_B) return -1;
                if (numeroDNI_A > numeroDNI_B) return 1;
            });
            table()
            ordenDni = false;
        }else{
            tabla.sort((b, a) => {
                const numeroDNI_A = parseInt(a.DNI.slice(0, 8), 10);
                const numeroDNI_B = parseInt(b.DNI.slice(0, 8), 10);
                if (numeroDNI_A < numeroDNI_B) return -1;
                if (numeroDNI_A > numeroDNI_B) return 1;
            });
            table()
            ordenDni = true;
        }
    }
    const hijo = () =>{
        if(ordenHijos){
            tabla.sort((a,b) => {
                const HijosA = a.Hijos.toLowerCase();
                const HijosB = b.Hijos.toLowerCase();
                
                if (HijosA < HijosB) return -1;
                if (HijosA > HijosB) return 1;

                if (HijosA.startsWith("a") && !HijosB.startsWith("a")) return -1;
                if (!HijosA.startsWith("a") && HijosB.startsWith("a")) return 1;
                return 0;
            });
            table()
            ordenHijos = false;
        }else {
            tabla.sort((b, a) => {
                const HijosA = a.Hijos.toLowerCase();
                const HijosB = b.Hijos.toLowerCase();
                
                if (HijosA < HijosB) return -1;
                if (HijosA > HijosB) return 1;

                if (HijosA.startsWith("a") && !HijosB.startsWith("a")) return -1;
                if (!HijosA.startsWith("a") && HijosB.startsWith("a")) return 1;
                return 0;
            });
            table()
            ordenHijos = true;
        }
    }
    const naci = () =>{
        function fecha(cadena) {
            const [day, month, year] = cadena.split('/');
            return new Date(`${year}-${month}-${day}`)
        }

        if(ordenNacimiento){
            tabla.sort((a, b) => {
                const fechaA = fecha(a.Nacimiento);
                const fechaB = fecha(b.Nacimiento);

                if (fechaA < fechaB) return -1;
                if (fechaA > fechaB) return 1;
            });
            table();
            ordenNacimiento = false;
        }else{
            tabla.sort((b, a) => {
                const fechaA = fecha(a.Nacimiento);
                const fechaB = fecha(b.Nacimiento);

                if (fechaA < fechaB) return -1;
                if (fechaA > fechaB) return 1;
            });
            table();
            ordenNacimiento = true;
        }
    }
    