import axiosInstance from '../interceptors/AuthInterceptor'; 
import storageService from '../services/StorageService'

class UserService{


    consructor(){
    }

    async fetchUserData() {
        const path = '/user/me'
        const result = await axiosInstance.get(path).catch((error) => error)
        return storageService.saveUser(result.status !== 200 ? null : result.data)
    }



}

const userService = new UserService()
export default userService;
