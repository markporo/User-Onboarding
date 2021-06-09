// We want to create a form to onboard a new user to our system. We need _at least_ the following pieces of information about our new user:

// - [ ] Name
// - [ ] Email
// - [ ] Password
// - [ ] Terms of Service (checkbox)
// - [ ] A Submit button to send our form data to the server.
import React, { useState, useEffect } from 'react'
import * as yup from 'yup'

const schema = yup.object().shape({
    name: yup.string().required('name is required').min(4, 'Your name must contain 4 characters.'),
    email: yup.string().required('email is required').email(),
    password: yup.string().required('You must include a password').min(8, 'Your password must be at least 8 characters long.'),

    terms: yup.boolean().oneOf([true], 'You must accept the terms to join this club.')
})

export default function Form({ formValues, setFormValues, }) {
    const [disabled, setDisabled] = useState('true');
    const [errors, setErrors] = useState('');

    const onInputChange = (e) => {
        const { checked, value, name, type } = e.target
        const valueToUse = type === 'checkbox' ? checked : value;
        setFormValues({ ...formValues, [name]: valueToUse })
    }

    useEffect(() => {
        schema.isValid(formValues).then(validity => {
            console.log(validity, "schema validity before");
            setDisabled(!validity);
            console.log(validity, "schema validity after")
        })
    }, [formValues])

    return (<form>
        <div>
            <label>
                Name:
            <input onChange={onInputChange} name='name' value={formValues.name} type='text' />
            </label>
        </div>
        <div>
            <label>
                Email:
            <input onChange={onInputChange} name='email' value={formValues.email} type='text' />
            </label>
        </div>
        <div>
            <label>
                Password:
            <input onChange={onInputChange} name='password' value={formValues.password} type='text' />
            </label>
        </div>
        <div>
            <label>
                Terms of Service:
            <input onChange={onInputChange} name='terms' value={formValues.name} type='checkbox' checked={formValues.terms} />
            </label>
            <button disabled={disabled}>Join Club</button>
        </div>
    </form>)
}