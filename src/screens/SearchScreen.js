import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import SearchBar from "../components/SearchBar";
import yelp from "../api/yelp";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);

  const searchRestaurants = async () => {
    const response = await yelp.get("/search", {
      params: {
        limit: 50,
        term: term,
        location: "san jose",
      },
    });
    setResults(response.data.businesses);
  };

  return (
    <View>
      <SearchBar
        term={term}
        onTermChange={setTerm}
        onTermSubmit={searchRestaurants}
      />
      <Text>We found {results.length} results.</Text>
    </View>
  );
};
const styles = StyleSheet.create({});

export default SearchScreen;
