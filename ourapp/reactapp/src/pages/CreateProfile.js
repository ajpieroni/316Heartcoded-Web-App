import "./CreateProfile.css";
import React, { useState, useEffect } from 'react';
import { useContext } from "react";
import axios from 'axios';
import { UserContext } from "../components/contexts/UserContext";


export default function UserForm({ onUserAdded }) {

  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    birthday: '',
    bio: '',
    location: '',
    preferences: '',
    password_digest: '',
    red_flags: []
  });


    function StatesList({ onStateSelected }) {
      const [states, setStates] = useState([]);
    
      useEffect(() => {
        axios.get('http://localhost:3000/states')
          .then(response => {
            setStates(response.data);
          })
          .catch(error => {
            console.error('Error fetching states:', error);
          });
      }, []);
    
      return (
        <div>
          <label>
            Select Your Location<span style={{ color: 'red' }}>*</span>: 
            <select onChange={onStateSelected} required value={formData.location}>
              <option value="">Select a state</option>
              {states.map(state => (
                <option key={state.id} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      );
    }


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleStateSelected = (e) => {
    const selectedState = e.target.value;
    setFormData({ ...formData, location: selectedState });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://localhost:3000/test_users`, formData);
      onUserAdded(response.data);
      setFormData({ name: '', gender: '', preferences: '', birthday: '', bio: '', location: '', red_flags: [], password_digest: '' });
    } catch (error) {
      console.error('Error adding a new user:', error);
    }
  };

  const [isPasswordUpdateVisible, setPasswordUpdateVisible] = useState(false);

  const [selectedRedFlags, setSelectedRedFlags] = useState([]);

  const redFlagsOptions = [
    "Vanity",
    "Environmental Consciousness",
    "Spirituality",
    "Family",
    "Career",
    "Adventure",
    "Trustfulness",
    "Frugality",
    "Sentimentality",
    "Creativity",
    "Traditionalism",
    "Assertiveness"
  ];

  const handleRedFlagsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedRedFlags(selectedOptions);
    console.log(selectedOptions);
    setFormData({ ...formData, red_flags: selectedOptions });
    console.log(formData);
  };

  return (
    <div className="user-form">
      <h2>Welcome to HeartCoded</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name<span style={{ color: 'red' }}>*</span>: 
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Gender<span style={{ color: 'red' }}>*</span>:  
          <select
            name="gender"
            value={formData.gender}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="F">Female</option>
            <option value="M">Male</option>
            <option value="Nonbinary">Nonbinary</option>
            <option value="other">Other</option>
          </select>
        </label>

        <label>
          Birthday<span style={{ color: 'red' }}>*</span>: 
          <input
            type="date"
            name="birthday"
            value={formData.birthday}
            onChange={handleInputChange}
            required
          />
        </label>
        <StatesList onStateSelected={handleStateSelected} />
        <label>
          Who would you like to meet<span style={{ color: 'red' }}>*</span>: 
          <select
            name="preferences"
            value={formData.preferences}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="F">Female</option>
            <option value="M">Male</option>
            <option value="Nonbinary">Nonbinary</option>
            <option value="Open">Open to any</option>
          </select>
        </label>
        <label>
          Bio: 
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </label>
        <label>
          What are your red flags?
          <select
            multiple
            name="red_flags"
            value={formData.red_flags}
            onChange={handleRedFlagsChange}
          >
            {redFlagsOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
        <div>
          {/* <p>Selected Red Flags:</p> */}
          <div>
            {selectedRedFlags.map((flag) => (
              <div key={flag} className="selected-flag">
                {flag}
              </div>
            ))}
          </div>
        </div>
        <button className="profile-button"
        type="button"
        onClick={() => setPasswordUpdateVisible(!isPasswordUpdateVisible)}
      >
        Update password?
      </button>
      {isPasswordUpdateVisible && (
        <label>
          Update Password: 
          <input
            type="password"
            name="password_digest"
            value={formData.password_digest}
            onChange={handleInputChange}
            // required
          />
        </label>
        )}
        <br></br>
        <button className="profile-button" type="submit">Submit Info</button>
      </form>
    </div>
  );
}