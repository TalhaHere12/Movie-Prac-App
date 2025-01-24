import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import { fetchMovies } from '../services/service';
import { SearchMovies } from '../services/SearchMovies';

const HomeScreen = ({ navigation }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        const getMovies = async () => {
            const movieData = await fetchMovies();
            setMovies(movieData);
            setLoading(false);
        };
        getMovies();
    }, []);

    const handleSearchQuery = async () => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }
        setLoading(true);
        const results = await SearchMovies(searchQuery);
        setSearchResults(results);
        setLoading(false);
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search for a movie..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearchQuery} 
            />
            <FlatList
                data={searchResults.length > 0 ? searchResults : movies} 
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.movieItem}
                        onPress={() => navigation.navigate('MovieDetails', { item })}
                    >
                        <Text style={styles.movieTitle}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <Text style={styles.emptyMessage}>No movies found.</Text> 
                }
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    movieItem: {
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    movieTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyMessage: {
        textAlign: 'center',
        fontSize: 16,
        marginTop: 20,
        color: '#888',
    },
});
export default HomeScreen;