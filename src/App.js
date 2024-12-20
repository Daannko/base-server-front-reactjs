import NavBar from './components/NavBar/NavBar';
import "@fontsource/rubik";
import styles from './App.css'
import AuthPage from './pages/Login/Auth';
import NotistackWrapper from './components/CustomSnackBar/NotistackSnackBar'
function App() {
  return (
    <NotistackWrapper>
    <div className={styles.app}>
        <NavBar/>
        <AuthPage/>
    </div>
    </NotistackWrapper>

  );
}

export default App;
