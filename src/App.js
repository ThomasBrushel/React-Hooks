import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App(){
  const [data, setData] = useState({ hits: [] }); // Hits = Hacker News Articles...
  const [query, setQuery] = useState('redux');
  const [search, setSearch] = useState('');

  const fetchData = async () => {
    const result = await axios(
      `http://hn.algolia.com/api/v1/search?query=${query}`,
      );
    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return(
    <React.Fragment>
      <input type="text"
             value={query}
             onChange={event => setQuery(event.target.value)}
      />
      <button type="button" onClick={() => setSearch(query)}>
        Search
      </button>
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
    </React.Fragment>
  );

}

export default App;