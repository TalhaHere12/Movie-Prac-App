import axios from 'axios';

const API_URL = 'https://api.themoviedb.org/3/movie/popular';
const API_KEY = '44dc8a46af046ca44f50f31df84bb28d'; 

export const fetchMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}?api_key=${API_KEY}&language=en-US&page=1`);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    return [];
  }
};
