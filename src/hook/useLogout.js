import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";
import { useState,useEffect } from "react";

export function useLogout() {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [islaoding, setIslaoding] = useState(false);
  const [cancel, setCancel] = useState(false);

  const logOut = async () => {
    setError(null);
    setIslaoding(true);

    try {
      await signOut(auth);

      dispatch({ type: "LOGOUT" });

      if (!cancel) {
        setIslaoding(false);
        setError(null);
      }
    } catch (error) {
      if (!cancel) {
        setError(error.message);
        setIslaoding(false);
      }
    }
  };

  useEffect(() => {
    return () => setCancel(true);
  }, []);

  return { logOut, error, islaoding };
}
