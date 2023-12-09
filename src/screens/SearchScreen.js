import React, { useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const { results, errorMessage, loading, searchRestaurants } = useResults();

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
