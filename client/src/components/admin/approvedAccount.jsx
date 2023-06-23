import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/newUser.css';
import { useSelector } from 'react-redux';

const ApprovedAccount = () => {
  const [users, setUsers] = useState([]);
  
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchNewUsers();
    //fetchDepartments()
  }, []);

  const fetchNewUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/newuserr');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching new users:', error);
    }
  };
  return (
        <div className='m-5'>
          <h2 className='text-center'>Approved Account</h2>
          <table className="table table-lg p-10 mt-5">
            <thead>
              <tr>
                <th className="text-start">Name</th>
                <th className="text-start">Employee Id</th>
                <th className="text-start">state</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="text-auto">{user.firstName}</td>
                    <td className="text-auto">{user.employeeId}</td>
                    <td className="text-auto">{user.state}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="text-center">
                    There is no account to be approved
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
  );
};

export default ApprovedAccount;


