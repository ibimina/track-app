
import { useAuthContext } from "../hook/useAuthContext";
import { useCollection } from "../hook/useCollection";
// import{db} from"../firebase/config"
// import {doc, deleteDoc} from"firebase/firestore"
import { useFirestore } from "../hook/useFirestore";

export default function List() {
  const{user}=useAuthContext()
const {deleteDocument}=useFirestore("finance")
  const { documents: list } = useCollection(
    "finance"
    ,
  ["uid","==",user.uid]
  )

// const del =async (id)=>{
 
//     const ref = doc(db,"finance",id)
//     await deleteDoc(ref)
  
// }
const del = async (id) => {
deleteDocument(id)
console.log("g")
  // const ref = doc(db, "finance", id);
  // await deleteDoc(ref);
};
  return (
    <>
  
      {list &&
        list.map((tran) => (
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
