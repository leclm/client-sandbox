const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

if (!API_KEY) {
  console.warn('VITE_TMDB_API_KEY não definida no .env');
}

export type Movie = {
  id: number;
  title: string;
  release_date: string;
  vote_average: number;
  popularity: number;
  original_language: string;
};

type PopularMoviesResponse = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export async function getPopularMovies(): Promise<PopularMoviesResponse> {
  const url = `${API_BASE_URL}/movie/popular?api_key=${API_KEY}&language=pt-BR`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Erro ao buscar filmes populares');
  }

  return res.json();
}
