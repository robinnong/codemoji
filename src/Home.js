import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = () => {
    const [userInput, setInput] = useState("");
    const [hasCode, setCodeSubmission] = useState(false); 

    // Validate the user's input and bring them to the correct game room
    const validateCode = (e) => {
        e.preventDefault();
        if (userInput === "") {
            console.log("Invalid submission")
        } else {
            console.log(userInput)
        }
    }

    // Sets the input field state on each input change
    const handleUserInput = (e) => setInput(e.target.value.trim()); 

    return (
        <div className="home"> 
            {hasCode ? 
            <form className="codeSubmit" onSubmit={validateCode}>
                    <input type="text" onChange={handleUserInput} value={userInput} autoFocus placeholder="Enter code"/>
                <button type="submit">Submit</button>
            </form>
            : 
            <>
                <Link className="gameLink" to="/game">Start New Game</Link>
                <button onClick={() => setCodeSubmission(true)}>or enter room code</button>
            </>
            }
        </div>
    )
}

export default Home;