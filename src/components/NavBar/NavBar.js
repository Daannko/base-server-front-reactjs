
import DigitalClock from "../DigitalClock/DigitalClock"
import styles from "./NavBar.module.css";




function NavBar(){

    return (
        <div className={styles.nav_bar}>
            <div className={styles.clock}>
                <DigitalClock />
            </div>
        </div>
 
    )

}

export default NavBar