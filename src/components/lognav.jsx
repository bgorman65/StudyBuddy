import "../styling/lognav.css";
import { useNavigate } from "react-router-dom";


function LogNav() {
    const navigate = useNavigate();


    // Function to navigate to the home page
    const navHome = () => {
        navigate('/home');
    }


    // Function to navigate to the download page
    const navDownload = () => {
        navigate('/download');
    }
    

    // Construct the log navigation bar
    return (
        <nav className="log-nav">
            <a className="siteTitle" onClick={navHome}>Study Buddy</a>
            <ul className="userul">
                <li>
                    <a className="sr" onClick={navDownload}>Download</a>
                </li>
            </ul>
        </nav>
    );
}

export default LogNav;