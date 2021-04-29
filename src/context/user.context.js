import React,{ createContext, useContext, useEffect, useState } from "react";
import { auth, db, messaging } from "../misc/firebase";


const UserContext = createContext()


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    
    let userRef;

    const unsubscribe = auth.onAuthStateChanged(async authObject => {
      if (authObject) {
        

        userRef = db.ref(`/users/${authObject.uid}`)

        userRef.on("value", (snapshot) => {
          const { name, createdAt } = snapshot.val();
          
          const userData = {
            uid: authObject.uid,
            email: authObject.email,
            name,
            createdAt
          }

          setUser(userData);
          setLoading(false);

        });


        if (messaging) {
          try {
            const currentToken = await messaging.getToken()
            if (currentToken) {
              await db.ref(`/fcm_tokens/${currentToken}`).set(authObject.uid)
              // console.log("token success")
            }

          } catch (err) {
            console.log("error!", err);
          }

        } else {
          console.log("no notifications :(")
        }





      } else {
       
        if (userRef) {
          userRef.off();
        }
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    }


  },[])






  return <UserContext.Provider value={{ loading, user }}>
    {children}
  </UserContext.Provider>


}

export const useUser = () => useContext(UserContext);