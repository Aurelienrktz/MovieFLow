import React from "react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-2xl mt-4">Page Introuvable</p>
      <p className="mt-2 text-gray-400">
        Désolé, le chemin que vous avez entré n'existe pas.
      </p>
      <Link
        to="/"
        className="mt-6 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition duration-200"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFoundPage;
