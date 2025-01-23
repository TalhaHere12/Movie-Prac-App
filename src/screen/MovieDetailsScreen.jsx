import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'react-native';
const MovieDetailsScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.overview}>{item.overview}</Text>
      <Text style={styles.releaseDate}>Release Date: {item.release_date}</Text>
      <Text style={styles.releaseDate}>Actors: {item.cast}</Text>
      <Image style={styles.moviePoster} source={{uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  overview: {
    fontSize: 16,
    marginBottom: 10,
  },
  releaseDate: {
    fontSize: 14,
    fontStyle: 'italic',
  },
  moviePoster: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  
});

export default MovieDetailsScreen;
