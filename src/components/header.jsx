import React, { useState } from "react";
const imgBase_Url = "https://image.tmdb.org/t/p/original/";

const Header = ({ movie }) => {
  const [more, setMore] = useState(false);

  return (
    <div className="relative h-[90vh] md:h-[80vh] w-full flex justify-center">
      <img
        src={`${imgBase_Url}${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full h-full object-cover md:object-contain mx-auto z-0"
      />

      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_top,rgba(20,20,20,0.8)_50%,rgba(20,20,20,0.6)_90%,rgba(20,20,20,0.5)_100%)] z-0 pointer-events-none"></div>

      <div className="absolute bottom-5 left-5 md:left-10 md:w-1/2 max-h-[90%] md:max-w-full flex flex-col gap-4 z-10 text-white">
        <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl ">
          {movie.title}
        </h1>

        <section className="flex gap-3 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-yellow-300"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
            />
          </svg>
          <h2 className="text-lg font-semibold">
            {(movie.vote_average / 2).toFixed(1)} / 5
          </h2>
          <h3 className="text-lg font-light">{movie.release_date}</h3>
          <h3 className="text-lg font-medium outline-2 p-1 rounded-xs outline-gray">
            {movie.original_language.toUpperCase()}
          </h3>
        </section>

        <p className="text-sm md:text-base lg:text-lg max-h-10/12 w-full ">
          {movie.overview}
        </p>

        <section className="flex gap-4 flex-wrap">
          <button
            className="bg-blue-700 hover:bg-blue-800 transition text-white p-3 rounded-md flex items-center gap-2 cursor-pointer"
            onClick={() => setMore(!more)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              />
            </svg>
            Info
          </button>
          <button className="bg-gray-600 hover:bg-gray-700 transition text-white p-3 rounded-md flex items-center gap-2 cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Ma liste
          </button>
        </section>
      </div>
    </div>
  );
};

export default Header;
