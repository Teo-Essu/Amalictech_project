import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './signUp.module.css';

const ResetPwd = () => {


    const navigate = useNavigate();
    const [pwd, setPwd] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3500/resetPwd', { pwd });
            console.log(response.data);
            window.alert("Password reset successfull!");
            navigate('/login');
        } catch (error) {
            if (!error.response) {
                console.error("No Server Response");
            } else if (error.response) {
                console.log("Error", error.response.data);
                window.alert("Password reset failed");
            }
        }
    }



    return (
        <section className={styles.forg_pwd_section}>
            <h1>Forgot Password</h1>
            <form className={styles.forg_pwd_form} onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className={styles.forg_pwd_label} htmlFor="pwd">New Password:</label>
                    <input
                        type="password"
                        className="form-control"
                        id="pwd"
                        name="pwd"
                        autoComplete='off'
                        onChange={(e) => { setPwd(e.target.value) }}
                        value={pwd}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </section>
    );
}

export default ResetPwd;