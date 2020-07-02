// Dependencies
import React, { useState, useEffect } from 'react'; 
import { CSSTransition } from 'react-transition-group'; 
import swal from 'sweetalert';
// Need to import axios

// Components
import Card from './Card'; 
import ChatBox from './ChatBox';
import ScoreBoard from './ScoreBoard';

const Game = (props) => {    
    const [loadClient, setLoadClient] = useState(true);
    const [turn, setTurn] = useState(true);
    const [round, setRound] = useState(1);
    const [wordsArray, setWords] = useState(props.cards);
    const [counter, setCounter] = useState(0);
    const [redCounter, setRedCounter] = useState(0);
    const [blueCounter, setBlueCounter] = useState(0);
    const [shuffle, shuffleOn] = useState(false);

    useEffect(() => {
        if (counter % 2 === 0 && counter !== 0) { 
            setRound(round + 1);
        }
    }, [counter]) 
    
    // Each time the board re-renders to show a revealed card, recalculate the score
    useEffect(() => {
        let redScore = 0;
        let blueScore = 0;
        // use a switch statement instead?
        wordsArray.forEach(word => { 
            if (word.reveal && word.type === "black") {
                // Pop-up modal saying Game Over and opposing team wins   
                swal({
                    title: "Game Over",
                    text: turn? "Blue team wins": "Red team wins" 
                });
            } else if (word.reveal && word.type === "red") {
                redScore++;
            } else if (word.reveal && word.type === "blue")  {
                blueScore++;
            }
        })
        setRedCounter(redScore);
        setBlueCounter(blueScore);
    }, [wordsArray])

    const revealType = card => {
        const copyOfCards = [...props.cards]
        const newCards = copyOfCards.map(index => {
            if (index.word === card) {
                index.reveal = true;
            }
            return index;
        })
        setWords(newCards);
    }

    // card flip animation
    const shuffleCards = () => shuffleOn(!shuffle);

    const toggleCodes = () => {
        // show modal
    }

    return(
        <>
            {/* LOAD OR UNLOAD THE CLIENT */}
            <button onClick={() => setLoadClient(prevState => !prevState)}>
                STOP CLIENT
            </button>
            {/* SOCKET IO CLIENT*/}
            <p>Round: {round}</p> 
            <ScoreBoard 
            redCounter={redCounter}
            blueCounter={blueCounter}
            />
            <div className="statusBar">
                <h2><i className="far fa-star" aria-hidden="true"></i><span>{turn ? "Red" : "Blue"} Teams's Turn</span></h2>
                <div>
                    <button type="button" className="endTurnButton" onClick={() => { setTurn(!turn); setCounter(counter + 1) }}>End Turn</button>
                    <button type="button" className="shuffleButton" onClick={shuffleCards}>Shuffle</button>
                </div>
            </div>
            <div className="tableContainer">  
                <ul className="table"> 
                    {wordsArray.map((word, index) => {
                        return (
                            <CSSTransition
                                in={shuffle}
                                key={index}
                                timeout={300}
                                classNames={"cardTransition"}  
                                onExit={shuffleCards}
                            >
                            <Card
                                key={index}
                                word={word.word}
                                hidden={word.reveal}
                                type={word.type}
                                show={() => revealType(word.word)} 
                            />
                            </CSSTransition>
                        )
                    })} 
                </ul>
                <aside>
                    <div className="teamBoard">
                        <div>
                            <button className="secretCodes" onClick={toggleCodes}>Secret Codes</button>
                            <h3>Lunar Team</h3> 
                            <ul className="redTeam">
                                <li className="spymaster">
                                    <span role="img" aria-hidden="true">😎</span>
                                    <p>player 1</p>
                                </li>
                                <li>
                                    <span role="img" aria-hidden="true">🥱</span>
                                    <p>player 2</p>
                                </li>
                                <li>
                                    <span role="img" aria-hidden="true">🤪</span>
                                    <p>player 3</p>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h3>Solar Team</h3> 
                            <ul className="blueTeam">
                                <li className="spymaster">
                                    <i className="fas fa-user-secret"></i>
                                    <p>player 1</p>
                                </li>
                                <li>
                                    <i className="fas fa-user"></i>
                                    <p>player 2</p>
                                </li>
                                <li>
                                    <i className="fas fa-user"></i>
                                    <p>player 3</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                    {loadClient ? <ChatBox /> : null}
                </aside>
            </div>
        </>
    )
}

export default Game; 