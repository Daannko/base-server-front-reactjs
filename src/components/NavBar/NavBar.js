
import DigitalClock from "../DigitalClock/DigitalClock"
import styles from "./NavBar.module.css";

import { useNavbar } from "../../helpers/NavbarProvider";


function NavBar(){
    const { isVisible, toggleNavBarVisibility } = useNavbar(); 
    const display = () => {
        const urls = ["/auth/google/callback"];
        const url = window.location.href;
        const isMatchingUrl = urls.some(element => url.includes(element));
        return !isMatchingUrl;
      };

    return (
        <>  
                <div className={display() ? styles.nav_bar : styles.hide }>
                    <div className={isVisible ? styles.clock : styles.hiddenClock}>
                        <DigitalClock />
                    </div>
                </div>
                 
        </>
    )

}

export default NavBar