import React, { useState } from 'react'
import { connect } from 'react-redux'

import BreadCrumb from '../../components/BreadCrumb'
import { setBarang, fetchBarangFromBackEndToRedux } from '../../redux'
import { useHistory } from 'react-router-dom'
import FormCreatePembelian from '../../components/Form/FormPembelian_Create'
import FormEditBarang from '../../components/Form/FormBarang_Edit'
import Modal from 'react-modal'
import {createBarang, editBarang} from '../../helpers/requestBarang'

function CreateBarang(props) {
    const { types, id } = props.match.params; //Harus sama dengan yang di router
    const direct = useHistory();
    const { barangList, fetchBarangFromBackEndToRedux } = props
    const [list, setList] = useState(barangList)
    const [namaTable, setNamaTable] = useState('Cabang')
    const [isShow, setIsShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const create = async (datas) => {
         await createBarang(datas).then((res) =>{
            console.log('res: ', res)
            alert(res.message)
            fetchBarangFromBackEndToRedux()
            direct.goBack()  
         })
         .catch((err) =>{
            alert(err.data.message)       
         })                  
    }


    const edit = async (datas) => {
        await editBarang(datas).then((res) =>{
            console.log('res: ', res)
            alert(res.message)
            fetchBarangFromBackEndToRedux()
            direct.goBack()  
         })
         .catch((err) =>{
            alert(err.data.message)       
         })                 
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
            return <FormCreatePembelian handleSubmitFirebase={handleSubmitFirebase} /**bebas = nama function */ />
        }
        if (types === 'edit') {
            return <FormEditBarang id={id} handleSubmitFirebase={handleSubmitFirebase} /**bebas = nama function */ />
        }
    }

    return (
        <div>
            <BreadCrumb link={
                [
                    { name: 'Master' },
                    { name: 'Pembelian' },
                    { name: types }
                ]

            } />

            {renderForm()}
           
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        baranglist: state.generalReducer.cabang.data
    }
}

export default connect(mapStateToProps, { setBarang, fetchBarangFromBackEndToRedux })(CreateBarang)