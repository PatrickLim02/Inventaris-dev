import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router'
import './styles.scss'
import BreadCrumb from '../../components/BreadCrumb'
import Dropdown from '../../components/Dropdown'
import { Link } from 'react-router-dom'
import firebase from '../../../firebaseAPI'
import { setCabang, fetchCabangFromBackEndToRedux } from '../../redux'
import { getCabang } from '../../helpers/requestFirebase'
import { Container, ButtonDirects } from '../../components/components'
import { getCabangList, getCabangLimit, deleteCabang, getSearchCabang, getCabangPagination } from '../../helpers/requestCabang'
import { paginationConverter } from '../../helpers/general'

function CabangList(props) {
    const history = useHistory()
    const { cabangList, fetchCabangFromBackEndToRedux, setCabang } = props;
    const [searchValue, setSearchValue] = useState('')
    const [valueLimit, setValueLimit] = useState(10)
    const [totalPage, setTotalPage] = useState()
    const [idx, setIdx] = useState(1)
    const handleFilter = async (limit) => {
        const params = {
            nama_cabang: searchValue,
            limit: limit
        }
        setValueLimit(limit)
        const res = await getSearchCabang(params)
        setCabang(res)

    }

    const delCabang = (id) => {
        deleteCabang({}, id)
        handleFilter(valueLimit)
    }
    const paginationFetch = (item) => {
        const params = {
            page: item
        }
        getCabangPagination(params).then((res) => {
            setCabang(res)
        })
            .catch((err) => {
                console.log('Failed to request data cabang : ', err)
            })
    }
    useEffect(() => {
        getCabangPagination({ page: 1 }).then((res) => {
            setTotalPage(paginationConverter(res.totalRows))
         
        })
            .catch((err) => {
                console.log('Failed to request data cabang : ', err)
            })
    }, [])

    const renderPagination = () => {
        var total = []
        for (var i = 1; i <= totalPage; i++) {
            total = [...total, i] // menambahkan array baru namun array yang lama tidak dihilangkan
        }
        return total

    }
  
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
                        <ButtonDirects to={'/cabang-create/create'} backgroundcolor={'orange'} label={'+ Create'} /> <br />

                        <select onChange={(ev) => handleFilter(ev.target.value)}>
                            <option value={10}>Entries 10</option>
                            <option value={20}>Entries 20</option>
                            <option value={30}>Entries 30</option>
                        </select>


                    </div>

                    <input onChange={(ev) => setSearchValue(ev.target.value)} type="text" placeholder={'Cari Nama Cabang'} style={{ textTransform: 'capitalize' }} />

                    <ButtonDirects backgroundcolor={'red'} label={'Cari'} onClick={() => handleFilter(valueLimit)} />

                    <table className="table-contain">
                        <thead>
                            <tr>
                                <th>Kode</th>
                                <th>Nama</th>
                                <th>Alamat</th>
                                <th>Telepon</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>

                        <tbody>
                            {cabangList?.map((item, index) => { //looping data di redux                            
                                return (
                                    <tr key={index}>
                                        <td>
                                            <span>{item.kode}</span>
                                        </td>
                                        <td>
                                            <span>{item.nama_cabang}</span>
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
                                                <Link to={'/cabang-edit/edit/' + item.id}>
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
                {renderPagination().map((item) => {
                    return (
                        <button className={`btn-page ${item === idx ? 'btn-active' : 'btn-unactive'}`} onClick={() => {
                            setIdx(item)
                            paginationFetch(item)
                          
                        }}>
                            {item}
                        </button>
                    )
                })}
            </div>
        </Container>

    )
}

const mapStateToProps = (state) => {
    return {
        cabangList: state.generalReducer.cabang.data
    }
}

export default connect(mapStateToProps, { setCabang, fetchCabangFromBackEndToRedux })(CabangList)