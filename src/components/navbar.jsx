import axios from "axios";
import React, { useState } from "react";
import Searchresult from "./searchresult";

const Navbar = ({ setMovie }) => {
  const Key = "64a65a77797fb0b684c675f04f2ad0cf";
  const [titre, setTitre] = useState("");
  const [movieSearched, setMovieSearched] = useState([]);
  const [affiche, setAffiche] = useState(false);

  async function recherche(titre) {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${titre}`,
        {
          params: {
            api_key: Key,
            page: 1,
            language: "fr",
          },
        }
      );
      setMovieSearched(response.data.results);
    } catch (err) {
      console.log(err);
    }
  }
  async function rechercheOnchange(titre) {
    setTitre(titre);
    if (titre.length > 3) {
      setAffiche(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${titre}`,
          {
            params: {
              api_key: Key,
              page: 1,
              language: "fr",
            },
          }
        );
        setMovieSearched(response.data.results);
      } catch (err) {
        console.log(err);
      }
    } else {
      setAffiche(false);
    }
  }

  return (
    <div
      id="navbar"
      className="h-18 flex justify-between items-center p-4 md:py-4 md:px-12"
    >
      <div className="flex justify-center items-center gap-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="text-white size-11 md:size-9"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z"
          />
        </svg>
        <h1 className="text-white font-bold hidden md:text-2xl md:block">
          MovieFlow
        </h1>
      </div>
      <div className="flex justify-center items-center gap-4">
        <div className="flex justify-center relative">
          <label className="relative flex items-center bg-neutral-800 rounded-md px-3 py-2 outline-2 outline-gray focus-within:outline-blue-500 focus-within:outline-2 transition-colors w-full max-w-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="text-neutral-400 size-7 mr-2 cursor-pointer"
              onClick={() => recherche(titre)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m2.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z"
              />
            </svg>

            <input
              type="text"
              name="recherche"
              placeholder="Rechercher un film..."
              value={titre}
              className="bg-transparent w-full text-gray-200 placeholder-gray-400 outline-none md:text-xl focus:text-blue-500"
              onChange={(e) => rechercheOnchange(e.target.value)}
            />
          </label>
          {movieSearched && affiche && (
            <Searchresult
              setMovie={setMovie}
              setTitre={setTitre}
              setMovieSearched={setMovieSearched}
              movieSearched={movieSearched}
            />
          )}
        </div>
        {/* Icon mode */}
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-10 text-white border-2 p-1 rounded-md bg-neutral-800 cursor-pointer"
        >
          <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
        </svg> */}
      </div>
    </div>
  );
};

export default Navbar;
