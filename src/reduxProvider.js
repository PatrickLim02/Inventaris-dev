import React, { useEffect } from 'react'
import {Provider, connect} from 'react-redux'
import store from './INVENTARIS/redux/store'
import ReduxContent from './reduxContent'
import Navigations from './INVENTARIS/screens/Navigations'
import Sidebar from './INVENTARIS'


function ReduxProvider (){
    
    return (
        <Provider store={store}>
            <Navigations />
        </Provider>
      
    )
}



export default ReduxProvider;