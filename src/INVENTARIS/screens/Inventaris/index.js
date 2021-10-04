import React from 'react'
import {connect} from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
function Inventaris () {
    return (
        <div>
            <BreadCrumb link={
                [
                    { name: 'Inventaris' },
                ]
            } />
            <div> Inventaris </div>
        </div>
    )
}
    
export default Inventaris 