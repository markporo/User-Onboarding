// import logo from './logo.svg';
import axios from 'axios'
import React, { useState } from 'react'
import './App.css';
import Form from './components/Form'


function App() {
  const [formValues, setFormValues] = useState({ name: "", email: "", password: "", terms: "" })




  return (
    <div className="App">
      <Form formValues={formValues} setFormValues={setFormValues} />
    </div>
  );
}

export default App;
