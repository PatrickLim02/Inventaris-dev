import React from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
function Dashboard() {

    return (
        <div>
            <BreadCrumb link={
                [
                    { name: 'Dashboard' },
                ]
            } />
            <div> Screen Dashboard </div>
        </div>
    )
}

export default Dashboard