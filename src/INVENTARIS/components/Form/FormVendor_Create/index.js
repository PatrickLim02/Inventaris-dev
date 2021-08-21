import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import { } from '../../../redux'
import firebase from '../../../../firebaseAPI'
function FormUser_Create(props) {
    const { handleSubmitFirebase } = props
    const [id, setID] = useState('')
    const [kodeVendor, setKodeVendor] = useState('')
    const [namaVendor, setNamaVendor] = useState('')
    const [alamat, setAlamat] = useState('')
    const [telepon, setTelepon] = useState('')
    const [checkstatus, setCheckstatus] = useState(true)
    const [namaTableCabang, setNamaTableCabang] = useState('Vendor')

    const sentData = async () => {
        const rekapData = {
            id: id,
            kodeVendor: kodeVendor,
            namaVendor: namaVendor,
            alamat: alamat,
            telepon: telepon,
            status: checkstatus

        }
        if (namaVendor !== '') {
            handleSubmitFirebase(rekapData)
        }
        else {
            alert('Masukkan Nama Vendor Terlebih Dahulu')
        }
    }


    return (
        <div>

            <dl>
                <dt>
                    <label>ID</label>
                </dt>
                <dd>
                    <input onChange={(ev) => setID(ev.target.value)} type="text" placeholder="ID" />
                </dd>
            </dl>

            <dl>
                <dt>
                    <label>Kode Vendor</label>
                </dt>
                <dd>
                    <input onChange={(ev) => setKodeVendor(ev.target.value)} type="text" placeholder="Kode Vendor" />
                </dd>
            </dl>


            <dl>
                <dt>
                    <label>Nama Vendor</label>
                </dt>
                <dd>
                    <input onChange={(ev) => setNamaVendor(ev.target.value)} type="text" placeholder="Nama Vendor" />
                </dd>
            </dl>

            <dl>
                <dt>
                    <label>Alamat</label>
                </dt>
                <dd>
                    <input onChange={(ev) => setAlamat(ev.target.value)} type="text" placeholder="Alamat" />
                </dd>
            </dl>

            <dl>
                <dt>
                    <label>Telepon</label>
                </dt>
                <dd>
                    <input onChange={(ev) => setTelepon(ev.target.value)} type="text" placeholder="Telepon" />
                </dd>
            </dl>


            <dl>
                <dt>
                    <label>Status</label>
                </dt>
                <dd>
                    <input type="checkbox" id="status" name="status" value={checkstatus} checked={checkstatus} onChange={() => setCheckstatus(!checkstatus)} />
                    <label for="status"> {checkstatus ? 'Aktif' : 'Tidak Aktif'} </label>

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

    }
}
export default connect(mapStateToProps, {})(FormUser_Create)