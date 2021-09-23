import React, { useState } from 'react'
import Modal from 'react-animated-modal'
import { styles } from './styles.js'
import { connect } from 'react-redux'

import {setVendor} from '../../redux'

function VendorModal(props) {
    const [selectedItem, setSelectedItem] = useState()
    const [vendorItem, setVendorItem]= useState()
    const { vendorList, setVendor } = props

    const selectVendor = (index, item) =>{
        setSelectedItem(index)
        setVendorItem(item)
    }
    const handleSelectButton = () =>{
        setVendor({visibleModal: false, vendorItem})
    }

 
    if (!vendorList?.visibleModal) {
        return null
    }
    else {
        return (
            <div className="modal-container">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1>Select Vendor</h1>
                    </div>
                    <div className="modal-body">
                        <h1>Ini Vendor Modal</h1>
                        {vendorList?.data.map((item, index) => {
                            if (item.status === 1) {
                                return (
                                    <div key={index}
                                    style={selectedItem === index ? styles.selectActive : styles.selectContainer} onClick={()=> selectVendor(index, item)}>
                                        <span>{item.nama_vendor} ({item.telepon}) - {item.alamat}</span>

                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleSelectButton} >Select Vendor</button>
                    </div>
                </div>
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        expiredToken: state.Authorization.token,
        vendorList: state.generalReducer.vendor
    }
}
export default connect(mapStateToProps, {setVendor})(VendorModal)
