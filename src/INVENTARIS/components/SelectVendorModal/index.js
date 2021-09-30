import React, { useState } from 'react'
import Modal from 'react-animated-modal'
import { styles } from './styles.js'
import { connect } from 'react-redux'

import {setPembelian, setVendor} from '../../redux'

function VendorModal(props) {
    const [selectedItem, setSelectedItem] = useState()
    const [vendorItem, setVendorItem]= useState()
    const { vendorList, setPembelian, setVendor, pembelian } = props

    const selectVendor = (index, item) =>{
        setSelectedItem(index)
        setVendorItem(item)
    }
    const handleSelectButton = () =>{
        setPembelian({vendorModalVisible: false, vendorItem})
    }

 
    if (!pembelian?.vendorModalVisible) {
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
        vendorList: state.generalReducer.vendor,
        pembelian: state.generalReducer.pembelian,
    }
}
export default connect(mapStateToProps, {setVendor, setPembelian})(VendorModal)
