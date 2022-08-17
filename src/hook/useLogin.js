import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";
// import { async } from "@firebase/util"

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cancel, setCancle] = useState(false);
  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const res = await signInWithEmailAndPassword(auth, email, password);

      dispatch({ type: "LOGIN", payload: res.user });
      if (!cancel) {
        setLoading(false);
        setError(null);
      }
      setError(null);
      setLoading(false);
    } catch (error) {
      if (!cancel) {
        setLoading(false);
        setError(null);
      }
    }
  };

  useEffect(() => {
    return () => setCancle(true);
  }, []);
  return { login, error, loading };
};
