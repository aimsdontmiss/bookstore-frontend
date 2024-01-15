import { useContext, React, useState } from 'react';
import AuthContext from '../context/AuthContext';
import { Container } from 'react-bootstrap';


function RegisterPage() {
    let {registerUser} = useContext(AuthContext);


    return (
        <>
            <main>
                <Container>
                    <h2>Register Page</h2>
                    <br/>
                    <form onSubmit={registerUser}>
                        <input type='text' name='first_name' placeholder='Enter First Name'/>
                        <input type='text' name='last_name' placeholder='Enter Last Name' />
                        <input type='text' name='email' placeholder='Enter Email' />
                        <input type='text' name='username' placeholder='Enter Username' />
                        <input type='password' name='password' placeholder='Enter Password' />
                        <input type='password' name='password2' placeholder='Confirm Password' />
                        <input type='submit' />
                    </form>  
                </Container>
            </main>

            
        </>
)
}

export default RegisterPage;


