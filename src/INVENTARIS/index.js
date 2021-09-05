import React, { useEffect, useState } from 'react'
import Aside from './components/aside'
import Header from './components/header'
import {fetchDepartmentFromBackEndToRedux, fetchVendorFromBackEndToRedux, fetchCabangFromBackEndToRedux, fetchUserFromBackEndToRedux} from './redux'
import {connect} from 'react-redux'
import {
    Link, useHistory, BrowserRouter as Router, Route
} from 'react-router-dom'

function Main(props) {
    const history = useHistory()
    useEffect(() => {
        props.fetchCabangFromBackEndToRedux()
        props.fetchDepartmentFromBackEndToRedux()
        props.fetchUserFromBackEndToRedux()
        props.fetchVendorFromBackEndToRedux()
    },[])

 
    return (
        <div className="app">
          <Aside/>
          <Header/>
        </div>


    )
}

const mapStateToProps = state =>{
    return {}
}
export default connect (mapStateToProps, {fetchCabangFromBackEndToRedux, fetchDepartmentFromBackEndToRedux, fetchUserFromBackEndToRedux, fetchVendorFromBackEndToRedux}) (Main);