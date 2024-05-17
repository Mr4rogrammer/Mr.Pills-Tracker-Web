import { useState } from "react";
import "./Spinner.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/fontawesome-free-solid'

function Spinner({ selected, setSelected ,options, defaultText, setSelectedKey}) {
    const [isActive, setIsActive] = useState(false)
    return (
        <div className="dropdown">
            <div className="dropdown-btn" onClick={e => setIsActive(!isActive)}>{selected === "" ? defaultText: selected}
            <div className="down-icon " >
            <FontAwesomeIcon icon={faCaretDown} />
            </div>
            </div>

            {isActive && (
                <div className="dropdown-content">
                    {
                        options.map(option =>  {
                            return (
                                <>
                                <div onClick={e => {
                                    setSelected(e.target.textContent)
                                    setSelectedKey(option.key)
                                    setIsActive(false)
                                }
                                } className="dropdown-item">
                                    {option.value}
                                </div>
                                </>
                            )
                        })
                    }

                </div>
            )}
        </div>
    )

}

export default Spinner;