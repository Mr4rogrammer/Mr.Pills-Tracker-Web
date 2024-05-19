import "./Setting.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt } from '@fortawesome/fontawesome-free-solid'
import { useState } from "react";
function Setting() {
    const [shouldShowMedicalNews, setShouldShowMedicalNews] = useState(false);
    const handleShouldShowMedicalNews = () => {
        setShouldShowMedicalNews(!shouldShowMedicalNews);
    };
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
                <p className="settings-title app-download">Configurations</p>
                <div className="reminder-wrapper">
                    <input type="checkbox" className="pills-check-box" checked={shouldShowMedicalNews}
                        onChange={handleShouldShowMedicalNews} />
                    <p className="pills-reminder-title" >We are eager to show medical news to your loved ones.</p>
                </div>
            </div>
            <div className="settings-view-outer hide"></div>
        </div>
    </div>)
}
export default Setting;