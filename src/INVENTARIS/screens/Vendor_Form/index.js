import React, { useState } from 'react'
import { connect } from 'react-redux'
import BreadCrumb from '../../components/BreadCrumb'
import {fetchVendorFromBackEndToRedux} from '../../redux'
import { useHistory } from 'react-router-dom'
import {createVendor, editVendor} from '../../helpers/requestFirebase'
import FormVendor_Create from '../../components/Form/FormVendor_Create'
import FormVendor_Edit from '../../components/Form/FormVendor_Edit'
function Vendor_Form(props) {
    const { types, unique } = props.match.params; //Harus sama dengan yang di router
    const direct = useHistory();
 
    const [namaTable, setNamaTable] = useState('Vendor')

    const create = async (datas) => {
        await createVendor(datas)
        alert('Berhasil Menyimpan Data')
        direct.goBack()
        fetchVendorFromBackEndToRedux()
     
    }


    const edit = async (datas) => {
        const params = {
            unique:unique
        }
        await editVendor(params, datas)
        alert('Berhasil Mengubah Data')
        direct.goBack()
        fetchVendorFromBackEndToRedux()
           
    }

    const handleSubmitFirebase = async (rekapData) => {
        if (types ==='create') {
            create(rekapData)
        }
        else{
            edit(rekapData)
        }
    }

    const renderForm = () => {
        if (types === 'create') {
            return <FormVendor_Create handleSubmitFirebase={handleSubmitFirebase} /**bebas = nama function */ />
        }
        if (types === 'edit') {
            return <FormVendor_Edit unique={unique} handleSubmitFirebase={handleSubmitFirebase} /**bebas = nama function */ />
        }
    }

    return (

        <div>
            <BreadCrumb link={
                [
                    { name: 'Master' },
                    { name: 'Vendor' },
                    { name: types }
                ]

            } />

            {renderForm()}
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
       
    }
}

export default connect(mapStateToProps, { })(Vendor_Form)