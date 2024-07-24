import { useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import BrowserNav from "../components/browsernav";
import "../styling/inbrowser.css";
import { set } from 'mongoose';
import axios from 'axios';
import Background from '../components/background';
import OpenAI from 'openai';


function InBrowser(props) {
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(50);
    const [intervalId, setIntervalId] = useState(null); 
    const [start, setStart] = useState(0);
    const videoRef = useRef(null);
    const stopDetectionRef = useRef(false);


    // Load face-api models and start video stream
    useEffect(() => {
        async function loadModels() {
            try {
                await faceapi.nets.tinyFaceDetector.loadFromUri('./facemodels');
                startVideo();
            } catch (error) {
                console.error("Error loading face-api models:", error);
            }
        }
        loadModels();
    }, []);


    // Start video stream
    const startVideo = () => {
        navigator.getUserMedia(
            { video: {} },
            stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            },
            err => console.error("Error accessing video stream:", err)
        );
    };


    // Set time for losing focus
    const handleSetTime = (e) => {
        setTime(parseInt(e.target.value));
    };


    // Start and face detection
    const handleStart = () => {
        stopDetectionRef.current = false;
        if (!stopDetectionRef.current) {
            const id = setInterval(detectFaces, 1000);
            setIntervalId(id);
        }
    };


    // Detect faces
    const detectFaces = async () => {
        // Get video element
        const video = videoRef.current;
        // If video element exists, detect faces
        if (video) {
            // Make api call to get faces
            const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions());

            // Set start time (0) if face detected, else increment start time
            setStart(prevStart => {
                // If face detected, reset start time
                if (detections.length > 0) {
                    return 0;
                } else {
                    // If no face detected, increment start time
                    const newStart = prevStart + 1;
                    // Check if focus was lost
                    if (newStart > time) {
                        // Increment count if focus was lost
                        setCount(prevCount => {
                            const newCount = prevCount + 1;
                            return newCount;
                        });
                        // Reset start time
                        return 0;
                    }
                    // Increment start time if focus was not lost
                    return newStart;
                }
            });
        }
    };


    // Create Log of study sessions
    const createLog = async () => {
        try {
            const logData = {
                username: props.userName,
                interval: time,
                count: count,
                entrydate : Date.now()
            };
            const response = await axios.post('http://localhost:4000/logs/create', logData);
            console.log(response.data);
        } catch (error) {
            console.error("Error creating log:", error);
        }
    };


    // Stop face detection
    const handleStop = () => {
        stopDetectionRef.current = true;
        clearInterval(intervalId);
        // Create log if user is not a guest
        if (props.userName !== "Guest") {
            createLog();
        }
        setCount(0);
        
    };


    // AI Chat functionality
    const generateAI = async () => {
        // Check if the user is logged in
        if (props.userName === "Guest") {
            alert("Please sign in to use ChatGPT");
            return;
        }
        // Get the prompt from the input
        const chatInput = document.getElementsByClassName("chatInput")[0];
        // Get the response from OpenAI
        const response = await axios.post('http://localhost:4000/api/openai', { prompt: chatInput.value });
        // Add prompt to the chat
        const chatGPTDiv = document.getElementsByClassName("chatGPT")[0];
        const newPrompt = document.createElement("p");
        newPrompt.className = "chatPrompt";
        newPrompt.innerText = chatInput.value;
        // Add response to the chat
        chatGPTDiv.appendChild(newPrompt);
        const newResponse = document.createElement("p");
        newResponse.className = "chatResponse";
        newResponse.innerText = response.data.response;
        chatGPTDiv.appendChild(newResponse);
        // Clear the input
        chatInput.value = "";   
    }


    // Construct the browser functionality page
    return (
        <>
            <Background className="back" />
            <div>
                <BrowserNav userName={props.userName} />
                <div className="inBrowserBody">
                    <div className="inBrowserFace">
                        <h1 className="faceHeader">Focus Tracker</h1>
                        <div className="timeRangeDiv">
                            <p className="faceInstructions">
                                The slider below sets the time on how long not looking at the screen justifies losing focus.
                                It defaults to 45 seconds and has a minimum of 1 and maximum of 100 seconds.
                            </p>
                            <input
                                type="range"
                                className="form-range timeRange"
                                id="customRange1"
                                onChange={handleSetTime}
                                min="1"
                                max="100"
                                defaultValue="50"
                                value={time}
                            />
                            <p className="faceValues">Time Interval: {time} seconds</p>
                            <p className="faceValues">Focus Lost: {count} times</p>
                        </div>
                        <div className="faceInPic">
                            <video
                                id="video"
                                ref={videoRef}
                                className="video"
                                width="auto"
                                height="auto"
                                autoPlay
                                loop
                                muted
                            ></video>
                        </div>
                        <div className="ssButtons">
                            <button type="button" className="browBtn" onClick={handleStart}>Start</button>
                            <button type="button" className="browBtn" onClick={handleStop}>Stop</button>
                        </div>
                    </div>
                    <div className="inBrowserAI">
                        <h1 className='faceHeader'> AI </h1>
                        <p className='faceInstructions'> Ask ChatGPT your questions without leaving this page.</p>
                        <div className="AI">
                            <div className="chatGPT">
                            
                            </div>
                            <div className="chatForm">
                                <input type="text" className="chatInput" placeholder="Ask ChatGPT" />
                                <button type="button" className="browBtn" onClick={generateAI}>Generate Response</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default InBrowser;