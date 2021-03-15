import { useState, useEffect } from 'react';
import fetch from 'isomorphic-unfetch';

function useFetchMusic(year) {
  const [ music, setMusic ] = useState({});
  const [ isLoading, setIsLoading ] = useState(false);
  const [ error, setError ] = useState("");

  useEffect(() => {
    let ignore = false;
    const controller = new AbortController();

    async function fetchBillboardChart() {
      let responseBody = {};
      setIsLoading(true);
      setError("");
      try {
        const res = await fetch('/api/billboard', {
          method: 'post',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify({ name: 'hot-100-songs', year: year }),
          signal: controller.signal
        });

        responseBody = await res.json();
      } catch (e) {
        if (e instanceof DOMException) {
          setError("HTTP request aborted");
        } else {
          setError(e.toString());
        }
      }

      if (!ignore) {
        setMusic(responseBody || {});
        setIsLoading(false);
      }
    }
    if (year) {
      fetchBillboardChart();
    }
    return () => {
      controller.abort();
      ignore = true;
    };
  }, [ year ]);

  return [ music, isLoading, error ]
}

export default useFetchMusic;