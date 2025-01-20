
import {  useState } from 'react';
import styles from './AddToDoModal.module.css'
import { Modal } from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs';
import taskService from '../../services/TaskService';
import { useSnackbar } from 'notistack';


function AddToDoModal({openModal, setOpenModal,addTodo}){

    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [priority,setPriority] = useState(1)
    const [expiration,setExpiration] = useState(dayjs(new Date()));
    const [error,setError] = useState("")
    const { enqueueSnackbar } = useSnackbar();

    const validatePriority = (value) =>{
        if(value > 0 && value <= 10){
            setPriority(value)
        }
    };

    const validateFields = () => {
        if(title.length === 0){
            setError("You must write a title!");
            return false;
        }
        return true;
    }

    const clear = () =>{
        setExpiration(null);
        setDescription("");
        setTitle("");
        setPriority(0);
        setError("")
    }

    const addTask = async () => {
        if (validateFields()) {
            try {
                const response = await taskService.addToDo({
                title: title,
                text: description,
                expires: expiration === null ? null : expiration.toISOString(),
                priority: priority,
                });
            addTodo(response.data);
            clear()
            setOpenModal(false);
          } catch (error) {
            enqueueSnackbar(error,{variant:error})// Logs the error
          }
        }
      };
      

    return(  
    <Modal open={openModal} onClose={() => {setOpenModal(false)}}>
        <div className={styles.addToDoPopup}>
            <div className={styles.modalWindow}>
                <div  className={styles.title}>
                    <p> Add Task</p>
                    
                    </div>
                
                <div className={styles.modalInput}>
                <input className={error.length === 0 ? styles.textInput : styles.textErrorInput} value={title} type='text' placeholder={error.length === 0 ? "Title" : error} onChange={(event) => setTitle(event.target.value) }/>
                </div>
                <div className={styles.modalInput}>
                <textarea className={`${styles.textInput} ${styles.textarea}`} value={description} type='text' placeholder='Description' onChange={(event) => setDescription(event.target.value) }/>
                </div>
                <div className={styles.modalInput}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                    slotProps={{
                        textField: {
                          sx: {
                            outline: "none",
                            marginTop: "1rem",
                            width: "100%",
                            marginLeft: "2rem",
                            marginRight: "2rem",
                            
                            borderRadius: "10px",
                            backgroundColor: "transparent",
                            border: "2px solid rgba(245, 245, 245, 0.5)",
        
                            fontFamily: "Rubik",
                            fontSize: "1rem"

                          }
                        }
                      }} 
                    label="Expriration Date"
                    value={expiration}
                    onChange={(newValue) => setExpiration(newValue)}/>
                </LocalizationProvider>
                </div>
                <div className={styles.modalInput}>
                <input className={styles.priorityInput} type='number' placeholder='Priority' value={priority} onChange={(event) => validatePriority(event.target.value)}/>

                </div>

                <div className={styles.modalInput}>
                      <button className={styles.clearButton} onClick={() => clear()}>Clear</button>
                      <button className={styles.addButton} onClick={() => addTask()}>Add</button>
                </div>

            </div>
        </div>
    </Modal>)


}


export default AddToDoModal;