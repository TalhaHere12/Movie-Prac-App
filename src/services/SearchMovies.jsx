import axios from "axios";

const SEARCH_API_URL = 'https://api.themoviedb.org/3/search/movie';
const API_KEY = '44dc8a46af046ca44f50f31df84bb28d'; 

export const SearchMovies = async (query) => {
    try {
        const response = await axios.get(`${SEARCH_API_URL}?api_key=${API_KEY}&language=en-US&query=${query}`);
        return response.data.results
    } catch (error) {
        console.error("Error while searching for the movie:", error.message);
        return []; 
    }
};