import { react, useState } from 'react'
import { Link } from 'react-router-dom'

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

function ButtonCreate(props) {
    return (
        <Button variant="outlined" startIcon={<AddIcon style={{ fontSize: '20px' }} />}
            style={{ backgroundColor: '#26a69a', color: 'white', position: 'absolute', top: '10px', right: '25px', width: '90px', height: '30px', fontSize: '13px', marginLeft: '10px' }}>
            Create
        </Button>
    )
}

export default ButtonCreate