//firbase import
import {auth} from "../firebase/config"
import { createUserWithEmailAndPassword,updateProfile } from "firebase/auth"
import { useState,useEffect } from "react"
// import { async } from "@firebase/util"

//react import
import { useAuthContext } from "./useAuthContext"

export const useSignup =()=>{
const [error,setError]= useState(null)
const [islaoding,setIslaoding]=useState(false)
 const [cancel, setCancel] = useState(false);
const {dispatch} = useAuthContext()
const signup = async (email,password,displayName)=>{
setError(null)
setIslaoding(true)
try {
    //sign up user
const res = await createUserWithEmailAndPassword(auth,email,password)
// console.log(res.user)
if (!res) {
    throw new Error("could not complete sign uo")
}
//add display name to user
updateProfile(res.user,{displayName})

dispatch({ type: "LOGIN", payload: res.user });

setIslaoding(false)
setError(null)


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

return {error,islaoding,signup}
}