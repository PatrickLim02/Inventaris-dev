import React, { useState } from 'react'

function UploadFoto() {
    const [image, setImage] = useState()
    const saveImage =()=>{
        console.log('Upload Foto berhasil')
        var data = new FormData()
        data.append('fileImage', image) // harus sama dengan backend
        fetch('http://localhost:8000/simpan-foto',
        {
            method: 'POST',
            body: data
        })
        .then(response => response.json()
        .then(res=>{
            alert('Berhasil menambahkan data')
        }))
        .catch(err => {
            console.log(err)
        })
    }
    return (
        <div>
            <input onChange={(ev) => setImage(ev.target.files[0])} accept="image/*" type="file"></input>
            <button onClick={saveImage}>Upload Photo</button>
        </div>
    )
}

export default UploadFoto