import React from 'react'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


function CBEntries(props) {
    return (
        <FormControl sx={{ m: 1, minWidth: 120 }}>
            <Select
                // value={entries}
                // onChange={handleChange}
                displayEmpty
                style={{ height: '30px', backgroundColor: 'white' }}
                {...props}
            >
                <MenuItem value={10}>Entries 10</MenuItem>
                <MenuItem value={20}>Entries 20</MenuItem>
                <MenuItem value={30}>Entries 30</MenuItem>

            </Select>
        </FormControl>
    )
}

export default CBEntries