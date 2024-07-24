import "../styling/downloadinfo.css"

function DownloadInfo() {
  // Construct the download information
  return (
    <div>
        <p className="downInfo">
            Once downloaded, ensure Python and needed libraries(pathlib, cv2, time and customtkinter) are installed on the local machine.
            Navigate to the directory the file was downloaded in and run the Python script.
        </p>
    </div>
  );
}

export default DownloadInfo;   