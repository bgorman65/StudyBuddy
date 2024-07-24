import React from 'react';
import Landing from './pages/landing';
import Download from './pages/download';
import NoPage from './pages/nopage';
import Sign from './pages/signin';
import Register from './pages/register';
import InBrowser from './pages/inbrowser';
import Logs from './pages/logs';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { useState, useEffect } from 'react';


function App() {
  const [userName, setUserName] = useState(localStorage.getItem('userName') || null);


  // Save the user name in the local storage
  useEffect(() => {
    localStorage.setItem('userName', userName);
  }, [userName]);


  // Routing the components
  // Default route is the Landing page
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Landing />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/download" element={<Download />} />
          <Route path="/signin" element={<Sign setUserName={setUserName} />} />
          <Route path='/register' element={<Register setUserName={setUserName}/>} />
          <Route path='/inbrowser' element={<InBrowser userName={userName}/>} />
          <Route path='/logs' element={<Logs userName={userName}/>} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App