import React from 'react';

function ViewStudents({ students }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              First Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Last Name
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Roll No/ID
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Contact Number
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {student.firstName}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {student.lastName}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {student.rollNo}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                {student.contactNumber}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewStudents;
