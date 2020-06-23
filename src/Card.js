import React from 'react'

const Card = (props) => {  
    return (
        <li className={props.hidden ? `card ${props.type}` : "card"} onClick={props.show}>
            <input type="checkbox" id={props.word} name={props.word} value={props.word} className="sr-only"></input>
            <label htmlFor={props.word}>
                <span>{props.word}</span>
            </label>
        </li>
    )
}

export default Card;