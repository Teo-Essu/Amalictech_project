import React, { useState } from 'react'
import axios from 'axios';
import styles from './signUp.module.css';
import { useNavigate } from 'react-router-dom';

const ForgotPwd = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3500/forgetPass', { email });
            console.log(response.data);
            window.alert(response.data);
            navigate('/verifyOtp');
        } catch (error) {
            if (!error.response) {
                console.error("No Server Response");
            } else if (error.response) {
                console.log("Error", error.response.data);
                window.alert(error.response.data);
            }
        }
    }

    return (
        <section className={styles.forg_pwd_section}>
            <h1>Forgot Password</h1>
            <form className={styles.forg_pwd_form} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className={styles.forg_pwd_label} htmlFor="email">Email:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="email"
                        name="email"
                        autoComplete='off'
                        onChange={(e) => { setEmail(e.target.value) }}
                        value={email}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </section>
    );
}

export default ForgotPwd;