import React, { useState } from 'react'
import {  } from 'react-redux'
import './styles.scss'

function FormCreateBarang(props) {
    const {handleSubmitFirebase} = props
    const [namaBarang, setNamaBarang] = useState('')
    const [satuan, setSatuan] = useState('')
   
    
    const sentData = async () =>{ //Harus sama dengan kolom dengan di node js / database
        const rekapData = {
        nama_cabang: namaBarang,
        satuan: satuan,
     
    }
    handleSubmitFirebase(rekapData)
    }
  
    return (
        <div>                
         
        <dl>
            <dt>
                <label>Nama Barang</label>
            </dt>
            <dd>
                <input onChange={(ev) => setNamaBarang(ev.target.value)} type="text" placeholder="Nama Barang" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Satuan</label>
            </dt>
            <dd>
                <input onChange={(ev) => setSatuan(ev.target.value)} type="text" placeholder="Satuan" />
            </dd>
        </dl>
        

       

        <button onClick={sentData}>
            Create
        </button>
    
    </div>
    )
}

export default FormCreateBarang;