import React from 'react'
import TextField from '@mui/material/TextField';

function TextFieldSearch(props) {
    return (

        <TextField
            // label="Cari Nama Department"
            // onChange={(ev) => setSearchValue(ev.target.value)}
            size='small'
            style={{ height: '30px', position: 'absolute', top: '52px', right: '60px' }}
            InputProps={{
                style: {
                    height: '32px',
                    borderWidth: '1px',
                    backgroundColor: 'white',
                    fontSize: 13, //when shrink                
                }
            }}
            InputLabelProps={{
                style: {
                    fontSize: 13, //placeholder
                    margin: 0
                }
            }}

            {...props}
        />

    )
}

export default TextFieldSearch