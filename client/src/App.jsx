import React, { useState, useEffect } from 'react';
import CreateStudent from './components/CreateStudent';
import DeleteStudent from './components/DeleteStudent';
import UpdateStudent from './components/UpdateStudent';
import ViewStudents from './components/ViewStudents';

function App() {
  const [activeTab, setActiveTab] = useState('create');
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/students');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'create':
        return <CreateStudent onStudentCreated={fetchStudents} />;
      case 'delete':
        return <DeleteStudent onStudentDeleted={fetchStudents} />;
      case 'update':
        return <UpdateStudent onStudentUpdated={fetchStudents} />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Student Registration System</h1>
      <div className="mb-4">
        <button
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'create' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('create')}
        >
          Create
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'delete' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('delete')}
        >
          Delete
        </button>
        <button
          className={`mr-2 px-4 py-2 rounded ${activeTab === 'update' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('update')}
        >
          Update
        </button>
        <button
          className={`px-4 py-2 rounded ${activeTab === 'view' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('view')}
        >
          View
        </button>
      </div>
      {renderActiveComponent()}
      <h2 className="text-2xl font-bold mt-8 mb-4">Current Records</h2>
      <ViewStudents students={students} />
    </div>
  );
}

export default App;