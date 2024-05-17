import "./Menu.css"
import Spinner from "../../component/spinner/Spinner"
import dropDowmModelOptions from "./Utils";

import { useState } from "react";

import Pills from "./pills/Pills";
import ListOfPills from "./list-of-pills/ListOfPills";

function Menu() {
    const [selected, setSelected] = useState("Add a pill")
    const [selectedKey, setSelectedKey] = useState(0)

    return (
        <>
            <div className="grid-container">
                <div className="top-left">
                    <Spinner selected={selected} setSelected={setSelected} options={dropDowmModelOptions} defaultText={""} setSelectedKey={setSelectedKey} />
                </div>
                <div className="row-90" >

                {
                            (() => {
                                if (selectedKey === 0) {
                                    return <Pills />;
                                } else if (selectedKey === 2){
                                    return <ListOfPills />;
                                }
                            })()
                        }

                </div>
            </div>
        </>
    )

}

export default Menu;