import { react, useState } from 'react'
import { connect } from 'react-redux'
import './style.scss'
import { Link } from 'react-router-dom'

function ButtonAdd(props) {
    return (
        <div className="container-button-add">
            <Link {...props}>
                <button className="btn btn1">
                    CREATE
                </button>
            </Link>

        </div>
    )
}

export default ButtonAdd