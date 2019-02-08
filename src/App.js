import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App(){
  const [data, setData] = useState({ hits: [] }); // Hits = Hacker News Articles...

  const fetchData = async () => {
    const result = await axios(
      'http://hn.algolia.com/api/v1/search?query=redux',
      );
    setData(result.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return(
    <ul>
      {data.hits.map(item => (
        <li key={item.objectID}>
          <a href={item.url}>{item.title}</a>
        </li>
      ))}
    </ul>
  );

}

export default App;