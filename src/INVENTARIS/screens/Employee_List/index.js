import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import BreadCrumb from '../../components/BreadCrumb'
import Dropdown from '../../components/Dropdown'
import { Link } from 'react-router-dom'
import firebase from '../../../firebaseAPI'
import { setUser, fetchUserFromBackEndToRedux } from '../../redux'
import { deleteUser, getUserLimit, getSearchUser } from '../../helpers/requestEmployee'
import { CgUserList } from 'react-icons/cg'
function EmployeeList(props) {
    const [entries, setEntries] = useState('')
    const { setUser, userList, cabangList, departmentList } = props;
    const [valueLimit, setValueLimit] = useState(5)
    const [cabang, setCabang] = useState('')
    const [department, setDepartment] = useState('')
    const [searchValue, setSearchValue] = useState('')
    
    const del = (id) => {
        deleteUser({}, id)
        handleFilter(valueLimit)
    }

    
    const handleFilter = (limit) => {
        const params = {
            nama_user: searchValue,
            cabang: cabang,
            department: department,
            limit: limit
        }
        console.log(params)
        getSearchUser(params).then((res) => {
            setUser({ data: res.data })
            setValueLimit(limit);
        })
            .catch((err) => {
                console.log(err)
            })
    }



    return (
        <div>
            <BreadCrumb link={
                [
                    { name: 'Master' },
                    { name: 'User' }
                ]
            } />

            <div className="table-container">
                <div className="table-card">
                    <div>
                        <dl>
                            <dt>
                                <label>Cabang</label>
                            </dt>
                            <dd>
                                <select onChange={(ev) => setCabang(ev.target.value)}>
                                    <option value='' >Semua Cabang</option>
                                    {cabangList?.map((item, index) => {
                                        return (
                                            <option value={item.kode}>{item.kode}</option>
                                        )
                                    })}
                                </select>
                            </dd>
                        </dl>
                    </div>

                    <div>
                        <dl>
                            <dt>
                                <label>Department</label>
                            </dt>
                            <dd>
                                <select onChange={(ev) => setDepartment(ev.target.value)}>
                                    <option value=''>Semua Department</option>
                                    {departmentList?.map((item, index) => {
                                        return (
                                            <option value={item.kode_department}>{item.kode_department}</option>
                                        )
                                    })}
                                </select>
                            </dd>
                            <input type='text' placeholder= 'Cari Nama User' onChange={(ev) => setSearchValue(ev.target.value)}></input>

                            <button onClick={() => handleFilter(valueLimit)}>Filter</button>
                        </dl>
                    </div>

                    <div>
                        <select onChange={(ev) => handleFilter(ev.target.value)}>
                            <option value={5}>Entries 5</option>
                            <option value={10}>Entries 10</option>
                            <option value={15}>Entries 15</option>
                        </select>

                        <button>
                            <Link to={'/employee-create/create'}>Create</Link>
                        </button>
                    </div>

                    <table className="table-contain">
                        <thead>
                            <tr>
                                <th>Kode User</th>
                                <th>Nama User</th>
                                <th>Cabang</th>
                                <th>Department</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody> 
                                    {console.log('user list: ', userList)}
                            {/* {userList?.data?.map((item, index) => { //looping data di redux                                
                                return (
                                    <tr>
                                        <td>
                                            <span>{item.kode_user}</span>
                                        </td>
                                        <td>
                                            <span>{item.nama_user}</span>
                                        </td>
                                        <td>
                                            <span>{item.cabang}</span>
                                        </td>
                                        <td>
                                            <span>{item.department}</span>
                                        </td>
                                        <td>
                                            <span>{item.status === 1 ? 'Aktif' : 'Tidak Aktif'}</span>
                                        </td>
                                        <td>
                                            <button>
                                                <Link to={'/employee-edit/edit/' + item.id}>
                                                    Edit
                                                </Link>
                                            </button>

                                            <button onClick={() => del(item.id)} style={{ cursor: 'pointer' }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })} */}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        userList: state.generalReducer.user,
        cabangList: state.generalReducer.cabang.data,
        departmentList: state.generalReducer.department.data
    }
}


export default connect(mapStateToProps, { setUser, fetchUserFromBackEndToRedux })(EmployeeList)