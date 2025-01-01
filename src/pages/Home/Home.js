import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";
import storageService from "../../services/StorageService";


function Home(){

    const [user,setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const nav = useNavigate();   
    useEffect(() => {

        const user = storageService.getUser();
        if(user === null){
            storageService.clear();
            nav('../logout')
        }

        console.log("Happy :)")



    },[])














    return(<p>Home!</p>)
}

export default Home