document.addEventListener('DOMContentLoaded', () => {
    const okButton = document.getElementById('ok');

    if (okButton) {
        okButton.addEventListener('click', async () => {
            const inputPokemon = document.getElementById('pokemon') as HTMLInputElement;
            const pokemonNameOrId = inputPokemon.value.trim().toLowerCase();

            if (pokemonNameOrId) {
                try {
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonNameOrId}/`);

                    if (!response.ok) {
                        throw new Error('Error: Pokémon inexistente.');
                    }

                    const data = await response.json();
                    displayPokemonInfo(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                    displayError('Error inesperado. Intenta de nuevo más tarde.');
                }
            } else {
                // Manejar el caso de entrada vacía
                displayError('Error: Ingresa un nombre o ID de Pokémon válido.');
            }
        });
    }
});

async function getPokemonInfo(nameOrId: string) {
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${nameOrId}/`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            // Si la respuesta no es exitosa, mostrar un mensaje de error
            displayError('Error: Pokémon inexistente.');
            return;
        }

        const data = await response.json();

        // Llamar a la función para mostrar la información en la interfaz
        displayPokemonInfo(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        displayError('Error inesperado. Intenta de nuevo más tarde.');
    }
}

function displayPokemonInfo(pokemonData: any) {
    const imagenDiv = document.getElementById('imagen');
    const infoDiv = document.getElementById('info');

    if (imagenDiv && infoDiv) {
        // Limpiar los contenidos anteriores
        imagenDiv.innerHTML = '';
        infoDiv.innerHTML = '';

        // Crear la imagen del Pokémon
        const pokemonImage = document.createElement('img');
        pokemonImage.src = pokemonData.sprites.front_default;
        pokemonImage.alt = pokemonData.name;
        pokemonImage.style.width = '200px';

        imagenDiv.appendChild(pokemonImage);
        console.log(pokemonImage);

        // Crear la información del Pokémon
        const pokemonInfo = document.createElement('div');
        pokemonInfo.innerHTML = `
            <h2>${pokemonData.name}</h2>
            <p>Type: ${pokemonData.types.map((type: any) => type.type.name).join(', ')}</p>
            <p>HP: ${pokemonData.stats.find((stat: any) => stat.stat.name === 'hp').base_stat}</p>
            <p>Attack: ${pokemonData.stats.find((stat: any) => stat.stat.name === 'attack').base_stat}</p>
            <p>Defense: ${pokemonData.stats.find((stat: any) => stat.stat.name === 'defense').base_stat}</p>
            <p>Speed: ${pokemonData.stats.find((stat: any) => stat.stat.name === 'speed').base_stat}</p>
        `;
        infoDiv.appendChild(pokemonInfo);
        console.log(pokemonInfo);
    }
}

function displayError(errorMessage: string) {
    const infoDiv = document.getElementById('info');

    if (infoDiv) {
        // Limpiar los contenidos anteriores
        infoDiv.innerHTML = '';

        // Mostrar mensaje de error
        const errorParagraph = document.createElement('p');
        errorParagraph.textContent = errorMessage;
        errorParagraph.style.color = 'red';
        infoDiv.appendChild(errorParagraph);
    }
}
