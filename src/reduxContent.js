// import React, { useState, useEffect } from 'react'
// import {Provider, connect} from 'react-redux'

// import {setExample, setUsers, setApi} from './redux'
// // import {getUserData} from './helpers/request'
// function ReduxContent (props){
//     const {testing2, users} = props
  
//     const [nama, setNama] = useState('')
//     const [nomor, setNomor] = useState('')
//     const handle = () =>{
//         props.setUsers({name:nama}) 
//         props.setUsers({number:nomor})
//         alert('Berhasil Mengubah Data')
//     }

//     useEffect (() =>{
//         const getUserDataToRedux = async () =>{
//             const response = await getUserData();
//             props.setApi({data: response}) // memasukkan api ke redux
//             console.log(response)
//         }
//         getUserDataToRedux();
//     },[])
//     return (
//            <div>
//                <input onChange={(ev) => setNama(ev.target.value)} value={nama} type="text" name="name" placeholder="name" />               
//                <input onChange={(ev) => setNomor(ev.target.value)} value={nomor} type="text" name="number" placeholder="number" />
//                <button onClick={handle}>Edit</button>

              
//            </div>
                
// )
// }
// const mapStateToProps = (state) => {
//     return {
//         testing2: state.cake.testing2,
//         users: state.cake.users,
        
//     }
// }

// export default connect(mapStateToProps, {setExample, setUsers, setApi})(ReduxContent);