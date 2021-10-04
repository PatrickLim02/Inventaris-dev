import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
import Dropdown from '../../components/Dropdown'
import { Link } from 'react-router-dom'
import { deleteDepartment, getDepartmentLimit, getSearchDept } from '../../helpers/requestDept'
import { setDepartment, fetchDepartmentFromBackEndToRedux } from '../../redux'
import { AgGridReact, AgGridColumn } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function DepartmentList(props) {
    const { departmentList, fetchDepartmentFromBackEndToRedux, setDepartment } = props;
    const [valueLimit, setValueLimit] = useState(5)
    const [searchValue, setSearchValue] = useState('')
    const [entries, setEntries] = useState(10)
    const del = (id) => {
        window.location.reload()
        deleteDepartment({}, id)
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
    const actionButton = (params) => {

    }
    const columns = [
        {
            field: 'id',
            headerName: 'ID',
            hide: true,
        },
        {
            field: 'kode_department',
            headerName: 'Kode Department',
            minWidth: 150
        },
        {
            field: 'nama_department',
            headerName: 'Nama Department',
            minWidth:150
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth:100
        },
        {
            field: 'id',
            headerName: 'Action',
            minWidth:100,
            cellRendererFramework: (parameter) =>
                <div>
                    <button>
                        <Link to={'/employee-edit/edit/' + parameter.value}>
                            Edit
                        </Link>
                    </button>

                    <button onClick={() => del(parameter.value)}
                    >
                        Delete
                    </button>
                </div >
        }
    ]

    const defaultColDef = {
        sortable: true,
        // filter: true,
        flex: 1,
        resizable: true
    }

    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
      };

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

            <select onChange={(ev) => setEntries(ev.target.value)}>
                <option value={10}>Entries 10</option>
                <option value={20}>Entries 20</option>
                <option value={35}>Entries 30</option>
            </select>
           
                <div id="myGrid"
                style={{width: "100%", height: "500px"}}
                className="ag-theme-alpine" >
                    <AgGridReact
                    onFirstDataRendered={onFirstDataRendered}
                        columnDefs={columns}
                        rowData={departmentList}
                        pagination={true}
                        paginationPageSize={entries}
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