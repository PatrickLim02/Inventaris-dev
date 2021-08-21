import React, {} from 'react'
import {} from 'react-redux'
import './styles.scss'


function Dropdown(props) {
    const {label, items} = props;
  
    return (
        <select {...props}>
            {items.map((item, index) => (
                <option key={index} value={item.value}>{item.label}</option>
            ))}
        </select>
    )
}

export default Dropdown;