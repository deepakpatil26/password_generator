import React, { useState } from "react";
import "./App.css";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";

// Notification Component
const Notification = ({ message, visible }) => {
  return (
    <motion.div
      className="notification"
      initial={{ opacity: 0, translateY: -20 }}
      animate={
        visible
          ? { opacity: 1, translateY: 0 }
          : { opacity: 0, translateY: -20 }
      }
      transition={{ duration: 0.3 }}
    >
      {message}
    </motion.div>
  );
};

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(12);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  // State for notification
  const [notificationVisible, setNotificationVisible] = useState(false);

  const generatePassword = () => {
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?";

    let availableChars = lowercaseChars;
    if (includeUppercase) availableChars += uppercaseChars;
    if (includeNumbers) availableChars += numberChars;
    if (includeSymbols) availableChars += symbolChars;

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      generatedPassword += availableChars[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);

    // Show notification
    setNotificationVisible(true);

    // Hide notification after 2 seconds
    setTimeout(() => {
      setNotificationVisible(false);
    }, 2000);
  };

  return (
    <div className="container">
      <h1>Password Generator</h1>

      <div className="password-container">
        <input
          type="text"
          className="password-output"
          value={password}
          readOnly
        />
        <button className="copy-button" onClick={copyToClipboard}>
          <FontAwesomeIcon icon={faClipboard} />
        </button>
      </div>

      <div className="label">
        Password Length (4-20):
        <input
          type="number"
          className="password_length"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
      </div>

      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={includeUppercase}
            onChange={(e) => setIncludeUppercase(e.target.checked)}
          />
          Include Uppercase Letters
        </label>
      </div>

      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={includeNumbers}
            onChange={(e) => setIncludeNumbers(e.target.checked)}
          />
          Include Numbers
        </label>
      </div>

      <div className="checkbox-container">
        <label>
          <input
            type="checkbox"
            checked={includeSymbols}
            onChange={(e) => setIncludeSymbols(e.target.checked)}
          />
          Include Symbols
        </label>
      </div>

      <button onClick={generatePassword}>Generate Password</button>

      {/* Notification Component */}
      <Notification message="Password copied!" visible={notificationVisible} />
    </div>
  );
}

export default App;
