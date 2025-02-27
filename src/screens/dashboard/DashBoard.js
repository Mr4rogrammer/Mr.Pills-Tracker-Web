import "./DashBoard.css";
import { useEffect, useContext } from "react";
import useState from "react-usestateref";
import Empty from "../../component/empty/Empty";
import * as React from "react";
import "react-toastify/dist/ReactToastify.css";
import animationData from "../../lotiflies/nodata.json";
import { getTimeOfDay } from "./utils";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { convertTo12HourFormat } from "../Utils";
import { FirebaseContext } from "../../FirebaseContext";
function DashBoard() {
    const { pillsData } = useContext(FirebaseContext);
    const [dataFromFirebase, setDataFromFirebase, dataRef] = useState(null);
    const [isPageLoaded, setIsPageLoaded] = useState(false);
    const [morningCount, setMorningCount, morningCountRef] = useState(0);
    const [afternoonCount, setAfternoonCount, afternoonCountRef] = useState(0);
    const [eveningCount, setEveningCount, eveningCountRef] = useState(0);
    const [skipedPillsPercentage, setSkipedPillsPercentage] = useState(0);
    const [skipedPills, setSkipedPills, skippedRef] = useState(0);
    const [sortedData, setSortedData, sortedDatRef] = useState(null);
    const [emptyScreenMessage, setEmptyScreenMessage] = useState(
        "Fecthing data of your account.🥺 "
    );
    const [emptyScreenMessageIcon, setEmptyScreenMessageIcon] = useState(
        animationData
    );


    useEffect(() => {
        const data = pillsData
        setDataFromFirebase(null);
        setDataFromFirebase(data);
        setIsPageLoaded(true);
        if (data == null || data.length == 0) {
            setIsPageLoaded(false);
            setEmptyScreenMessage("No data found for your account.🥺 ");
            setEmptyScreenMessageIcon(animationData);
        } else {
            processDatForDashBoard(dataRef.current);
            sortTheDataBasedONDate(dataRef.current);
        }
    }, [pillsData]);


    function processDataForCount(item) {
        const [hours, minutes] = item.time.split(":");
        const timeOfDay = getTimeOfDay(hours);
        if (timeOfDay === "morning") {
            setMorningCount((prevCount) => prevCount + 1);
        } else if (timeOfDay === "afternoon") {
            setAfternoonCount((prevCount) => prevCount + 1);
        } else if (timeOfDay === "evening") {
            setEveningCount((prevCount) => prevCount + 1);
        }
    }


    const sortDataByDate = (data) => {
        return data.sort((a, b) => a.date.localeCompare(b.date));
    };


    function sortTheDataBasedONDate(data) {
        const eventsArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
        }));
        const sortedEvents = sortDataByDate(eventsArray);
        if (sortedEvents.length > 6) {
            setSortedData(sortedEvents.slice(0, 6));
        } else {
            setSortedData(sortedEvents);
        }
    }


    function resetExisitingData() {
        setMorningCount(0);
        setAfternoonCount(0);
        setEveningCount(0);
    }


    function skipedPillsPercentageCalculate() {
        const pillsTaken =
            morningCountRef.current +
            afternoonCountRef.current +
            eveningCountRef.current -
            skippedRef.current;
        const percentageTaken =
            (pillsTaken /
                (morningCountRef.current +
                    afternoonCountRef.current +
                    eveningCountRef.current)) *
            100;
        setSkipedPillsPercentage(Math.ceil(percentageTaken));
    }


    function processDatForDashBoard(dataFromFirebase) {
        resetExisitingData();
        if (dataFromFirebase != null) {
            Object.keys(dataFromFirebase).map((item) => {
                processDataForCount(dataFromFirebase[item]);
            });
            setSkipedPills(1);
            skipedPillsPercentageCalculate();
        }
    }


    return (
        <>
            {isPageLoaded ? (
                <div className="fade-in main-div-dashbaord">
                    <div className="top-bar">
                        <div className="pills-heading">
                            <div className="mrng-pills">
                                <center>
                                    {" "}
                                    <img
                                        className="total-pills-image"
                                        src={require("../../images/mrngpills.svg").default}
                                    />{" "}
                                </center>
                            </div>
                            <div>
                                <div className="info-div">
                                    <p className="pills-count">{morningCountRef.current}</p>
                                    <p className="pills-title">Morning Medicine's</p>
                                </div>
                            </div>
                        </div>
                        <div className="pills-heading">
                            <div className="after-pills">
                                <center>
                                    {" "}
                                    <img
                                        className="total-pills-image"
                                        src={require("../../images/afterpills.svg").default}
                                    />{" "}
                                </center>
                            </div>
                            <div>
                                <div className="info-div">
                                    <p className="pills-count">{afternoonCountRef.current}</p>
                                    <p className="pills-title">Afternoon Medicine's</p>
                                </div>
                            </div>
                        </div>
                        <div className="pills-heading">
                            <div className="night-pills">
                                <center>
                                    {" "}
                                    <img
                                        className="total-pills-image"
                                        src={require("../../images/nightpills.svg").default}
                                    />{" "}
                                </center>
                            </div>
                            <div>
                                <div className="info-div">
                                    <p className="pills-count">{eveningCountRef.current}</p>
                                    <p className="pills-title">Night Medicine's</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="dashboard-grid-container ">
                        <div className="dashboard-left-view">
                            <p className="progress-title">Progress</p>
                            <center>
                                <div
                                    style={{
                                        width: "50%",
                                        marginTop: "40px",
                                        marginBottom: "30px",
                                    }}
                                >
                                    <CircularProgressbar
                                        maxValue={100}
                                        strokeWidth={12}
                                        value={skipedPillsPercentage}
                                        backgroundPadding={10}
                                        text={`${skipedPillsPercentage}%`}
                                        styles={buildStyles({
                                            strokeLinecap: "round",
                                            textSize: "16px",
                                            pathTransitionDuration: 0.5,
                                            pathColor: `#A6D997`,
                                            textColor: "#89B27C",
                                            trailColor: "#DFEEDB",
                                            backgroundColor: "#DFEEDB",
                                        })}
                                    />
                                </div>
                                <div className="dashboard-progress-grid-container">
                                    <div className="progress-grid-inner">
                                        <div className="circular-green light-green" />
                                        <p className="circular-green-title">{skipedPills}</p>
                                    </div>
                                    <div className="progress-grid-inner">
                                        <div className="circular-green dark-green" />
                                        <p className="circular-green-title">
                                            {morningCountRef.current +
                                                afternoonCountRef.current +
                                                eveningCountRef.current}
                                        </p>
                                    </div>
                                </div>
                                <div className="dashboard-text-grid-container">
                                    <div className="progress-grid-inner">
                                        <p className="dashboard-progress-text">Skipped Medicine's</p>
                                    </div>
                                    <div className="progress-grid-inner">
                                        <p className="dashboard-progress-text">Total Medicine's</p>
                                    </div>
                                </div>
                            </center>
                        </div>
                        <div
                            className="dashboard-right-view"
                            style={{ maxHeight: "400px", overflowY: "hidden" }}
                        >
                            <p className="progress-title" style={{ marginBottom: "10px" }}>
                                Upcoming Medicine's Plan
                            </p>
                            <div style={{ marginBottom: "10px" }}>
                                <table className="pill-table">
                                    <thead>
                                        <tr className="pills-table-row">
                                            <th
                                                className="table-heading pill-th-dashboard"
                                                style={{ fontSize: "12px" }}
                                            >
                                                Medicine Name
                                            </th>
                                            <th
                                                className="table-heading pill-th-dashboard"
                                                style={{ fontSize: "12px" }}
                                            >
                                                Date
                                            </th>
                                            <th
                                                className="table-heading pill-th-dashboard"
                                                style={{ fontSize: "12px" }}
                                            >
                                                Timing
                                            </th>
                                            <th
                                                className="table-heading pill-th-dashboard"
                                                style={{ fontSize: "12px" }}
                                            >
                                                Before or After
                                            </th>
                                            <th
                                                className="table-heading pill-th-dashboard"
                                                style={{ fontSize: "12px" }}
                                            >
                                                Remaining Pills
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody id="scrollable" className="pills-table-body">
                                        {sortedDatRef.current &&
                                            Object.keys(sortedDatRef.current).map((key, index) => (
                                                <>
                                                    <td colSpan="6" style={{ paddingTop: "30px" }}></td>
                                                    <tr key={key} className="pills-each-row samle">
                                                        <td>
                                                            {" "}
                                                            <div
                                                                className="table-heading"
                                                                style={{ fontSize: "10px" }}
                                                            >
                                                                {sortedDatRef.current[key].pillName}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div
                                                                className="table-heading"
                                                                style={{ fontSize: "10px" }}
                                                            >
                                                                {sortedDatRef.current[key].date}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div
                                                                className="table-heading"
                                                                style={{ fontSize: "10px" }}
                                                            >
                                                                {convertTo12HourFormat(
                                                                    sortedDatRef.current[key].time
                                                                )}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div
                                                                className="table-heading"
                                                                style={{ fontSize: "10px" }}
                                                            >
                                                                {sortedDatRef.current[key].afterOrBefore}
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div
                                                                className="table-heading"
                                                                style={{ fontSize: "10px" }}
                                                            >
                                                            
                                                                {(Object.keys(sortedDatRef.current[key]?.takenStatus ?? 0).length) + " / " + (sortedDatRef.current[key]?.count ?? 0)}
                                                            </div>
                                                        </td>

                                                    </tr>
                                                </>
                                            ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="doctor-appointment dashboard-right-view">
                        <p className="progress-title">
                            Upcoming Doctor Appointment (
                            <span style={{ color: "red" }}>Under Development</span>)
                        </p>
                    </div>
                </div>
            ) : (
                <Empty
                    message={emptyScreenMessage}
                    animationData={emptyScreenMessageIcon}
                />
            )}
        </>
    );
}


export default DashBoard;
