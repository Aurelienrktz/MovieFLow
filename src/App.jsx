import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
// Assurez-vous d'importer l'instance 'auth' de Firebase Authentication
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebase"; // <-- NOUVEL IMPORT NÉCESSAIRE

import "./App.css";
import MainLayout from "./components/MainLayout";
import SignUp from "./components/signUp";
import Login from "./components/login";
import NotFoundPage from "./components/notFoundPage";

function App() {
  // 1. État pour l'authentification (Connecté ou Déconnecté)
  const [isAuthentificated, setIsAuthentificated] = useState(false);

  // 2. État pour le chargement (Initialisation de la session Firebase)
  const [loading, setLoading] = useState(true);

  // 💡 NOUVEAU : Gère l'état de la session au démarrage
  useEffect(() => {
    // onAuthStateChanged est appelé après que Firebase vérifie le token local.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Si un utilisateur est trouvé (il est connecté)
      if (user) {
        setIsAuthentificated(true);
      } else {
        setIsAuthentificated(false);
      }
      // Indique que la vérification de la session est terminée
      setLoading(false);
    });

    // Nettoyage: arrête l'écoute lorsque le composant se démonte
    return () => unsubscribe();
  }, []);

  const PrivateRoute = ({ children }) => {
    // 🛑 Si la session est en cours de vérification, ne rien afficher (ou un spinner)
    if (loading) {
      return (
        <div className="loading-screen bg-neutral-800 w-full h-full text-center text-blue-500">
          Chargement de la session...
        </div>
      );
    }

    // Si la vérification est terminée, naviguer en fonction de l'état
    return isAuthentificated ? children : <Navigate to="/login" replace />;
  };

  // 🛑 Si la vérification est en cours, ne pas rendre le routeur principal
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center bg-neutral-900 w=screen h-screen">
        <svg
          className="animate-spin h-12 w-12 text-blue-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <p className="mt-2 text-blue-600">Chargement ...</p>
      </div>
    );
  }

  // ----------------------------------------------------

  return (
    <Router>
      <div className="bg-dark">
        <Routes>
          <Route path="/signUp" element={<SignUp />} />
          <Route
            path="/login"
            // Le composant Login met à jour l'état lors d'une connexion réussie
            element={<Login setIsAuthentificated={setIsAuthentificated} />}
          />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainLayout />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
