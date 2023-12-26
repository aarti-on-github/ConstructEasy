import React from 'react'
import ScrollTop from './ScrollTop'
import Navbar from './Navbar'

function Addworker() {
  return (
    <div>
      <Navbar/>
      <h2>Worker Details</h2>
    <form>
     <label for="profilePhoto">Profile Photo</label>
    <input type="file" id="profilePhoto" name="profilePhoto" accept="image/*"/>

    <label for="name">Name</label>
    <input type="text" id="name" name="name" required/>

    <label for="age">Age</label>
    <input type="number" id="age" name="age" required/>

    <label for="gender">Gender</label>
    <select id="gender" name="gender" required>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <option value="other">Other</option>
    </select>

    <label for="address" id='addres'>Address</label>
    <textarea id="address" name="address" rows="4" required></textarea>

    <label for="phoneNumber">Phone Number</label>
    <input type="tel" id="phoneNumber" name="phoneNumber" pattern="[0-9]{10}" required/>
    
    <label for="salary">Salary</label>
    <input type="number" id="salary" name="salary" required/>

    <button type="submit">Submit</button>

     </form>
    </div>
  )
}

export default Addworker
