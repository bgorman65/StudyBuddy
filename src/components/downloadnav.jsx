import "../styling/downloadnav.css";
import { useNavigate } from "react-router-dom";


function DownloadNav () {
    const navigate = useNavigate();
    

    // Function to navigate to the sign in page
    const navSign = () => {
        navigate('/signin');
    }


    // Function to navigate to the register page
    const navRegister = () => {
        navigate('/register');
    }


    // Function to navigate to the home page
    const navHome = () => {
        navigate('/home');
    }
    

    // Construct the download navigation bar
    return (
        <nav className="download-nav">
            <a className="siteTitle" onClick={navHome}>Study Buddy</a>
            <ul className="navul">
                <li>
                    <a className="sr" onClick={navSign}>Sign In</a>
                </li>
                <li>
                    <a className="sr" onClick={navRegister}>Register</a>
                </li>
            </ul>
        </nav>
    );
}

export default DownloadNav;