import "./Menu.css"
import Spinner from "../../component/spinner/Spinner"
import dropDowmModelOptions from "../../../src/screens/Utils";
import { useState } from "react";
import Pills from "./pills/Pills";
import ListOfPills from "./list-of-pills/ListOfPills";
function Menu() {
    const [selected, setSelected] = useState("Add a Medicine")
    const [selectedKey, setSelectedKey] = useState(0)
    const [editKey, setEditKey] = useState('')
    const [isEditable, setIsEditable] = useState(false)
    function moveToPillEdit(key,) {
        setSelectedKey(0)
        setSelected("Update a Medicine")
        setEditKey(key)
        setIsEditable(true)
    }
    function moveToPillList() {
        setSelectedKey(2)
        setSelected("List of Medicine's")
    }
    function onKeySelected(key) {
        setIsEditable(false)
        setEditKey("")
        setSelectedKey(key)
    }
    return (
        <>
            <div className="grid-container">
                <div className="top-left">
                    <Spinner selected={selected} setSelected={setSelected} options={dropDowmModelOptions} defaultText={""} onKeySelected={onKeySelected} />
                </div>
                <div className="row-90" >
                    {
                        (() => {
                            if (selectedKey === 0) {
                                return <Pills editKey={editKey} isEditable={isEditable} moveToPillList={moveToPillList} />;
                            } else if (selectedKey === 2) {
                                return <ListOfPills pillEditFunction={moveToPillEdit} />;
                            }
                        })()
                    }
                </div>
            </div>
        </>
    )
}
export default Menu;