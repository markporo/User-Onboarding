import React, { useState } from 'react'


export default function User(props) {
    const { name, email, } = props;
    let [count, setCount] = useState(0);
    console.log(name, email, "name and email from user.js");

    return (<div>
        <h4>{count + 1}. {name}</h4>
        <p>{email}</p>
        {setCount(count++)}
    </div>)
}