import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from './Navbar';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const SendEmail = () => {

    // const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');
    const [formData, setFormData] = useState({
        email: '',
        subject: 'URL to access file'
    });
    // const [sendCounts, setSendCounts] = useState({});

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const cardId = localStorage.getItem('cardId');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // console.log(formData);
        const url = localStorage.getItem('url');
        console.log("url:", url);
        try {
            const response = await axios.post(`http://localhost:3500/sendFileViaEmail?url=${url}`, formData);
            console.log(response.data);
            window.alert("Email sent successfully!");

        } catch (error) {
            if (!error.response) {
                console.error("No Server Response");
                window.alert("No server response!");
            } else if (error.response) {
                console.log("Error", error.response.data);
                window.alert("Error sending email!");
            }
        }

    };


    return (
        <main>
            <Navbar />
            <section>
                <div className='container'>
                    <h1 className='mb-4 mt-4'>Send File To an Email </h1>
                    <form onSubmit={handleSubmit}>
                        <div className='form-group'>
                            <label htmlFor='email'>Email:</label>
                            <input
                                type='text'
                                id='email'
                                name='email'
                                className='form-control'
                                onChange={handleChange}
                                value={formData.email}
                                autoComplete='off'
                                required
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='subject'>Subject:</label>
                            <input
                                type='text'
                                id='subject'
                                name='subject'
                                className='form-control'
                                onChange={handleChange}
                                value={formData.subject}
                                autoComplete='off'
                                required
                            />
                        </div>
                        {/* <div className='form-group'>
                            <label htmlFor='email'>Body:</label>
                            <textarea
                                type='text'
                                id='body'
                                name='body'
                                className='form-control'
                                rows='5'
                                autoComplete='off'
                                required
                            />
                        </div> */}
                        <button type='submit' className='btn btn-primary mt-3'>Send</button>
                    </form>

                </div>
            </section>
        </main>
    )
}

export default SendEmail;