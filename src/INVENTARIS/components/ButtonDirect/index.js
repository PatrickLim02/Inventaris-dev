import React, {} from 'react'
import {Link} from 'react-router-dom'
function ButtonDirect(props){
    const {label} = props
    return(        
        <Link {...props}>
          {label}
        </Link>
    )
}

export default ButtonDirect;