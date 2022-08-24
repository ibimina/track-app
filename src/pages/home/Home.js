
import { useAuthContext } from "../../hook/useAuthContext";
import List from "../List";
import Track from "./Track";

export default function Home() {
  const { user, dispatch ,close} = useAuthContext();
  const handleShow = () => {
    if (close==="false") {
       dispatch({ type: "ADD_FIN", payload: "true" });
    } 
  };

  return (
    <div>
      <h1>What's up {user.displayName}!</h1>
      <div className="content">
        <p className="exp">My Expenses</p>
        <List />
      </div>
      <div className="transaction" data-visible={close}>
        <Track />
      </div>

      <button onClick={handleShow} className="show bg">
        <span className="sr-only">add new finance</span>
      </button>
    </div>
  );
}
