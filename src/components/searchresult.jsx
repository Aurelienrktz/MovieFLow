import React from "react";
const imgBase_Url = "https://image.tmdb.org/t/p/w300/";
const Searchresult = ({ movieSearched, setMovie, setMovieSearched ,setTitre}) => {
    function selectMovie(value){
        setMovie(value);
        setMovieSearched(false);
        setTitre("");
    }
  return (
    <div className="bg-white flex flex-col absolute top-12 overflow-y-scroll rounded-b-md p-1 z-20 w-full h-auto max-h-[50vh] ">
      {movieSearched.length != 0 ? (
        <>
          {movieSearched.map((value, index) => (
            <div
              key={index}
              className="w-full h-15 flex gap-2 cursor-pointer mb-5 rounded-sm hover:bg-gray-300 transition-all duration-300 "
              onClick={() => selectMovie(value)}
            >
              <img
                src={`${imgBase_Url}${value.poster_path}`}
                alt={value.title}
                className="object-cover w-15 h-15"
              />
              <h1 className="text-center line-clamp-1">{value.title}</h1>
            </div>
          ))}
        </>
      ) : (
        <h1>Aucun resultat</h1>
      )}
    </div>
  );
};

export default Searchresult;
