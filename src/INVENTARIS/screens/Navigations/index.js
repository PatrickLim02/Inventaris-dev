import React, { useState, useEffect } from 'react'
import {
    Link, useHistory, BrowserRouter as Router, Route
} from 'react-router-dom'
import LoginScreen from '../Login'
import Sidebar from '../../../INVENTARIS'
import { isJwtExpired } from 'jwt-check-expiration'

function Navigations() {
  
    return (
        <div>                    
            <Router>
                <Route exact path="/" component={LoginScreen} />
                <Route path="/login" component={LoginScreen} />
                <Route path="/dashboard" component={Sidebar} />
            </Router>
        </div>



    )
}

export default Navigations