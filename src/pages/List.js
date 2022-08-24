import { useAuthContext } from "../hook/useAuthContext";
import { useCollection } from "../hook/useCollection";
import { useFirestore } from "../hook/useFirestore";

export default function List() {
  const { user } = useAuthContext();
  const { deleteDocument } = useFirestore("finance");
  const { documents,error,isLoading} = useCollection("finance",["uid","==",user.uid],["createdAt","desc"]);

  const del = async (id) => {
    deleteDocument(id);
  };
  return (
    <>
      {error && <>error</>}
      {isLoading && <>loading...</>}
      {documents &&
        documents.map((tran) => (
          <div key={tran.id} className="fin">
            <div>
              <p className="dark margin-btn">{tran.name}</p>
              <p className="dark">{tran.date}</p>
            </div>

            <p className="dark">#{tran.amount}</p>

            <button onClick={() => del(tran.id)} className="delete bg">
              <span className="sr-only"> delete</span>
            </button>
          </div>
        ))}
    </>
  );
}
