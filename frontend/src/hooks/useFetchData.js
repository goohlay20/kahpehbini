import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useFetchData = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async() => {
    setError(null);
    try {
      const { 
        data: { data },
      } = await axios.get(url);
      setData(data);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      console.error(err.response?.data?.message || 'An error occurred');
    }
  }, [url]);

  useEffect(()=> {
    fetchData();
  }, [fetchData]);

  return { data, error, refetch: fetchData };
};

export default useFetchData;