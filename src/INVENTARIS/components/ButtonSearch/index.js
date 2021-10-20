import React from 'react'
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function ButtonSearch(props) {
    return (
        <IconButton color="primary" {...props}
            style={{ position: 'absolute', top: '45px', right: '15px' }}>
            <SearchIcon style={{ fontSize: '30px' }} />
        </IconButton>

    )
}

export default ButtonSearch