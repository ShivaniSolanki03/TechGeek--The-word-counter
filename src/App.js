import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import Alert from './components/Alert';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  const setAlert = (message, type) => {
    setAlertMessage({
      msg: message,
      type: type
    });
    setTimeout(() => setAlertMessage(null), 2000); // Alert disappears after 2 seconds
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    setAlert(darkMode ? "Light mode enabled!" : "Dark mode enabled!", "success");
  };

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <Navbar title="TextUtils" aboutText="About" darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Alert alert={alertMessage} />
      <div className="container my-3">
        <TextForm heading="Enter your text below" mode={darkMode ? 'dark' : 'light'} />
      </div>
    </div>
  );
}

export default App;
