
import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import './App.css';
const UserForm = ({values, touched, errors, status}) =>{
    const [user, setUser] = useState([]);
    useEffect(() =>{
        console.log(status);
        status && setUser(user => [...user, status]);
    }, [status]);
    return (
        <div className='user-form'>
            <Form>
                <h1>Sign Up</h1>
                <Field type='text' name='name' placeholder='Name' />
                {touched.name && errors.name && (
                    <p className='error'>{errors.name}</p>
                )}
                <Field type='text' name='email' placeholder='Email'/>
                <Field type='text' name='password' placeholder='Password' />
                {touched.password && errors.password && (
                    <p className='error'>{errors.password}</p>
                )}
                <label className="checkbox-container">
                    Terms of Service
                    <Field type='checkbox' name = 'tos' checked={values.tos} />
                    <span className='checkmark' />
                </label>
                <button type='submit'>Submit</button>
            </Form>
            {user.map(user =>(
                <ul key={user.id}>
                    <li>Name: </li>
                    <li>Email: </li>
                    <li>Password: </li>
                </ul>
            ))}
        </div>
    );
};
const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, tos}) {
        return {
            tos: tos || false,
            name: name || '',
            email: email || '',
            password: password || ''
        };
    },
    validationSchema: Yup.object().shape({
        name: Yup.string().required('Name is required'),
        password: Yup.string().required('Password is required')
    }),
    handleSubmit(values, { setStatus, resetForm}) {
        axios
        .post('https://reqres.in/api/users/', values)
        .then(resp =>{
            console.log(resp);
            setStatus(resp.data);
            resetForm();
        })
        .catch(err => console.log(err.responce));
    }
}) (UserForm);
export default FormikUserForm;