import { useEffect } from "react";
import "./ListOfPills.css"
import { getDatabase, ref, remove } from "firebase/database";
import { firebaseClearString } from "../../Utils";
import { useState, useContext } from "react";
import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BarLoader from "react-spinners/BarLoader";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Empty from "../../../component/empty/Empty";
import animationData from '../../../lotiflies/nodata.json';
import { getPillsUrlForId } from "../../../config/firebaseUrlBuilder";
import { convertTo12HourFormat } from "../../Utils";
import { FirebaseContext } from "../../../FirebaseContext";
function ListOfPills({ pillEditFunction }) {
    const data = useContext(FirebaseContext);
    const [dataFromFirebase, setDataFromFirebase] = useState(null);
    const [isPageLoaded, setIsPageLoaded] = useState(false)
    const [emptyScreenMessage, setEmptyScreenMessage] = useState("No data found for your account.🥺 ")
    const [emptyScreenMessageIcon, setEmptyScreenMessageIcon] = useState(animationData)
    const [expandedItems, setExpandedItems] = useState({});
    const toggleReadMore = (index) => {
        setExpandedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };
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
    function deleteData(key) {
        const db = getDatabase();
        const currentUserEmail = firebaseClearString(localStorage.getItem('email'))
        const url = getPillsUrlForId(currentUserEmail, key)
        const itemRef = ref(db, url);
        remove(itemRef).then(() => {
            successToast('Pill deleted successfully')
        }).catch((error) => {
            errorToast(error.message)
        });
    }
    function editItem(key) {
        pillEditFunction(key)
    }
    useEffect(() => {
        const safeData = data || {};
        setDataFromFirebase(null);
        setDataFromFirebase(safeData);
        setIsPageLoaded(true)
        if (safeData == null || safeData.length == 0) {
            setIsPageLoaded(false);
            setEmptyScreenMessage("No data found for your account.🥺 ")
            setEmptyScreenMessageIcon(animationData)
        }
    }, [data])
    return (<div className="no-scroll fade-in">
        <BarLoader
            width={"100%"}
            color="#364ad6"
            loading={!isPageLoaded}
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
        {
            isPageLoaded ? <div className="table-container">
                <table className="pill-table ">
                    <thead>
                        <tr className="pills-table-row">
                            <th className="table-heading pill-th">Medicine Name</th>
                            <th className="table-heading pill-th">Date</th>
                            <th className="table-heading pill-th">Timing</th>
                            <th className="table-heading pill-th">Before or After</th>
                            <th className="table-heading pill-th">Remaining Pills</th>
                        </tr>
                    </thead>
                    <tbody id="scrollable" className="pills-table-body">
                        {dataFromFirebase && Object.keys(dataFromFirebase).map((key, index) => (
                            <><td colSpan="6" style={{ paddingTop: '30px' }} ></td>
                                <tr key={key} className="pills-each-row cursor-pointer" >
                                    <td> <div className="table-heading" onClick={() => toggleReadMore(index)}>{dataFromFirebase[key].pillName}</div></td>
                                    <td><div className="table-heading" onClick={() => toggleReadMore(index)}>{dataFromFirebase[key].date}</div></td>
                                    <td><div className="table-heading" onClick={() => toggleReadMore(index)}>{convertTo12HourFormat(dataFromFirebase[key].time)}</div></td>
                                    <td><div className="table-heading" onClick={() => toggleReadMore(index)}>{dataFromFirebase[key].afterOrBefore}</div></td>
                                    <td><div className="table-heading" onClick={() => toggleReadMore(index)}>{dataFromFirebase[key].usedPills + " / " + dataFromFirebase[key].count}</div></td>
                                    <td>
                                        <div className="action-button">
                                            <div color="error" className="edit-action-button" onClick={(e) => editItem(key)}><EditIcon /></div>
                                            <div color="error" className="delete-action-button" onClick={(e) => deleteData(key)}><DeleteIcon /></div>
                                        </div>
                                    </td>
                                </tr>
                                <tr onClick={() => toggleReadMore(index)}>
                                    <td colSpan="6" >
                                        <div className={`pills-extra-info info-row ${expandedItems[index] ? 'visible fade-in' : 'hidden'}`}>
                                            <div className={`table-heading cursor-pointer`} >
                                                <table className="pill-table ">
                                                    <thead>
                                                        <tr className="margin-bottom">
                                                            <th className="table-heading pill-th">Discription</th>
                                                            <th className="table-heading pill-th">Notification</th>
                                                            <th className="table-heading pill-th">Total Day's </th>
                                                            <th className="table-heading pill-th">Reminder Repert</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody className="pills-table-body">
                                                        <tr className="pills-each-row cursor-pointer info-body" >
                                                            <td><div className="table-heading bottom-margin">{dataFromFirebase[key].pillDiscription}</div></td>
                                                            <td><div className="table-heading bottom-margin">{dataFromFirebase[key].notification}</div></td>
                                                            <td><div className="table-heading bottom-margin">{dataFromFirebase[key].noOfDay}</div></td>
                                                            <td><div className="table-heading bottom-margin">{dataFromFirebase[key].everyFiveReminder ? "Yes" : "No"}</div></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </>
                        ))}
                    </tbody>
                </table>
            </div> : <Empty message={emptyScreenMessage} animationData={emptyScreenMessageIcon} />
        }
    </div>)
}
export default ListOfPills;