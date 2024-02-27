import { useState, useEffect } from 'react';

function useFetchData(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    console.log("useFetchData has been called")
    useEffect(() => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(jsonData => {
          setData(jsonData); // Assign fetched data to state
        })
        .catch(fetchError => {
          console.error("There was an error fetching the data:", fetchError);
          setError(fetchError); // Set error state
        });
    }, [url]); // Add url to the dependency array to react to changes
  
  return { data, error };
}

export default useFetchData;
