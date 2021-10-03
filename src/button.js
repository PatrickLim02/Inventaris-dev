import React, {useState} from 'react'


function ButtonCounter(props){
    const {counterPlus, resetCounter, buttonName, onChangeWord} = props


    return(
        <div>
            <button onClick={() => counterPlus(5)}>{buttonName}</button>
            <button onClick={() => resetCounter()}>Reset</button>
            <button onClick={() => onChangeWord('PATRICK')}>Change Word</button>
        </div>
    )
}

export default ButtonCounter