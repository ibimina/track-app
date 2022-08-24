//route import
import { BrowserRouter, Route, Routes } from "react-router-dom";

//pages
import Home from "./pages/home/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./component/Navbar";

//styles
import "./App.css";
import { useAuthContext } from "./hook/useAuthContext";

import { Navigate } from "react-router-dom";

function App() {
  const { authIsReady, user } = useAuthContext();

  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login />}
            />
            <Route
              path="/signup"
              element={user ? <Navigate to="/" /> : <Signup />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
