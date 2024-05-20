import React, { createContext, useState, useEffect } from 'react';
import { getPillsUrl } from './config/firebaseUrlBuilder';
import { firebaseClearString } from './screens/Utils';
import { getDatabase, ref, onValue } from "firebase/database";
const FirebaseContext = createContext();
const FirebaseProvider = ({ children }) => {
    const currentUserEmail = firebaseClearString(localStorage.getItem('email'))
    const url = getPillsUrl(currentUserEmail)
    const [pillsData, setPillsData] = useState(null);

    const contextValue = {
        pillsData,
      };
    
    useEffect(() => {
        const database = getDatabase();
        const dataRef = ref(database,url);
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            setPillsData(data);
        });
    }, []);
    return (
        <FirebaseContext.Provider value={contextValue}>
            {children}
        </FirebaseContext.Provider>
    );
}
export { FirebaseContext, FirebaseProvider };
