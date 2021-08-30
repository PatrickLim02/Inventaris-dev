import React, { useState, useEffect } from 'react'
import './style.scss'
import { getAccessToken } from '../../helpers/requestToken'
import { loginUser } from '../../helpers/requestToken'
import {setAuthorization} from '../../redux'
import {connect} from 'react-redux'
import {useHistory} from 'react-router-dom'
function LoginScreen(props) {
    const history = useHistory()
    const {setAuthorization} = props
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const handleToken = () => {
        const params = {
            username: username,
            password: password
        }
        getAccessToken(params).then(async(res) => {
            setAuthorization({data: res.token})
            localStorage.setItem('token', res.token)
        
            if(res.token){
                const loginResponse = await loginUser(params)
                console.log('Login data: ', loginResponse)
                if (loginResponse.status === 200){
                    history.push('/home')
                }
                else{
                    alert(loginResponse)
                }
            }
        })
            .catch((err) => {
                console.log('Failed to request token', err)
            })       
    }
    return (
        <div>
            <div className="container">
                <img src="icons/user.png" alt="user" classNameName="user" />
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
                        <button onClick={handleToken} type="button" type="submit" className="button-login">Login</button>
                    </div>

                </div>
            </div>
        </div>
    )
}
const mapStateToProps = (state) =>{
    return{

    }
}
export default connect(mapStateToProps, {setAuthorization}) (LoginScreen)