import axiosInstance from '../interceptors/AuthInterceptor'; 


class TaskService{


    consructor(){
    }

    async fetchUserToDos() {
        const path = '/todo'
        return await axiosInstance.get(path).catch((error) => error)
    }
    async addToDo(body) {
        const path = '/todo'
        return await axiosInstance.post(path,body).catch((error) => error)
    }
    async removeToDo(body) {
        const path = '/todo'
        return await axiosInstance.delete(path,{data:body}).catch((error) => error)
    }



}

const taskService = new TaskService()
export default taskService;
