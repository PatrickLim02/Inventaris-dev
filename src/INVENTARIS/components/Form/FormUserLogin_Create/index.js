import React, { useState } from 'react'
import {  } from 'react-redux'
import './styles.scss'

function FormCreateCabang(props) {
    const {handleSubmitFirebase} = props
    const [namaLengkap, setNamaLengkap] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    
    const sentData = async () =>{ //Harus sama dengan kolom dengan di node js / database
        const rekapData = {
        nama_lengkap: namaLengkap,
        username: username,
        password: password
    }
    handleSubmitFirebase(rekapData)
    }
  
    return (
        <div>                
         
        <dl>
            <dt>
                <label>Nama Lengkap</label>
            </dt>
            <dd>
                <input onChange={(ev) => setNamaLengkap(ev.target.value)} type="text" placeholder="Nama Lengkap" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Username</label>
            </dt>
            <dd>
                <input onChange={(ev) => setUsername(ev.target.value)} type="text" placeholder="Username" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Password</label>
            </dt>
            <dd>
                <input onChange={(ev) => setPassword(ev.target.value)} type="text" placeholder="Password" />
            </dd>
        </dl>
              

        <button onClick={sentData}>
            Create
        </button>
    
    </div>
    )
}

export default FormCreateCabang;