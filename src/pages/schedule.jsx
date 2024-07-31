import axios from 'axios';
import Background from '../components/background';
import BrowserNav from '../components/browsernav';
import "../styling/schedule.css";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Schedule(props) {
  const [studyDate, setStudyDate] = useState('');
  const [studyTime, setStudyTime] = useState('');
  const navigate = useNavigate();

  // Check for guest
  useEffect(() => {
    checkGuest();
  }, []);


  // Handle the date change
  const dateChange = (event) => {
    setStudyDate(event.target.value);
    console.log(studyDate);
  }


  // Handle the time change
  const timeChange = (event) => {
    setStudyTime(event.target.value);
    console.log(studyTime);
  }


  // Check if the user is a guest
  const checkGuest = () => {
    if (props.userName === "Guest") {
        alert("Please sign in to schedule a study session.");
        navigate("/inbrowser");
    }
  }
  

  // Handle the form submission
  const handleSubmit = async () => {
    try {
      const response = await axios.get('http://localhost:4000/sendReminder', { params: { username: props.userName, date: studyDate, time: studyTime} });
      console.log(response.data);
    } catch (error) {
        console.error('Error fetching reminder:', error);
    }
  
  }


  // Render the schedule page
  return (
    <>
        <Background className="schBack"/>
        <BrowserNav userName={props.userName} />
        <div className="schBody">
            <div className="schInfo">
                <h1 className="schHeader">Well Remind You!</h1>
                <p className="schText">Here you can set up study sessions to keep yourself accountable.<br />Just fill out the form and we'll send you an email to remind you!</p>
            </div>
            <div className="schHabits">
                <form className="schForm">
                  <label htmlFor="studyDate" className="schTextForm">Study Date:</label>
                  <input type="date" id="studyDate" name="studyDate" className="schInput" onChange={dateChange}/>
                  <label htmlFor="studyTime" className="schTextForm">Study Time:</label>
                  <input type="time" id="studyTime" name="studyTime" className="schInput" onChange={timeChange}/>
                  <button type="submit" onClick={handleSubmit} className="schBtn">Remind Me!</button>
                </form>
            </div>
        </div>
    </>
  );
}

export default Schedule;