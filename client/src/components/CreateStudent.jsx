import React, { useState } from 'react';

function CreateStudent({ onStudentCreated }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    rollNo: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
  });

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const { firstName, lastName, rollNo, password, confirmPassword, contactNumber } = formData;
    document.querySelectorAll('input').forEach(input => {
      input.classList.remove('highlight');
    });
    let firstEmptyField = null;

    if (!firstName) firstEmptyField = 'firstName';
    else if (!lastName) firstEmptyField = 'lastName';
    else if (!rollNo) firstEmptyField = 'rollNo';
    else if (!password) firstEmptyField = 'password';
    else if (!confirmPassword) firstEmptyField = 'confirmPassword';
    else if (!contactNumber) firstEmptyField = 'contactNumber';

    if (firstEmptyField) {
      setMessage('All fields are mandatory');
      setMessageType('error');
      const emptyElement = document.querySelector(`input[name="${firstEmptyField}"]`);
      emptyElement.classList.add('highlight');
      return false;
    }

    if (password.length < 7 || !/[A-Z]/.test(password) || !/\d/.test(password) || !/[&$#@]/.test(password)) {
      setMessage('Password must be at least 7 characters long and contain at least one capital letter, one digit, and one special character (&, $, #, @)');
      setMessageType('error');
      return false;
    }

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
      setMessageType('error');
      return false;
    }

    if (!/^\d{10}$/.test(contactNumber)) {
      setMessage('Contact number must be 10 digits');
      setMessageType('error');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch('http://localhost:5000/api/students', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (response.ok) {
          onStudentCreated();
          setFormData({
            firstName: '',
            lastName: '',
            rollNo: '',
            password: '',
            confirmPassword: '',
            contactNumber: '',
          });
          setMessage('Student created successfully');
          setMessageType('success');
        } else {
          setMessage(data.message || 'Error creating student');
          setMessageType('error');
        }
      } catch (error) {
        console.error('Error:', error);
        setMessage('Error creating student');
        setMessageType('error');
      }
    }
    setTimeout(() => setMessage(''), 2500);
  };
  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Student</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-4">
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder='First Name'
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-3 py-2 text-base text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder='Last Name'
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-3 py-2 text-base text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="text"
            id="rollNo"
            name="rollNo"
            placeholder='Roll No/ID'
            value={formData.rollNo}
            onChange={handleChange}
            className="w-full px-3 py-2 text-base text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="password"
            name="password"
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 text-base text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder='Confirm Password'
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 text-base text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            placeholder='Contact Number'
            value={formData.contactNumber}
            onChange={handleChange}
            className="w-full px-3 py-2 text-base text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button type="submit" className="w-full px-3 py-4 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:outline-none">
          Create Student
        </button>
      </form>
      {message && (
       <div className={`mt-4 p-2 ${messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} rounded`}>
       {message}
     </div>
      )}
    </div>
  );
}

export default CreateStudent;