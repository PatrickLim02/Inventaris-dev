import React, { useState } from 'react'
import { connect } from 'react-redux'
import { retrieveVendorItem } from '../../../helpers/general'
import { setVendor, setUser } from '../../../redux'
function FormPembelian_Create(props) {
    const { setVendor, selectedVendor, setUser, selectedUser } = props
    const { handleSubmitFirebase } = props
    const [namaVendor, setNamaVendor] = useState('')
    const [namaEmployee, setNamaEmployee] = useState('')
    const [tglPembelian, setTglPembelian] = useState('')
    const [grandTotal, setGrandTotal] = useState(0)

    const selectVendorModal = () => {
        setVendor({ visibleModal: true })
    }

    const selectEmployeeModal = () => {
        setUser({ visibleModal: true })
    }
    const sentData = async () => { //Harus sama dengan kolom dengan di node js / database
        const rekapData = {
            nama_vendor: namaVendor,
            nama_employee: namaEmployee,
            tglPembelian: tglPembelian,
            grandTotal: grandTotal,

        }
        handleSubmitFirebase(rekapData)
    }

    return (
        <div>

            <dl>
                <dt>
                    <label>Nama Vendor</label>
                    <button onClick={selectVendorModal}>...</button>
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
                    <label>Nama Employee</label>
                    <button onClick={selectEmployeeModal}>...</button>
                </dt>
                <dd>
                    <input value={selectedUser?.nama_user} type="text" placeholder="Nama Employee" />
                </dd>
            </dl>

            <dl>
                <dd>
                    <input value={selectedUser?.department} type="text" placeholder="Department" />
                </dd>
            </dl>

            <dl>
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



            <button onClick={sentData}>
                Create
            </button>

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        selectedVendor: state.generalReducer.vendor.vendorItem,
        selectedUser: state.generalReducer.user.employeeItem,
    }
}
export default connect(mapStateToProps, { setVendor, setUser })(FormPembelian_Create);