import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import firebase from '../../../../firebaseAPI'
import {fetchVendor} from '../../../redux'
function FormVendor_Edit(props) {
    const {handleSubmitFirebase, unique} = props
    const [id, setID] = useState('')
    const [kodeVendor, setKodeVendor] = useState('')
    const [namaVendor, setNamaVendor] = useState('')
    const [alamat, setAlamat] = useState('')
    const [telepon, setTelepon] = useState('')
    const [checkstatus, setCheckstatus] = useState(true)
    const [namaTable, setNamaTable] = useState('Vendor')
    
    const sentData = async () =>{
        const rekapData = {
            id: id,
            kodeVendor: kodeVendor,
            namaVendor: namaVendor,
            alamat: alamat,
            telepon: telepon,
            status: checkstatus
    }
    handleSubmitFirebase(rekapData)
   
    }
    const loadData = () => {
        let databaseFire = firebase.database().ref('/' + namaTable + '/' + unique)
        databaseFire.once('value').then(snapshot => { // snapshot = parameter (nama bebas)
            if (snapshot.val()) { // val = kita hanya mau return value aja, bukan option
                setID(snapshot.val().id)
                setKodeVendor(snapshot.val().kodeVendor)
                setNamaVendor(snapshot.val().namaVendor)
                setAlamat(snapshot.val().alamat)
                setTelepon(snapshot.val().telepon)
                setCheckstatus(snapshot.val().status)
            }
            else {
                console.log('gagal')
            }
        })
    }

    useEffect(() =>{
        loadData()
    },[])

    return (
        <div>                
            <dl>
            <dt>
                <label>Kode Vendor</label>
            </dt>
            <dd>
                <input value={kodeVendor} onChange={(ev) => setKodeVendor(ev.target.value)} type="text" placeholder="Kode Vendor" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Nama Vendor</label>
            </dt>
            <dd>
                <input value={namaVendor} onChange={(ev) => setNamaVendor(ev.target.value)} type="text" placeholder="Nama Vendor" />
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
            <input value={checkstatus} type="checkbox" id="status" name="status" checked={checkstatus} onChange={() => setCheckstatus(!checkstatus)} />
                <label for="status"> {checkstatus === true ? 'Aktif' : 'Tidak Aktif'} </label>
    
            </dd>
        </dl>
    
        <button onClick={sentData}>
            Edit
    
        </button>
    
    </div>
    )
}

export default FormVendor_Edit;