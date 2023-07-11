import React, { useState, useEffect } from 'react';

function App () {
  const [quotes, setQuotes] = useState([]);
  const [phraseFilter, setPhraseFilter] = useState('');
  const [characterFilter, setCharacterFilter] = useState('All');

  useEffect(() => {
    fetch('https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json')
      .then(response => response.json())
      .then(data => setQuotes(data));
  }, []);

  const renderFilterQuotes = () => {
    return quotes.filter(quote => {
      const matchesPhrase = quote.quote.toLowerCase().includes(phraseFilter.toLowerCase());
      const matchesCharacter = characterFilter === 'All' || quote.character === characterFilter;
      return matchesPhrase && matchesCharacter;
    });
  };

  const handleInputPhrase = (ev) => {
    setPhraseFilter(ev.target.value);
  };

  const handleInputCharacter = (ev) => {
    setCharacterFilter(ev.target.value);
  };


  return (
    <div>
      <header>
      <h1>Frases de Friends</h1>
      </header>
      <section>
        <form>
        <label htmlFor="phraseFilter">Filtrar por frase:</label>
        <input
          type="text"
          id="phraseFilter"
          value={phraseFilter}
          onChange={handleInputPhrase }
        />
        </form>
      </section>
      <section>
        <form>
        <label htmlFor="characterFilter">Filtrar pot personaje:</label>
        <select
          id="characterFilter"
          value={characterFilter}
          onChange={handleInputCharacter}
        >
          <option value="All">Todos</option>
          <option value="Ross">Ross</option>
          <option value="Monica">Monica</option>
          <option value="Joey">Joey</option>
          <option value="Phoebe">Phoebe</option>
          <option value="Chandler">Chandler</option>
          <option value="Rachel">Rachel</option>
        </select>
        </form>
      </section>
      <form>
      <ul>
        {renderFilterQuotes().map(quote => (
          <li> {quote.quote} - {quote.character}</li>
        ))}
      </ul>
      </form>
     
    </div>
  );
}

export default App;