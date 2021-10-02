import React, { useState } from 'react'
import { connect } from 'react-redux'
import { retrieveVendorItem } from '../../../helpers/general'
import { setPembelian } from '../../../redux'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment'

function FormPembelian_Create(props) {
    const { setPembelian, selectedVendor, selectedEmployee, selectedBarang, callBackPembelian } = props
    const { handleSubmitFirebase } = props
    const [idVendor, setIdVendor] = useState('')
    const [idEmployee, setIdEmployee] = useState('')
    const [tglPembelian, setTglPembelian] = useState('')
    const [grandTotal, setGrandTotal] = useState(0)
    const [harga, setHarga] = useState(0)
    const [qty, setQty] = useState(0)
    const [subtotal, setSubtotal] = useState(0)
    const [keterangan, setKeterangan] = useState('')
    const [date, setDate] = useState(new Date())

    const selectVendorModal = () => {
        setPembelian({ vendorModalVisible: true })
    }

    const selectEmployeeModal = () => {
        setPembelian({ employeeModalVisible: true })
    }

    const selectBarangModal = () => {
        setPembelian({ barangModalVisible: true })
    }

    const calculateSubtotal = (harga, qty) => {
        setHarga(harga)
        setQty(qty)
        const total = harga * qty
        setSubtotal(total)
    }
    const addBarang = () => {
        const params = {
            id_employee : selectedEmployee.id,
            id_vendor: selectedVendor.id,
            id_barang: selectedBarang?.id,
            nama_barang: selectedBarang?.nama_barang,
            harga: harga,
            qty: qty,
            subtotal: subtotal,
            keterangan: keterangan,
            tgl_pembelian: moment(date).format('DD-MM-YYYY hh:mm:ss')
        }
        console.log('Params: ', params)
        callBackPembelian(params)
    }

    return (
        <div>
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
                    <input value={selectedEmployee?.nama_user} type="text" placeholder="Nama Employee" />
                </dd>
            </dl>

            <dl>
                <dt>
                    <label>Department</label>
                </dt>
                <dd>
                    <input value={selectedEmployee?.department} type="text" placeholder="Department" />
                </dd>
            </dl>

            <dl>
                <dt>
                    <label>Cabang</label>
                </dt>
                <dd>
                    <input value={selectedEmployee?.cabang} type="text" placeholder="Cabang" />
                </dd>
            </dl>
            <dl>
                <dt>
                    <label>Tanggal Pembelian</label>
                </dt>
                <dd>
                    <DatePicker selected={date} onChange={(date) => setDate(date)}></DatePicker>
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

            <button onClick ={addBarang}>
                Add Barang
            </button>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedVendor: state.generalReducer.pembelian.vendorItem,
        selectedEmployee: state.generalReducer.pembelian.employeeItem,
        selectedBarang: state.generalReducer.pembelian.barangItem,
    }
}
export default connect(mapStateToProps, { setPembelian })(FormPembelian_Create);