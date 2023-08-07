import React from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';

const Navbar = ({onSearch}) => {

    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const logout = () => {
        localStorage.removeItem('accessToken');
        // navigate('/login');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/home">My App</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">

                    <ul className="navbar-nav ms-auto">
                        <li className='nav-item'>
                            <SearchBar onSearch={onSearch}/>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/home">Home</a>
                        </li>
                        <li className="nav-item">
                            {(isAdmin) && <a className="nav-link" href="/admin">Admin</a>}
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href='/login' onClick={logout}>LogOut</a>
                        </li>
                    </ul>


                </div>
            </div>
        </nav>

    )
}

export default Navbar;