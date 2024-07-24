import "../styling/downloadnav.css";

function DownloadNav () {
    // Construct the download navigation bar
    return (
        <nav className="download-nav">
            <a href="/home" className="siteTitle">Study Buddy</a>
            <ul className="navul">
                <li>
                    <a href="/signin" className="sr">Sign In</a>
                </li>
                <li>
                    <a href="/register" className="sr">Register</a>
                </li>
            </ul>
        </nav>
    );
}

export default DownloadNav;