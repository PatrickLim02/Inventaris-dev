import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import firebase from '../../../../firebaseAPI'
import {getUserLoginDetail} from '../../../helpers/requestUserLogin'
function FormEditUserLogin(props) {
    const {handleSubmitFirebase, id} = props
    const [namaLengkap, setNamaLengkap] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
  
    
    const sentData = async () =>{ // diusahakan sama dengan nama kolom di database
        const rekapData = {
        id: id,
        nama_lengkap: namaLengkap,
        username: username,
        password: password,
    }
    handleSubmitFirebase(rekapData)
    }
    const loadData = () => {           
        getUserLoginDetail({}, id).then((res) => { //harus sama dengan kolom di database
            setNamaLengkap(res.data.nama_lengkap)
            setUsername(res.data.username)
            setPassword(res.data.password)
           })
    }

    useEffect(() =>{
        loadData()
    },[])

    return (
        <div>                
            <dl>
            <dt>
                <label>Nama Lengkap</label>
            </dt>
            <dd>
                <input value={namaLengkap} onChange={(ev) => setNamaLengkap(ev.target.value)} type="text" placeholder="Nama Lengkap" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Username</label>
            </dt>
            <dd>
                <input value={username} onChange={(ev) => setUsername(ev.target.value)} type="text" placeholder="Username" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Password</label>
            </dt>
            <dd>
                <input value={password} onChange={(ev) => setPassword(ev.target.value)} type="text" placeholder="Password" />
            </dd>
        </dl>
    
    
        <button onClick={sentData}>
            Edit
    
        </button>
    
    </div>
    )
}

export default FormEditUserLogin;