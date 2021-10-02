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
    const [keranjang, setKeranjang] = useState([])

    const callBackPembelian = (value) =>{ 
        console.log('value: ', value)
        console.log('data: ', keranjang)
      if(keranjang?.length > 0){ // kalau keranjang sudah berisi
        if(value.id_vendor === keranjang[keranjang?.length - 1]?.id_vendor && value.id_employee === keranjang[keranjang?.length - 1]?.id_employee && value.tgl_pembelian === keranjang[keranjang?.length -1]?.tgl_pembelian){
            setKeranjang([...keranjang, value])
        }
        else{
            alert('Vendor / Employee / Tgl Pembelian Tidak Boleh Berbeda')
        } 
      }
      else{
        setKeranjang([...keranjang, value])
      }
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
            <KeranjangPembelian keranjangList = {keranjang} />
           
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        baranglist: state.generalReducer.cabang.data
    }
}

export default connect(mapStateToProps, { setBarang, fetchBarangFromBackEndToRedux })(PembelianForm)