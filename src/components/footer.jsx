import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";

async function handleLogout() {
  try {
    // La fonction signOut déconnecte l'utilisateur.
    await signOut(auth);

    // Le code suivant est facultatif mais recommandé :

    // 1. Rediriger l'utilisateur vers la page de connexion ou la page d'accueil
    // (Nécessite l'objet de navigation de react-router-dom, par exemple)
    // navigate('/login');

    // 2. Mettre à jour l'état local de l'application (si vous utilisez un contexte ou Redux)
    // setIsAuthenticated(false);

    alert("Déconnexion réussie !");
  } catch (error) {
    console.error("Erreur lors de la déconnexion :", error);
    // Afficher un message d'erreur à l'utilisateur si la déconnexion échoue
  }
}

const Footer = () => {
  return (
    <footer className="mt-5 py-5 px-2 bg-gray-900 flex flex-col justify-between gap-3">
      <img
        src="/image/logo.svg"
        alt="Logo The Mocie Database"
        className="h-20 w-auto object-cover block mx-auto"
      />
      <h1
        className="text-white flex underline cursor-pointer mt-2 mx-auto hover:text-blue-400 transition-all duration-300"
        onClick={handleLogout}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 "
        >
          <path
            fillRule="evenodd"
            d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z"
            clipRule="evenodd"
          />
        </svg>
        Se deconnecter
      </h1>
      <h1 className="text-white text-xl text-center">
        ©2025 <span className="text-2xl">MovieFlow</span>. Tous droit reservés.
      </h1>
    </footer>
  );
};

export default Footer;
