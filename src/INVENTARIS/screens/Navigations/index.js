import React, { useState } from 'react'
import {
    Link, useHistory, BrowserRouter as Router, Route
} from 'react-router-dom'
import LoginScreen from '../Login'
import Sidebar from '../../../INVENTARIS'

function Navigations() {
    return (
        <Router>
            <Route exact path="/" component={LoginScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/home" component= {Sidebar}/>
        </Router>
    )
}

export default Navigations