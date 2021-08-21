import React, { useState } from 'react'
import {} from 'react-redux'
import './styles.scss'

function FormDepartment_Create(props) {
    const {handleSubmitFirebase} = props
    const [nama, setNama] = useState('')
    const [kodeDepartment, setKodeDepartment] = useState('')
    const [checkstatus, setCheckstatus] = useState(true)

    const sentData = async () =>{
        const rekapData = {
        nama_department: nama,  
        kode_department : kodeDepartment,
        status: checkstatus === true? 1 : 0
    }
    handleSubmitFirebase(rekapData)
    }
    return (
        <div>                
        <dl>
            <dt>
                <label>Kode Department</label>
            </dt>
            <dd>
                <input onChange={(ev) => setKodeDepartment(ev.target.value)} type="text" placeholder="Kode Department" />
            </dd>
        </dl>

        <dl>
            <dt>
                <label>Nama Department</label>
            </dt>
            <dd>
                <input onChange={(ev) => setNama(ev.target.value)} type="text" placeholder="Nama Department" />
            </dd>
        </dl>
      
        <dl>
            <dt>
                <label>Status</label>
            </dt>
            <dd>
                <input type="checkbox" id="status" name="status" value={checkstatus} checked={checkstatus} onChange={() => setCheckstatus(!checkstatus)} />
                <label for="status"> {checkstatus ? 'Aktif' : 'Tidak Aktif'} </label>
    
            </dd>
        </dl>
    
        <button onClick={sentData}>
            Create
        </button>
    
    </div>
    )
}

export default FormDepartment_Create;