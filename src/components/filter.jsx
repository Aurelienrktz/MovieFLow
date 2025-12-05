import React from "react";
import Filterbtn from "./filterbtn";
const imgBase_Url = "https://image.tmdb.org/t/p/original/";

const Filter = ({ filter, setMovie, addToList, filterMovie, idGenre }) => {
  return (
    <div className=" text-white text-2xl mt-10 md:text-4xl px-5 md:px-10 md:mt-15 ">
      <div className="mt-8 md:mt-10 flex md:flex-wrap gap-x-10 gap-y-5 md:gap-x-20 md:gap-y-5 overflow-x-scroll scrollbar-custom md:overflow-auto ">
        <Filterbtn
          id={28}
          categorie="Action"
          filterMovie={filterMovie}
          idGenre={idGenre}
        />
        <Filterbtn
          id={35}
          categorie="Comedie"
          filterMovie={filterMovie}
          idGenre={idGenre}
        />
        <Filterbtn
          id={27}
          categorie="Horror"
          filterMovie={filterMovie}
          idGenre={idGenre}
        />
        <Filterbtn
          id={878}
          categorie="Science Fiction"
          filterMovie={filterMovie}
          idGenre={idGenre}
        />
        <Filterbtn
          id={37}
          categorie="Western"
          filterMovie={filterMovie}
          idGenre={idGenre}
        />
        <Filterbtn
          id={10751}
          categorie="Family"
          filterMovie={filterMovie}
          idGenre={idGenre}
        />
      </div>
      <div className="flex justify-start flex-wrap gap-6 mt-8  whitespace-nowrap w-full">
        {filter.map((value, index) => {
          return (
            <div
              key={index}
              className="relative mx-auto w-10/12 md:w-[200px] flex-shrink-0 cursor-pointer group hover:-translate-y-1.5 transition-all duration-400"
              onClick={() => {
                setMovie(value);
                const section = document.getElementById("navbar");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={`${imgBase_Url}${value.poster_path}`}
                  alt={value.title}
                  className="object-cover w-full h-70 rounded-2xl"
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-start justify-end gap-2 p-2 rounded-2xl">
                  <button
                    className="bg-blue-700 hover:bg-blue-800 transition text-white p-2 rounded-md flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      setMovie(value);
                      const section = document.getElementById("navbar");
                      section?.scrollIntoView({ behavior: "smooth" });
                    }}
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
                        d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => {
                      addToList(value);
                    }}
                    className="bg-gray-600 hover:bg-gray-700 transition text-white p-2 rounded-md flex items-center justify-center cursor-pointer"
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

              <h1 className="text-center text-xl my-4 px-2 break-words whitespace-normal">
                {value.title}
              </h1>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Filter;
