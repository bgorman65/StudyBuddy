import "../styling/browsernav.css";
import { useNavigate } from "react-router-dom";


function BrowserNav(props) {
    const navigate = useNavigate();


    // Function to navigate to the home page
    const navHome = () => {
        navigate('/home');
    }


    // Function to navigate to the logs page
    const navLogs = () => {
        navigate('/logs');
    }


    // Function to navigate to the study page
    const navStudy = () => {
        navigate('/inbrowser');
    }

    
    // Construct the browser navigation bar
    return (
        <nav className="browser-nav">
            <a className="siteTitle" onClick={navHome}>Study Buddy</a>
            <ul className="navul">
                <li>
                    <a className="sr" onClick={navLogs}>View Logs</a>
                </li>
                <li>
                    <a className="sr" onClick={navStudy}>Study</a>
                </li>
            </ul>
            <ul className="userul">
                <li>
                    <a href="#" className="sr">{props.userName}</a>
                </li>
            </ul>
        </nav>
    );
}

export default BrowserNav;