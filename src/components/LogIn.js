import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './signUp.module.css';
import axios from 'axios';

const LogIn = () => {
    const navigate = useNavigate();
    // const [token, setToken] = useState('');
    const [loginData, setLoginData] = useState({
        user: '',
        pwd: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData((prevLoginData) => ({
            ...prevLoginData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(loginData);
        try {
            const response = await axios.post('http://localhost:3500/auth', loginData);
            console.log(response.data.accessToken);
            // setToken(response.data.accessToken);
            let token = response.data.accessToken;
            localStorage.setItem('accessToken', token);
            console.log("myToken:", token);
            navigate("/home")

        } catch (error) {
            if (!error.response) {
                console.error("No Server Response");
                window.alert("No server response!");
            } else if (error.response) {
                console.log("Error", error.response.data);
                window.alert("Login Error!");
            }
        }
    };


    return (
        <section className={styles.forg_pwd_section}>
            <h1>Sign In</h1>
            <form className={styles.forg_pwd_form} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className={styles.forg_pwd_label} htmlFor="user">Username:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="user"
                        name="user"
                        autoComplete='off'
                        onChange={handleChange}
                        value={loginData.user}
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
                        onChange={handleChange}
                        value={loginData.pwd}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary mt-3">LogIn</button>
            </form>
            <p>
                <span>
                    {/*put router link here*/}
                    <a className='text-light' href="/forgotPwd">Forgot password?</a>
                </span>
            </p>
            <p>
                Don't have an account?<br />
                <span>
                    {/*put router link here*/}
                    <a className='text-light' href="/">Register</a>
                </span>
            </p>
        </section>
    );
}

export default LogIn;