import React from 'react'
import Modal from 'react-animated-modal'
import './style.scss'
import { connect } from 'react-redux'


function TokenModal(props) {
    const { expiredToken } = props
    console.log('Expired Token: ', expiredToken)
    const toLoginPage = () =>{
        localStorage.removeItem('token')
        window.location.href='http://localhost:3000/login'
    }
    if (!expiredToken?.expired) {
        return null
    }
    else {
        return (
            <div className="modal-container">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1>Sesi Anda Telah Berakhir</h1>
                    </div>
                    <div className="modal-body">
                        <h1>Expired Token</h1>
                    </div>
                    <div className="modal-footer">
                        <button onClick={toLoginPage}>Login Kembali</button>
                    </div>
                </div>
            </div>
        )
    }


}

const mapStateToProps = (state) => {
    return {
        expiredToken: state.Authorization.token,
    }
}
export default connect(mapStateToProps)(TokenModal)
