import React, { useState } from 'react'
import {
    Link, useHistory, BrowserRouter as Router, Route
} from 'react-router-dom'
import LoginScreen from '../Login'
import Sidebar from '../../../INVENTARIS'
import {isJwtExpired} from 'jwt-check-expiration'
function Navigations() {
    
    const token = localStorage.getItem('token')
    if (token){
        console.log('isExpired is:', isJwtExpired(token));
    }
    
   

    return (    
        <Router>
            <Route exact path="/" component={ LoginScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/dashboard" component={Sidebar} />
        </Router>


    )
}

export default Navigations