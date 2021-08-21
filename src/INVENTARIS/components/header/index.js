import React, { useState } from 'react'
import './style.css'
import Menu1 from '../../assets/menu.png'
import Menu2 from '../../assets/menu1.png'
import {connect} from 'react-redux'
import {setAside} from '../../redux'

function Header(props) {
  
  const {visiblesidebar} = props
  console.log(visiblesidebar)
  const visibleAside = () =>{
      props.setAside({visible : visiblesidebar ? false : true})
  
}

  return (
    <div className="header-container">
      <div className="navigation-action">
        <div>
          <img className="navigasi" src={!visiblesidebar ? Menu1 : Menu2} width={25} onClick={visibleAside}></img>
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    visiblesidebar: state.generalReducer.sidebar.visible,
      
  }
}


export default connect(mapStateToProps, {setAside}) (Header);