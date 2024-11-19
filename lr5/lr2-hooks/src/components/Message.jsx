import { useState } from "react";
import "../assets/message.css";

function Message() {
  const [messages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);
  const handleToggleMessages = () => {
    setShowMessages((prev) => !prev);
  };

  return (
    <div>
      <button
        onClick={handleToggleMessages}
        style={{ display: "block", margin: "0 auto" }}
      >
        {showMessages ? "Hide" : "Read All"}
      </button>
      {showMessages && (
        <div>
          {messages.length > 0 ? (
            messages.map((msg, index) => <p key={index}>{msg}</p>)
          ) : (
            <p>RAndom words dfksdokfgd</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Message;
