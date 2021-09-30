import React, { useState } from 'react'
import { connect } from 'react-redux'

import BreadCrumb from '../../components/BreadCrumb'
import { setBarang, fetchBarangFromBackEndToRedux } from '../../redux'
import { useHistory } from 'react-router-dom'
import FormCreatePembelian from '../../components/Form/FormPembelian_Create'
import FormEditBarang from '../../components/Form/FormBarang_Edit'
import {createPembelian, editPembelian} from '../../helpers/request_pembelian'
import KeranjangPembelian from '../../components/KeranjangPembelian'
function PembelianForm(props) {
    const { types, id } = props.match.params; //Harus sama dengan yang di router
    const [data, setData] = useState([])

    const callBackPembelian = (value) =>{ 
        setData([...data, value])
    }
    return (
        <div>
            <BreadCrumb link={
                [
                    { name: 'Master' },
                    { name: 'Pembelian' },
                    { name: types }
                ]

            } />

            <FormCreatePembelian callBackPembelian={callBackPembelian}/>
            <KeranjangPembelian keranjangList = {data} />
           
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        baranglist: state.generalReducer.cabang.data
    }
}

export default connect(mapStateToProps, { setBarang, fetchBarangFromBackEndToRedux })(PembelianForm)