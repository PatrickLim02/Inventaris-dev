import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import { setDepartment, setCabang } from '../../../redux'
import firebase from '../../../../firebaseAPI'
function FormUser_Create(props) {
    const { handleSubmitFirebase, cabangList, departmentList } = props
    const [kodeUser, setKodeUser] = useState('')
    const [namaUser, setNamaUser] = useState('')
    const [kodeCabang, setkodeCabang] = useState(' ')
    const [kodeDepartment, setkodeDepartment] = useState('')
    const [checkstatus, setCheckstatus] = useState(true)

    const sentData = async () => {
        const rekapData = {
            kode_user: kodeUser,
            nama_user: namaUser,
            cabang: kodeCabang,
            department: kodeDepartment,
            status: checkstatus === true ? 1 : 0
        }
        handleSubmitFirebase(rekapData)
    }



    return (
        <div>
            <dl>
                <dt>
                    <label>Kode User</label>
                </dt>
                <dd>
                    <input disabled value={kodeCabang + '-' + kodeDepartment} type="text" placeholder="Kode User" onChange={(ev) =>setKodeUser(ev.target.value)}/>
                </dd>
            </dl>


            <dl>
                <dt>
                    <label>Nama User</label>
                </dt>
                <dd>
                    <input onChange={(ev) => setNamaUser(ev.target.value)} type="text" placeholder="Nama User" />
                </dd>
            </dl>
            <dl>
                <dt>
                    <label>Cabang</label>
                </dt>
                <dt>
                    <select style={{ width: '160px', marginLeft: '40px' }} value={kodeCabang} onChange={(ev) => setkodeCabang(ev.target.value)} >
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
                    <select style={{ width: '160px', marginLeft: '40px' }} value={kodeDepartment} onChange={(ev) => setkodeDepartment(ev.target.value)}>
                        <option onChange={(ev) => setKodeUser(kodeUser + ev.target.value)} value=''>--- Pilih Department ---</option>
                        {departmentList?.map((item, index) => {
                            return (
                                <option value={item.kode_department}>{item.kode_department}</option>
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
                    <label for="status"> {checkstatus === true ? 'Aktif' : 'Tidak Aktif'} </label>

                </dd>
            </dl>

            <button onClick={sentData}>
                Create
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
export default connect(mapStateToProps, { setDepartment, setCabang })(FormUser_Create)