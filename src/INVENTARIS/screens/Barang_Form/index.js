import React, { useState } from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import BreadCrumb from '../../components/BreadCrumb'
import { setBarang, fetchBarangFromBackEndToRedux } from '../../redux'
import { useHistory } from 'react-router-dom'
import FormCreateBarang from '../../components/Form/FormBarang_Create'
import FormEditCabang from '../../components/Form/FormEditCabang'
import Modal from 'react-modal'
import {createCabang, editCabang} from '../../helpers/requestCabang'

function CreateBarang(props) {
    const { types, id } = props.match.params; //Harus sama dengan yang di router
    const direct = useHistory();
    const { barangList, fetchBarangFromBackEndToRedux } = props
    const [list, setList] = useState(barangList)
    const [namaTable, setNamaTable] = useState('Cabang')
    const [isShow, setIsShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const create = async (datas) => {
         await createCabang(datas).then((res) =>{
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
        await editCabang(datas).then((res) =>{
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
            return <FormCreateBarang handleSubmitFirebase={handleSubmitFirebase} /**bebas = nama function */ />
        }
        if (types === 'edit') {
            return <FormEditCabang id={id} handleSubmitFirebase={handleSubmitFirebase} /**bebas = nama function */ />
        }
    }

    return (
        <div>
            <BreadCrumb link={
                [
                    { name: 'Master' },
                    { name: 'Barang' },
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