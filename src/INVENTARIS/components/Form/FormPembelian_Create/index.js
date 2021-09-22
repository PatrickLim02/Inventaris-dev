import React, { useState } from 'react'
import {  } from 'react-redux'
import {styles} from './style.js'

function FormPembelian_Create(props) {
    const {handleSubmitFirebase} = props
    const [namaVendor, setNamaVendor] = useState('')
    const [namaEmployee, setNamaEmployee] = useState('')
    const [tglPembelian, setTglPembelian] = useState('')
    const [grandTotal, setGrandTotal] = useState(0)

    
    const sentData = async () =>{ //Harus sama dengan kolom dengan di node js / database
        const rekapData = {
        nama_vendor: namaVendor,
        nama_employee: namaEmployee,
        tglPembelian: tglPembelian,
        grandTotal: grandTotal,
      
    }
    handleSubmitFirebase(rekapData)
    }
  
    return (
        <div>                
         
        <dl>
            <dt>
                <label>Nama Vendor</label>
                <button>...</button>
            </dt>
            <dd>
                <input onChange={(ev) => setNamaVendor(ev.target.value)} type="text" placeholder="Nama Vendor" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Nama Employee</label>
            </dt>
            <dd>
                <input onChange={(ev) => setNamaEmployee(ev.target.value)} type="text" placeholder="Nama Employee" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Tanggal Pembelian</label>
            </dt>
            <dd>
                <input onChange={(ev) => setTglPembelian(ev.target.value)} type="text" placeholder="Tanggal Pembelian" />
            </dd>
        </dl>
        <dl>
            <dt>
                <label>Grand Total</label>
            </dt>
            <dd>
                <input onChange={(ev) => setGrandTotal(ev.target.value)} type="number" placeholder="Grand Total" />
            </dd>
        </dl>      

       

        <button onClick={sentData}>
            Create
        </button>
    
    </div>
    )
}

export default FormPembelian_Create;