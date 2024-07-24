import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styling/register.css';
import axios from 'axios';
import LogNav from "../components/lognav";
import Background from '../components/background';


function Register(props) {
    // State for input fields
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();


    // Function to handle login
    const handleLogin = () => {
        navigate('/signin');
    };


    // Function to continue as guest
    const handleGuest = () => {
        props.setUserName('Guest');
        localStorage.setItem('userName', 'Guest');
        navigate('/inbrowser');
    };


    // Posting user data to the server
    const axiosPostData = async () => {
        // Getting data to post
        const postData = {
            email: email,
            username: username,
            password: password
        };

        // Posting data
        try {
            await axios.post('http://localhost:4000/users/register', postData);
        } catch (error) {
            setErrorMsg(<p className="errorMsg">Server Error</p>);
        }

        // Setting message
        window.alert("User Registered");

        // Redirecting to inbrowser
        navigate('/inbrowser');
    };


    // Function to check if the username or email is already registered
    const checkValidity = async () => {
        // Getting all usernames and emails
        const users = await axios.get('http://localhost:4000/users/register');
        // Seeing if the username or email is already registered
        const isRegistered = users.data.some(user => user.email === email || user.username === username);
        return isRegistered;
    };


    // Function to handle register
    const handleRegister = async (e) => {
        e.preventDefault();
        // Making sure all fields are filled
        if (!email || !username || !password) {
            setErrorMsg(<p className="errorMsg">Enter email, username and password.</p>);
            return;
        }
        
        // Checking if the username or email is already registered
        const isRegistered = await checkValidity();
        if(isRegistered) {
            window.alert("Username or email already registered with an account.");
            return;
        }

        // Setting the username in the parent component
        props.setUserName(username);
        localStorage.setItem('userName', username);

        // Using a callback to ensure the state is updated before redirecting
        setTimeout(() => {
            axiosPostData();
        }, 0);
    };


    // Constructing the register page
    return (
        <div className="registerBody">
            <Background />
            <LogNav />
            <form className="registerForm" onSubmit={handleRegister}>
                <h3 className="registerText">Email:</h3>
                <input 
                    className="registerInput" 
                    type="text" 
                    placeholder=" Enter Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)}
                />
                <h3 className="registerText">Username:</h3>
                <input 
                    className="registerInput" 
                    type="text" 
                    placeholder=" Enter Username" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)}
                />
                <h3 className="registerText">Password:</h3>
                <input 
                    className="registerInput" 
                    type="password" 
                    placeholder=" Enter Password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errorMsg}
                <div className="registerButtons">
                    <button className="regBtn" type="submit">Register</button>
                    <button className="regBtn" type="button" onClick={handleLogin}>Already Signed Up</button>
                    <button className="lastBtn" type="button" onClick={handleGuest}>Continue as Guest</button>
                </div>
            </form>
        </div>
    );
}

export default Register;
