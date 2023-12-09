import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  View,
  ActivityIndicator,
} from "react-native";
import yelp from "../api/yelp";

const ResultShowScreen = ({ route }) => {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const id = route.params.id;

  const getResult = async (selectedId) => {
    try {
      const response = await yelp.get(`/${selectedId}`);
      setResult(response.data);
    } catch (error) {
      console.error("Error fetching result:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        color="#0000ff"
        style={styles.loadingIndicator}
      />
    );
  }

  if (!result) {
    return <Text>No result found.</Text>;
  }

  return (
    <View>
      <Text style={styles.title}>{result.name}</Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    height: 200,
    width: 300,
    marginBottom: 10,
  },
  loadingIndicator: {
    marginTop: 50,
  },
});

export default ResultShowScreen;
