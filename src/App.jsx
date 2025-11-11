import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import Navbar from "./components/navbar";
import Header from "./components/header";
import Similar from "./components/similar";
import Recomandation from "./components/recomandation";
import Filter from "./components/filter";
import ScrollLinked from "./components/scroll";

function App() {
  const [movie, setMovie] = useState();
  const [similar, setSimilar] = useState([]);
  const [recomendation, setRecomendation] = useState([]);
  const [filter, setFilter] = useState([]);
  const [idGenre, setIdGenre] = useState(28);
  const [dark, setDark] = useState(false);
  const[loading,setLoading]=useState(true);

  // API
  const Key = "64a65a77797fb0b684c675f04f2ad0cf";
  const base_Url = "https://api.themoviedb.org/3/movie";

  async function fetchMovie() {
    const index = parseInt(Math.random() * 10);
    try {
      // 
      setLoading(true)
      // 
      const response = await axios.get(`${base_Url}/upcoming`, {
        params: {
          api_key: Key,
          page: 1,
          language: "fr",
        },
      });
      setMovie(response.data.results[index]);
    } catch (err) {
      console.log(err.message);
    } finally{
      setLoading(false)
    }
  }

  async function fetchSimilarAndRecommandation(movie_id) {
    try {
      const [similarRes, recommendRes] = await Promise.all([
        axios.get(`${base_Url}/${movie_id}/similar`, {
          params: { api_key: Key, page: 1, language: "fr" },
        }),
        axios.get(`${base_Url}/${movie_id}/recommendations`, {
          params: { api_key: Key, page: 1, language: "fr" },
        }),
      ]);
      setSimilar(similarRes.data.results);
      setRecomendation(recommendRes.data.results);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function filterMovie(Idgenre) {
    setIdGenre(Idgenre);
    try {
      setLoading(true)
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${Idgenre}&sort_by=popularity.desc`,
        {
          params: {
            api_key: Key,
            page: 1,
            language: "fr",
          },
        }
      );
      setFilter(response.data.results);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMovie();
    filterMovie(idGenre);
  }, []);
  useEffect(() => {
    if (!movie) return;
    fetchSimilarAndRecommandation(movie.id);
  }, [movie]);

  return (
    <div className="bg-dark">
      <Navbar />
      {/* {movie && <ScrollLinked recomendation={similar} setMovie={setMovie} />} */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[90vh]">
          <svg
            className="animate-spin h-12 w-12 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <p className="mt-2 text-blue-600">Chargement des films...</p>
        </div>
      ) : (
        <Header movie={movie} />
      )}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-[90vh]">
          <svg
            className="animate-spin h-12 w-12 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8H4z"
            ></path>
          </svg>
          <p className="mt-2 text-blue-600">Chargement des films...</p>
        </div>
      ) : (
        <Similar similar={similar} setMovie={setMovie} />
      )}
      {/* {movie && <Similar similar={similar} setMovie={setMovie} />} */}
      {movie && (
        <Filter
          filter={filter}
          setMovie={setMovie}
          title={"Filter"}
          filterMovie={filterMovie}
          idGenre={idGenre}
        />
      )}
      {movie && (
        <Recomandation
          recomendation={recomendation}
          setMovie={setMovie}
          title={"Recommendations"}
        />
      )}
    </div>
  );
}

export default App;
