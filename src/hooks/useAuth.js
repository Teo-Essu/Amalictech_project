import jwtDecode from "jwt-decode";

import React from 'react'

const useAuth = () => {
    const token = localStorage.getItem('accessToken');
    let status = "User";
    let isAdmin = false;
    // console.log(token);

    if (token) {
        const decoded = jwtDecode(token);
        const { username, roles } = decoded.UserInfo;
        // console.log(roles);

        isAdmin = roles.includes(5150);
        
        // if (isAdmin) status = "Admin";

        return { isAdmin }
    }
    return { username: status }
}

export default useAuth;