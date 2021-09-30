import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import './styles.scss'
import BreadCrumb from '../../components/BreadCrumb'
import Dropdown from '../../components/Dropdown'
import { Link } from 'react-router-dom'
import firebase from '../../../firebaseAPI'
import { setVendor, fetchVendorFromBackEndToRedux } from '../../redux'
import { Container, ButtonDirects } from '../../components/components'
import { getVendorList, getVendorLimit, deleteVendor, getSearchVendor } from '../../helpers/requestVendor'
import GridTable from '@nadavshaar/react-grid-table'

function VendorList(props) {
    const { vendorList, fetchVendorFromBackEndToRedux, setVendor } = props;
    const [searchValue, setSearchValue] = useState('')
    const [valueLimit, setValueLimit] = useState(5)

    const handleFilter = async (limit) => {
        const params = {
            nama_vendor: searchValue,
            limit: limit
        }
        console.log('params :', params)
        setValueLimit(limit)
        const res = await getSearchVendor(params)
        setVendor(res)
    }

    const delCabang = (id) => {
        deleteVendor({}, id)
        handleFilter(valueLimit)
    }

    const headerColumns = [
        {
            id: 1,
            field: 'Nama Vendor',
            label: 'Nama Vendor'
        },
        {
            id: 2,
            field: 'Alamat',
            label: 'Alamat'
        },
        {
            id: 3,
            field: 'Telepon',
            label: 'Telepon'
        },
        {
            id: 4,
            field: 'Status',
            label: 'Status'
        },
        {
            id: 5,
            field: 'Action',
            label: 'Action'
        },
    ]

    const rowsData = [vendorList?.map((item, index) => {
        <ul key={index}>
            <li>{item.nama_vendor}</li>
            <li>{item.alamt}</li>
            <li>{item.telepon}</li>
            <li>{(item.status === 0? 'Tidak Aktif' : 'Aktif')}</li>
            <li>{item.action}</li>
        </ul>

    })]



    return (
        <Container>
            <BreadCrumb link={
                [
                    { name: 'Master' },
                    { name: 'Cabang' }
                ]
            } />

            <div className="table-container">
                <div className="table-card">
                    <div>
                        <ButtonDirects to={'/vendor-create/create'} backgroundcolor={'orange'} label={'+ Create'} /> <br />

                        <select onChange={(ev) => handleFilter(ev.target.value)}>
                            <option value={5}>Entries 5</option>
                            <option value={10}>Entries 10</option>
                            <option value={15}>Entries 15</option>
                        </select>


                    </div>

                    <input onChange={(ev) => setSearchValue(ev.target.value)} type="text" placeholder={'Cari Nama Vendor'} style={{ textTransform: 'capitalize' }} />

                    <ButtonDirects backgroundcolor={'red'} label={'Cari'} onClick={() => handleFilter(valueLimit)} />



                    <GridTable columns={headerColumns} rows={rowsData}/>

                    <table className="table-contain">
                        <thead>
                            <tr>
                                <th>Nama Vendor</th>
                                <th>Alamat</th>
                                <th>Telepon</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {vendorList?.map((item, index) => { //looping data di redux                            
                                return (
                                    <tr key={index}>
                                        <td>
                                            <span>{item.nama_vendor}</span>
                                        </td>
                                        <td>
                                            <span>{item.alamat}</span>
                                        </td>
                                        <td>
                                            <span>{item.telepon}</span>
                                        </td>
                                        <td>
                                            <span>{(item.status === 0 ? 'Tidak Aktif' : 'Aktif')}</span>
                                        </td>
                                        <td>
                                            <button>
                                                <Link to={'/vendor-edit/edit/' + item.id}>
                                                    Edit
                                                </Link>
                                            </button>

                                            <button onClick={() => delCabang(item.id)} style={{ cursor: 'pointer' }}>
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
        </Container>

    )
}

const mapStateToProps = (state) => {
    return {
        vendorList: state.generalReducer.vendor.data
    }
}

export default connect(mapStateToProps, { setVendor, fetchVendorFromBackEndToRedux })(VendorList)