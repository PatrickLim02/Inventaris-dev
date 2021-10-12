import React, { useState } from 'react'

import BreadcrumbsTest from '../../Breadcrumbs'

import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
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
            <Grid container spacing={2} style={{marginTop: '10px'}}>
                <Grid item lg={6} md={12} xs={12}>
                <TextField
                    label="Kode Department"
                    onChange={(ev) => setKodeDepartment(ev.target.value)}
                    InputProps={{
                        style: {
                            height: '55px',
                            backgroundColor: 'white',
                            fontSize: 20, //when shrink                  
                        }
                    }}   
                    InputLabelProps={{
                        style: {
                            fontSize: 20, //placeholder
                            
                        }
                    }}
                />
                </Grid>
                <Grid item lg={12} md={6}>
                <TextField
                    label="Nama Department"
                    onChange={(ev) => setNama(ev.target.value)}
                    InputProps={{
                        style: {
                            height: '55px',
                            backgroundColor: 'white',
                            fontSize: 20, //when shrink                  
                        }
                    }}   
                    InputLabelProps={{
                        style: {
                            fontSize: '19px', //placeholder
                            
                        }
                    }}
                />
                </Grid>
                
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