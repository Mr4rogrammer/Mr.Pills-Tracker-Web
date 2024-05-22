import "./Setting.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMobileAlt } from '@fortawesome/fontawesome-free-solid'
import { useState, useContext, useEffect } from "react";
import TextArea from "../../component/inputbox/TextArea";
import Button from "../../component/button/Button";
import { getConfigsUrl } from "../../config/firebaseUrlBuilder";
import { getDatabase, ref, set } from "firebase/database";
import { ToastContainer, toast } from 'react-toastify';
import { FirebaseContext } from "../../FirebaseContext";
import InputBox from "../../component/inputbox/InputBox";
function Setting() {
    const { config } = useContext(FirebaseContext);
    const [shouldShowMedicalNews, setShouldShowMedicalNews] = useState(false);
    const [allowThemToSkilPlan, setAllowThemToSkilPlan] = useState(false);
    const [notification, setNotification] = useState('');
    const [notificationTitle, setNotificationTitle] = useState('');
    useEffect(() => {
        const safeData = config || {};
        if (safeData !== null || safeData.length > 0) {
            setShouldShowMedicalNews(safeData.shouldShowMedicalNews)
            setAllowThemToSkilPlan(safeData.allowThemToSkilPlan)
        }
    }, [config])
    const handleConfigSaveButtonClick = (event) => {
        const configObject = {
            shouldShowMedicalNews: shouldShowMedicalNews,
            allowThemToSkilPlan: allowThemToSkilPlan,
        }
        const db = getDatabase();
        const url = getConfigsUrl(localStorage.getItem('email'))
        set(ref(db, url), configObject)
            .then(() => {
                successToast('Config Updated Successfully')
            })
            .catch((error) => {
                errorToast(error.message)
            });
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
    return (<div className="fade-in root-settings">
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
                    <p className="text-button" onClick={handleConfigSaveButtonClick}> Save </p>
                </div>
                <div className="reminder-wrapper">
                    <input type="checkbox" className="pills-check-box" checked={shouldShowMedicalNews}
                        onChange={e => setShouldShowMedicalNews(!shouldShowMedicalNews)} />
                    <p className="pills-reminder-title" >We are eager to show medical news to your loved ones.</p>
                </div>
                <div className="reminder-wrapper">
                    <input type="checkbox" className="pills-check-box" checked={allowThemToSkilPlan}
                        onChange={e => setAllowThemToSkilPlan(!allowThemToSkilPlan)} />
                    <p className="pills-reminder-title" >Allow them to skip medicine plan.</p>
                </div>
            </div>
            <div className="settings-view-outer">
                <div className="settings-flex-div">
                    <div className="text-button-right">
                        <p className="settings-title app-download">Notification</p>
                        <p className="text-button"> Sent </p>
                    </div>
                    <div >
                        <InputBox value={notificationTitle} onChange={e => setNotificationTitle(e.target.value)} title={""} placeholder={"Enter title"} inputType={"text"} isFullScreen={true} />
                        <TextArea value={notification} onChange={e => setNotification(e.target.value)} title={""} placeholder={"Enter message"} inputType={"text"} isFullScreen={true} />
                    </div>
                </div>
            </div>
        </div>
    </div>)
}
export default Setting;