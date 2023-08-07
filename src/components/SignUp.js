import axios from 'axios';
import React, { useState } from 'react';
import styles from './signUp.module.css';
import { useNavigate } from 'react-router-dom';

const SignUpComponent = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        user: '',
        email: '',
        pwd: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(formData);
        try {
            const response = await axios.post('http://localhost:3500/register', formData );
            console.log(response.data);
            window.alert("User created successfully!");
            navigate("/login");

        } catch (error) {
            if (!error.response) {
                console.error("No Server Response");
                window.alert("No server response!");
            } else if (error.response) {
                console.log("Error", error.response.data);
                window.alert("SignUp Error!");
            }
        }

    };

    return (
        <section className={styles.forg_pwd_section}>
            <h1>Register</h1>
            <form className={styles.forg_pwd_form} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className={styles.forg_pwd_label} htmlFor="user">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="user"
                        name="user"
                        autoComplete='off'
                        value={formData.user}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className={styles.forg_pwd_label} htmlFor="email">Email address:</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        autoComplete='off'
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label className={styles.forg_pwd_label} htmlFor="pwd">Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="pwd"
                        name="pwd"
                        value={formData.pwd}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">Sign Up</button>
            </form>
            <p>
                Already registered?<br />
                <span>
                    {/*put router link here*/}
                    <a className='text-light' href="/login">Sign In</a>
                </span>
            </p>
        </section>
    );
};

export default SignUpComponent;