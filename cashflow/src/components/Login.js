import { useRef, useState, useEffect, useContext} from 'react';
import logo from '../img/CashFlowLogo.png';
import {Link} from 'react-router-dom';
import {Navigate, useNavigate} from 'react-router-dom';
import './Form.css';
import { AuthContext } from '../App';

import axios from '../api/Axios';
//import { faNairaSign } from '@fortawesome/free-solid-svg-icons';
const LOGIN_URL = '/api/auth/login';

const Login = () => {
    const userRef = useRef();
    const errRef = useRef();

    const [username, setUser] = useState('');
    const [password, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    //const [success, setSuccess] = useState(false);
    const auth = useContext(AuthContext);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, password])

    
    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ username, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            if(response.data.success){
                setUser('');
                setPwd('');
                auth.setIsAuthenticated(true);   
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Incorrect Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }
    const navigate = useNavigate();
    const handleLogoClick = () => {
        navigate('/');
    }
    


    return (
        <div className='login-page-container'>
            <div className='header-container'>
                <img className='form-logo' alt='logo' onClick={handleLogoClick} src={logo} />
            </div>
            {auth.isAuthenticated? (
                <Navigate to="/home"/>
            ) : (
                
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <div className='signin-content'>
                    <h1 className='signin-header'>Login</h1>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={username}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={password}
                            required
                        />
                        <div className='context-button'>
                        <button className='singin-button' >Sign In</button>
                        </div>
                    </form>
                    <p>
                        Need an Account?<br />
                        <span className="line">
                            <Link to="/signup">Sign Up</Link>
                        </span>
                    </p>
                </section>
                
            )}
            <div className="form-footer-container">
            <small> Copyright &copy; 2023, CashFlow. All rights reserved.</small>
            </div>
        </div>
    )
}

export default Login