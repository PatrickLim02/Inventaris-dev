import React, { useState, useEffect } from 'react'
import './App.css'
import { getMusic, uploadMusic } from './INVENTARIS/helpers/requestFile'
import ReactAudioPlayer from 'react-audio-player';

function UploadMusic() {
    const [music, setMusic] = useState()
    const [viewMusic, setViewMusic] = useState()
    const [namaFile, setNamaFile] = useState()
    const [queue, setQueue] = useState(1)
  
    const saveMusic = async () => {
        const body = {
            namafilemusic: music, // fileImage harus sama penulisan dengan di backend (/submit)
            keterangan: namaFile
        }
        console.log('body: ', body)
        await uploadMusic(body)
        loadData()
    }
    const loadData = () => {
        getMusic().then((res) => {
            setViewMusic(res.data)
        })
            .catch(err => {
                console.log('request failed: ', err)
            })
    }

    useEffect(() => {
        loadData()
    }, [])
    console.log(viewMusic?.length)

    return (
        <div>
            <input onChange={(ev) => setMusic(ev.target.files[0])} accept="audio/mp3, audio/*" capture="microphone" type="file"></input>
            <input type="text" onChange={(ev) => setNamaFile(ev.target.value)}></input>
            <button onClick={saveMusic}>Upload Music</button>
            <h1> {queue}</h1>
            {viewMusic?.map((item, index) => {
                const idx = index + 1
                return (         
                    
                    <ul>                        
                        <li>
                            <ReactAudioPlayer
                                src={'http://localhost:8000/music/' + item.namafilemusic}
                                controls        
                                                
                                autoPlay={idx === queue ? true : false}
                                onEnded={()=> setQueue(viewMusic?.length === queue ? 1 : idx + 1)}
                            />
                        </li>

                        <li>
                            {item.namafilemusic}
                        </li>
                    </ul>
                )
            })}
        </div>
    )
}

export default UploadMusic