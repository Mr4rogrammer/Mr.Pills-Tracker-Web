import NavigationBar from "../../component/navigation/NavigationBar";
import { useState } from 'react';
import "./Base.css"
import DashBoard from "../dashboard/DashBoard";
import Menu from "../Menu/Menu";
import Setting from "../settings/Setting";
import Booking from "../booking/Booking"
import { FirebaseProvider } from "../../FirebaseContext";
function Base() {
    const [selctedIndex, setSelectedIndex] = useState(0);

    const logout = () => {
        localStorage.clear();
        window.location.reload();
    }


    const handleNavigationSelected = (index) => {
        const oldIndex = selctedIndex
        if (index == -1) {
            setSelectedIndex(oldIndex);
            logout();
        } else {
            setSelectedIndex(index);
        }
    };


    return (
        <FirebaseProvider>
            <div className="base-wrapper">
                <table>
                    <tr>
                        <th class="base-column-one">
                            <NavigationBar onItemClick={handleNavigationSelected} />
                        </th>
                        <th class="base-column-two fade-in">
                            <div className="scrollable-wrapper">
                                {
                                    (() => {
                                        if (selctedIndex === 0) {
                                            return <DashBoard />;
                                        } else if (selctedIndex === 1) {
                                            return <Menu />;
                                        } else if (selctedIndex === 2) {
                                            return <Setting />
                                        } else if (selctedIndex === 3) {
                                            return <Booking />
                                        }
                                    })()
                                }
                            </div>
                        </th>
                    </tr>
                </table>
            </div>
        </FirebaseProvider>
    )
}


export default Base;