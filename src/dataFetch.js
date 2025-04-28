import axios from 'axios';

export const fetchAllPokemon = async () => {
  try {
    // Obtener la lista de todos los Pokémon
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0');
    const pokemonList = response.data.results;

    // Limitar la cantidad de Pokémon que se cargarán (opcional)
    const limitedPokemonList = pokemonList.slice(0, 50); // Cambia el número según lo necesario

    // Obtener los detalles de cada Pokémon
    const promises = limitedPokemonList.map((pokemon) => axios.get(pokemon.url));
    const results = await Promise.all(promises);

    // Transformar los datos obtenidos en el formato necesario
    return results.map((response) => {
      const pokemon = response.data;
      return {
        id: pokemon.id.toString().padStart(3, '0'),
        name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1),
        types: pokemon.types.map((type) => type.type.name),
        description: `Height: ${pokemon.height}, Weight: ${pokemon.weight}`, // Puedes agregar más detalles si lo deseas
      };
    });
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error; // Lanza el error para que el componente lo maneje si es necesario
  }
};