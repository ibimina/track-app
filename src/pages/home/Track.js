// import userEvent from "@testing-library/user-event";
import {  useEffect, useState } from "react";



import { useAuthContext } from "../../hook/useAuthContext";
import { useFirestore } from "../../hook/useFirestore";


export default function Track() {
  const [amount, setAmount] = useState("");
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const { dispatch,close,user } = useAuthContext();
 const {addDocument,response}=useFirestore("finance")


const handleSubmit = (e) =>{
  e.preventDefault()
addDocument({ name:name, amount:amount,date:date,uid:user.uid})

}

useEffect(()=>{
  if (response.success) {
    console.log(response)
  
      setAmount("")
      setName("")
      setDate("")
     
      dispatch({ type: "ADD_FIN", payload: "false" }); 
     
  }

},[response,dispatch])
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // const ref = collection(db,"transactions")
  //   await addDoc(collection(db, "finance"), {
  //     name: name,
  //     amount: amount,
  //     date: date,
  //     uid: user.uid,
  //     timestamp:serverTimestamp()
  //   });
  //   setAmount("");
  //   setName("");
  //   setDate("");
  //   dispatch({type:"ADDED_DOC",payload:"false"})
  // };

  return (
    <div className="track-form">
      <h3>Add a transaction</h3>
      <button
        className="close bg"
        aria-pressed={close}
        onClick={() => dispatch({ type: "ADD_FIN", payload: "false" })}
      >
        <span className="sr-only">close</span>
      </button>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction name:</span>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="add-inp"
            required
          />
        </label>
        <label>
          <span>Amount (#):</span>
          <input
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
            className="add-inp"
            required
          />
        </label>
        <label>
          <span>Transaction date:</span>
          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
            value={date}
            required
            className="add-inp"
          />
        </label>

        <input
          type="submit"
          value="submit"
          aria-pressed={close}
          className="submit addnew"
        />
      </form>
    </div>
  );
}
