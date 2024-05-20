import "./Setting.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt } from '@fortawesome/fontawesome-free-solid'
import { useState } from "react";
import TextArea from "../../component/inputbox/TextArea";
import Button from "../../component/button/Button";

function Setting() {
    const [shouldShowMedicalNews, setShouldShowMedicalNews] = useState(false);
    const [notification, setNotification] = useState('');
    const [buttonIsLoading, setButtonIsLoading] = useState(false);

    const handleShouldShowMedicalNews = () => {
        setShouldShowMedicalNews(!shouldShowMedicalNews);
    };
    const setNotificationToVariable = (event) => {
        setNotification(event.target.value)
    };

    const handleButtonClick = (event) => {

    }

    return (<div className="fade-in root-settings">
        <div className="settings-grid-container">

            <div className="settings-view-outer">
                <p className="settings-title app-download">Mr.Medicine Tracking app</p>
                <div className="mobile-client">
                    <FontAwesomeIcon icon={faMobileAlt} />
                    <p className="mobile-cleint-text">Download Mr.Medicine Tracking Client App from store.</p>
                </div>
                <p className="just-scan">The Mr. Medicine Tracking Client Android app is a user-friendly tool designed to help individuals manage their medication schedules effectively. It provides features such as medication reminders, dosage tracking, and progress monitoring to ensure users adhere to their prescribed treatments.</p>
                <img className="qr-logo" src={require('../../images/qr.svg').default} alt='mySvgImage' />
                <p className="just-scan">Just Scan this Qr Code.</p>
            </div>


            <div className="settings-view-outer">
                <div className="text-button-right">
                    <p className="settings-title app-download">Configurations</p>
                    <p className="text-button"> Save </p>
                </div>
                <div className="reminder-wrapper">
                    <input type="checkbox" className="pills-check-box" checked={shouldShowMedicalNews}
                        onChange={handleShouldShowMedicalNews} />
                    <p className="pills-reminder-title" >We are eager to show medical news to your loved ones.</p>
                </div>
            </div>


            <div className="settings-view-outer">
                <div className="text-button-right">
                    <p className="settings-title app-download">Notification</p>
                    <p className="text-button"> Sent </p>
                </div>
                <div className="sample">
                <TextArea value={notification} onChange={setNotificationToVariable} title={""} placeholder={"Enter message to sent"} inputType={"text"} height="16.8rem" />
                </div>
                

            </div>
        </div>
    </div>)
}
export default Setting;