import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App(){
  const [data, setData] = useState({ hits: [] }); // Hits = Hacker News Articles...
  const [query, setQuery] = useState('redux');
  const [url, setUrl] = useState(
    'http://hn.algolia.com/api/v1/search?query=redux'
  );
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const result = await axios(url);
      setData(result.data);
    } catch(error) {
      setIsError(true)
    }
    setIsLoading(false)
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  const doGet = event => {
    setUrl(`http://hn.algolia.com/api/v1/search?query=${query}`);
    event.preventDefault();
  };

  return(
    <React.Fragment>
      <form onSubmit={doGet}>
        <input type="text"
              value={query}
              onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
        </form>

        { isError && <div>Something went terribly wrong...</div> }

        {isLoading ? (
          <div>Loading...</div>
        ): (
          <ul>
            {data.hits.map(item => (
              <li key={item.objectID}>
                <a href={item.url}>{item.title}</a>
              </li>
          ))}
          </ul>
        )}
    </React.Fragment>
  );
}

export default App;