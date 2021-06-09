// import logo from './logo.svg';
import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './App.css';
import Form from './components/Form'
import User from './components/user'


function App() {
  const [formValues, setFormValues] = useState({ name: "", email: "", password: "", terms: "" })
  const [users, setUserToUsers] = useState([]);
  const API_URL = 'https://reqres.in/api/users';


  useEffect(() => {
    axios
      .get(API_URL)
      .then(res => {
        const userFromApi = res.data
        setUserToUsers(userFromApi)
      })
      .catch(err => console.log(err))
  }, [])


  console.log(users, "users state");
  return (
    <div className="App">
      <Form API_URL={API_URL} formValues={formValues} setFormValues={setFormValues} users={users} setUserToUsers={setUserToUsers} />
      <h3>Current Club List:</h3>
      {/* <User userinfo={users[0]} /> */}
      {/* {
        users.map(user => {
          return (
            <User userinfo={user} />
          )
        })
      } */}
    </div>
  );
}

export default App;
