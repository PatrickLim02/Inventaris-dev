import React, { useState } from 'react'
import {
    Link, useHistory, BrowserRouter as Router, Route
} from 'react-router-dom'
import LoginScreen from '../Login'
import Sidebar from '../../../INVENTARIS'

function Navigations() {
    const token = localStorage.getItem('token')
    return (
        <Router>
            <Route exact path="/" component={token ? Sidebar : LoginScreen} />
            <Route path="/login" component={LoginScreen} />
            <Route path="/home" component={Sidebar} />
        </Router>


    )
}

export default Navigations