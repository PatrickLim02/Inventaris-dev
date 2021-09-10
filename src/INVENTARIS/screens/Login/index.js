import React, { useState, useEffect } from 'react'
import './style.scss'
import { getAccessToken } from '../../helpers/requestToken'
import { loginUser } from '../../helpers/requestToken'
import { setAuthorization } from '../../redux'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import LoginIcon from '../../assets/login.png'
import Sidebar from '../../../INVENTARIS'
import { isJwtExpired } from 'jwt-check-expiration'
import FormCreateCabang from '../../components/Form/FormCreateCabang'

function LoginScreen(props) {
    const history = useHistory()
    const { setAuthorization } = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [tokenExpired, setTokenExpired] = useState()
    const handleToken = () => {
        const params = {
            username: username,
            password: password
        }
        getAccessToken(params).then(async (res) => {
            localStorage.setItem('token', res.token)
            if (res.token) {
                history.push('/dashboard')
            }
        })
            .catch((err) => {
                console.log('Failed to request token', err)
            })
    }

    const handleLogin = async () => {
        const params = {
            username: username,
            password: password
        }
        loginUser(params).then((res) => {
            handleToken()
        })
            .catch((err) => {
                alert(err.data.message)
            })
    }
    
   
    useEffect (() => {
     if(!localStorage.getItem('token')){
        history.push('/login')
        
     }
     else{
        history.push('/dashboard')
     }
    },[])


    return (
        <div>
            <div className="container">
                <img src={LoginIcon} className="user" />
                <div className="welcome">
                    <p>Welcome  </p>
                    <p>Please Login </p>
                </div>

                <div className="form-input">
                    <div className="input">
                        <input onChange={(ev) => setUsername(ev.target.value)} type="text" className="user-input" placeholder="Username" name="username" required />
                    </div>

                    <div className="input">
                        <input onChange={(ev) => setPassword(ev.target.value)} type="text" className="user-input" name="password" placeholder="Password" required />
                    </div>

                    <div className="input">
                        <button onClick={handleLogin} type="button" type="submit" className="button-login">Login</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {

    }
}
export default connect(mapStateToProps, { setAuthorization })(LoginScreen)