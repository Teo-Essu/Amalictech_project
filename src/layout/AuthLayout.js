import React from 'react'
import { Outlet } from 'react-router-dom';
import styles from '../components/signUp.module.css';

const AuthLayout = () => {
  return (
    <main>
        <div className={styles.AuthApp}>
            <Outlet/>
        </div>
    </main>
  )
}

export default AuthLayout;