"use client";
const imgBase_Url = "https://image.tmdb.org/t/p/original/";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  useMotionValue,
  animate,
} from "motion/react";
import { useRef, useEffect, useState } from "react";

export default function Similar({ similar, setMovie, addToList }) {
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({ container: ref });
  const maskImage = useScrollOverflowMask(scrollXProgress);
  const [activeCard, setActiveCard] = useState(null);

  // ✅ Gère le scroll horizontal avec pavé tactile / molette
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (evt) => {
      if (evt.deltaY === 0) return;
      evt.preventDefault();
      el.scrollLeft += evt.deltaY;
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  return (
    <div
      id="example"
      className="text-white text-2xl mt-10 md:text-4xl px-5 md:px-10 md:mt-15 "
    >
      <h1 className="before text-center md:text-start">Similars</h1>
      <h1 className="mt-4 text-blue-600 md:text-6xl">
        {similar.length == 0 && "Pas de film Similaire"}
      </h1>
      {similar.length !== 0 && (
        <svg
          id="progress"
          width="80"
          height="80"
          viewBox="0 0 100 100"
          className="rotate-[-90deg] mt-8 md:mt-10"
        >
          <circle
            cx="50"
            cy="50"
            r="30"
            pathLength="1"
            className="stroke-gray-700 fill-none stroke-[10%]"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="30"
            pathLength="1"
            className="stroke-blue-600 fill-none stroke-[10%]"
            style={{ pathLength: scrollXProgress }}
          />
        </svg>
      )}
      <motion.ul
        ref={ref}
        className="flex overflow-x-auto snap-x snap-mandatory gap-6 py-5 px-2 scrollbar-thin scrollbar-track-gray-300 scrollbar-custom "
        style={{ maskImage }}
      >
        {similar.map((value, index) => (
          <div
            key={index}
            className="relative group w-[200px] flex-shrink-0 group cursor-pointer "
            onClick={() => {
              setActiveCard(activeCard === index ? null : index);
            }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-lg group-hover:-translate-y-1.5 transition-all duration-300">
              <img
                src={`${imgBase_Url}${value.poster_path}`}
                alt={value.title}
                className="object-cover w-full h-70 rounded-2xl"
                loading="lazy"
              />

              <div
                className={`absolute inset-0 bg-black/60 flex items-start justify-end gap-2 p-2 rounded-2xl transition-all duration-300 group-hover:opacity-100
              ${
                activeCard === index
                  ? "opacity-100"
                  : "opacity-0 pointer-events-none"
              }
            `}
              >
                <button
                  className="bg-blue-700 hover:bg-blue-800 transition text-white p-2 rounded-md flex items-center justify-center cursor-pointer z-20"
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
                  className="z-20 bg-gray-600 hover:bg-gray-700 transition text-white p-2 rounded-md flex items-center justify-center cursor-pointer"
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

            <h1 className="text-center text-white mt-2">{value.title}</h1>
          </div>
        ))}
      </motion.ul>
    </div>
  );
}

const left = `0%`;
const right = `100%`;
const leftInset = `20%`;
const rightInset = `80%`;
const transparent = `#0000`;
const opaque = `#000`;

function useScrollOverflowMask(scrollXProgress) {
  const maskImage = useMotionValue(
    `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
  );

  useMotionValueEvent(scrollXProgress, "change", (value) => {
    if (value === 0) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
      );
    } else if (value === 1) {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
      );
    } else {
      animate(
        maskImage,
        `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
      );
    }
  });

  return maskImage;
}
