import { db, timestamp } from "../firebase/config";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import { useState, useEffect, useReducer } from "react";

let initialState = {
  document: null,
  loading: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_LOADING":
      return { loading: true, document: null, success: false, error: null };
    case "ADDED_DOC":
      return {
        loading: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETE_DOC":
      return {
        loading: false,
        document: null,
        success: true,
        error: null,
      };

    case "ERROR":
      return {
        loading: false,
        document: null,
        success: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const useFirestore = (c) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [cancel, setCancel] = useState(false);

  ///collection ref
  const ref = collection(db, c);

  //only dispatch if not cancelled
  const dispatchIsNotCancelled = (action) => {
    if (cancel) {
      dispatch(action);
    }
  };

  //add doc
  const addDocument = async (doc) => {
    dispatch({ type: "IS_LOADING" });
    try {
      const createdAt = timestamp.fromDate(new Date());

      const addedDocument = await addDoc(ref, { ...doc, createdAt });

      dispatchIsNotCancelled({ type: "ADDED_DOC", payload: addedDocument });
    } catch (error) {
      dispatchIsNotCancelled({ type: "ERROR", payload: "could not add" });
    }
  };

  //delete doc
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_LOADING" });
    try {
  
      await deleteDoc(doc(ref, id));
      dispatchIsNotCancelled({ type: "DELETE_DOC" });
    } catch (error) {
      dispatchIsNotCancelled({ type: "ERROR", payload: "could not delete" });
    }
  };

  useEffect(() => {
    //clean up function
    return () => setCancel(true);
  }, []);

  return { addDocument, deleteDocument, response };
};
