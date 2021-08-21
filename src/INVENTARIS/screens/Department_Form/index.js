import React, { useState } from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import BreadCrumb from '../../components/BreadCrumb'
import { setDepartment, fetchDepartmentFromBackEndToRedux } from '../../redux'
import { useHistory } from 'react-router-dom'
import firebase from '../../../firebaseAPI'
import FormDepartment_Create from '../../components/Form/FormDepartment_Create'
import FormDepartment_Edit from '../../components/Form/FormDepartment_Edit'
import {createDepartment, editDepartment} from '../../helpers/requestDept'
function DepartmentForm(props) {
    // const handleSubmitRedux = async() =>{
    //     const data = {
    //         id : id,
    //         kode : cabang,
    //         nama : nama,
    //         alamat : alamat,
    //         telepon : telepon,
    //         status : checkstatus
    //     }
    //     let pushData = list.concat(data); // Copy data saat ini dari redux + data yang dimasukkan
    //     props.setCabang({data: pushData}) //nambah data di Redux
    //     alert('berhasil menambahkan data')
    //     console.log('push data', pushData)
    //     direct.goBack()
    // }
    const { types, id } = props.match.params; //Harus sama dengan yang di router
    const direct = useHistory();
    const { departmentList, fetchDepartmentFromBackEndToRedux } = props
    const [list, setList] = useState(departmentList)
    const [namaTable, setNamaTable] = useState('Department')

 
    const create = async (datas) => {
        await createDepartment(datas).then((res) =>{
            console.log('res: ', res)
            alert(res.message)
            fetchDepartmentFromBackEndToRedux()
            direct.goBack()  
         })
         .catch((err) =>{
            alert(err.data.message)       
         })      
   }


    const edit = async (datas) => {
        await editDepartment(datas).then((res) =>{
            console.log('res: ', res)
            alert(res.message)
            fetchDepartmentFromBackEndToRedux()
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
            return <FormDepartment_Create handleSubmitFirebase={handleSubmitFirebase} /**bebas = nama function */ />
        }
        if (types === 'edit') {
            return <FormDepartment_Edit id={id} handleSubmitFirebase={handleSubmitFirebase} /**bebas = nama function */ />
        }
    }

    return (

        <div>
            <BreadCrumb link={
                [
                    { name: 'Master' },
                    { name: 'Department' },
                    { name: types }
                ]

            } />

            {renderForm()}
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        departmentList: state.generalReducer.department.data
    }
}

export default connect(mapStateToProps, { setDepartment, fetchDepartmentFromBackEndToRedux })(DepartmentForm)