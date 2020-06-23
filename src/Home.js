import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">
            <Link className="gameLink" to="/game">Start New Game</Link>
            <button>or enter room code</button>
        </div>
    )
}

export default Home;