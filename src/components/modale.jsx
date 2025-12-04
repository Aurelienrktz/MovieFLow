import React from "react";

const imgBase_Url = "https://image.tmdb.org/t/p/original/";

export default function Modal({ open, onClose, serie, addToList }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-gray-500/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div className="bg-neutral-900 text-white rounded-xl shadow-lg w-11/12 h-10/12 md:w-10/12 relative overflow-y-scroll">
        <div className=" rounded-t-xl h-8/12 w-full relative ">
          <img
            src={`${imgBase_Url}${serie.backdrop_path}`}
            alt=""
            className=" rounded-t-xl h-full w-full object-cover opacity-95"
          />
          <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_top,rgba(20,20,20,0.8)_50%,rgba(20,20,20,0.6)_90%,rgba(20,20,20,0.5)_100%)] z-0 pointer-events-none"></div>
          <div className="absolute flex flex-col gap-1 md:gap-3 bottom-5 left-2 md:left-5 text-white z-20">
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl ">
              {serie.name}
            </h1>
            <h3 className="text-lg font-light">
              {serie.first_air_date} / {serie.last_air_date}
            </h3>
            <div className="flex gap-1 items-center">
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
              <h3 className="text-lg font-semibold">
                {(serie.vote_average / 2).toFixed(2)} / 5
              </h3>
              <h3 className="text-lg font-medium p-1 ml-2 rounded-xs outline-2 outline-gray">
                {serie.original_language.toUpperCase()}
              </h3>{" "}
            </div>
            {/* <h2>Popularité : {serie.popularity}</h2> */}
            <p className=" w-full line-clamp-9 md:w-1/2 md:line-clamp-6">
              {serie.overview}
            </p>
            <button
              onClick={() => {
                addToList(serie);
              }}
              className="bg-gray-600 w-10 hover:bg-gray-700 transition text-white p-2 rounded-md flex items-center justify-center cursor-pointer"
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="p-2 md:p-5">
          <h1 className="font-bold mb-3">Saisons</h1>
          <div className="flex flex-col gap-5 md:gap-10">
            {serie.seasons.map((value, index) => (
              <div
                key={index}
                className="flex gap-2 rounded-xl hover:-translate-y-1.5 transition-all duration-300 hover:bg-neutral-800"
              >
                <img
                  src={`${imgBase_Url}${value.poster_path}`}
                  alt={value.name}
                  className=" rounded-xl w-30 h-auto"
                />
                <div className="flex flex-col gap-3">
                  <h1 className="font-medium text-2xl">Saison {index + 1}</h1>
                  {value.overview != "" ? (
                    <p className="w-10/12 line-clamp-4">{value.overview}</p>
                  ) : (
                    <p className="text-3xl text-red-500">
                      Description Indisponible
                    </p>
                  )}
                  <h3 className="text-lg font-medium text-blue-500">
                    {value.episode_count} Episodes
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button
          className="z-20 bg-blue-500 hover:bg-blue-600 hover:scale-110 cursor-pointer transition-all duration-300 text-white px-3 py-2 mx-auto mb-3 block rounded-lg"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </div>
  );
}
