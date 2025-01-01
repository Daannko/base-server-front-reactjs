class StorageService {

    constructor(){}
    

    getUser = () => sessionStorage.getItem("USER")
    saveUser = (user) => {
        debugger
        if(user == null) return false;
        sessionStorage.removeItem("USER")
        sessionStorage.setItem("USER",user)
        return true;
    }
    clear = () => sessionStorage.clear()
    isLoggedIn = () => {return sessionStorage.getItem("USER") ? true : false}
    
    
}

const storageService = new StorageService();
export default storageService;