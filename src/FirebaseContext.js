import React, { createContext, useState, useEffect } from 'react';
import { getPillsUrl } from './config/firebaseUrlBuilder';
import { firebaseClearString } from './screens/Utils';
import { getDatabase, ref, onValue } from "firebase/database";
import { getConfigsUrl } from './config/firebaseUrlBuilder';
import { getBookingUrl } from './config/firebaseUrlBuilder';


const FirebaseContext = createContext();
const FirebaseProvider = ({ children }) => {
    const currentUserEmail = firebaseClearString(localStorage.getItem('email'))
    const url = getPillsUrl(currentUserEmail)
    const [pillsData, setPillsData] = useState(null);
    const [config, setConfig] = useState(null);
    const [booking, setBooking] = useState(null);

    const contextValue = {
        pillsData,
        config,
        booking
      };
    
    useEffect(() => {
        const database = getDatabase();
        const dataRef = ref(database,url);
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            setPillsData(data);
        });

        const configRef = ref(database, getConfigsUrl(currentUserEmail));
        onValue(configRef, (snapshot) => {
            const data = snapshot.val();
            setConfig(data);
        });

        const bookingRef = ref(database, getBookingUrl(currentUserEmail));
        onValue(bookingRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
            setBooking(data);
        });
    }, []);
    return (
        <FirebaseContext.Provider value={contextValue}>
            {children}
        </FirebaseContext.Provider>
    );
}
export { FirebaseContext, FirebaseProvider };
