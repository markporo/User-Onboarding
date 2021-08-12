import './App.css';
import Form from './Components/Form';
import { useEffect, useState } from 'react';
import schema from './Validation/schema';
import * as yup from 'yup'
import axios from 'axios';
import styled from 'styled-components';

const StyledLi = styled.ul`
  text-align: center;
  list-style-type: none;
`;

const defaultFormValues = { name: '', email: '', password: '', terms: false }
const initialFormErrors = {
  name: '',
  email: '',
  password: '',
  terms: '',
}

function App() {
  // state
  const [users, setUsers] = useState([{ name: 'Jeff', email: 'jeff@jeff.com', password: 'sweet', terms: false }]);
  const [formValues, setFormValues] = useState(defaultFormValues);
  const [formErrors, setFormErrors] = useState(initialFormErrors);
  const [disabled, setDisabled] = useState(true);

  // get existing users from axios
  // useEffect(() => {
  //   axios
  //     .get('https://reqres.in/api/users')
  //     .then(res => {
  //       const existingUsers = res.data;
  //       setUsers(existingUsers);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // })


  //Functions
  const onChange = (e) => {
    const { checked, type, name, value } = e.target;
    const valueToUse = type === "checkbox" ? checked : value;

    // yup validation/ set errors or no errors
    yup.reach(schema, name)
      .validate(valueToUse)
      .then(() => {
        setFormErrors({ ...formErrors, [name]: '' })
      })
      .catch(err => {
        setFormErrors({ ...formErrors, [name]: err.message })
      })


    setFormValues({
      ...formValues,
      [name]: valueToUse // NOT AN ARRAY, nice little syntax: dynamic property, computed property
    })

  }

  const onSubmit = (e) => {
    e.preventDefault()
    const newUser = {
      name: formValues.name.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      terms: formValues.terms
    }
    // POST NEW FRIEND USING HELPER
    axios
      .post('https://reqres.in/api/users', newUser)
      .then(res => {
        console.log(res.data);
        setUsers([...users, newUser])
      })
      .catch(err => console.log(err))
      .finally(() => {
        setFormValues(defaultFormValues);
        console.log(users, 'users from finally submit')
      })
  }

  // unlock submit button
  useEffect(() => {
    schema.isValid(formValues)
      .then(isSchemaValid => {
        setDisabled(!isSchemaValid);
      })
  }, [formValues])


  return (
    <div className="App">
      <ul>
        {
          users.map(eachUser => {
            return (
              <StyledLi>{(eachUser.name)} --- {(eachUser.email)}</StyledLi>
            )
          })
        }
      </ul>
      {<div>
        <div>{formErrors.name}</div>
        <div>{formErrors.email}</div>
        <div id='pwErrors'>{formErrors.password}</div>
        <div>{formErrors.terms}</div>
      </div>
      }
      <Form formValues={formValues} onChange={onChange} onSubmit={onSubmit} formErrors={formErrors} disabled={disabled} />
    </div>
  );
}

export default App;
