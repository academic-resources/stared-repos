import React, { useState } from 'react';
import  axiosWithAuth  from './axiosWithAuth'
import axios from 'axios';

export const Login = props => {

    const [credentials, setCredentials ] = useState({
        id:'',
        password: '',
        email: ''
       
    });

    const { password, email } = credentials;

    const url = 'https://mc-7-be.herokuapp.com'

    const onChange = e => {
        
        setCredentials({
            ...credentials,
        [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault();
        axios
        .post(`${url}/api/auth/login`, credentials)
       .then(res => {
           window.localStorage.setItem('token', res.payload)
           props.history.push('/protectedstrains')
       })
       .catch(err => console.log(err))
    }
    
    return (
       <form onSubmit={onSubmit}>
           <h2>Login</h2>
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
          

        <div>
               <input
               type="submit"
               value="Login"
               className="btn btn-block bg-dark"
               />
           </div>
           {/* <h5>Role</h5>
           <input
           type="radio"
           name="role"
           value="patient"
           checked={role === 'patient'}
           onChange={onChange}/>
           Patient{' '}
           <input
           type="radio"
           name="role"
           value="provider"
           checked={role === 'provider'}
           onChange={onChange}/>
           Provider{' '}
           <div>
               <input
               type="submit"
               value="Sign-up"
               className="btn btn-block bg-dark"
               />
           </div> */}
       </form>
    )
}

export default Login;
