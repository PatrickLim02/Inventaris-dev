import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import './Styles/styleTableList.scss'
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReduxProvider from './reduxProvider'
import UploadFoto from './uploadFoto';
import UploadMusic from './uploadMusic'
import FirebaseDatabase from './firebaseDatabase'
import Test from './test'
import SearchBar from './INVENTARIS/components/SearchBar'
import BreadcrumbsTest from './INVENTARIS/components/Breadcrumbs'
ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider />

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
