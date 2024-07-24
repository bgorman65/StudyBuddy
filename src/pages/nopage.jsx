import "../styling/nopage.css";
import Background from "../components/background";


function NoPage() {
  // Construct the 404 page
  return (
    <>
      <Background />
      <div className="errorDiv">
        <h1 className="errorHeader">Error</h1>
        <p className="errorPara">404: Page not found</p>
      </div>
    </>
  );
}

export default NoPage;