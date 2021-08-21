import React, { useState } from 'react'
import {  } from 'react-redux'
import './styles.scss'

function FormCreateCabang(props) {
    const {handleSubmitFirebase} = props
    const [cabang, setCabang] = useState('')
    const [nama, setNama] = useState('')
    const [alamat, setAlamat] = useState('')
    const [telepon, setTelepon] = useState('')
    const [checkstatus, setCheckstatus] = useState(true)
    
    const sentData = async () =>{ //Harus sama dengan kolom dengan di node js / database
        const rekapData = {
        kode: cabang,
        nama_cabang: nama,
        alamat: alamat,
        telepon: telepon,
        status: checkstatus === true ? 1 : 0
    }
    handleSubmitFirebase(rekapData)
    }
  
    return (
        <div>                
         
        <dl>
            <dt>
                <label>Kode Cabang</label>
            </dt>
            <dd>
                <input onChange={(ev) => setCabang(ev.target.value)} type="text" placeholder="Kode Cabang" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Nama Cabang</label>
            </dt>
            <dd>
                <input onChange={(ev) => setNama(ev.target.value)} type="text" placeholder="Nama Cabang" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Alamat</label>
            </dt>
            <dd>
                <input onChange={(ev) => setAlamat(ev.target.value)} type="text" placeholder="Alamat" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Telepon</label>
            </dt>
            <dd>
                <input onChange={(ev) => setTelepon(ev.target.value)} type="number" placeholder="Telepon" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Status</label>
            </dt>
            <dd>
                <input type="checkbox" id="status" name="status" value={checkstatus} checked={checkstatus} onChange={() => setCheckstatus(!checkstatus)}/>
                <label for="status"> {checkstatus === true ? 'Aktif' : 'Tidak Aktif'} </label>
                
            </dd>
          
        </dl>

       

        <button onClick={sentData}>
            Create
        </button>
    
    </div>
    )
}

export default FormCreateCabang;