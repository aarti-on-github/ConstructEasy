import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import axios from 'axios';
import BACKEND_URL from '../backend';
import { Navigate } from 'react-router-dom';

function UpdateWorker() {
  const { workerId } = useParams();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [profilePic, setProfilePic] = useState(null);
  const [salary, setSalary] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkerDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BACKEND_URL}/api/getWorker/${workerId}`);
        const workerDetails = response.data; // Adjust based on your backend response format
        setName(workerDetails.name);
        setAge(workerDetails.age);
        setGender(workerDetails.gender);
        setProfilePic(null); // You may want to handle profile pic separately
        setSalary(workerDetails.salary);
        setAddress(workerDetails.address);
        setContact(workerDetails.contact);
      } catch (err) {
        console.error('Error fetching worker details:', err);
        setError('Error fetching worker details');
      } finally {
        setLoading(false);
      }
    };

    fetchWorkerDetails();
  }, [workerId]);

  const handleFileChange = (event) => {
    setProfilePic(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('age', age);
      formData.append('gender', gender);
      formData.append('profile_pic', profilePic);
      formData.append('salary', salary);
      formData.append('address', address);
      formData.append('contact', contact);

      const response = await axios.put(`${BACKEND_URL}/api/updateWorker/${workerId}`, formData);
      if (response.status === 200) {
        alert('Worker updated successfully');
        setRedirect(true);
      }
    } catch (err) {
      console.error(err);
      setError('Error updating worker');
    } finally {
      setLoading(false);
    }
  };

  if (redirect) {
    // Redirect to the worker list page or another page after successful update
    return <Navigate to={'/'} />;
  }

  return (
    <div className="updatew">
      <Navbar />
      <h3>Update Worker Information</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="profilePhoto">Profile Photo</label>
        <input
          type="file"
          id="profilePhoto"
          onChange={handleFileChange}
          accept="image/*"
        />

        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(ev) => setName(ev.target.value)}
          required
        />

        <label htmlFor="age">Age</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(ev) => setAge(ev.target.value)}
          required
        />

        <label htmlFor="gender">Gender</label>
        <select
          id="gender"
          name="gender"
          value={gender}
          onChange={(ev) => setGender(ev.target.value)}
          required
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>

        <label htmlFor="address">Address</label>
        <textarea
          id="address"
          name="address"
          rows="4"
          value={address}
          onChange={(ev) => setAddress(ev.target.value)}
          required
        ></textarea>

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          pattern="[0-9]{10}"
          value={contact}
          onChange={(ev) => setContact(ev.target.value)}
          required
        />

        <label htmlFor="salary">Salary</label>
        <input
          type="number"
          id="salary"
          name="salary"
          value={salary}
          onChange={(ev) => setSalary(ev.target.value)}
          required
        />

        {loading ? (
          <button type="button" disabled>
            Updating...
          </button>
        ) : (
          <button type="submit">Update Worker</button>
        )}

        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default UpdateWorker;
