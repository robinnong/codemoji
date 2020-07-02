import React, { useState, useEffect, useRef } from 'react';   
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001"; 
const socket = socketIOClient(ENDPOINT);

const ChatBox = () => { 
    const [userInput, setInput] = useState("");
    const [messageLog, setMessageLog] = useState([]); 

    useEffect(() => { 
        // Disconnect from the server when the chatBox component un-mounts
        return () => socket.disconnect();
    }, []);

    // Scroll chat box to the bottom whenever a new message appears
    const scrollToBottom = () => messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    // Whenever the message log updates, auto scroll chat to the bottom
    useEffect(scrollToBottom, [messageLog]);

    // Append new messages to the chat! 
    useEffect(() => {
        socket.on('receive message', data => { 
            let copyMessages = [...messageLog];
            copyMessages.push(data);
            setMessageLog(copyMessages);  
        });
    });

    // Sends valid text messages to the server
    const sendMessage = (e) => {
        e.preventDefault() 
        // Message cannot be blank
        if (userInput !== "") {
            console.log('emitting new message'); 
            socket.emit('new message', userInput); 
        } 
        // Clears the input field
        setInput("");
    } 

    // Sets the input field state on each input change
    const handleUserInput = (e) => setInput(e.target.value); 

    const messagesEndRef = useRef(null);

    return(
        <div className="chatWindow">
            <div className="messagesContainer">  
                {messageLog.map((text, index) => {
                    return ( 
                        <p key={index}>{text}</p>
                    )
                })} 
                <div ref={messagesEndRef} />  
            </div>
            <form action="" onSubmit={sendMessage}>
                <input type="text" onChange={handleUserInput} value={userInput} placeholder="Type message here and press enter to submit"/>
                <button type="submit" aria-label="Submit">
                    <i className="fas fa-paper-plane" aria-hidden="true"></i>
                </button>
            </form> 
        </div>
    )
}

export default ChatBox;