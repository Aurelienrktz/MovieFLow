import React from "react";
const imgBase_Url = "https://image.tmdb.org/t/p/original/";

const Recomandation = ({ recomendation, setMovie }) => {
  return (
    <div className=" text-white text-2xl mt-10 px-5 md:text-4xl md:px-10 md:mt-15">
      <h1 className="before ">Recommendation</h1>
      <h1 className="mt-4 text-blue-600 md:text-6xl">
        {recomendation.length == 0 && "No recommendation"}
      </h1>
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 py-5 px-2 scrollbar-thin scrollbar-track-gray-300 scrollbar-custom">
        {recomendation.map((value, index) => {
          return (
            <div
              key={index}
              className="relative w-[200px] flex-shrink-0 cursor-pointer group translate-y-1.5 transition-all duration-400"
              onClick={() => {
                setMovie(value);
                const section = document.getElementById("navbar");
                section?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={`${imgBase_Url}${value.backdrop_path}`}
                  alt={value.title}
                  className="object-cover w-full h-70 rounded-2xl"
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

                  <button className="bg-gray-600 hover:bg-gray-700 transition text-white p-2 rounded-md flex items-center justify-center cursor-pointer">
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

export default Recomandation;
