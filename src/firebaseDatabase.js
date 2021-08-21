import React, { useState, useEffect } from 'react'
import firebase from './firebaseAPI'


const FirebaseDatabase = (props) => {
    const date = new Date();
    const convertDate = date.toISOString().split('T')[0] //ambil date dan konversi ke standar mySQL
    const [post, setPost] = useState('')
    const [username, setUsername] = useState('Patrick')
    const [time, setTime] = useState(convertDate)
    const [namaTable, setNamaTable] = useState('chat')
    const [listChat, setListChat] = useState([])
    const handleSubmit = () =>{
        const rekapData = {
            nama : username,
            time : time,
            post : post 
        }
        firebase
        .database()
        .ref('/' + namaTable)
        .push(rekapData)
        .then(() =>{
            setPost('')
            loadData()
        })
        .catch(error =>{
            console.log(error)
        })
    }

    const loadData = () => {
        let chats = firebase.database().ref('/' + namaTable)
        chats.once('value').then(snapshot => {
            if(snapshot.val()){
                console.log('data', Object.entries(snapshot.val()))
            setListChat(Object.entries(snapshot.val()))
            }
            else{
                setListChat([])
                console.log('gagal')
            }
        })
    }
    const hapus = (unique) =>{
        console.log('id: ' , unique)
        firebase.database().ref('/' + namaTable +'/' + unique).remove()
        loadData()
    }
    useEffect(() => {
        const interval = setInterval(() =>{
            loadData();
        }, 3000)
        return () => clearInterval(interval)
        
    },[])

    const handleKeyDown = (ev) =>{
        if(ev.key === 'Enter'){
            handleSubmit()
        }
    }
    return (
        <div>
            Ini Forum Chat
            <div>
                <textarea onKeyDown={handleKeyDown} value={post} onChange={(ev) => setPost(ev.target.value)} placeholder="Masukkan Pesan Anda">

                </textarea>
                <button onClick={handleSubmit}>Post</button>
            </div>

            <div style={{backgroundColor: 'aqua', width:'50%', height:'400px', overflow: 'scroll'}}>
                {listChat.map((item, index) =>{
                    return(
                      <div key={index} style={{backgroundColor: 'white', margin: '20px', padding: '10px'}} > 
                          
                          <small style={{padding: '10px', backgroundColor: 'red', borderRadius: '20px'}}>{item[1].nama}</small>
                          <span style ={{fontWeight: 'bolder', fontSize: '16px', margin: '10px', display:'inline-block'}}>{item[1].post}</span>
                          <small style={{fontSize: '8px'}}>Post Date: {item[1].time}</small><br/>
                          <button onClick={() => hapus(item[0])}>Delete</button>
                      </div>
                      
                    )
                })}
            </div>
             

        </div>
    )
}

export default FirebaseDatabase