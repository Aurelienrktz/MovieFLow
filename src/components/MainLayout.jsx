import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import Header from "./header";
import Similar from "./similar";
import Recomandation from "./recomandation";
import Filter from "./filter";
import Modal from "./modale";
import Footer from "../components/footer";
import {
  getDatabase,
  ref,
  push,
  onValue,
  off,
  remove,
} from "firebase/database";
import { auth } from "../firebase/firebase";
// import { motion } from "motion/dist/react";

const MainLayout = () => {
  const [movie, setMovie] = useState();
  const [seriePopular, setSeriePopular] = useState([]);
  const [serie, setSerie] = useState();
  const [similar, setSimilar] = useState([]);
  const [filter, setFilter] = useState([]);
  const [idGenre, setIdGenre] = useState(28);
  const [dark, setDark] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [listeFilm, setListeFilm] = useState([]);

  // Firebase
  const store = getDatabase();
  const userId = auth.currentUser.uid;

  // API
  const Key = "64a65a77797fb0b684c675f04f2ad0cf";
  const base_Url = "https://api.themoviedb.org/3/movie";
  const params = {
    params: {
      api_key: Key,
      page: 1,
      language: "fr",
    },
  };
  async function fetchMovie() {
    const index = parseInt(Math.random() * 10);
    try {
      setLoading(true);
      const response = await axios.get(`${base_Url}/upcoming`, params);
      setMovie(response.data.results[index]);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSimilarAndRecommandation(movie_id) {
    try {
      const similarRes = await axios.get(
        `${base_Url}/${movie_id}/similar`,
        params
      );
      setSimilar(similarRes.data.results);
    } catch (err) {
      console.log(err.message);
    }
  }

  async function filterMovie(Idgenre) {
    setIdGenre(Idgenre);
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?with_genres=${Idgenre}&sort_by=popularity.desc`,
        params
      );
      setFilter(response.data.results);
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchSeriePopular() {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/popular`,
        params
      );
      setSeriePopular(response.data.results);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchSerie(id) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}`,
        params
      );
      setSerie(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchSerieSimilar(id) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${id}/similar`,
        params
      );
      setSeriePopular(response.data.results);
    } catch (err) {
      console.log(err);
    }
  }

  // Ajout de film dans la liste à regarder plus tard
  async function addToList(param) {
    const movie = {
      image: `https://image.tmdb.org/t/p/original/${param.poster_path}`,
      titre: param.title ? param.title : param.name,
      overview: param.overview,
    };
    const ListeRef = ref(store, `users/${userId}/listeFilm`);
    try {
      await push(ListeRef, movie);
    } catch (err) {
      console.log(err);
    }
  }

  //Supprimer de la liste
  async function deleteFilmFromList(filmId) {
    // 1. Vérification de l'utilisateur
    if (!auth.currentUser) {
      console.error("Erreur : L'utilisateur n'est pas connecté.");
      return;
    }

    const userId = auth.currentUser.uid;

    // 2. Création de la référence exacte du film à supprimer
    // Le chemin doit inclure l'UID et l'ID du film : users/[UID]/listeFilm/[filmId]
    const filmRef = ref(store, `users/${userId}/listeFilm/${filmId}`);

    try {
      // 3. Utilisation de la fonction remove()
      await remove(filmRef);
      console.log(`Film avec l'ID ${filmId} supprimé avec succès.`);

      // Comme vous utilisez onValue() dans votre useEffect, l'affichage
      // dans le composant se mettra à jour automatiquement !
    } catch (error) {
      console.error("Erreur lors de la suppression du film :", error);
    }
  }

  useEffect(() => {
    fetchMovie();
    filterMovie(idGenre);
    fetchSeriePopular();
  }, []);

  useEffect(() => {
    if (!movie) return;
    fetchSimilarAndRecommandation(movie.id);
  }, [movie]);

  useEffect(() => {
    if (!userId) {
      setListeFilm([]); // Optionnel: Réinitialiser la liste si l'utilisateur se déconnecte
      return;
    }
    const ListeRef = ref(store, `users/${userId}/listeFilm`);
    // 2. Écouter les changements en temps réel avec onValue
    const unsubscribe = onValue(ListeRef, (snapshot) => {
      const data = snapshot.val();
      const loadedFilms = [];

      if (data) {
        // RTDB renvoie un objet d'objets. Nous devons le convertir en tableau.
        for (let key in data) {
          loadedFilms.push({
            id: key, // L'ID généré par push() est très utile ici
            ...data[key], // Les données du film (titre, image, etc.)
          });
        }
      }
      setListeFilm(loadedFilms);
    });
    // 3. Fonction de nettoyage : Arrêter l'écoute lorsque le composant se démonte
    return () => {
      off(ListeRef, "value", unsubscribe);
    };
  }, [userId]);

  return (
    <div>
      <Navbar setMovie={setMovie} />
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
        <Header movie={movie} setLoading={setLoading} addToList={addToList} />
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
        <Similar similar={similar} setMovie={setMovie} addToList={addToList} />
      )}
      {movie && (
        <Filter
          filter={filter}
          setMovie={setMovie}
          title={"Filter"}
          filterMovie={filterMovie}
          idGenre={idGenre}
          addToList={addToList}
        />
      )}
      {seriePopular && (
        <Recomandation
          recomendation={seriePopular}
          setMovie={() => setIsOpen(true)}
          fetchSerie={fetchSerie}
          fetchSerieSimilar={fetchSerieSimilar}
          addToList={addToList}
        />
      )}
      {serie && (
        <Modal
          open={isOpen}
          onClose={() => setIsOpen(false)}
          serie={serie}
          addToList={addToList}
        />
      )}
      <div className=" text-white text-2xl mt-10 px-5 md:text-4xl md:px-10 md:mt-15">
        <h1 className="before ">Ma Liste</h1>

        <div id="example" className="text-white mt-5 md:mt-10 ">
          {listeFilm.length != 0 ? (
            listeFilm.map((value, index) => {
              return (
                <div
                  key={index}
                  className=" text-white mb-3 flex items-center gap-2 rounded-xl transition-all duration-300 hover:bg-neutral-800"
                >
                  <img
                    src={`${value.image}`}
                    alt={value.titre}
                    className=" rounded-xl w-30 h-auto"
                  />
                  <div className="w-full flex flex-col gap-5 md:flex-row md:justify-between px-5 ">
                    <h1 className="text-xl font-normal">{value.titre}</h1>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="size-8 md:size-12 cursor-pointer text-red-500 hover:-translate-y-1.5 transition-all duration-300"
                      onClick={() => deleteFilmFromList(value.id)}
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              );
            })
          ) : (
            <h1 className="text-2 md:text-4xl text-blue-500 font-semibold">
              Liste vide
            </h1>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
