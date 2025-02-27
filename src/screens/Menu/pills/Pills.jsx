import "./Pills.css"
import InputBox from "../../../component/inputbox/InputBox";
import { useState, useContext } from "react";
import TextArea from "../../../component/inputbox/TextArea";
import Button from "../../../component/button/Button";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDatabase, push, ref, set } from "firebase/database";
import { firebaseClearString } from "../../Utils";
import { useEffect } from "react";
import BarLoader from "react-spinners/BarLoader";
import { getPillsUrlForId } from "../../../config/firebaseUrlBuilder";
import { getPillsPostUrl } from "../../../config/firebaseUrlBuilder";
import { FirebaseContext } from "../../../FirebaseContext";
import medicineIcon from "./menuUtils";

function Pills({ editKey, isEditable, moveToPillList }) {
    const { pillsData } = useContext(FirebaseContext);
    const [pillName, setPillName] = useState('');
    const [pillDiscription, setPillDiscription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [noOfDay, setNoOfDays] = useState('');
    const [notification, setNotification] = useState('');
    const [count, setCount] = useState('');
    const [afterOrBefore, setAfterOrBefore] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [buttonIsLoading, setButtonIsLoading] = useState(false);
    const [selectedicon, setSelectedIcon] = useState(0)
    const [hideSpinner, setHideSpinner] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setHideSpinner(true);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);


    useEffect(() => {
        if (editKey !== undefined && editKey !== null && editKey !== "") {
            const safeData = pillsData || {};
            Object.keys(safeData).map((key, index) => {
                if (key === editKey) {
                    const localData = safeData[key];
                    setPillName(localData.pillName);
                    setPillDiscription(localData.pillDiscription);
                    setDate(localData.date);
                    setTime(localData.time);
                    setNoOfDays(localData.noOfDay);
                    setNotification(localData.notification);
                    setCount(localData.count);
                    setIsChecked(localData.everyFiveReminder);
                    setAfterOrBefore(localData.afterOrBefore);
                
                    setSelectedIcon(localData.selectedicon);
                }
            });
        }
    }, [editKey])
    

    const areAllEmpty = () => {
        if (pillName === undefined || pillName.trim().length === 0) {
            return true;
        }
        if (pillDiscription === undefined || pillDiscription.trim().length === 0) {
            return true;
        }
        if (date === undefined || date.trim().length === 0) {
            return true;
        }
        if (time === undefined || time.trim().length === 0) {
            return true;
        }
        if (noOfDay === undefined || noOfDay.trim().length === 0) {
            return true;
        }
        if (notification === undefined || notification.trim().length === 0) {
            return true;
        }
        if (count === undefined || count.trim().length === 0) {
            return true;
        }
        if (afterOrBefore === undefined || afterOrBefore.trim().length === 0) {
            return true;
        }
        return false;
    };


    const resetFormData = () => {
        setPillName('');
        setPillDiscription('');
        setDate('');
        setTime('');
        setNoOfDays('');
        setNotification('');
        setCount('');
        setAfterOrBefore('');
        setIsChecked(false);
    };


    function writeAllDataToDatabase() {
        const databaseObject = {
            pillName: pillName,
            pillDiscription: pillDiscription,
            date: date,
            time: time,
            noOfDay: noOfDay,
            notification: notification,
            count: count,
            everyFiveReminder: isChecked,
            afterOrBefore: afterOrBefore,
            selectedicon:selectedicon,
        }
        const db = getDatabase();
        const currentUserEmail = firebaseClearString(localStorage.getItem('email'))
        if (isEditable) {
            const url = getPillsUrlForId(currentUserEmail, editKey)
            set(ref(db, url), databaseObject)
                .then(() => {
                    successToast('Pill Updated successfully')
                    resetFormData();
                    setButtonIsLoading(false);
                    moveToPillList()
                })
                .catch((error) => {
                    setButtonIsLoading(false);
                    resetFormData();
                    errorToast(error.message)
                });
        } else {
            const url = getPillsPostUrl(currentUserEmail)
            push(ref(db, url), databaseObject).then(() => {
                successToast('Pill added successfully')
                resetFormData();
                setButtonIsLoading(false);
            }).catch((error) => {
                setButtonIsLoading(false);
                resetFormData();
                errorToast(error.message)
            });
        }
    }


    function errorToast(message) {
        toast.warn(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }


    function successToast(message) {
        toast.success(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light"
        });
    }

    const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }


    const isPastDate = (givenDate) => {
        const currentDate = getCurrentDate();
        return givenDate <= currentDate;
    }


    const handleButtonClick = (event) => {
        setButtonIsLoading(true)
        const state = areAllEmpty()
        if (state) {
            errorToast("Please fill all the input fields. 😩");
            setButtonIsLoading(false);
            return;
        } else {
            const numberOdDays = parseInt(noOfDay);
            const pillsCount = parseInt(count);
            if (isPastDate(date) && isEditable == false) {
                errorToast("Date should be greater than current date. 🤭");
                setButtonIsLoading(false);
                return;
            } else if (pillsCount < numberOdDays) {
                errorToast("Pills count should be greater than or equal to number of days. 🤭");
                setButtonIsLoading(false);
                return;
            } else {
                writeAllDataToDatabase()
            }
        }
    };

    
    return (<>
        <div className="fade-in">
            <BarLoader
                width={"100%"}
                color="#364ad6"
                loading={!hideSpinner}
                height={2}
                size={15}
            />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <p className="new-pill">New Medicine 💚</p>
            <div className="pills-grid-container">
                <div>
                    <InputBox value={pillName} onChange={e => setPillName(e.target.value)} title={"Medicine Name"} placeholder={"Paracetamol"} inputType={"text"} />
                    <TextArea value={pillDiscription} onChange={e =>  setPillDiscription(e.target.value)} title={"Medicine discription"} placeholder={"For treating fever, one of the commonly recommended medications is Paracetamol"} inputType={"text"} />
                    <p className="pills-input-title ">Take a Medicine after or before food ?</p>
                    <div className="reminder-wrapper">
                        <input type="radio" className="pills-radio-box" checked={afterOrBefore === "BEFORE"} onChange={() => setAfterOrBefore("BEFORE")} />
                        <p className="pills-radio-title">Before</p>
                        <span className="left-margin-20" />
                        <input type="radio" className="pills-radio-box" checked={afterOrBefore === "AFTER"} onChange={() => setAfterOrBefore("AFTER")} />
                        <p className="pills-radio-title">After</p>
                    </div>
                    <span className="left-margin-20" />
                    <div className="reminder-wrapper">
                        <input type="checkbox" className="pills-check-box" checked={isChecked}
                            onChange={e => setIsChecked(!isChecked)} />
                        <p className="pills-reminder-title" >Remind every 5 Minutes until they cancel</p>
                    </div>

                    <div>
                        <p className="input-title">Choose Icon</p>
                        <div className="icon-div">
                            {
                                medicineIcon.map((icon, index) => {
                                    return (
                                        <div>
                                            <div className="med-icon-dev " onClick={e => setSelectedIcon(icon.key)}>
                                                <img className={"med-icon " + (selectedicon == index ? "med-icon-selected" : "")} src={icon.icon} />
                                            </div>
                                            <p className="med-icon-name">{icon.name}</p>
                                        </div>
                                    )
                                })
                            }
                        </div>

                    </div>
                </div>
                <div>
                    <InputBox value={date} onChange={e => setDate(e.target.value)} title={"Starting Date"} placeholder={"12/12/2020"} inputType={"date"} />
                    <InputBox value={noOfDay} onChange={e =>  setNoOfDays(e.target.value)} title={"Number of Days"} placeholder={"1"} inputType={"number"} />
                    <InputBox value={time} onChange={e => setTime(e.target.value)} title={"Time"} placeholder={"08:15:PM"} inputType={"time"} />
                    <InputBox value={count} onChange={e => setCount(e.target.value)} title={"Medicine’s Counts"} placeholder={"20"} inputType={"number"} />
                    <InputBox value={notification} onChange={e => setNotification(e.target.value)} title={"Notification Message"} placeholder={"Dad time to take tablet"} inputType={"text"} />
                </div>
            </div>

            <Button title={isEditable ? "Update" : "Save"} onClick={handleButtonClick} isLoading={buttonIsLoading} />
        </div>
    </>)
}
export default Pills;