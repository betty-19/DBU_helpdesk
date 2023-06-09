import React, { useState } from 'react';
//import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../assets/css/SignUp.css'; // Create a separate CSS file for Signup page styles
import axios from 'axios'
const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [officeBlock, setOfficeBlock] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [favoriteNumber, setFavoriteNumber] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [employeeId, setEmployeeId] = useState(''); 
  const [favoriteColor, setFavoriteColor] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  //const navigate = useNavigate();

  const [errors, setErrors] = useState({});

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
    setErrors({ ...errors, firstName: '' });
  };
  const handleEmployeeIdChange = (e) => {
    setEmployeeId(e.target.value);
    setErrors({ ...errors, employeeId: '' });
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
    setErrors({ ...errors, lastName: '' });
  };

  const handleOfficeBlockChange = (e) => {
    setOfficeBlock(e.target.value);
    setErrors({ ...errors, officeBlock: '' });
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
    setErrors({ ...errors, phoneNumber: '' });
  };

  const handleFavoriteNumberChange = (e) => {
    setFavoriteNumber(e.target.value);
    setErrors({ ...errors, favoriteNumber: '' });
  };

  const handleBirthDateChange = (e) => {
    setBirthDate(e.target.value);
    setErrors({ ...errors, birthDate: '' });
  };

  const handleFavoriteColorChange = (e) => {
    setFavoriteColor(e.target.value);
    setErrors({ ...errors, favoriteColor: '' });
  };

  const handleSignup = () => {
    // Perform validation
    let validationErrors = {};
    if (!firstName) {
      validationErrors.firstName = 'Please enter your First Name';
    } else if (/\d/.test(firstName)) {
      validationErrors.firstName = 'First Name cannot contain numbers';
    }

    if (!lastName) {
      validationErrors.lastName = 'Please enter your Last Name';
    } else if (/\d/.test(lastName)) {
      validationErrors.lastName = 'Last Name cannot contain numbers';
    }

    if (!officeBlock) {
      validationErrors.officeBlock = 'Please enter your Office Block';
    }

    if (!phoneNumber) {
      validationErrors.phoneNumber = 'Please enter your Phone Number';
    } else if (/\D/.test(phoneNumber)) {
      validationErrors.phoneNumber = 'Phone Number cannot contain letters';
    }

    if (!favoriteNumber) {
      validationErrors.favoriteNumber = 'Please enter your Favorite Number';
    } else if (/\D/.test(favoriteNumber)) {
      validationErrors.favoriteNumber = 'Favorite Number cannot contain letters';
    }

    if (!birthDate) {
      validationErrors.birthDate = 'Please enter your Birth Date';
    } else {
      const currentDate = new Date();
      const selectedDate = new Date(birthDate);

      if (selectedDate > currentDate) {
        validationErrors.birthDate = 'Birth Date cannot be in the future';
      } else if (selectedDate.getFullYear() > 2002) {
        validationErrors.birthDate = 'Birth Date cannot be after 2002';
      }
    }

    if (!favoriteColor) {
      validationErrors.favoriteColor = 'Please enter your Favorite Color';
    } else if (/\d/.test(favoriteColor)) {
      validationErrors.favoriteColor = 'Invalid Favorite Color';
    }
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setErrors((prevErrors) => ({
        ...prevErrors,
        general: 'Please enter all fields',
      }));
    } else {
      // Clear any previous general error message
      setErrors({});
    }
      // Perform signup logic with form data
      console.log('Signup clicked');
      // const username = lastName;
      // const password = phoneNumber;
      setUsername('Username: '+employeeId + '@helpdesk.dbu');
      setPassword('Password: '+'#dbu1234' + lastName);
  
      axios
        .post('http://localhost:5005/signup', {
          firstName,
          lastName,
          officeBlock,
          phoneNumber,
          favoriteNumber,
          birthDate,
          favoriteColor,
          employeeId,
        })
        .then((response) => {
          console.log('Signup successful:', response.data);
          //navigate('/');
          // Handle successful signup, e.g., redirect to a success page
        })
        .catch((error) => {
          setUsername('Error during signup: ' + error.response.data.error);
          setPassword('');
          console.error('Error during signup: ', error.response.data);
          // Handle error during signup
        });
    
  };
  
  
  

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2>Signup</h2>
        <div className="signup-form">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={handleFirstNameChange}
            />
            {errors.firstName && <p className="error">{errors.firstName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={handleLastNameChange}
            />
                       {errors.lastName && <p className="error">{errors.lastName}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="officeBlock">Office Block</label>
            <input
              type="text"
              id="officeBlock"
              value={officeBlock}
              onChange={handleOfficeBlockChange}
            />
            {errors.officeBlock && <p className="error">{errors.officeBlock}</p>}
          </div>
          <div className="form-group">
  <label htmlFor="employeeId">Employee ID</label>
  <input
    type="text"
    id="employeeId"
    value={employeeId}
    onChange={handleEmployeeIdChange}
  />
  {errors.employeeId && <p className="error">{errors.employeeId}</p>}
</div>

          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number</label>
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
            />
            {errors.phoneNumber && <p className="error">{errors.phoneNumber}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="favoriteNumber">Favorite Number</label>
            <input
              type="text"
              id="favoriteNumber"
              value={favoriteNumber}
              onChange={handleFavoriteNumberChange}
            />
            {errors.favoriteNumber && <p className="error">{errors.favoriteNumber}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="birthDate">Birth Date</label>
            <input
              type="date"
              id="birthDate"
              value={birthDate}
              onChange={handleBirthDateChange}
            />
            {errors.birthDate && <p className="error">{errors.birthDate}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="favoriteColor">Favorite Color</label>
            <input
              type="text"
              id="favoriteColor"
              value={favoriteColor}
              onChange={handleFavoriteColorChange}
            />
            {errors.favoriteColor && <p className="error">{errors.favoriteColor}</p>}
          </div>
           {/* Temporary username and password */}
           {username && (
            <div>
              <p>{username}</p>
              <p>{password}</p>
            </div>
          )}

          <button onClick={handleSignup}>Signup</button>
          {errors.general && <p className="error">{errors.general}</p>}

        </div>
      </div>
    </div>
  );
};

export default Signup;
