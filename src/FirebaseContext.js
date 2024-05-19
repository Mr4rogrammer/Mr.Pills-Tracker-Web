import React, { createContext, useState, useEffect } from 'react';
import { getPillsUrl } from './config/firebaseUrlBuilder';
import { firebaseClearString } from './screens/Utils';
import { getDatabase, ref, onValue, remove } from "firebase/database";
const FirebaseContext = createContext();
const FirebaseProvider = ({ children }) => {
    const currentUserEmail = firebaseClearString(localStorage.getItem('email'))
    const url = getPillsUrl(currentUserEmail)
    const [data, setData] = useState(null);
    useEffect(() => {
        const database = getDatabase();
        const dataRef = ref(database,url);
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            setData(data)
        });
    }, []);
    return (
        <FirebaseContext.Provider value={data}>
            {children}
        </FirebaseContext.Provider>
    );
}
export { FirebaseContext, FirebaseProvider };
