import React, { useState, useEffect } from 'react';
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "axios";
// import { useInput } from './CustomHooks/InputHook'
import styled from 'styled-components'
import UsersData from './UsersData'
import DisplayForm from './DisplayForm'

const Button = styled.button`
  background: #002244;
  border-radius: 3px;
  border: 2px solid #69BE28;
  color: #A5ACAF;
  font-weight: bold;
  margin: 0 1em;
  padding: 0.25em 1em;
`
const UserForm = ({ values, errors, touched, isSubmitting, status }) => {
    const [user, setUser] = useState([...UsersData]);
    useEffect(() =>{
        console.log(status);
        status && setUser(user => [...user, status]);
    }, [status]);

    return (
        <div className='user-form'>      
        <Form>
            {touched.name && errors.name && <p>{errors.name}</p>}
            {touched.email && errors.email && <p>{errors.email}</p>}
            {touched.password && errors.password && <p>{errors.password}</p>}
            {touched.tos && errors.tos && <p>{errors.tos}</p>}
            <Field type="text" name="name" placeholder="Name" value={values.name} />
            <Field type="email" name="email" placeholder="Email" value={values.email} />
            <Field type="password" name="password" placeholder="Password" value={values.password} />
            <label><Field type="checkbox" name="tos" checked={values.tos} />Accept TOS</label>
            <Button type="submit">Submit!</Button>
        </Form>
        <DisplayForm list={user} />
        </div>
      
  );
}



const FormikForm = withFormik({    
    mapPropsToValues({ name, email, password, tos }) {
        return {
        name: name || "",
        email: email || "",
        password: password || "",
        tos: tos || false
        };
        },
        // validation schema
        validationSchema: Yup.object().shape({
            name: Yup.string()
                .min(5, "Name not valid")
                .required("Name is required"),
            email: Yup.string()
                .email("Email not valid")
                .required("Email is required"),
            password: Yup.string()
                .min(6, "Password must be 6 characters or longer")
                .required("Password is required"),
            tos: Yup.bool()
                .test(
                    'tos',
                    'You have to agree with our Terms of Service!',
                    value => value === true
                )
                .required(
                    'You have to agree with our Terms of Service!'
                ),
    }),

    handleSubmit(values, { setStatus, resetForm, setErrors, setSubmitting }) {
        
        if (values.email === "waffle@syrup.com") {
            setErrors({ email: "That email is already taken" });
        } else {
            axios
                .post("https://reqres.in/api/users", values)
                .then(res => {
                    console.log("response = " + res.data); // Data was created successfully and logs to console
                    setStatus(res.data);
                    resetForm();
                    setSubmitting(false);
                })
                .catch(err => {
                    console.log(err); // logs error creating the data 
                    setSubmitting(false);
                });                
                    
            }
    }

})(UserForm);

export default FormikForm;