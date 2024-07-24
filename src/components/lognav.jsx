import "../styling/lognav.css";


function LogNav() {
    // Construct the log navigation bar
    return (
        <nav className="log-nav">
            <a href="/home" className="siteTitle">Study Buddy</a>
            <ul className="userul">
                <li>
                    <a href="/download"className="sr">Download</a>
                </li>
            </ul>
        </nav>
    );
}

export default LogNav;