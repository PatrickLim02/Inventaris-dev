import React, { useState } from 'react'
import ButtonCounter from './button'

function Test() {
    const [counter, setCounter] = useState(0)
    const [buttonName, setButtonName] = useState('Click Me')
    const [word, setWord] = useState('Hello')


    const counterPlus = (value) => {
        setCounter(counter + value)
    }
    const resetCounter = () => {
        setCounter(0)
    }

    return (
        <div>
            <div>Counter : {counter}</div>
            <ButtonCounter counterPlus={counterPlus} resetCounter={resetCounter} buttonName={buttonName} onChangeWord={word => setWord(word)} />
            <div>Word : {word} </div>
        </div>
    )
}

export default Test