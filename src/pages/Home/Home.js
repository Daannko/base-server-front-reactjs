import { useEffect,useState } from "react"
import { useNavigate } from "react-router-dom";
import storageService from "../../services/StorageService";
import styles from './Home.module.css'
import DigitalClock from "../../components/DigitalClock/DigitalClock";
import userService from "../../services/UserService";
import AddToDoModal from "../../components/AddTodoModal/AddToDoModal";
import taskService from "../../services/TaskService";
import GoogleLogin from "../../components/GoogleLogin";
import { useRef } from "react";
import { useNavbar } from "../../helpers/NavbarProvider";
import googleAPIScopesService from "../../services/GoogleAPIScopesService";


function Home(){
    const {isVisible, toggleNavBarVisibility } = useNavbar(); 
    const [user,setUser] = useState(null);
    const [openModal,setOpenModal] = useState(false)
    const [loading, setLoading] = useState(true);
    const [todos, setTodos] = useState([]);
    const clockRef = useRef(null);



    const nav = useNavigate();   
    useEffect(() => {
        const user = storageService.getUser();
        if(user === null){
            storageService.clear();
            nav('../logout')
        }
    },[])

    useEffect(() => {
      const observer = new IntersectionObserver(
          ([entry]) => {
              console.log(!entry.isIntersecting)
              toggleNavBarVisibility(!entry.isIntersecting); // Pass true or false based on visibility
          },
          { threshold: 0.1 }
      );
      if (clockRef.current) observer.observe(clockRef.current);
      return () => clockRef.current && observer.unobserve(clockRef.current);
  }, [toggleNavBarVisibility]);

    useEffect(() => {
        const fetchTodos = async () => {
          try {
            const response = await userService.fetchUserToDos(); // Make the GET request
            console.log(response.data)
            setTodos(response.data); // Update state with fetched data
          } catch (err) {
            console.log(err)// Handle any errors
          } finally {
            setLoading(false); // Turn off the loading indicator
          }
        };

        fetchTodos();
    },[]);

    const addTodo = (data) =>{
      setTodos(oldArray => [...oldArray, data])
    }

    const removeTask = async (index) => {
      try {
        const response = await taskService.removeToDo({ id: index });
        if (response.status === 200) {
          setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== index));
        } else {
          console.error("Failed to remove task. Server responded with:", response.status);
        }
      } catch (error) {
        console.error("Error occurred while removing task:", error);
      }
    };

    return(
    <div className={styles.scrollParent}>
      <div className={styles.homePage}>
        <AddToDoModal openModal={openModal} setOpenModal={setOpenModal} addTodo={addTodo}/>
        <div className={styles.clock} ref={clockRef}><DigitalClock/></div>
        <div className={styles.features} >
            <GoogleLogin scopes={googleAPIScopesService.getFullCalendarScopes()} ></GoogleLogin>
        </div>
        <div className={styles.features} >
            <p>Events & Tasks</p>
            <div className={styles.todos}>
                {(todos == null ? [] : todos).map((element) =>(
                  <div key={element.id} className={styles.todo}>
                    <div className={styles.taskTop}>
                      <p className={styles.taskTitle}>{element.title}</p>
                      <p className={styles.taskRemove} onClick={() => removeTask(element.id)}>X</p>
                    </div> 
                    <p className={styles.taskDesc}>{element.text}</p>
                  </div>))}
                <div onClick={() => {setOpenModal(true)}} className={styles.addtodo} >+</div>
            </div>
        </div>
        <div className={styles.block}></div>
      </div>
    </div>
)}

export default Home