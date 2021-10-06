import { react, useState } from 'react'
import { connect } from 'react-redux'
import {styles} from './styles'
import './buttonAdd.scss'
import { Link } from 'react-router-dom'

function ButtonCreate(props) {
    return (
        <div style={styles.container}>
            <Link  {...props}>
                <button className="btn btn1">
                    CREATE
                </button>
            </Link>

        </div>
    )
}

export default ButtonCreate