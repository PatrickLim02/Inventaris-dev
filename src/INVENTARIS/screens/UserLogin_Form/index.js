import React, { useState } from 'react'
import { connect } from 'react-redux'
import './styles.scss'
import BreadCrumb from '../../components/BreadCrumb'
import { useHistory } from 'react-router-dom'
import FormUserLogin_Create from '../../components/Form/FormUserLogin_Create'
import FormUserLogin_Edit from '../../components/Form/FormUserLogin_Edit'
import {fetchUserFromBackEndToRedux} from '../../redux'
import  {createUserLogin, editUserLogin} from '../../helpers/requestUserLogin'
function UserLoginForm(props) {
    const { types, id } = props.match.params; //Harus sama dengan yang di router
    const direct = useHistory();
 
    const create = async (datas) => {
        createUserLogin(datas).then((res) =>{
            alert(res.message)
            direct.goBack()
        })
        .catch((err) =>{
            console.log(err)
        })
    }


    const edit = async (datas) => {
        editUserLogin(datas).then((res) =>{
           alert(res.message)      
           direct.goBack()        
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
            return <FormUserLogin_Create handleSubmitFirebase={handleSubmitFirebase} /**bebas = nama function */ />
        }
        if (types === 'edit') {
            return <FormUserLogin_Edit id={id} handleSubmitFirebase={handleSubmitFirebase} /**bebas = nama function */ />
        }
    }

    return (

        <div>
            <BreadCrumb link={
                [
                    { name: 'Master' },
                    { name: 'User Login' },
                    { name: types }
                ]

            } />

            {renderForm()}
        </div>
    )

}


export default UserLoginForm