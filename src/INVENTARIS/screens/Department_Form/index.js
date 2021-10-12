import React, { useState } from 'react'
import { connect } from 'react-redux'
import BreadcrumbsTest from '../../components/Breadcrumbs'
import { setDepartment, fetchDepartmentFromBackEndToRedux } from '../../redux'
import { useHistory } from 'react-router-dom'
import firebase from '../../../firebaseAPI'
import FormDepartment_Create from '../../components/Form/FormDepartment_Create'
import FormDepartment_Edit from '../../components/Form/FormDepartment_Edit'
import {createDepartment, editDepartment} from '../../helpers/requestDept'
function DepartmentForm(props) {
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
        <div style={{position:'relative', backgroundColor: 'yellow', width: '100%', height:'100%'}}>
            <BreadcrumbsTest menuBreadcrumbs={
                    [
                        <p>Master</p>,
                        <p>Department</p>,
                        <p>Create</p>
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