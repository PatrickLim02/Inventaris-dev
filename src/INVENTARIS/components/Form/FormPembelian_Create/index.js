import React, { useState } from 'react'
import { connect } from 'react-redux'
import { retrieveVendorItem } from '../../../helpers/general'
import { setVendor, setUser, setBarang } from '../../../redux'
function FormPembelian_Create(props) {
    const { setVendor, selectedVendor, setUser, selectedUser, setBarang, selectedBarang, callBackPembelian } = props
    const { handleSubmitFirebase } = props
    const [namaVendor, setNamaVendor] = useState('')
    const [namaEmployee, setNamaEmployee] = useState('')
    const [tglPembelian, setTglPembelian] = useState('')
    const [grandTotal, setGrandTotal] = useState(0)
    const [harga, setHarga] = useState(0)
    const [qty, setQty] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [keterangan, setKeterangan] = useState('')

    const selectVendorModal = () => {
        setVendor({ visibleModal: true })
    }

    const selectEmployeeModal = () => {
        setUser({ visibleModal: true })
    }

    const selectBarangModal = () => {
        setBarang({ visibleModal: true })
    }

    const calculateSubtotal = (harga, qty) => {
        setHarga(harga)
        setQty(qty)
        const total = harga * qty
        setSubtotal(total)
    }
    const createBarang = () => {
        const params = {
            id_barang: selectedBarang?.id,
            nama_barang: selectedBarang?.nama_barang,
            harga: harga,
            qty: qty,
            subtotal: subtotal,
            keterangan: keterangan,
        }
        callBackPembelian(params)
    }

    return (
        <div>
            <button onClick ={createBarang}>
                SAVE PEMBELIAN
            </button>
            <dl>
                <dt>
                    <label>Pilih Vendor</label>
                    <button onClick={selectVendorModal}>...</button>
                </dt>
            </dl>

            <dl>
                <dt>
                    <label>Nama Vendor</label>
                </dt>
                <dd>
                    <input value={selectedVendor?.nama_vendor} type="text" placeholder="Nama Vendor" />
                </dd>
            </dl>

            <dl>
                <dt>
                    <label>Alamat Vendor</label>
                </dt>
                <dd>
                    <input value={selectedVendor?.alamat} type="text" placeholder="Alamat Vendor" />
                </dd>
            </dl>

            <dl>
                <dt>
                    <label>Pilih Employee</label>
                    <button onClick={selectEmployeeModal}>...</button>
                </dt>
                <dd>
                    <input value={selectedUser?.nama_user} type="text" placeholder="Nama Employee" />
                </dd>
            </dl>

            <dl>
                <dt>
                    <label>Department</label>
                </dt>
                <dd>
                    <input value={selectedUser?.department} type="text" placeholder="Department" />
                </dd>
            </dl>

            <dl>
                <dt>
                    <label>Cabang</label>
                </dt>
                <dd>
                    <input value={selectedUser?.cabang} type="text" placeholder="Cabang" />
                </dd>
            </dl>
            <dl>
                <dt>
                    <label>Tanggal Pembelian</label>
                </dt>
                <dd>
                    <input onChange={(ev) => setTglPembelian(ev.target.value)} type="text" placeholder="Tanggal Pembelian" />
                </dd>
            </dl>
            <dl>
                <dt>
                    <label>Grand Total</label>
                </dt>
                <dd>
                    <input onChange={(ev) => setGrandTotal(ev.target.value)} type="number" placeholder="Grand Total" />
                </dd>
            </dl>
            <br />
            <br />
            <br />
            <dl>
                <dt>
                    <label>Pilih Barang</label>
                    <button onClick={selectBarangModal}>...</button>
                </dt>
            </dl>

            <dl>
                <dt>
                    <label>Nama Barang</label>
                </dt>
                <dd>
                    <input value={selectedBarang?.nama_barang} type="text" placeholder="Nama Barang" />
                </dd>
            </dl>

            <dl>
                <dt>
                    <label>Satuan</label>
                </dt>
                <dd>
                    <input value={selectedBarang?.satuan} type="text" placeholder="Satuan" />
                </dd>
            </dl>

            <dl>
                <dt>
                    <label>Keterangan</label>
                </dt>
                <dd>
                    <textarea onChange={(ev) => setKeterangan(ev.target.value)} type="text" placeholder="Keterangan" />
                </dd>
            </dl>

            <dl>
                <dt>
                    <label>Quantity</label>
                </dt>
                <dd>
                    <input type="number" placeholder="Qty" onChange={(ev) => calculateSubtotal(harga, ev.target.value)} />
                </dd>
            </dl>

            <dl>
                <dt>
                    <label>Harga</label>
                </dt>
                <dd>
                    <input type="number" placeholder="Harga" onChange={(ev) => calculateSubtotal(ev.target.value, qty)} />
                </dd>
            </dl>

            <dl>
                <dt>
                    <label>Subtotal</label>
                </dt>
                <dd>
                    <input type="number" placeholder="Subtotal" value={subtotal} />
                </dd>
            </dl>

            <button onClick ={createBarang}>
                Add Barang
            </button>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedVendor: state.generalReducer.vendor.vendorItem,
        selectedUser: state.generalReducer.user.employeeItem,
        selectedBarang: state.generalReducer.barang.barangItem,
    }
}
export default connect(mapStateToProps, { setVendor, setUser, setBarang })(FormPembelian_Create);