import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import BreadCrumb from '../../components/BreadCrumb'
import Dropdown from '../../components/Dropdown'
import { Link } from 'react-router-dom'
import { deleteDepartment, getDepartmentLimit, getSearchDept } from '../../helpers/requestDept'
import { setDepartment, fetchDepartmentFromBackEndToRedux } from '../../redux'
import {AgGridReact, AgGridColumn} from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function DepartmentList(props) {
    const { departmentList, fetchDepartmentFromBackEndToRedux, setDepartment } = props;
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

    const columns = [
        {
            field: 'kode_department',
            headerName: 'Kode Department',
        

        },
        {
            field: 'nama_department',
            headerName: 'Nama Department'
        },
        {
            field: 'status',
            headerName: 'Status'
        },
    ]

    const defaultColDef = {
        sortable: true,
        filter: true,
        floatingFilter: true,
        flex: 1
    }

 
    return (
        <div>
            <BreadCrumb link={
                [
                    { name: 'Master' },
                    { name: 'Department' }
                ]
            } />

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
            <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
            
                <AgGridReact
                columnDefs={columns}
                rowData={departmentList}
                pagination={true}
                defaultColDef={defaultColDef}
                />               
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