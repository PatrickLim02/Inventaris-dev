import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import firebase from '../../../../firebaseAPI'
import {getCabangDetail} from '../../../helpers/requestCabang'
function FormEditCabang(props) {
    const {handleSubmitFirebase, id} = props
    const [kodeCabang, setKodeCabang] = useState('')
    const [namaCabang, setNamaCabang] = useState('')
    const [alamat, setAlamat] = useState('')
    const [telepon, setTelepon] = useState('')
    const [checkstatus, setCheckstatus] = useState()
    const [namaTable, setNamaTable] = useState('Cabang')
    
    const sentData = async () =>{ // diusahakan sama dengan nama kolom di database
        const rekapData = {
        id: id,
        kode: kodeCabang,
        nama_cabang: namaCabang,
        alamat: alamat,
        telepon: telepon,
        status: checkstatus
    }
    handleSubmitFirebase(rekapData)
    }
    const loadData = () => {           
           getCabangDetail({}, id).then((res) => { //harus sama dengan kolom di database
            setKodeCabang(res.data.kode)
            setNamaCabang(res.data.nama_cabang)
            setAlamat(res.data.alamat)
            setTelepon(res.data.telepon)
            setCheckstatus(res.data.status)
           })
    }

    useEffect(() =>{
        loadData()
    },[])

    return (
        <div>                
            <dl>
            <dt>
                <label>Kode Cabang</label>
            </dt>
            <dd>
                <input value={kodeCabang} onChange={(ev) => setKodeCabang(ev.target.value)} type="text" placeholder="Kode Cabang" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Nama</label>
            </dt>
            <dd>
                <input value={namaCabang} onChange={(ev) => setNamaCabang(ev.target.value)} type="text" placeholder="Nama" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Alamat</label>
            </dt>
            <dd>
                <input value={alamat} onChange={(ev) => setAlamat(ev.target.value)} type="text" placeholder="Alamat" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Telepon</label>
            </dt>
            <dd>
                <input value={telepon} onChange={(ev) => setTelepon(ev.target.value)} type="number" placeholder="Telepon" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Status</label>
            </dt>
            <dd>
            <input value={checkstatus} type="checkbox" id="status" name="status" checked={checkstatus === 0 ? false : true} onChange={() => setCheckstatus(checkstatus === 0 ? 1:0)} />
                <label for="status"> {checkstatus === 0 ? 'Tidak Aktif' : 'Aktif'} </label>
    
            </dd>
          
        </dl>
    
        <button onClick={sentData}>
            Edit
    
        </button>
    
    </div>
    )
}

export default FormEditCabang;