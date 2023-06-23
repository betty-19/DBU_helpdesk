import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/newUser.css';
import { useSelector } from 'react-redux';

const NewUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const [selectedRole, setSelectedRole] = useState('');
  const [value, setValue] = useState('');
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');
  
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchNewUsers();
    fetchDepartments()
  }, []);

  const fetchNewUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/newuser');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching new users:', error);
    }
  };
  const handleDepartmentChange = (event) => {
        setSelectedDepartment(event.target.value);
      };
    const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
    setValue(event.target.value); // Update the value state with the selected role
   setSelectedDepartment('');
  };

  const handleView = (user) => {
    setSelectedUser({
      firstName: user.firstName,
      lastName: user.lastName,
      officeBlock: user.officeBlock,
      employeeId: user.employeeId,
    });
  };

  const onSearch = async (empId) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/searchEmployeeId?employeeId=${encodeURIComponent(empId)}`
      );
      setSearchResults(response.data);
      setSearchClicked(true);
    } catch (error) {
      console.error(error);
    }
  };
    //fetch manager and category column from the department table
  const fetchDepartments = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/departments');
      setDepartments(response.data);
      console.log(departments);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };
  const handleReject = async (user) => {
    // Handle the action when the "Reject" button is clicked for a user
    try {
      // const uname = `${user.firstName}${user.empId.replace(/\D/g, '')}`;
 
       // Update the status, username, password, role, and department in the register table
       await axios.put(`http://localhost:3003/api/reject/${user.employeeId}`);
       setSelectedUser(false)
     } catch(error){
       console.log("client error");
     }
  };
  const handleAccept = async (user) => {
    try {
     // const uname = `${user.firstName}${user.empId.replace(/\D/g, '')}`;

      // Update the status, username, password, role, and department in the register table
      await axios.put(`http://localhost:3003/api/update/${user.employeeId}`, {
       // status: 'Accept',
       // userName: uname,
       // password: user.empId,
        role: selectedRole,
        department: selectedDepartment,
        // approve: 'yes',
        // isNew: 'no'
      });

      setSelectedUser(false)
    } catch(error){
      console.log("client error");
    }
  }
  return (
    <div>
      {selectedUser ? (
        <div className="container">
          <h3>User Information</h3>
          <div className="my-4">
            {/* Render selected user information */}
            <p className="mb-2">
              <strong>Name:</strong> {selectedUser.firstName}
            </p>
            <p className="mb-2">
              <strong>Last Name:</strong> {selectedUser.lastName}
            </p>
            <p className="mb-2">
              <strong>Office Block:</strong> {selectedUser.officeBlock}
            </p>
            <p className="mb-2">
              <strong>Employee ID:</strong> {selectedUser.employeeId}
            </p>
            <div className="search-container">
              <div className="search-inner">
                <button
                  className="btn btn-primary"
                  onClick={() => onSearch(selectedUser.employeeId)}
                >
                  Search
                </button>
              </div>
              <div className="dropdown">
                {searchClicked && searchResults.length === 0 && (
                  <div className="dropdown-row">
                    <h5>No results found</h5>
                    <button
              className="btn btn-danger me-2"
              onClick={() => handleReject(selectedUser)}
            >
              Reject
            </button>
                    </div>
                )}
              </div>
            </div>
            {searchResults.length > 0 && (
              <div>
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-start">First Name</th>
                      <th className="text-start">Last Name</th>
                      <th className="text-start">Phone Number</th>
                      <th className="text-start">Department</th>
                      <th className="text-start">Role</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map((user) => (
                      <tr key={user.id}>
                        <td className="text-start">{user.firstName}</td>
                        <td className="text-start">{user.lastName}</td>
                        <td className="text-start">{user.phone_number}</td>
                        <td className="text-start">{user.department}</td>
                        <td className="text-start">{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {searchResults.length > 0 && (
              <div>
                <p className="mb-2">
                  <strong>Role:</strong>
                </p>
                {/* Render role selection */}
                <select value={selectedRole} onChange={handleRoleChange}>
                    <option value="">Select Role</option>
                    <option value="manager">Manager</option>
                    <option value="user">User</option>
                     <option value="agent">Agent</option>
                   </select>
              </div>
            )}
      {searchResults.length > 0 && (selectedRole === 'manager' || selectedRole === 'agent') && (
  <div>
    <p className="mb-2">
      <strong>Department:</strong>
    </p>
    {/* Render department selection */}
    <select value={selectedDepartment} onChange={handleDepartmentChange}>
      <option value="">Select Department</option>
      {selectedRole === 'manager' && departments
        .filter(departments => departments.managerId === null)
        .map(department => (
          <option value={department.department} key={department.department}>
            {department.category}
          </option>
        ))
      }
      {selectedRole === 'agent' && departments.map(department => (
        <option value={department.department} key={department.department}>
          {department.category}
        </option>
      ))}
    </select>
  </div>
  
)}
            {searchResults.length > 0 && (
              <div>
                {/* Render Accept and Reject buttons */}
             
            <button
              className="btn btn-success"
              onClick={() => handleAccept(selectedUser)}
            >
              Accept
            </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div>  <h2 className='text-center'>New Accounts to be Approved</h2></div>
        
          <table className="table table-lg p-10">
            <thead>
              <tr>
                <th className="text-start">Name</th>
                <th className='text-center'>Id</th>
                <th className="text-end">Information</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="text-auto">{user.firstName}</td>
                    <td className='text-center'>{user.employeeId}</td>
                    <td className="text-end">
                      <button
                        className="btn btn-primary"
                        onClick={() => handleView(user)}
                      >
                        View
                      </button>
                    </td>
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
      )}
    </div>
  );
};

export default NewUsers;