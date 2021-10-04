import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import BreadCrumb from '../../components/BreadCrumb'
import Dropdown from '../../components/Dropdown'
import { Link } from 'react-router-dom'
import firebase from '../../../firebaseAPI'
import { setBarang, fetchBarangFromBackEndToRedux } from '../../redux'
import { getCabang } from '../../helpers/requestFirebase'
import { Container, ButtonDirects } from '../../components/components'
import { getPembelianList, getPembelianLimit, deletePembelian, getSearchPembelian, getPembelianPagination } from '../../helpers/request_pembelian'
import { paginationConverter } from '../../helpers/general'
import moment from 'moment'
import ButtonAdd from '../../components/ButtonAdd'
function Pembelian_List(props) {
    const [pembelianList, setPembelianList] = useState([])
    const [searchValue, setSearchValue] = useState('')
    const [valueLimit, setValueLimit] = useState(10)
    const [totalPage, setTotalPage] = useState()
    const [currentPage, setCurrentPage] = useState(1)
    const [pageNumberLimit, setPageNumberLimit] = useState(1)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState(0)
    const [firstPage, setFirstPage] = useState(1)
    const [searchOption, setSearchOption] = useState('nama_vendor')
    const loadData = () => {
        getPembelianList({}).then((res) => {
            console.log('pembelian list:', res)
            setPembelianList(res.data)
        })
            .catch((err) => {
                console.log(err)
            })
    }
    const handleFilter = async (limit) => {
        var params = {}
        if (searchOption === 'nama_vendor') {
            params = {
                nama_vendor: searchValue,
                limit: limit
            }
        }
        else {
            params = {
                nama_user: searchValue,
                limit: limit
            }
        }
        setValueLimit(limit)
        await getPembelianList(params).then((res) => {
            setPembelianList(res.data)
        })
            .catch((err) => {
                console.log(err)
            })

        // setPembelianList(res.data)
    }

    const delCabang = (id) => {
        deletePembelian({}, id)
        handleFilter(valueLimit)
    }
    const paginationFetch = (item) => {
        const params = {
            page: item
        }
        getPembelianPagination(params).then((res) => {
            setPembelianList(res)
        })
            .catch((err) => {
                console.log('Failed to request data cabang : ', err)
            })
    }

    const getPagination = () => {
        getPembelianPagination({ page: 1 }).then((res) => {
            setTotalPage(paginationConverter(res.totalRows))

        })
            .catch((err) => {
                console.log('Failed to request data cabang : ', err)
            })
    }
    useEffect(() => {
        getPagination()
        loadData()
    }, [])

    const renderPagination = () => {
        var total = []
        for (var i = 1; i <= totalPage; i++) {
            total = [...total, i] // menambahkan array baru namun array yang lama tidak dihilangkan
        }
        return total
    }

    const handleButtonPage = (page) => {
        setCurrentPage(page)
        paginationFetch(page)
    }
    const nextButton = () => {
        setCurrentPage(currentPage + 1)
        paginationFetch(currentPage + 1)
        if (currentPage + 1 > maxPageNumberLimit) {
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
        }
    }
    const prevButton = () => {
        paginationFetch(currentPage - 1)
        setCurrentPage(currentPage - 1)
        if ((currentPage - 1) % pageNumberLimit == 0) {
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
        }
    }
    return (
        <Container>
            <BreadCrumb link={
                [
                    { name: 'Transaksi' },
                    { name: 'Pembelian' }
                ]
            } />
            <ButtonAdd to={'/pembelian-create/create'} />
            <div className="table-container">
                <div className="table-card">
                    <div>
                        <select onChange={(ev) => handleFilter(ev.target.value)}>
                            <option value={10}>Entries 10</option>
                            <option value={20}>Entries 20</option>
                            <option value={30}>Entries 30</option>
                        </select>


                    </div>
                    <select onChange={(ev) => setSearchOption(ev.target.value)}>
                        <option value={'nama_vendor'}>Nama Vendor</option>
                        <option value={'nama_user'}>Nama Employee</option>

                    </select>
                    <input onChange={(ev) => setSearchValue(ev.target.value)} type="text" placeholder={'Cari Nama Vendor'} style={{ textTransform: 'capitalize' }} />

                    <ButtonDirects backgroundcolor={'red'} label={'Cari'} onClick={() => handleFilter(valueLimit)} />

                    <table className="table-contain">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Vendor</th>
                                <th>Nama Employee</th>
                                <th>Tanggal Pembelian</th>
                                <th>Total Pembelian</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {pembelianList?.map((item, index) => { //looping data di redux                            
                                return (
                                    <tr key={index}>
                                        <td>
                                            <span>{index + 1}</span>
                                        </td>
                                        <td>
                                            <span>{item.nama_vendor}</span>
                                        </td>
                                        <td>
                                            <span>{item.nama_user}</span>
                                        </td>
                                        <td>
                                            <span>{moment(item.tgl_pembelian).format('DD-MM-YYYY')}</span>
                                        </td>
                                        <td>
                                            <span>{item.total_pembelian}</span>
                                        </td>

                                        <td>
                                            <button>
                                                <Link to={'/barang-edit/edit/' + item.id}>
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
                <div className="pagination-section">
                    <button onClick={prevButton} disabled={currentPage === firstPage ? true : false}> Prev </button>
                    {renderPagination()?.map((page) => {
                        if (page < maxPageNumberLimit + 1 && page > minPageNumberLimit) {
                            return (
                                <button className={`btn-page ${currentPage === page ? 'btn-active' : 'btn-unactive'}`} onClick={() => handleButtonPage(page)}>
                                    {page}
                                </button>
                            )
                        }
                        else {
                            return null
                        }
                    })}
                    <button onClick={nextButton} disabled={currentPage === totalPage ? true : false}> Next </button>
                </div>

            </div>
        </Container>

    )
}



export default Pembelian_List