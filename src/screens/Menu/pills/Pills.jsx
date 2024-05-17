import "./Pills.css"
import InputBox from "../../../component/inputbox/InputBox";
import { useState } from "react";
import TextArea from "../../../component/inputbox/TextArea";
import Button from "../../../component/button/Button";

function Pills() {
    const [pillName, setPillName] = useState('');
    const [pillDiscription, setPillDiscription] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [noOfDay, setNoOfDays] = useState('');
    const [notification, setNotification] = useState('');
    const [count, setCount] = useState('');

    const setPillNameToVariable = (event) => {
        setPillName(event.target.value)
    };

    const setPillDiscriptionToVariable = (event) => {
        setPillDiscription(event.target.value)
    };

    const setDateToVariable = (event) => {
        setDate(event.target.value)
    };

    const setTimeToVariable = (event) => {
        setTime(event.target.value)
    };

    const setNoOfDaysToVariable = (event) => {
        setNoOfDays(event.target.value)
    };

    const setNotificationToVariable = (event) => {
        setNotification(event.target.value)
    };

    const setCountToVariable = (event) => {
        setCount(event.target.value)
    };





    const handleButtonClick = (event) => {
        alert("saved")
    };

    return (<>
        <div>
            <p className="new-pill">New Pill 💚</p>
            <div className="pills-grid-container">

                <div>
                    <InputBox value={pillName} onChange={setPillNameToVariable} title={"Pill Name"} placeholder={"Aspirin"} inputType={"text"} />

                    <TextArea value={pillDiscription} onChange={setPillDiscriptionToVariable} title={"Pill discription"} placeholder={"Good for fever"} inputType={"text"} />

                    <p className="pills-input-title ">Take a pill after or before food ?</p>
            
                    <div className="reminder-wrapper">
                    <input type="radio" />
                    <p className="pills-reminder-title">Before</p>

                    <span className="left-margin-20"/>
                    <input type="radio" />
                    <p className="pills-reminder-title">After</p>

                    </div>


                    <span className="left-margin-20"/>
                    <div className="reminder-wrapper">
                        <input type="checkbox" className="pills-check-box" />
                        <p className="pills-reminder-title" >Remind every 5 Minutes until they cancel</p>
                    </div>
                </div>



                <div>
                    <InputBox value={date} onChange={setDateToVariable} title={"Starting Date"} placeholder={"12/12/2020"} inputType={"date"} />
                    <InputBox value={noOfDay} onChange={setNoOfDaysToVariable} title={"Number of Days"} placeholder={"1"} inputType={"number"} />
                    <InputBox value={time} onChange={setTimeToVariable} title={"Starting Date"} placeholder={"08:15:PM"} inputType={"time"} />
                    <InputBox value={count} onChange={setCountToVariable} title={"Pill’s Counts"} placeholder={"20"} inputType={"number"} />
                    <InputBox value={notification} onChange={setNotificationToVariable} title={"Notification Message"} placeholder={"Dad time to take tablet"} inputType={"text"} />


                </div>
            </div>

            <Button title={"Save"} onClick={handleButtonClick}/>
        </div>
    </>)
}

export default Pills;