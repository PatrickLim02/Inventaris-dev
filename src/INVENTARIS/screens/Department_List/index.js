import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
import Dropdown from '../../components/Dropdown'
import { Link } from 'react-router-dom'
import { deleteDepartment, getDepartmentLimit, getSearchDept, getDeptList } from '../../helpers/requestDept'
import {getd, setDepartment, fetchDepartmentFromBackEndToRedux } from '../../redux'
import { AgGridReact, AgGridColumn } from 'ag-grid-react'
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import { Breadcrumbs } from '@mui/material';
import SearcBar from '../../components/SearchBar'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BreadcrumbsComp from '../../components/Breadcrumbs'
import ButtonSearch from '../../components/ButtonSearch'
import CBEntries from '../../components/CBEntries'
import TextFieldSearch from '../../components/TextFieldSearch'
import ButtonCreate from '../../components/ButtonCreate'

// Import MUI Library
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

// Icon
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

function DepartmentList(props) {
    const { departmentList, fetchDepartmentFromBackEndToRedux, setDepartment, classes } = props;
    const [searchValue, setSearchValue] = useState('')
    const [entries, setEntries] = useState(10)
    const [deptList, setDeptList] = useState()

     const del = (id) => {
   // window.location.reload()
   
        deleteDepartment({}, id)
        fetchDepartmentFromBackEndToRedux()
       
      

    }
    const handleFilter = async (limit) => {
        const params = {
            nama_department: searchValue,
        }
        const res = await getSearchDept(params)
        setDepartment(res)
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
                    <Link to={'/department-edit/edit/' + parameter.value}>
                        <IconButton color="primary">
                            <EditIcon style={{fontSize: '25px'}}/>
                        </IconButton>
                    </Link>

                    <IconButton color="error"
                        onClick={() => del(parameter.value)}>
                        <DeleteForeverIcon style={{ fontSize: '25px' }} />
                    </IconButton>
                </div >
        }
    ]

    const gridList = () =>{

    }
    
    const defaultColDef = {
        // filter: true,
        flex: 1,
        resizable: true
    }

    const onFirstDataRendered = (params) => {
        params.api.sizeColumnsToFit();
    };

    const handleChange = (event) => {
        setEntries(event.target.value);
    };


    return (
        <div style={{ width: "100%", height: "100%", position: 'relative' }}>
            <div>
                <BreadcrumbsComp menuBreadcrumbs={
                    [
                        <p>Master</p>,
                        <p>Department</p>
                    ]
                } />
                {/* <ButtonCreate to={'/cabang-create/create'} /> */}
                <Link to={'/department-create/create'}>
                        <ButtonCreate />
                </Link>

            </div>

            <div style={{ height: '40px', positon: 'relative' }}>

                <CBEntries
                  value={entries}
                  onChange={handleChange}
                  />

                <TextFieldSearch
                onChange ={(ev) => setSearchValue(ev.target.value)} 
                label="Cari Nama Department"/>
                <ButtonSearch onClick={() => handleFilter(entries)}/>
                

               
            </div>



            <div id="myGrid"
                style={{ height: "65%", marginLeft: '10px', marginRight: '27px', marginTop: '5px', borderRadius: '20px' }}
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
        departmentList: state?.generalReducer?.department?.data
    }
}

export default connect(mapStateToProps, { setDepartment, fetchDepartmentFromBackEndToRedux })(DepartmentList)