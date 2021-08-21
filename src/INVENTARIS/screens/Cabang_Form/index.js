import React, { useState } from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import BreadCrumb from '../../components/BreadCrumb'
import { setCabang, fetchCabangFromBackEndToRedux } from '../../redux'
import { useHistory } from 'react-router-dom'
import FormCreateCabang from '../../components/Form/FormCreateCabang'
import FormEditCabang from '../../components/Form/FormEditCabang'
import Modal from 'react-modal'
import {createCabang, editCabang} from '../../helpers/requestCabang'

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

function CreateCabang(props) {
    const { types, id } = props.match.params; //Harus sama dengan yang di router
    const direct = useHistory();
    const { cabanglist, fetchCabangFromBackEndToRedux } = props
    const [list, setList] = useState(cabanglist)
    const [namaTable, setNamaTable] = useState('Cabang')
    const [isShow, setIsShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const create = async (datas) => {
         await createCabang(datas).then((res) =>{
            console.log('res: ', res)
            alert(res.message)
            fetchCabangFromBackEndToRedux()
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
            fetchCabangFromBackEndToRedux()
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
            return <FormCreateCabang handleSubmitFirebase={handleSubmitFirebase} /**bebas = nama function */ />
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
                    { name: 'Cabang' },
                    { name: types }
                ]

            } />

            {renderForm()}
           
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        cabanglist: state.generalReducer.cabang.data
    }
}

export default connect(mapStateToProps, { setCabang, fetchCabangFromBackEndToRedux })(CreateCabang)