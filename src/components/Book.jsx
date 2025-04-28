import React, { useState, useEffect } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { fetchAllPokemon } from '../dataFetch'; // Adjust the import path as necessary

function Book() {
  const [pokemonData, setPokemonData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await fetchAllPokemon(); // Fetch all Pokémon data
            setPokemonData(data); 
        } catch (error) {
            console.error('Error fetching Pokémon data:', error);
        }
    };
    fetchData();
  }, []);

  return (
    <HTMLFlipBook
      width={300}
      height={500}
      maxShadowOpacity={0.5}
      drawShadow={true}
      showCover={true}
      size="fixed"
    >
      <div className="page" style={{ background: 'transparent' }}>
        <div className="page-content cover">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
            alt="Pokémon Logo"
            className="pokemon-logo"
          />
        </div>
      </div>

      {pokemonData.map((pokemon) => (
        <div className="page" key={pokemon.id}>
          <div className="page-content">
            <div className="pokemon-container">
              <img
                src={`https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/${pokemon.id}.png`}
                alt={pokemon.name}
              />
              <div className="pokemon-info">
                <h2 className="pokemon-name">{pokemon.name}</h2>
                <p className="pokemon-number">#{pokemon.id}</p>
                <div>
                  {pokemon.types.map((type) => (
                    <span key={type} className={`pokemon-type type-${type.toLowerCase()}`}>
                      {type}
                    </span>
                  ))}
                </div>
                <p className="pokemon-description">{pokemon.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="page" data-density="hard">
          Last page
      </div>
      
    </HTMLFlipBook>
  );
}

export default Book;