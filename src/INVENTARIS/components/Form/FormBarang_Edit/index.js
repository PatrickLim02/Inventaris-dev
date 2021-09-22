import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import firebase from '../../../../firebaseAPI'
import {getBarangDetail} from '../../../helpers/requestBarang'
function FormBarang_Edit(props) {
    const {handleSubmitFirebase, id} = props
    const [namaBarang, setNamaBarang] = useState('')
    const [satuan, setSatuan] = useState('')
   
    
    const sentData = async () =>{ // diusahakan sama dengan nama kolom di database
        const rekapData = {
        id: id,
        nama_barang: namaBarang,
        satuan: satuan,
    }
    handleSubmitFirebase(rekapData)
    }
    const loadData = () => {           
        getBarangDetail({}, id).then((res) => { //harus sama dengan kolom di database
            setNamaBarang(res.data.nama_barang)
            setSatuan(res.data.satuan)
           })
    }

    useEffect(() =>{
        loadData()
    },[])

    return (
        <div>                
            <dl>
            <dt>
                <label>Nama Barang</label>
            </dt>
            <dd>
                <input value={namaBarang} onChange={(ev) => setNamaBarang(ev.target.value)} type="text" placeholder="Nama Barang" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Satuan</label>
            </dt>
            <dd>
                <input value={satuan} onChange={(ev) => setSatuan(ev.target.value)} type="text" placeholder="Satuan" />
            </dd>
        </dl>
    
        <button onClick={sentData}>
            Edit
    
        </button>
    
    </div>
    )
}

export default FormBarang_Edit;