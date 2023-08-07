import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './signUp.module.css';

const VerifyOtp = () => {


    const navigate = useNavigate();
    const [codet, setOtp] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3500/verifyOTP', { codet });
            console.log(response.data);
            window.alert("OTP is valid");
            navigate('/resetPwd');
        } catch (error) {
            if (!error.response) {
                console.error("No Server Response");
            } else if (error.response) {
                console.log("Error", error.response.data);
                window.alert("Invalid OTP");
            }
        }
    }


    return (
        <section className={styles.forg_pwd_section}>
            <h1>Verify OTP</h1>
            <form className={styles.forg_pwd_form} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className={styles.forg_pwd_label} htmlFor="otp">OTP:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="otp"
                        name="otp"
                        autoComplete='off'
                        onChange={(e) => { setOtp(e.target.value) }}
                        value={codet}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </section>
    )
}

export default VerifyOtp;