import React, { useState } from "react";
import { useSignup } from "../hook/useSignup";

export default function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const {error,isloading,signup} = useSignup()
  const handleSignup =(e)=>{
e.preventDefault()

signup(email,password,displayName)
setEmail("")
setPassword("")
setDisplayName("")
}
  return (
    <form className="register" onSubmit={handleSignup}>
      <label>
        <span className="label">Username</span>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="input-box"
        />
      </label>
      <label>
        <span className="label">Email</span>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-box"
        />
      </label>
      <label>
        <span className="label">Password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-box"
        />
      </label>

      {!isloading && <input type="submit" value="Sign up" className="submit" />}
      {isloading && (
        <input type="submit" value="Loading" disabled className="submit" />
      )}
      {error && <>{error}</>}
    </form>
  );
}
