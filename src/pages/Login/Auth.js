import styles from './Auth.module.css'
import { useSnackbar, VariantType } from "notistack";
import React, { useState, useEffect } from 'react';

function AuthPage(){

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [username, setUsername] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    
    const { enqueueSnackbar } = useSnackbar();
    
    const [isLogin, setIsLogin] = useState(() => {
        const savedState = localStorage.getItem('isLogin');
        return savedState ? JSON.parse(savedState) : true; // Default to login if no value is stored
      });

    async function handleAuth(){ 

        const url = "http://localhost:8080/auth/" + (isLogin ? "login" : "register");
        const body = {
            email: email,
            password: password,
        }
        if(isLogin){
            body["name"] = username;
        }
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
          })

          if (response.ok) {
            enqueueSnackbar("Successfuly loged in!" ,{variant: "success"})
            if(!isLogin) setIsLogin(true)
            console.log("We good!")
            console.log(response)

          } else {
            const errorData = await response.json(); 
            enqueueSnackbar(errorData.message ,{variant: "warning"})
          }
    }


    useEffect(() => {
        // Sync the isLogin state with localStorage when it changes
        localStorage.setItem('isLogin', JSON.stringify(isLogin));
      }, [isLogin]);

    const toggleForm = () => {
        setIsLogin((prevState) => !prevState); // Toggle between login and register
      };
    

    return( 
        <div className={styles.authPage}>
            <div className={styles.authWindow}>   
                <div className={styles.authForm}>
                    <p className={styles.authText}>{isLogin ? "Login" : "Register"}</p>
                    <input type="text" name="name" className={ isLogin ?  styles.hidden : styles.textInput} autoFocus={ isLogin ? false : true} required={true} value={username} placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                    <input type="email" name="email" className={styles.textInput} autoFocus={ isLogin ? true : false} required={true} value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
                    <input type="password"  name="password" className={styles.textInput} required={true} value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                    <input type="password"  name="password" className={ isLogin ? styles.hidden :  styles.textInput } required={true} value={confirmPassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} />
                    <input type="submit" onClick={handleAuth} className={styles.glassButton} name="Submit" value={isLogin ? "Login" : "Register"}  />
                    <span className={styles.authSwitch} onClick={toggleForm}>{isLogin ? "Sign up" : "Sign in"}</span>
                </div>
            </div>
        </div>
  
   )

}
export default AuthPage;