import { useState } from "react";
import { useLogin } from "../hook/useLogin";
// import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, loading } = useLogin();
//   const navigate = useNavigate();
  const handlelogin = (e) => {
    e.preventDefault();
    login(email, password);
    setEmail("");
    setPassword("");
    // navigate("/");
  };

  return (
    <form onSubmit={handlelogin} className="register">
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
        <span className="label">password</span>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input-box"
        />
      </label>
      {!loading && <input type="submit" value="Login" className="submit" />}
      {loading && (
        <input type="submit" value="Loading" disabled className="submit" />
      )}
      {error && <p>{error}</p>}
    </form>
  );
}
