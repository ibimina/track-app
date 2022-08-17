import { db } from "../firebase/config";
import {
  collection,
  onSnapshot,
  query,
  where,
 orderBy
} from "firebase/firestore";
import { useRef } from "react";
import { useState, useEffect } from "react";

export function useCollection(c, u) {
  const [documents, setDocuments] = useState(null);

  const q = useRef(u).current;

  useEffect(() => {
    let ref = collection(db, c)
    let rr = query(ref,orderBy("timestamp","desc"))
   
    if (q) {
      rr = query(rr, where(...q));
    }

    const unsub = onSnapshot(ref, (snapshot) => {
      let result = [];
      snapshot.docs.forEach((doc) => {
        result.push({ ...doc.data(), id: doc.id });
      });
      setDocuments(result);
    });

    return () => unsub;
  }, [c, q]);

  return { documents };
}
