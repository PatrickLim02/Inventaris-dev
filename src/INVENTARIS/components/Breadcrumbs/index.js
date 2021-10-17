import React, { useState, useEffect } from 'react'
import Breadcrumbs from '@mui/material/Breadcrumbs'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from '@mui/material/Link';

function BreadcrumbsComp(props) {
    const { menuBreadcrumbs } = props
    return (
        <div style={{
            backgroundColor:'white', paddingLeft: '15px', paddingTop: '10px', paddingBottom: '10px'}}>
            <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb" color='black'>
                {menuBreadcrumbs}
            </Breadcrumbs>
        </div>
    )
}

export default BreadcrumbsComp