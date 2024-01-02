import React from 'react'
import ScrollTop from './ScrollTop'
import Navbar from './Navbar'
import { useState } from 'react';
import {Navigate} from 'react-router-dom'

function Addworker() {

  const [name, setname] = useState('');
  const [age, setage] = useState('');
  const [gender, setgender] = useState('');
  const [files, setFiles] = useState('');
  const [salary, setsalary] = useState('');
  const [add, setadd] = useState('');
  const [phno, setphno] = useState('');
  const [redirect, setRedirect] = useState(false);

  async function Addnewworker(ev) {
    const data = new FormData();
    data.set('name', setname);
    data.set('age', setage);
    data.set('salary', setsalary);
    data.set('file', files[0]);
    data.set('gender', setgender);
    data.set('phno', setphno);
    data.set('add', setadd);
    ev.preventDefault();
    const response = await fetch(`http://localhost:5000/addWorker`, {
      method: 'POST',
      body: data,
      credentials: 'include',
    });
    console.log('Name:', ev.target.name.value);
    if (response.ok) {
      setRedirect(true);
    }
  }
  if (redirect) {
    return <Navigate to={'/'} />
  }
  return (
    <div className='addw'>
      <Navbar />
      <h3>Add worker infomation</h3>
      <form onSubmit={(e)=>Addnewworker(e)}>
        <label for="profilePhoto">Profile Photo</label>
        <input type="file"
          id="profilePhoto"
          onChange={ev => setFiles(ev.target.files)}
          accept="image/*" />

        <label for="name">Name</label>
        <input type="text" id="name" value={name}
          onChange={ev => setname(ev.target.value)}
          required />

        <label for="age">Age</label>
        <input type="number"
          id="age"
          value={age}
          onChange={ev => setage(ev.target.value)}
          required />

        <label for="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          value={gender}
          onChange={ev => setgender(ev.target.value)}
          required>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label for="address" id='addres'>Address</label>
        <textarea
          id="address"
          name="address"
          rows="4"
          value={add}
          onChange={ev => setadd(ev.target.value)}
          required></textarea>

        <label for="phoneNumber">Phone Number</label>
        <input type="tel"
          id="phoneNumber"
          name="phoneNumber"
          pattern="[0-9]{10}"
          value={phno}
          onChange={ev => setphno(ev.target.value)}
          required />

        <label for="salary">Salary</label>
        <input type="number"
          id="salary"
          name="salary"
          value={salary}
          onChange={ev => setsalary(ev.target.value)}
          required />

        <button type="submit">Submit</button>

      </form>
    </div>
  )
}

export default Addworker
