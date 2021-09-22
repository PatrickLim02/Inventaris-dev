import React, {} from 'react'
import {Link} from 'react-router-dom'
function ButtonDirect(props){
    const {label} = props
    return(        
        <button {...props}>
          {label}
        </button>
    )
}





export default ButtonDirect;