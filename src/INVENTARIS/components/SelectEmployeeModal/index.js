import React, { useState } from 'react'
import Modal from 'react-animated-modal'
import { styles } from './styles.js'
import { connect } from 'react-redux'
import {setUser} from '../../redux'

function EmployeeModal(props) {
    const [selectedItem, setSelectedItem] = useState()
    const [employeeItem, setEmployeeItem]= useState()
    const { employeeList, setUser } = props

    const selectEmployee = (index, item) =>{
        setSelectedItem(index)
        setEmployeeItem(item)
    }
    const handleSelectButton = () =>{
        setUser({visibleModal: false, employeeItem})
    }

 
    if (!employeeList?.visibleModal) {
        return null
    }
    else {
        return (
            <div className="modal-container">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1>Select Employee</h1>
                    </div>
                    <div className="modal-body">
                        <h1>Ini Employee Modal</h1>
                        {employeeList?.data.map((item, index) => {
                            if (item.status === 1) {
                                return (
                                    <div key={index}
                                    style={selectedItem === index ? styles.selectActive : styles.selectContainer} onClick={()=> selectEmployee(index, item)}>
                                        <span>{item.nama_user} ({item.cabang}) - {item.department}</span>

                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleSelectButton} >Select Employee</button>
                    </div>
                </div>
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        expiredToken: state.Authorization.token,
        employeeList: state.generalReducer.user
    }
}
export default connect(mapStateToProps, {setUser})(EmployeeModal)
