import "../styling/landing.css";
import React from 'react';
import { Link } from 'react-router-dom';
import Background from "../components/background";


function Landing() {
  // Construct the landing page
  return (
    <>
    <Background />
      <div className="parent">
          <div className="first">
              <h1 className="appname">Study Buddy</h1>
          </div>
          <div className="second">
              <p className="appinfo">Track how often you lose focus when studying and develop better habits! 
                  We offer an in broswer and stand-alone application for use. 
                  Registration is not required, but recrommended to keep track of study sessions.
              </p>
              <div className = "landingbuttons">
                <Link to="/download">
                  <button type="button" className="landBtn">Download</button>
                </Link>
                <Link to="/signin">
                  <button type="button" className="landBtn">Use In Browser</button>
                </Link>
              </div>
          </div>
      </div>
    </>
  );
}   

export default Landing;