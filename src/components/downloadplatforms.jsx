import React from "react";
import "../styling/downloadplatforms.css";

function DownloadPlatforms (){


    // Visit the github page for the project
    const onButtonClick = () => {
        window.open("https://github.com/bgorman65/FocusTracker/blob/main/FocusTrackerFinal.py", "_blank");
    };


    // Construct the download platforms page
    return (
        <>
            <div className="header">
                <h1>Download For Your Platform</h1>
            </div>
            <div className="platdiv">
                <div className="windows">
                    <h3 className="platheader">Windows</h3>
                    <button className="downBtn" onClick={onButtonClick}>Download</button>
                </div>
                <div className="mac">
                    <h3 className="platheader">Mac</h3>
                    <button className="downBtn">Coming Soon</button>
                </div>
                <div className="linux">
                    <h3 className="platheader">Linux</h3>
                    <button className="downBtn">Coming Soon</button>
                </div>
            </div>
        </>
    );
}

export default DownloadPlatforms;