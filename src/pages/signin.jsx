import "../styling/signin.css";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import LogNav from "../components/lognav";
import Background from "../components/background";


function Sign(props) {
    // State variables to store username, password and error message
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();


    // Function to handle registration
    const handleRegister = () => {
        navigate('/register');
    }


    // Function to continue as guest
    const handleGuest = () => {
        props.setUserName('Guest');
        localStorage.setItem('userName', 'Guest');
        navigate('/inbrowser');
    }
    

    // Function to handle sign in
    const handleSignIn = async (e) => {
        // Prevent default form submission
        e.preventDefault();

        // Check if username and password are entered
        if (!username || !password) {
            setErrorMsg(<p className="errorMsg">Enter username and password.</p>);
            return;
        }

        // Send a POST request to the server
        try {
            const response = await axios.post('https://studybuddy-i7j4.onrender.com/users/login', { username, password });
            // If the response status is 200, set the username and navigate to the inbrowser page
            if (response.status === 200) {
                props.setUserName(username);
                localStorage.setItem('userName', username);
                navigate('/inbrowser');
            }
        } catch (error) {
            setErrorMsg(<p className="errorMsg">Invalid Credentials</p>);
        }
    }


    // Construct the sign in page
    return (
      <>
      <Background />
        <div className="signBody">
            <LogNav />
            <form className="signForm">
            <h3 className="signText">Username:</h3>
            <input className="signInput" type="text" placeholder=" Enter Username" value={username} onChange={(e) => setUsername(e.target.value)}></input>
            <h3 className="signText">Password:</h3>
            <input className="signInput" type="password" placeholder=" Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
            {errorMsg}
            <div className="signButtons">
                <button className="logBtn" onClick={handleSignIn}>Log In</button>
                <button className="logBtn" onClick={handleRegister}>Register</button>
                <button className="lastBtn" onClick={handleGuest}>Continue as Guest</button>
            </div>
            </form>
        </div>
      </>
    );
}

export default Sign;
