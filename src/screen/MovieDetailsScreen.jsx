import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Image } from 'react-native';
import { RelatedMovies } from '../services/RelatedMovies';

const MovieDetailsScreen = ({ route, navigation }) => {
  const { item } = route.params; // Main movie details
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch related movies dynamically based on the movie ID
  useEffect(() => {
    const getRelatedMovies = async () => {
      const movies = await RelatedMovies(item.id); // Pass the current movie ID
      setRelatedMovies(movies);
      setLoading(false);
    };
    getRelatedMovies();
  }, [item.id]);

  // Render a loading indicator while fetching data
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item.title}</Text>
      <Image
        style={styles.moviePoster}
        source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
      />
      <Text style={styles.overview}>{item.overview}</Text>
      <Text style={styles.releaseDate}>Release Date: {item.release_date}</Text>

      <Text style={styles.relatedMoviesTitle}>Related Movies:</Text>
      <FlatList
        data={relatedMovies}
        keyExtractor={(relatedMovie) => relatedMovie.id.toString()}
        renderItem={({ item: relatedMovie }) => (
          <TouchableOpacity
            style={styles.relatedMovieItem}
            onPress={() =>
              navigation.push('MovieDetails', { item: relatedMovie })
            }
          >
            <Image
              style={styles.relatedMoviePoster}
              source={{ uri: `https://image.tmdb.org/t/p/w200${relatedMovie.poster_path}` }}
            />
            <Text style={styles.relatedMovieTitle}>{relatedMovie.title}</Text>
          </TouchableOpacity>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
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
    marginBottom: 15,
  },
  moviePoster: {
    width: '100%',
    height: 300,
    borderRadius: 5,
    marginBottom: 15,
  },
  relatedMoviesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  relatedMovieItem: {
    marginRight: 10,
    alignItems: 'center',
  },
  relatedMoviePoster: {
    width: 100,
    height: 150,
    borderRadius: 5,
  },
  relatedMovieTitle: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MovieDetailsScreen;
