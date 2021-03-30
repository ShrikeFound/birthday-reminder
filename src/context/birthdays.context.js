import { createContext, useEffect, useState } from "react";
import { db } from "../misc/firebase";
import { useUser } from "./user.context";


const BirthdaysContext = createContext();


const transformToArray = (snapshotValue) => {
  return snapshotValue ? Object.keys(snapshotValue).map(birthdayID => {
    return { ...snapshotValue[birthdayID], id: birthdayID }
  }) : []
}


export const BirthdaysProvider = ({ children }) => {
  const [birthdays, setBirthdays] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const birthdayListRef = db.ref(`birthdays/${user.uid}`)
    birthdayListRef.on("value", (snapshot) => {
      const data = transformToArray(snapshot.val())
      // console.log(data)
      setBirthdays(data)
    })


    return () => {
      birthdayListRef.off();
    }

  })


  return <BirthdaysContext.Provider value={birthdays}>{children}</BirthdaysContext.Provider>
}