import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Admin = () => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const token = localStorage.getItem('accessToken');

    useEffect(() => {
        if(!isAdmin){
            navigate('/login');
        }
    }, [navigate]);

    // const [file, setFile] = useState("");
    // const [fileName, setFileName] = useState("");

    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);


    const fileUpload = (e) => {
        // setFileName(e.target.files[0].name);
        setFile(e.target.files[0]);
    }


    const handleUpload = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('title', title);
        formData.append('description', description);
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3500/files', formData, {
                headers: {
                     'Content-Type': 'multipart/form-data',
                     Authorization: `Bearer ${token}`
                    },
            });
            console.log(response.data);
            window.alert("File uploaded successfully!");

        } catch (error) {
            console.error('Error uploading file:', error);
            window.alert("Error uploading file!");

        } finally {
            setLoading(false);
        }
    };


    return (
        <main>
            <Navbar />
            <section>
                <div className='container'>
                    <h1 className='mb-4 mt-4'>Admin Panel </h1>
                    <form onSubmit={handleUpload}>
                        <div className='form-group'>
                            <label htmlFor='title'>Title:</label>
                            <input
                                type='text'
                                id='title'
                                name='title'
                                className='form-control'
                                onChange={(e) => setTitle(e.target.value)}
                                value={title}
                                autoComplete='off'
                                required
                            />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='description'>Description:</label>
                            <textarea
                                type='text'
                                id='description'
                                name='description'
                                className='form-control'
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                rows='3'
                                autoComplete='off'
                                required
                            />
                        </div>
                        <div>
                            <input className='mt-2' onChange={fileUpload} required type="file" id='upload' name='upload' />
                            {/* <button className='btn btn-secondary mt-3'>Upload file</button> */}
                        </div>


                        <button type='submit' className='btn btn-primary mt-3'>{loading ? "Sending..." : "Send"}</button>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default Admin;