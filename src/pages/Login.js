import styles from '../styles/login.module.css'
import {useToasts} from 'react-toast-notifications';
import { Navigate} from 'react-router-dom';
import {useState} from 'react';
// import {login} from '../api';
import { useAuth } from '../hooks';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [logginIn, setLoggingIn] = useState(false);
    const {addToast} = useToasts();
    const auth = useAuth();
    console.log(auth);

    const handleSubmit = async(e) =>{
        e.preventDefault();
        setLoggingIn(true);

        if(!email || !password){
            return addToast('Please enter both email and password',{
                apperance: 'error',
                // autoDismiss: true,
            })
        }

        const response = await auth.login(email, password);

        if(response.success){
            addToast('Successfully logged in',{
                appearance:'success',
            });
        }
        else{
            addToast(response.message,{
                appearance:'error'
            })
        }

        setLoggingIn(false);
    }

    if(auth.user){
        return <Navigate to= "/"/>
    }

    return (
        <form className={styles.loginform} onSubmit={handleSubmit}>
           <span className={styles.loginSignUpHeader}>LogIn</span>
            <div className={styles.field}>
                <input type="email" placeholder="Email" value={email} onChange = { (e) => setEmail(e.target.value)}/>
            </div>
            <div className={styles.field}>
                <input type="password" placeholder="Password" value={password} onChange = { (e) => setPassword(e.target.value)}/>
            </div>
            <div className={styles.field}>
                <button disabled={logginIn}> {logginIn?'Logging in....':'Log In'}</button>
            </div>
        </form>
    );
  }

export default Login;