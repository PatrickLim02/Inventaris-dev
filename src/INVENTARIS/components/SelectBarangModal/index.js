import React, { useState } from 'react'
import Modal from 'react-animated-modal'
import { styles } from './styles.js'
import { connect } from 'react-redux'

import { setBarang, setPembelian } from '../../redux'

function BarangModal(props) {
    const [selectedItem, setSelectedItem] = useState()
    const [barangItem, setBarangItem] = useState()
    const { barangList, setBarang, setPembelian, pembelian } = props

    const selectBarang = (index, item) => {
        setSelectedItem(index)
        setBarangItem(item)
    }
    const handleSelectButton = () => {
        setPembelian({ barangModalVisible: false, barangItem })
    }


    if (!pembelian?.barangModalVisible) {
        return null
    }
    else {
        return (
            <div className="modal-container">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1>Select Barang</h1>
                    </div>
                    <div className="modal-body">
                        <h1>Ini Barang Modal</h1>
                        {barangList?.data.map((item, index) => {
                            return (
                                <div key={index}
                                    style={selectedItem === index ? styles.selectActive : styles.selectContainer} onClick={() => selectBarang(index, item)}>
                                    <span>{item.nama_barang} - {item.satuan}</span>

                                </div>
                            )

                        })}
                    </div>
                    <div className="modal-footer">
                        <button onClick={handleSelectButton} >Select Barang</button>
                    </div>
                </div>
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        expiredToken: state.Authorization.token,
        barangList: state.generalReducer.barang,
        pembelian: state.generalReducer.pembelian
    }
}
export default connect(mapStateToProps, { setBarang, setPembelian })(BarangModal)
