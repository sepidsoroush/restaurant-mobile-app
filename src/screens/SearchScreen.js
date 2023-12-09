import React, { useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import SearchBar from "../components/SearchBar";
import useResults from "../hooks/useResults";
import ResultsList from "../components/ResultsList";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const { results, errorMessage, loading, searchRestaurants } = useResults();

  const filterResultsByPrice = (price) => {
    return results.filter((item) => item.price === price);
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
        <>
          <Text>We found {results.length} results.</Text>
          <ResultsList
            title="Cost Effective"
            results={filterResultsByPrice("$")}
          />
          <ResultsList
            title="Bit Pricier"
            results={filterResultsByPrice("$$")}
          />
          <ResultsList
            title="Big Spender"
            results={filterResultsByPrice("$$$")}
          />
        </>
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
