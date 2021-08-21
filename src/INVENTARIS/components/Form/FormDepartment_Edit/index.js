import React, { useEffect, useState } from 'react'
import { } from 'react-redux'
import './styles.scss'
import { getDepartmentDetail } from '../../../helpers/requestDept'

function FormDepartment_Edit(props) {
    const { handleSubmitFirebase, id } = props
     const [nama, setNama] = useState('')
    const [kodeDepartment, setKodeDepartment] = useState('')
    const [checkstatus, setCheckstatus] = useState()
    const [namaTable, setNamaTable] = useState('Department')

    const sentData = async () => {
        const rekapData = {
            id: id,
            nama_department: nama,
            kode_department: kodeDepartment,
            status: checkstatus
        }
        handleSubmitFirebase(rekapData)
      
    }
    const loadData = () => {
        getDepartmentDetail({}, id).then((res) => {
            setKodeDepartment(res.data.kode_department)
            setNama(res.data.nama_department)
            setCheckstatus(res.data.status)
           
        })
    }
    useEffect(() => {
        loadData()

    }, [])


    return (
        <div>
            <dl>
                <dt>
                    <label>Kode Department: {kodeDepartment}</label>
                </dt>
                <dd>
                    <input value={kodeDepartment} onChange={(ev) => setKodeDepartment(ev.target.value)} type="text" placeholder="Kode Department" />
                </dd>
            </dl>
            <dl>
                <dt>
                    <label>Nama Department: {nama}</label>
                </dt>
                <dd>
                    <input value={nama} onChange={(ev) => setNama(ev.target.value)} type="text" placeholder="Nama Department" />
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

export default FormDepartment_Edit;