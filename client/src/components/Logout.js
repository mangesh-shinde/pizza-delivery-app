import React, { useEffect, useContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App'

function Logout() {
    const { dispatch } = useContext(UserContext) 
    let navigate = useNavigate()

    
    const logoutUser = async () => {
        await axios.get('/logout')
        dispatch({type: "SIGN_OUT"})
        navigate("/login")
    }

    useEffect(() => {
        logoutUser();
    })

    return (
        <div>
           
        </div>
    )
}

export default Logout
