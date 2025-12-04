import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [mdp, setMdp] = useState("");
  const [mdpVerification, setMdpVerification] = useState("");
  const [error, seterror] = useState("");

  async function handleSignUp() {
    if (!email || !mdp || !mdpVerification) {
      seterror("Tous les champs sont requis");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      seterror("Veuillez entrer un email valide");
      return;
    }

    if (mdp.length < 6) {
      seterror("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }

    if (mdp !== mdpVerification) {
      seterror("Les deux mots de passe ne sont pas identiques");
      return;
    }

    // Création utilisateur Firebase
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        mdp
      );
      setEmail("");
      setMdp("");
      setMdpVerification("");
      alert("Inscription reussite");
      seterror(""); // Réinitialise les erreurs si succès
      return userCredential;
    } catch (err) {
      // Gestion des erreurs Firebase
      switch (err.code) {
        case "auth/email-already-in-use":
          seterror("Cet email est déjà utilisé");
          break;
        case "auth/invalid-email":
          seterror("L'email n'est pas valide");
          break;
        case "auth/operation-not-allowed":
          seterror("L'inscription est désactivée sur ce projet");
          break;
        case "auth/weak-password":
          seterror("Le mot de passe est trop faible (minimum 6 caractères)");
          break;
        default:
          seterror("Erreur inconnue : " + err.message);
          break;
      }
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center relative">
      <img
        src="/public/image/fond.jpg"
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
            className="w-full mt-1 p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-2 focus:outline-green-500 transition-all duration-300"
            placeholder="Entrer votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label className="text-sm font-medium">Mot de passe</label>
          <input
            type="password"
            className="w-full mt-1 p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-2 focus:outline-green-500 transition-all duration-300"
            placeholder="Entrer votre mot de passe"
            value={mdp}
            onChange={(e) => setMdp(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label className="text-sm font-medium">
            Confirmer le mot de passe
          </label>
          <input
            type="password"
            className="w-full mt-1 p-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder-gray-300 focus:outline-2 focus:outline-green-500 transition-all duration-300"
            placeholder="Verification du mot de passe"
            value={mdpVerification}
            onChange={(e) => setMdpVerification(e.target.value)}
          />
        </div>
        {error && (
          <p className="text-red-500 text-xl text-center mb-2">{error}</p>
        )}
        <button
          className="w-full bg-green-600 hover:bg-green-700 transition py-3 rounded-lg font-semibold cursor-pointer"
          onClick={handleSignUp}
        >
          Inscription
        </button>
        <p className="font-light text-center mt-4">
          Vous avez déjà un compte ?{" "}
          <NavLink to="/login" className="underline text-green-500">
            Se connecter
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
