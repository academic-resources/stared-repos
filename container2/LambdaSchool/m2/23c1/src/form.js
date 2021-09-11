import React, { useState, useEffect } from 'react';
import TeamMembersData from './teamMembersData'
import { useInput } from './CustomHooks/InputHook'

const Form = props => {
    
    const [user, setUser] = useState({});

    const [users, setUsers] = useState([...TeamMembersData]);

    const addUser = user => {
        setUsers( [...users, user] );
    };

    const {value:name, hook:bindName} = useInput('')
    const {value:email, hook:bindEmail} = useInput('')
    const {value:role, hook:bindRole} = useInput('')


    const handleChange = event => { setUser({ ...user, [event.target.name]: event.target.value }); };

    const handleSubmit = event => {
        event.preventDefault();
        console.log("user variable on submit:  " + `${user}:  ${name} ${email} ${role}`);
        console.log("users variable on submit " + `${users}`);
        props.addUser(user);
    }

        // users.setState(users);   

        useEffect(
            () => {
                setUser({
                    name: name,
                    role: role,
                    email: email
                })
            }, [name, role, email]
        )

return (
    
    <div className="App">
        <form onSubmit={handleSubmit}>
            <label>
                Name:
            <input
                    type="text"
                    name="name"
                    placeholder="Enter name here"
                    {...bindName}
                />
            </label>
            <label>
                Email:
            <input
                    type="text"
                    name="email"
                    placeholder="Enter e-mail here"
                    {...bindEmail}
                />
            </label>
            <label>
                Role:
            <input
                    type="text"
                    name="role"
                    placeholder="Enter job role here"
                    {...bindRole}
                />
            </label>
      <button type="submit" onClick={handleSubmit}>Submit!</button>
        </form>
    </div>
    
);
}

export default Form;