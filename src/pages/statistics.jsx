import Background from "../components/background";
import BrowserNav from "../components/browsernav";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styling/statistics.css";
import axios from 'axios';

function Statistics(props) {
    const [time, setTime] = useState(0);
    const [totFocus, setTotFocus] = useState(0);
    const [timePercent, setTimePercent] = useState(0);
    const [focusPercent, setFocusPercent] = useState(0);
    const [logs, setLogs] = useState([]);
    const navigate = useNavigate();


    // Check for guest and then fetch data
    useEffect(() => {
        checkGuest();
        getLogs();
    }, []);


   // Get the logs
   const getLogs = async () => {
        try {
            // Get the logs by username
            const response = await axios.get('http://localhost:4000/logs/username', { params: { username: props.userName } });
            // Set the logs state
            setLogs(response.data);
            calculateStats(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    // Calculate the statistics
    const calculateStats = (data) => {
        let timeSum = 0;
        let focusSum = 0;
        let timeIncrease = 0;
        let focusIncrease = 0;
        // Calculate the total time and focus
        data.forEach((log) => {
            timeSum += log.time;
            focusSum += log.count;
        });
        timeSum = timeSum / 60;
        // Calculate the percentage increase
        if (data.length > 2) {
            timeIncrease = ((data[data.length - 1].time + data[data.length - 2].time) / 2) - data[data.length - 3].time;
            focusIncrease = ((data[data.length - 1].count + data[data.length - 2].count) / 2) - data[data.length - 3].count;
        }
        // Set the state
        setTime(timeSum);
        setTotFocus(focusSum);
        setTimePercent(timeIncrease);
        setFocusPercent(focusIncrease);
    }

    
    // Check if the user is a guest
    const checkGuest = () => {
        if (props.userName === "Guest") {
            alert("Please sign in to view statistics.");
            navigate("/inbrowser");
        }
    }


    // Render the statistics page
    return (
    <>
        <Background className="statBack"/>
        <BrowserNav userName={props.userName} />
        <div className="statBody">
            <div className="statInfo">
                <h1 className="statHeader">Statistics</h1>
                <p className="statText">Here you can view your statistics and see how you are developing better study habbits. <br />The increase sections are calculated from your previous two study sessions.</p>
            </div>
            <div className="statHabits">
                <div>
                    <h2 className="statHeader">Studying Time</h2>
                    <p className="statText">{time} minutes</p>
                </div>
                <div>
                    <h2 className="statHeader">Lost Focus</h2>
                    <p className="statText">{totFocus} times</p>
                </div>
                <div>
                    <h2 className="statHeader">Time Increase</h2>
                    <p className="statText">{timePercent}%</p>
                </div>
                <div>
                    <h2 className="statHeader">Focus Increase</h2>
                    <p className="statText">{focusPercent}%</p>
                </div>
            </div>
        </div>
    </>
  );
}

export default Statistics;