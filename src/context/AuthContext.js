import { createContext, useState } from "react";
import jwt_decode from 'jwt-decode';
import {useNavigate} from 'react-router-dom';

const AuthContext = createContext()

export default AuthContext;

export const AuthProvider = ({children}) => {

    let [authTokens, setAuthTokens] = useState(() => localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')): null)
    let [user, setUser] = useState(() => localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')): null)

    const history = useNavigate()

    let loginUser = async (e) => {

        e.preventDefault()

        let response = await fetch('http://127.0.0.1:8000/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'username': e.target.username.value, 'password': e.target.password.value})
        })

        let data = await response.json()

        if (response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access))
            localStorage.setItem('authTokens', JSON.stringify(data)) 
            history('/')
        }else{
            alert('Something went wrong with login!')
        }

    }

    let registerUser = async (e) => {

        e.preventDefault()

            let response = await fetch('http://127.0.0.1:8000/api/user-register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                                    'first_name': e.target.first_name.value, 
                                    'last_name': e.target.last_name.value,
                                    'email': e.target.email.value, 
                                    'username': e.target.username.value, 
                                    'password': e.target.password.value,
                                    'password2': e.target.password2.value,
                                    })
            })

            let data = await response.json()

            if (response.status === 200){
                console.log('DATA: ', data)
                alert('KUDOS for signing up!')
                history('/login')
            }else{
                alert('Something went wrong with register!')
            }


    }



    let logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        localStorage.removeItem('authTokens')
        localStorage.removeItem('cart')
        history('/login')
    }

    let contextData = {
        user: user,
        loginUser: loginUser,
        logoutUser: logoutUser,
        registerUser: registerUser
    }

    return(
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )

}

