import { useState, useEffect } from 'react';

function useFetchData(url) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); // Initialize loading state

    //console.log("useFetchData has been called");
    
    useEffect(() => {
        let ignore = false;
        setLoading(true); // Start loading
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(json => {
                if (!ignore) {
                    setData(json);
                    setError(null); // Clear any existing errors
                    //console.log("Fetched data Inside Hook:", json);
                }
            })
            .catch(err => {
                if (!ignore) {
                    setError(err);
                    setData(null); // Clear any existing data
                }
            })
            .finally(() => {
                if (!ignore) setLoading(false); // Finish loading
            });

        // Cleanup function to avoid setting state on unmounted component
        return () => {
            ignore = true;
        };
    }, [url]);
    //console.log("Fetched data outside Hook:", data);
    return { data, error, loading }; // Return the data, error, and loading states
}

export default useFetchData;
