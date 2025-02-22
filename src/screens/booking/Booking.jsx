import "./Booking.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt } from '@fortawesome/fontawesome-free-solid'
import { useState, useContext, useEffect } from "react";
import TextArea from "../../component/inputbox/TextArea";
import { getConfigsUrl } from "../../config/firebaseUrlBuilder";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import { FirebaseContext } from "../../FirebaseContext";
import InputBox from "../../component/inputbox/InputBox";
import { firebaseClearString } from '../Utils';

function Setting() {
     const currentUserEmail = firebaseClearString(localStorage.getItem('email'))
   const { booking } = useContext(FirebaseContext);
   const [dataFromFirebase, setDataFromFirebase, dataRef] = useState(null);
   const db = getDatabase();
   const [isPageLoaded, setIsPageLoaded] = useState(false);
   const [emptyScreenMessage, setEmptyScreenMessage] = useState(
    "Fecthing data of your account.🥺 "
);


   useEffect(() => {
    const data = booking
    console.log(data);
    setDataFromFirebase(null);
    setDataFromFirebase(data);
    setIsPageLoaded(true);
    if (data == null || data.length == 0) {
        setIsPageLoaded(false);
        setEmptyScreenMessage("No data found for your account.🥺 ");
    } else {
        processDatForDashBoard(data)
    }
}, [booking]);
    

function processDatForDashBoard(dataFromFirebase) {
    if (dataFromFirebase != null) {
        Object.keys(dataFromFirebase).map((item) => {
           
        });
       
    }
}


const onConform = (action) => {
    console.log(`Button clicked: ${action}`);
    const databaseObject = {
       id:action.id,
       text:action.text,
       date:action.date,
       status:"Conformed",
    }
    const url  = "data/"+currentUserEmail+"/booking/"+action.id
    set(ref(db, url), databaseObject)
                .then(() => {
                   
                })
                .catch((error) => {
                   
                });
};


const onCancel = (action) => {
    console.log(`Button clicked: ${action}`);
    const databaseObject = {
       id:action.id,
       text:action.text,
       date:action.date,
       status:"Canceld",
    }
    const url  = "data/"+currentUserEmail+"/booking/"+action.id
    set(ref(db, url), databaseObject)
                .then(() => {
                   
                })
                .catch((error) => {
                   
                });

};




    return (<div>
 <div >
            <div className="data-header">
                <div className="column">Text</div>
                <div className="column">Date</div>
                <div className="column">Status</div>
                <div className="column"></div>
            </div>
            {dataFromFirebase &&
                Object.keys(dataFromFirebase).map((key) => (
                    <div key={key} className="data-row">
                        <div className="column">{dataFromFirebase[key].text}</div>
                        <div className="column">{dataFromFirebase[key].date}</div>
                        <div className="column">{dataFromFirebase[key].status}</div>
                        <div>
                            <button onClick={() => onConform(dataFromFirebase[key])}>Conform</button>
                            
                            <button onClick={() => onCancel(dataFromFirebase[key])}>Cancel</button>
                            </div>
                    </div>
                ))}
        </div>
      
    </div>)
}
export default Setting;