import React, { useState } from 'react';
import Chat from './Chat';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [isChatting, setIsChatting] = useState(false);

  const joinChat = () => {
    if (username.trim()) {
      setIsChatting(true);
    }
  };

  return (
    <div className="App">
      {!isChatting ? (
        <div className="login">
          <h2>Enter Username</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={joinChat}>Join Chat</button>
        </div>
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}

export default App;
    