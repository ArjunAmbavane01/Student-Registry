import React, { useState } from 'react';

function UpdateStudent({ onStudentUpdated }) {
  const [formData, setFormData] = useState({
    rollNo: '',
    contactNumber: '',
  });
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!formData.rollNo.trim()) {
      setMessage('Roll No/ID is required');
      setMessageType('error');
      return false;
    }
    if (!/^\d{10}$/.test(formData.contactNumber)) {
      setMessage('Contact number must be 10 digits');
      setMessageType('error');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await fetch(`http://localhost:5000/api/students/${formData.rollNo}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contactNumber: formData.contactNumber }),
      });
      if (response.ok) {
        onStudentUpdated();
        setFormData({ rollNo: '', contactNumber: '' });
        setMessage('Student updated successfully');
        setMessageType('success');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Error updating student');
        setMessageType('error');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error connecting to the server');
      setMessageType('error');
    }
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Update Student</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          {/* <label htmlFor="updateRollNo" className="block mb-2">Roll No/ID:</label> */}
          <input
            id="updateRollNo"
            type="text"
            name="rollNo"
            value={formData.rollNo}
            onChange={handleChange}
            placeholder="Roll No/ID"
            required
            className="w-full px-3 py-2 text-base text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          {/* <label htmlFor="updateContactNumber" className="block mb-2">New Contact Number:</label> */}
          <input
            id="updateContactNumber"
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="New Contact Number"
            required
            className="w-full px-3 py-2 text-base text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className="w-full px-3 py-4 text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none">
          Update Student
        </button>
      </form>
      {message && (
        <div className={`p-2 ${messageType === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'} rounded`}>
          {message}
        </div>
      )}
    </div>
  );
}

export default UpdateStudent;