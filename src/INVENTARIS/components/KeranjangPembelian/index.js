import React, { useState, useEffect } from 'react'
import { Container, ButtonDirects } from '../../components/components'

import {createPembelian} from '../../helpers/request_pembelian'

function KeranjangPembelian(props) {
    const {keranjangList, reload} = props
    
    const  handleSubmit = async() =>{
        window.location.reload()
        const response = await createPembelian(keranjangList)    
    }   
    return (
        <Container>
           <button onClick={handleSubmit}>Save</button>

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