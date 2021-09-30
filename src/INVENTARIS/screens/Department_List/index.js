import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import BreadCrumb from '../../components/BreadCrumb'
import Dropdown from '../../components/Dropdown'
import { Link } from 'react-router-dom'
import { deleteDepartment, getDepartmentLimit, getSearchDept } from '../../helpers/requestDept'
import { setDepartment, fetchDepartmentFromBackEndToRedux } from '../../redux'
import GridTable from '@nadavshaar/react-grid-table'

function DepartmentList(props) {
    const { departmentList, fetchDepartmentFromBackEndToRedux, setDepartment } = props;
    const [namaTable, setNamaTable] = useState('Department')
    const [valueLimit, setValueLimit] = useState(5)
    const [searchValue, setSearchValue] = useState('')
    const del = (id) => {
        deleteDepartment({}, id)
        handleFilter(valueLimit)
    }
    const handleFilter = async (limit) => {
        const params = {
            nama_department: searchValue,
            limit: limit
        }
        setValueLimit(limit)
        const res = await getSearchDept(params)
        setDepartment(res)
    }

    const headerColumns = [
        {
            id: 1,
            field: 'kode_department',
            label: 'Kode Department'
        },
        {
            id: 2,
            field: 'nama_department',
            label: 'Nama Department'
        },
        {
            id: 3,
            field: 'status',
            label: 'Status'
        },
    ]

    
    return (
        <div>
            <BreadCrumb link={
                [
                    { name: 'Master' },
                    { name: 'Department' }
                ]
            } />

            <div className="table-container">
                <div className="table-card">
                    <div>
                       
                        <button>
                            <Link to={'/department-create/create'}>Create</Link>
                        </button>

                        <select onChange={(ev) => handleFilter(ev.target.value)}>
                            <option value={5}>Entries 5</option>
                            <option value={10}>Entries 10</option>
                            <option value={15}>Entries 15</option>
                        </select>
                    </div>

                    <input onChange={(ev) => setSearchValue(ev.target.value)} type="text" placeholder={'Cari Nama Department'} style={{ textTransform: 'capitalize' }} />

                    
                    <button onClick={() => handleFilter(valueLimit)}>Cari</button>

                    <GridTable columns={headerColumns} rows={departmentList}/>

                    {/* <table className="table-contain">
                        <thead>
                            <tr>
                                <th>Kode Department</th>
                                <th>Nama Department</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {departmentList?.map((item, index) => { //looping data di redux

                                return (
                                    <tr key={index}>
                                        <td>
                                            <span>{item.kode_department}</span>
                                        </td>
                                        <td>
                                            <span>{item.nama_department}</span>
                                        </td>
                                        <td>
                                            <span>{(item.status === 1 ? 'Aktif' : 'Tidak Aktif')}</span>
                                        </td>
                                        <td>
                                            <button>
                                                <Link to={'/department-edit/edit/' + item.id}>
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

                    </table> */}
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = (state) => {
    return {
        departmentList: state.generalReducer.department.data
    }
}

export default connect(mapStateToProps, { setDepartment, fetchDepartmentFromBackEndToRedux })(DepartmentList)