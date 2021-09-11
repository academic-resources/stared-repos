import React, { useState } from 'react';
import axiosWithAuth from './axiosWithAuth';
import axios from 'axios'


export const SignUp = props => {
    const [credentials, setCredentials ] = useState({
        
        email: '',
        password: '',
        username: '',
        role: 'Patient'
        
    });

    const url = 'https://mc-7-be.herokuapp.com'

    const { email, password, username } = credentials;

    const onChange = e => {
        
        setCredentials({
            ...credentials,
        [e.target.name]: e.target.value
        })
    }

    const signUpSubmit = (e) => {
        e.preventDefault();
       axios
       .post(`${url}/api/auth/register`, credentials)
       .then(res => {
           localStorage.setItem('token', res.data)
           props.history.push('/protected')
       })
       .catch(err => console.log(err))
    }
    
    return (
       <form onSubmit={signUpSubmit}>
           <h2 className="text-primary">Sign-Up</h2>
           <input
           name="email"
           type="email"
           placeholder="email"
           value={email}
           onChange={onChange}
           />
            <input
            name="password"
           type="password"
           placeholder="password"
           value={password}
           onChange={onChange}
           />
            <input
            name="username"
           type="text"
           placeholder="username"
           value={username}
           onChange={onChange}
           />
           {/* <h5>Role</h5>
           <input
           type="radio"
           name="role"
           value="patient"
           checked={credentials.role === 'patient'}
           onChange={onChange}/>
           Patient{' '}
           <input
           type="radio"
           name="role"
           value="provider"
           checked={credentials.role === 'provider'}
           onChange={onChange}/>
           Provider{' '} */}
           
           <div>
               <input
               type="submit"
               value="Sign-up"
               className="btn btn-block bg-dark"
               />
           </div>
       </form>
    )
}

export default SignUp;
