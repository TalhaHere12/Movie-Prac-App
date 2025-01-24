import axios from 'axios';

const API_KEY = '44dc8a46af046ca44f50f31df84bb28d';
const BASE_URL = 'https://api.themoviedb.org/3';

export const RelatedMovies = async (movieId) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching related movies:', error.message);
  }
};
