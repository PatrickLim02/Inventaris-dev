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
import ButtonCreate from '../../components/ButtonCreate'
function DepartmentList(props) {
    const { departmentList, fetchDepartmentFromBackEndToRedux, setDepartment } = props;

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
        setEntries(limit)
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
            minWidth: 150,
            sortable: true,

        },
        {
            field: 'nama_department',
            headerName: 'Nama Department',
            minWidth: 150,
            sortable: true
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 100,
            sortable: true
        },
        {
            field: 'id',
            headerName: 'Action',
            minWidth: 100,
            cellRendererFramework: (parameter) =>
                <div>
                    <button>
                        <Link to={'/department-edit/edit/' + parameter.value}>
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

        // filter: true,
        flex: 1,
        resizable: true
    }

    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

    return (
        <div
            style={{ width: "100%", height: "100%", position: 'relative' }}>
            <div>
                <BreadCrumb link={
                    [
                        { name: 'Master' },
                        { name: 'Department' }
                    ]
                } />
                <ButtonCreate to={'/cabang-create/create'} />
            </div>

            <div style={{width: '98%', height: '40px', marginLeft: '1%', marginRight: '1%', position: 'relative' }}>
                <select onChange={(ev) => handleFilter(ev.target.value)} style={{ position: 'absolute', top: '15px', left: '0px' }}>
                    <option value={10}>Entries 10</option>
                    <option value={20}>Entries 20</option>
                    <option value={35}>Entries 35</option>
                </select>

                <input onChange={(ev) => setSearchValue(ev.target.value)} type="text" placeholder={'Cari Nama Department'}
                    style={{ textTransform: 'capitalize', position: 'absolute', top: '15px', right: '35px' }} />

                <button onClick={() => handleFilter(entries)} style={{ position: 'absolute', top: '15px', right: '1px'}}>Cari</button>
            </div>



            <div id="myGrid"
                style={{ width: "98%", height: "75%", marginLeft: '1%', marginRight: '1%', marginTop: '5px', borderRadius: '20px' }}
                className="ag-theme-alpine" >
                <AgGridReact
                    style={{
                        fontSize: '5px'
                    }}
                    onFirstDataRendered={onFirstDataRendered}
                    columnDefs={columns}
                    rowData={departmentList}
                    pagination={true}
                    paginationPageSize={entries}
                    defaultColDef={defaultColDef}
                    rowHeight={40}
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