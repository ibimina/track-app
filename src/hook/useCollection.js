//firebase import
import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";

import { useState, useEffect, useRef } from "react";

export function useCollection(c, userDetails, order) {
  const [documents, setDocuments] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const q = useRef(userDetails).current;
  const orderList = useRef(order).current;

  useEffect(() => {
    setIsLoading(true);
    let ref = collection(db, c);

    if (q) {
      ref = query(ref, where(...q));
    }
    if (orderList) {
      ref = query(ref, orderBy(...orderList));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      if (snapshot.empty) {
        setError("No documents found");
        setIsLoading(false);
      } else {
        let result = [];
        snapshot.docs.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });
      
      setDocuments(result);
      setIsLoading(false);
      }

    },(err) => {
        setError(err.message);
        console.log(err.message)
        setIsLoading(false);
      }
    
    
    );

    return () => unsub;
  }, [c, q, orderList]);

  return { documents,error,isLoading };
}
