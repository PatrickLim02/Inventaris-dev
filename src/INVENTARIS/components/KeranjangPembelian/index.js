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
function KeranjangPembelian(props) {
    const {keranjangList} = props
   
    return (
        <Container>
           
            <div className="table-container">
                <div className="table-card">                        
                    <table className="table-contain">
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Nama Barang</th>
                                <th>Quantity</th>
                                <th>Harga</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>

                        <tbody>
                            {keranjangList?.map((item, index) => { //looping data di redux                            
                                return (
                                    <tr key={index}>
                                        <td>
                                            <span>{index + 1}</span>
                                        </td>
                                        <td>
                                            <span>{item.nama_barang}</span>
                                        </td>
                                        <td>
                                            <span>{item.qty}</span>
                                        </td>
                                        <td>
                                            <span>{item.harga}</span>
                                        </td>
                                        <td>
                                            <span>{item.subtotal}</span>
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



export default KeranjangPembelian