import React, { useState } from 'react';

function DeleteStudent({ onStudentDeleted }) {
  const [rollNo, setRollNo] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/students/${rollNo}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        onStudentDeleted();
        setRollNo('');
        setMessage('Student deleted successfully');
        setMessageType('success');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Error deleting student');
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
      <h2 className="text-2xl font-bold mb-4">Delete Student</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-4">
          {/* <label htmlFor="deleteRollNo" className="block mb-2">Roll No/ID:</label> */}
          <input
            id="deleteRollNo"
            type="text"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
            placeholder="Roll No/ID"
            required
            className="w-full px-3 py-2 text-base text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <button type="submit" className="w-full px-3 py-4 text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none">
          Delete Student
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

export default DeleteStudent;