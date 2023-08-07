// Custom "useHttp()" hook
import { useState, useCallback } from "react";

// Function that accepts a "requestConfig" OBJECT
// with info for URL, request method, headers, etc.
// And an "applyData" FUNCTION that is passed in by the calling component
// and which will correctly handle the fetched data.
const useHttp = (requestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // async-await version of fetch() API
  const sendRequest = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method ? requestConfig.method : "GET", // GET method is default
        headers: requestConfig.headers ? requestConfig.headers : {}, // no headers is default
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null // no body is default
      });
      if (!response.ok) {
        throw new Error("Request failed.");
      }
      const data = await response.json();

      applyData(data);
    } catch (error) {
      setError(error.message || "Something went wrong :(");
    }
    setIsLoading(false);
  }, [requestConfig, applyData]);

  return {
    isLoading: isLoading,
    error: error,
    sendRequest: sendRequest // points to the "sendRequest" function above
  };
};

export default useHttp;
