import BrowserNav from "../components/browsernav";
import axios from "axios";
import "../styling/logs.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Background from "../components/background";


function Logs(props) {
    // Logs state
    const [logs, setLogs] = useState([]);
    const navigate = useNavigate();

    // Get the logs
    const getLogs = async () => {
        try {
            // Get the logs by username
            const response = await axios.get('http://localhost:4000/logs/username', { params: { username: props.userName } });
            // Set the logs state
            setLogs(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    // Check if the user is a guest
    const checkGuest = () => {
        if (props.userName === "Guest") {
            alert("Please sign in to view logs");
            navigate("/inbrowser");
        }
    }


    // Get the logs on page load
    useEffect(() => {
        getLogs();
        checkGuest();
    }, []);


    // Constructing the logs page
    return (
        <>
            <Background className="back"/>
            <div>
                <BrowserNav userName={props.userName}/>
                <div className="logsDiv">
                    <table>
                        <thead className="tableHeaders">
                            <tr>
                                <th scope="col">User</th>
                                <th scope="col">Focus Interval</th>
                                <th scope="col">Lost Focus</th>
                                <th scope="col">Study Date</th>
                            </tr>
                        </thead>
                        <tbody className="tableEntries">
                            {logs.map((log, index) => (
                                <tr key={index}>
                                    <td>{log.username}</td>
                                    <td>{log.interval} seconds</td>
                                    <td>{log.count} times</td>
                                    <td>{log.entryDate.slice(0, 10)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Logs;
