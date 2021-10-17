import React, { useState } from 'react'

// Components
import BreadcrumbsTest from '../../Breadcrumbs'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Button from '@mui/material/Button';


// Icons
import SaveIcon from '@mui/icons-material/Save';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RestoreIcon from '@mui/icons-material/Restore';
import NoteAltIcon from '@mui/icons-material/NoteAlt';


function FormDepartment_Create(props) {
    const { handleSubmitFirebase } = props
    const [nama, setNama] = useState('')
    const [kodeDepartment, setKodeDepartment] = useState('')
    const [checkstatus, setCheckstatus] = useState(true)

    const sentData = async () => {
        const rekapData = {
            nama_department: nama,
            kode_department: kodeDepartment,
            status: checkstatus === true ? 1 : 0
        }
        handleSubmitFirebase(rekapData)
    }
    return (
        <div >
            <Grid container>
                <Card sx={{ width: '100%', margin: '10px' }}>
                    <CardHeader
                    style={{ backgroundColor: '#F5F5F5'}}
                     avatar={
                        <NoteAltIcon />
                     }
                        titleTypographyProps={{ 
                            variant: "h5",
                            align: "left"
                        }}
                        title="Form Create Department"
                        // subheader="New Department"
                        // subheaderTypographyProps={{
                        //     align: "center"
                        // }}
                        action={
                            <div>
                                <Button variant="contained" startIcon={<RestoreIcon />}>
                                    Reset
                                </Button>
                                <Button variant="contained" startIcon={<SaveIcon />}>
                                    Save
                                </Button>
                            </div>
                        }
                     
                    />


                    <CardContent>
                        <Grid item md={12} xs={12}
                            sx={{ paddingBottom: '15px' }}>
                            <TextField
                                label="Kode Department"
                                size="small"
                                onChange={(ev) => setKodeDepartment(ev.target.value)}
                                InputProps={{
                                    style: {
                                        backgroundColor: 'white',
                                        fontSize: 16, //when shrink     
                                        width: 500,                    
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontSize: 16, //placeholder
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}
                            sx={{ paddingBottom: '15px' }}>
                            <TextField
                                label="Nama Department"
                                size="small"
                                onChange={(ev) => setNama(ev.target.value)}
                                InputProps={{
                                    style: {
                                        backgroundColor: 'white',
                                        fontSize: 16, //when shrink     
                                        width: 500,                    
                                    }
                                }}
                                InputLabelProps={{
                                    style: {
                                        fontSize: 16, //placeholder
                                    }
                                }}
                            />
                        </Grid>

                        <Grid item md={12} xs={12}
                            sx={{ marginLeft: '3px' }}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Status Keaktifan</FormLabel>
                                <RadioGroup
                                    aria-label="status"
                                    name="controlled-radio-buttons-group"
                                >
                                    <FormControlLabel value="aktif" control={<Radio />} label="Aktif" />
                                    <FormControlLabel value="tidak aktif" control={<Radio />} label="Tidak Aktif" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </CardContent>
                </Card>


            </Grid>

            {/* <dl>
            <dt>
                <label>Kode Department</label>
            </dt>
            <dd>
                <input onChange={(ev) => setKodeDepartment(ev.target.value)} type="text" placeholder="Kode Department" />
            </dd>
        </dl>

        <dl>
            <dt>
                <label>Nama Department</label>
            </dt>
            <dd>
                <input onChange={(ev) => setNama(ev.target.value)} type="text" placeholder="Nama Department" />
            </dd>
        </dl>
      
        <dl>
            <dt>
                <label>Status</label>
            </dt>
            <dd>
                <input type="checkbox" id="status" name="status" value={checkstatus} checked={checkstatus} onChange={() => setCheckstatus(!checkstatus)} />
                <label for="status"> {checkstatus ? 'Aktif' : 'Tidak Aktif'} </label>
    
            </dd>
        </dl> */}

            <button onClick={sentData}>
                Create
            </button>

        </div>
    )
}

export default FormDepartment_Create;