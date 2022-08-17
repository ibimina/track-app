import { NavLink } from "react-router-dom";
import { useAuthContext } from "../hook/useAuthContext";
import {useLogout} from "../hook/useLogout"


export default function Navbar() {
 const {user}=useAuthContext()
const {logOut} =useLogout()

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" className="title">
            FinanceTrack
          </NavLink>
        </li>
        <div className="sign-container">
          {!user && (
            <>
              <li>
                <NavLink to="signup">Sign up</NavLink>
              </li>

              <li>
                <NavLink to="/login">Login</NavLink>
              </li>
            </>
          )}

          {user && (
            <>
              <li>
                <button onClick={logOut} className="logout">
                  logout
                </button>
              </li>
        
            </>
          )}
        </div>
      </ul>
    </nav>
  );
}
