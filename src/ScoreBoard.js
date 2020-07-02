import React from 'react';

const ScoreBoard = (props) => {
    return(
        <div className="scoreBoard">
            <p className="teamName">Red Team</p>
            <p className="score">{props.redCounter}</p>
            <p>vs</p>
            <p className="score">{props.blueCounter}</p>
            <p className="teamName">Blue Team</p> 
        </div>
    )
}

export default ScoreBoard;