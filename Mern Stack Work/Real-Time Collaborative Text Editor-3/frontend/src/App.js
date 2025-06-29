import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import "./App.css";

const socket = io("http://localhost:3001");

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("load_text", (data) => setText(data));
    socket.on("update_text", (data) => setText(data));

    return () => {
      socket.off("load_text");
      socket.off("update_text");
    };
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setText(value);
    socket.emit("update_text", value);
  };

  return (
    <div className="App">
      <h2>📝 Real-Time Collaborative Editor</h2>
      <textarea
        value={text}
        onChange={handleChange}
        rows="15"
        cols="60"
        placeholder="Start typing..."
      />
    </div>
  );
}

export default App;
