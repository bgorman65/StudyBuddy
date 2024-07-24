import DownloadNav from "../components/downloadnav";
import DownloadPlatforms from "../components/downloadplatforms";
import DownloadInfo from "../components/downloadinfo";
import Background from "../components/background";
import pic1 from "../images/pic1.png";
import pic2 from "../images/pic2.png";
import "../styling/download.css";

function Download(){
   // Construct the download page 
   return (
       <>
         <Background />
         <div className="downParent">
            <div className="leftDown">
               <DownloadNav />
               <DownloadPlatforms />
               <DownloadInfo />
            </div>
            <div className="rightDown">
               <h1 className="picTitle">GUI</h1>
               <img className="img" src={pic1}></img>
               <img className="img" src={pic2}></img>
            </div>
         </div>
       </>
    )
}

export default Download;