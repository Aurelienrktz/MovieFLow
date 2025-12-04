import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const Login = ({ setIsAuthentificated }) => {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [error, setError] = useState("");

  //redirection
  const navigate = useNavigate();

  async function handleLogin() {
    if (!email || !mdp) {
      setError("Tous les champs sont requis");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Veuillez entrer un email valide");
      return;
    }

    // Connexion utilisateur Firebase
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, mdp);
      setEmail("");
      setMdp("");
      setError("");
      setIsAuthentificated(true);
      navigate("/");
      alert("Connexion reussite");
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("L’email n’est pas valide");
          break;
        case "auth/user-disabled":
          setError("Ce compte a été désactivé");
          break;
        case "auth/user-not-found":
          setError("Aucun compte trouvé avec cet email");
          break;
        case "auth/wrong-password":
          setError("Mot de passe incorrect");
          break;
        case "auth/too-many-requests":
          setError("Trop de tentatives. Réessaye plus tard");
          break;
        default:
          setError("Erreur inconnue : " + err.message);
          break;
      }
    }
  }
  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <img
        src="/image/fond.jpg"
        alt=""
        className="w-full h-full blur-xs object-cover"
      />
      <div className="absolute inset-0 w-full h-full bg-[linear-gradient(to_top,rgba(20,20,20,0.8)_50%,rgba(20,20,20,0.6)_90%,rgba(20,20,20,0.5)_100%)] z-0 pointer-events-none"></div>
      <div
        className="
        w-10/12
        md:w-full 
        max-w-md 
        bg-gray-800/40 
        backdrop-blur-xs
        border border-white/20 
        rounded-2xl 
        shadow-2xl 
        p-8 
        pt-4
        text-white
        absolute
        "
      >
        <img src="/image/clapperboard(1).png" className="img mx-auto w-20" />
        <h2 className="text-2xl mb-4 text-center mt-2">
          Bienvenue sur
          <span className="text-white font-bold md:text-2xl"> MovieFlow</span>
        </h2>
        <div className="mb-5">
          <label className="text-sm font-medium">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-2 focus:outline-blue-500 transition-all duration-300"
            placeholder="Entrer votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium">Mot de passe</label>
          <input
            type="password"
            className="w-full mt-1 p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-2 focus:outline-blue-500 transition-all duration-300"
            placeholder="Entrer votre mot de passe"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
          />
        </div>
        {error && (
          <p className="text-red-500 text-xl text-center mb-2">{error}</p>
        )}
        <button
          className="w-full bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold cursor-pointer"
          onClick={handleLogin}
        >
          Connexion
        </button>
        <p className="font-light text-center mt-4">
          Pas encore de compte ?{" "}
          <NavLink to="/signUp" className="underline text-blue-500">
            S'inscrire
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;
