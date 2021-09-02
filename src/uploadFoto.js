import React, { useState, useEffect } from 'react'
import './App.css'
import { getImage, uploadImage } from './INVENTARIS/helpers/requestFile'

function UploadFoto() {
    const [image, setImage] = useState()
    const [viewImage, setViewImage] = useState()
    const [namaFile, setNamaFile] = useState()

    const saveImage = async () => {
        // console.log('Upload Foto berhasil')
        // var data = new FormData()
        // data.append('fileImage', image) // harus sama dengan backend
        // fetch('http://localhost:8000/files/submit',
        //     {
        //         method: 'POST',
        //         body: data
        //     })
        //     .then(response => response.json()
        //         .then(res => {
        //             alert('Berhasil menambahkan data')
        //         }))
        //     .catch(err => {
        //         console.log(err)
        //     })
        const body = {
            fileImage: image, // fileImage harus sama penulisan dengan di backend (/submit)
            namafile: namaFile
        }
        console.log('body: ', body)
        await uploadImage(body)
        loadData()
    }
    const loadData = () => {
        getImage().then((res) => {
            setViewImage(res.data)
        })
            .catch(err => {
                console.log('request failed: ', err)
            })
    }

    useEffect(() => {

    }, [])


    return (
        <div>
            <input onChange={(ev) => setImage(ev.target.files[0])} accept="image/*" type="file"></input>
            <input type="text" onChange={(ev) => setNamaFile(ev.target.value)}></input>
            <button onClick={saveImage}>Upload Photo</button>
            {viewImage?.map((item, index) => {
                return (
                    <ul>
                        <li>
                            <img src={'http://localhost:8000/images/' + item.images} />
                        </li>
                        <li>
                            {item.namafile}
                        </li>
                    </ul>


                )

            })}
        </div>
    )
}

export default UploadFoto