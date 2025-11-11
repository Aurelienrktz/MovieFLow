import React from "react";

const Filterbtn = ({ id, categorie, filterMovie, idGenre }) => {
  return (
    <button
      className={
        ` p-2 mb-4 md:mb-0 md:p-4 rounded-4xl cursor-pointer font-light md:w-auto ${idGenre === id ? "bg-blue-500":"border hover:bg-gray-500 transition-all duration-400"} `
      }
      onClick={() => filterMovie(id)}
    >
      {categorie}
    </button>
  );
};

export default Filterbtn;
