import { useState } from "react";

export default useApi = (apiFunction) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const request = async (...args) => {
    setLoading(true);
    const response = await apiFunction(...args);

    setError(!response.ok);
    setData(response.data.data);
    setLoading(false);
    return response;
  };

  return { data, error, loading, request };
};
