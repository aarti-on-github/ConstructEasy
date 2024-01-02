import React from 'react'
import ScrollTop from './ScrollTop'
import Navbar from './Navbar'
import { useState } from 'react';
import {Navigate} from 'react-router-dom'

function Addworker() {

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [profile_pic, setProfile_pic] = useState('');
  const [salary, setSalary] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [redirect, setRedirect] = useState(false);

  const formDataToObj = (formData) => {
    const obj = {};
    formData.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  };

  async function Addnewworker(ev) {
    const data = new FormData();
     data.set('name', name);
     data.set('age', age);
     data.set('salary', salary);
     data.set('profile_pic', profile_pic[0]);
     data.set('gender', gender);
     data.set('contact', contact);
     data.set('address', address);
     const dataObj = formDataToObj(data);
    ev.preventDefault();
    const response = await fetch(`http://localhost:5000/api/addWorker`, {
      method: 'POST',
      body: JSON.stringify(dataObj),
      credentials: 'include',
    });
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
          onChange={ev => setProfile_pic(ev.target.files)}
          accept="image/*" />

        <label for="name">Name</label>
        <input type="text" id="name" value={name}
          onChange={ev => setName(ev.target.value)}
          required />

        <label for="age">Age</label>
        <input type="number"
          id="age"
          value={age}
          onChange={ev => setAge(ev.target.value)}
          required />

        <label for="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          value={gender}
          onChange={ev => setGender(ev.target.value)}
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
          value={address}
          onChange={ev => setAddress(ev.target.value)}
          required></textarea>

        <label for="phoneNumber">Phone Number</label>
        <input type="tel"
          id="phoneNumber"
          name="phoneNumber"
          pattern="[0-9]{10}"
          value={contact}
          onChange={ev => setContact(ev.target.value)}
          required />

        <label for="salary">Salary</label>
        <input type="number"
          id="salary"
          name="salary"
          value={salary}
          onChange={ev => setSalary(ev.target.value)}
          required />

        <button type="submit">Submit</button>

      </form>
    </div>
  )
}

export default Addworker
