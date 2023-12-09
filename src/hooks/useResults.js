import { useState, useEffect } from "react";
import yelp from "../api/yelp";

const useResults = () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const searchRestaurants = async (searchTerm) => {
    try {
      setLoading(true);
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term: searchTerm,
          location: "san jose",
        },
      });
      setResults(response.data.businesses);
      setErrorMessage();
    } catch (error) {
      setErrorMessage("Something went wrong :(");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    searchRestaurants("pasta");
  }, []);

  return { results, errorMessage, loading, searchRestaurants };
};

export default useResults;
