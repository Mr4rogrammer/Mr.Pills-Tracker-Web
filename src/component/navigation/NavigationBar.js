import "./NavigationBar.css"
import { useEffect, useState } from 'react';

function NavigationBar({ onItemClick }) {
    const [image, setImage] = useState('');
    const [selctedIndex, setSelectedIndex] = useState(0);
    useEffect(() => {
        setImage(localStorage.getItem('image'))
    })

    const handleClick = (index) => {
        const oldIndex = selctedIndex
        if (index == -1) {
            setSelectedIndex(oldIndex);
        } else {
            setSelectedIndex(index);
        }
        onItemClick(index);
    };

    return (
        <center>
            <div className="navigation-wrapper">
            <div>
                <div className="image-wrapper">
                    <img className="nav-image" src={image} />
                </div>
                <div className="menu-wrapper">
                    <div className={"image-menu-wrapper menu-bottom-margin " + (selctedIndex == 0 ? "selected" : "")} onClick={() => handleClick(0)}>
                        <img className="nav-image" src={require('../../images/dashboard.svg').default} />
                    </div>

                    <div className={"image-menu-wrapper menu-bottom-margin " + (selctedIndex == 1 ? "selected" : "")} onClick={() => handleClick(1)}>
                        <img className="nav-image" src={require('../../images/menu.svg').default} />
                    </div>

                    <div className={"image-menu-wrapper menu-bottom-margin "+(selctedIndex == 2 ? "selected" : "") }onClick={() => handleClick(2)}>
                        <img className="nav-image" src={require('../../images/settings.svg').default} />
                    </div>


                    <div className="image-menu-wrapper ">
                        <img className="nav-image" src={require('../../images/logout.svg').default} onClick={() => handleClick(-1)} />
                    </div>

                  
                </div>

            </div>

        </div>
        </center>
    )
}


export default NavigationBar;