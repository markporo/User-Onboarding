import React, { useState, useEffect } from 'react'
import * as yup from 'yup'
import axios from 'axios'

// schema via yup for form values validation
const schema = yup.object().shape({
    name: yup.string().required('name is required').min(4, 'Your name must contain 4 characters.'),
    email: yup.string().required('email is required').email(),
    password: yup.string().required('You must include a password').min(8, 'Your password must be at least 8 characters long.'),

    terms: yup.boolean().oneOf([true], 'You must accept the terms to join this club.')
})

// Form App
export default function Form({ API_URL, formValues, setFormValues, setUserToUsers, users }) {
    // states
    const [disabled, setDisabled] = useState('true');
    const [errors, setErrors] = useState({ name: "", email: "", password: "", terms: "" });

    // function for change handler
    const onInputChange = (e) => {
        const { checked, value, name, type } = e.target
        const valueToUse = type === 'checkbox' ? checked : value;
        setFormErrors(name, valueToUse)
        setFormValues({ ...formValues, [name]: valueToUse })
    }

    // post request
    const postUsersToDB = () => {
        const newUser = { name: formValues.name.trim(), email: formValues.email.trim(), password: formValues.password.trim(), terms: formValues.terms }
        axios.post(API_URL, newUser)
            .then((res) => {
                setUserToUsers([...users, newUser])
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => {
                setFormValues({ name: "", email: "", password: "", terms: "" });
                console.log(users, "users state after submission of newUser")
            });
    }

    //Submit Form function
    function submit(e) {
        e.preventDefault()
        postUsersToDB();
    }

    //function for setting errors via yup schema; 
    //If specifications for each input is not met then
    //an error shows to the user
    function setFormErrors(name, value) {
        yup.reach(schema, name).validate(value)
            .then(() => setErrors({ ...errors, [name]: '' }))
            .catch(err => setErrors({ ...errors, [name]: err.errors[0] }))
    }

    //CHECKING FULL VALIDITY OF FORM VIA YUP SCHEMA; IF VALID THEN 
    //SUBMIT BUTTON IS ENABLED
    useEffect(() => {
        schema.isValid(formValues).then(validity => {
            console.log(validity, "schema validity before");
            setDisabled(!validity);
            console.log(validity, "schema validity after")
        })
    }, [formValues])

    return (
        //JSX that creates the structure of the Form
        <form onSubmit={submit} style={{ margin: '100px auto', padding: "30px 0", border: "1px solid black", width: "350px", }}>
            <h2>Join The Club</h2>
            <div style={{ color: 'red' }}>
                <div>{errors.name}</div><div>{errors.email}</div><div>{errors.password}</div><div>{errors.terms}</div>
            </div>
            <div style={{ padding: "10px 0" }} >
                <label>
                    Name:
            <input onChange={onInputChange} name='name' value={formValues.name} type='text' />
                </label>
            </div>
            <div style={{ padding: "10px 0" }}>
                <label>
                    Email:
            <input onChange={onInputChange} name='email' value={formValues.email} type='text' />
                </label>
            </div>
            <div style={{ padding: "10px 0" }}>
                <label>
                    Password:
            <input onChange={onInputChange} name='password' value={formValues.password} type='text' />
                </label>
            </div>
            <div style={{ padding: "10px 0" }}>
                <label>
                    Terms of Service:
            <input onChange={onInputChange} name='terms' value={formValues.name} type='checkbox' checked={formValues.terms} />
                </label>
                <button disabled={disabled}>Join Club</button>
            </div>
        </form>)
}