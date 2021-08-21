import React, { useState } from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import BreadCrumb from '../../components/BreadCrumb'
import { useHistory } from 'react-router-dom'
import FormUser_Create from '../../components/Form/FormUser_Create'
import FormUser_Edit from '../../components/Form/FormUser_Edit'
import {fetchUserFromBackEndToRedux} from '../../redux'
import  {createUser, editUser} from '../../helpers/requestUser'
function UserForm(props) {
    const { types, id } = props.match.params; //Harus sama dengan yang di router
    const direct = useHistory();
 
    const create = async (datas) => {
        createUser(datas).then((res) =>{
            alert(res.message)
            props.fetchUserFromBackEndToRedux()
            direct.goBack()
        })
        .catch((err) =>{
            console.log(err)
        })
    }


    const edit = async (datas) => {
       editUser(datas).then((res) =>{
           alert(res.message)      
           direct.goBack()
           props.fetchUserFromBackEndToRedux()          
       })
       .catch((err) =>{
           console.log(err)
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
            return <FormUser_Create handleSubmitFirebase={handleSubmitFirebase} /**bebas = nama function */ />
        }
        if (types === 'edit') {
            return <FormUser_Edit id={id} handleSubmitFirebase={handleSubmitFirebase} /**bebas = nama function */ />
        }
    }

    return (

        <div>
            <BreadCrumb link={
                [
                    { name: 'Master' },
                    { name: 'User' },
                    { name: types }
                ]

            } />

            {renderForm()}
        </div>
    )

}

const mapStateToProps = state =>{
    return{

    }
}

export default connect (mapStateToProps, {fetchUserFromBackEndToRedux })(UserForm)