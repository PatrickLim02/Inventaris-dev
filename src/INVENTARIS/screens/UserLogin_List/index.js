import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import BreadCrumb from '../../components/BreadCrumb'
import Dropdown from '../../components/Dropdown'
import { Link } from 'react-router-dom'
import firebase from '../../../firebaseAPI'
import { deleteUser, getUserLimit, getSearchUser } from '../../helpers/requestEmployee'
import { CgUserList } from 'react-icons/cg'
import {getUserLoginList} from '../../helpers/requestUserLogin'
function UserLoginList(props) {
    const [entries, setEntries] = useState('')
    const [valueLimit, setValueLimit] = useState(5)
    const [cabang, setCabang] = useState('')
    const [department, setDepartment] = useState('')
    const [searchValue, setSearchValue] = useState('')
    const [userLoginList, setUserLoginList] = useState([])
    const del = (id) => {
        deleteUser({}, id)
        handleFilter(valueLimit)
    }

    
    const handleFilter = (limit) => {
        // const params = {
        //     nama_user: searchValue,
        //     cabang: cabang,
        //     department: department,
        //     limit: limit
        // }
        // console.log(params)
        // getSearchUser(params).then((res) => {
        //     setUser({ data: res.data })
        //     setValueLimit(limit);
        // })
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }

    const getUserList = () =>{
        getUserLoginList({}).then((res) =>{
            setUserLoginList(res.data)
            console.log('user list: ', res)
        })
     
    }

    useEffect(()=>{
        getUserList()
    },[])
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
                        <select onChange={(ev) => handleFilter(ev.target.value)}>
                            <option value={5}>Entries 5</option>
                            <option value={10}>Entries 10</option>
                            <option value={15}>Entries 15</option>
                        </select>

                        <button>
                            <Link to={'/userlogin-create/create'}>Create</Link>
                        </button>
                    </div>

                    <table className="table-contain">
                        <thead>
                            <tr>
                                <th>Nama Lengkap</th>
                                <th>Username</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>

                            {userLoginList?.map((item, index) => { //looping data di redux                                
                                return (
                                    <tr>
                                        <td>
                                            <span>{item.nama_lengkap}</span>
                                        </td>
                                        <td>
                                            <span>{item.username}</span>
                                        </td>
                                        <td>
                                            <button>
                                                <Link to={'/userlogin-edit/edit/' + item.id}>
                                                    Edit
                                                </Link>
                                            </button>

                                            <button onClick={() => del(item.id)} style={{ cursor: 'pointer' }}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>

    )
}




export default UserLoginList