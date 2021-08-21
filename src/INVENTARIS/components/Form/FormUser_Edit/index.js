import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import {getUserDetail} from '../../../helpers/requestUser'
import { setDepartment, setCabang } from '../../../redux'
function FormDepartment_Edit(props) {
    const {id, departmentList, cabangList, handleSubmitFirebase} = props
    const [kodeUser, setKodeUser] = useState('')
    const [namaUser, setNamaUser] = useState('')
    const [namaCabang, setNamaCabang] = useState('')
    const [namaDepartment, setNamaDepartment] = useState('')
    const [checkstatus, setCheckstatus] = useState('true')
    const [namaTable, setNamaTable] = useState('User')
    
    const sentData = async () =>{
        const rekapData = {
            id: id,
            kode_user: kodeUser,
            nama_user: namaUser,
            cabang: namaCabang,
            department: namaDepartment,
            status: checkstatus
    }
    handleSubmitFirebase(rekapData)
    }

    const loadData = () => {
            getUserDetail({}, id).then((res)=>{            
                setKodeUser(res.data.kode_user)
                setNamaUser(res.data.nama_user)              
                setNamaCabang(res.data.cabang )
                setNamaDepartment(res.data.department )
                setCheckstatus(res.data.status )
            })
        console.log('id: ', id)       
            
    }
  
    useEffect(() =>{
        loadData()
       
    },[])

   
    return (
        <div>                
            <dl>
                <dt>
                    <label>Kode User</label>
                </dt>
                <dd>
                    <input value={kodeUser} onChange={(ev) => setKodeUser(ev.target.value)} type="text" placeholder="Kode User" />
                </dd>
            </dl>


            <dl>
                <dt>
                    <label>Nama User</label>
                </dt>
                <dd>
                    <input value={namaUser} onChange={(ev) => setNamaUser(ev.target.value)} type="text" placeholder="Nama User" />
                </dd>
            </dl>
            <dl>
                <dt>
                    <label>Cabang</label>
                </dt>
                <dt>
                    <select style={{width: '160px', marginLeft: '40px'}} value={namaCabang} onChange={(ev) => setNamaCabang(ev.target.value)}>
                    <option value='' >--- Pilih Cabang ---</option>
                        {cabangList?.map((item, index) => {
                            return (
                                <option value={item.kode}>{item.kode}</option>
                            )
                        })}

                    </select>
                </dt>
            </dl>

            <dl>
                <dt>
                    <label>Department</label>
                </dt>
                <dt>
                    <select style={{width: '160px', marginLeft: '40px'}} value={namaDepartment} onChange={(ev) => setNamaDepartment(ev.target.value)}>
                    <option value=''>--- Pilih Department ---</option>
                        {departmentList?.map((item, index) => {
                            return (
                                <option value={ item.kode_department}>{item.kode_department}</option>
                            )
                        })}

                    </select>
                </dt>
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
            Edit
    
        </button>
    
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        departmentList: state.generalReducer.department.data,
        cabangList: state.generalReducer.cabang.data
    }
}

export default connect(mapStateToProps, {setDepartment, setCabang}) (FormDepartment_Edit);