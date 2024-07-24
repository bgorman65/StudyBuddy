import "../styling/browsernav.css";


function BrowserNav(props) {
    // Construct the browser navigation bar
    return (
        <nav className="browser-nav">
            <a href="/home" className="siteTitle">Study Buddy</a>
            <ul className="navul">
                <li>
                    <a href="/logs" className="sr">View Logs</a>
                </li>
                <li>
                    <a href="/inbrowser" className="sr">Study</a>
                </li>
            </ul>
            <ul className="userul">
                <li>
                    <a className="sr">{props.userName}</a>
                </li>
            </ul>
        </nav>
    );
}

export default BrowserNav;