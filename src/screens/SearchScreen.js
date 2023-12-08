import React, { useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import SearchBar from "../components/SearchBar";
import yelp from "../api/yelp";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);

  const searchRestaurants = async () => {
    try {
      setLoading(true);
      const response = await yelp.get("/search", {
        params: {
          limit: 50,
          term: term,
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

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={searchRestaurants}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : errorMessage ? (
        <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : (
        <Text>We found {results.length} results.</Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  errorMessage: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
  },
});

export default SearchScreen;
