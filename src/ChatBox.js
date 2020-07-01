import React, { useState, useEffect } from 'react'; 

const ChatBox = () => {
    const [userInput, setInput] = useState("");
    const [messageLog, setMessageLog] = useState(["[Robin] Hi this is a test message", "[Kathy] This is a test too, a REALLY LONG MESSAGE THAT IS TOO LONG FOR THE BOX. What will it look like??? 🙂😫"]);

    const sendMessage = (e) => {
        e.preventDefault()
        // use state to always be listening to the input on change
        // Message cannot be blank
        if (userInput != "") {
            console.log("Message Sent");
            // Append message to the chat! 
            let copyMessages = [...messageLog];
            copyMessages.push(userInput);
            setMessageLog(copyMessages);
        }
        // Clears the input field
        setInput("")
    }

    // Sets the input field state on each input change
    const handleUserInput = (e) => {  
        console.log(e.target.value)
        setInput(e.target.value); 
    } 

    return(
        <div className="chatBox">
            <div className="messagesContainer"> 
                {messageLog.map((text, index) => {
                    return ( 
                        <p key={index}>{text}</p>
                    )
                })} 
            </div>
            <form action="" onSubmit={sendMessage}>
                <input type="text" onChange={handleUserInput} value={userInput} placeholder="Type message here and press enter to submit"/>
                <button type="submit">
                    <i className="fas fa-paper-plane"></i>
                </button>
            </form>
        </div>
    )
}

export default ChatBox;