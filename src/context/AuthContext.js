import { createContext, useContext, useState, useEffect } from "react";
import { firebaseAuth, db } from "../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function signUp(email, password) {
    createUserWithEmailAndPassword(firebaseAuth, email, password);
    setDoc(doc(db, "users", email), {
      savedShows: [],
    });
  }

  function login(email, password) {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  function logout() {
    return signOut(firebaseAuth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  });

  return (
    <AuthContext.Provider value={{ signUp, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
