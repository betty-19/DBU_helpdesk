import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './newUser.css';

const NewUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedLast, setSelectedLast] = useState(null);
  const [selectedOffice, setSelectedOffice] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [userInfo, setUserInfo] = useState([]);
  const [value, setValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [empIdResults, setEmpIdResults] = useState([]);

  useEffect(() => {
    fetchNewUsers();
    // fetchUsersInfo();
  }, []);

  const fetchNewUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3003/api/newuser');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching new users:', error);
    }
  };

  const fetchEmpIds = async (searchTerm) => {
    try {
      const response = await axios.get('http://localhost:3003/api/employee');
      const userData = response.data.user; // Assuming it contains an array of user objects
      const empIds = userData.map((user) => user.empId);
      const filteredEmpIds = empIds.filter((empId) =>
        empId.toString().startsWith(searchTerm)
      );
      setEmpIdResults(filteredEmpIds);
    } catch (error) {
      console.error('Error fetching empIds:', error);
    }
  };

  const handleView = (user) => {
    setSelectedUser(user.firstName);
    setSelectedLast(user.lastName);
    setSelectedOffice(user.officeBlock);
    setSelectedId(user.empId);
  };

  const handleAccept = async (user) => {
    try {
      // Update the status in the register table
      await axios.put(`http://localhost:3003/api/update/${user.id}`, {
        status: 'Accept',
      });
      // Handle any other necessary actions after accepting the user
      console.log('Accept user:', user);
    } catch (error) {
      console.error('Error accepting user:', error);
    }
  };
  
  

  const handleReject = (user) => {
    // Handle the action when the "Reject" button is clicked for a user
    console.log('Reject user:', user);
  };

  const onChange = (event) => {
    const searchTerm = event.target.value;
    setValue(searchTerm);

    if (searchTerm.length > 0) {
      fetchEmpIds(searchTerm);
    } else {
      setEmpIdResults([]);
    }
  };

  const onSearch = async (searchTerm) => {
    //setValue(searchTerm);
    try {
      const response = await axios.get(`http://localhost:3003/api/employee2/${searchTerm}`);
      setSearchResults(response.data.user);
    } catch (error) {
      setSearchResults([]);
      console.error('Error fetching employee data:', error);
    }
  };
  const ondrop = async(searchTerm) => {
    setValue(searchTerm);
  }
  

  return (
    <div>
      {selectedUser ? (
        <div className="container">
          <h3>User Information</h3>
          <div className="my-4">
            <p className="mb-2">
              <strong>Name:</strong> {selectedUser}
            </p>
            <p className="mb-2">
              <strong>Last Name:</strong> {selectedLast}
            </p>
            <p className="mb-2">
              <strong>Office Block:</strong> {selectedOffice}
            </p>
            <p className="mb-2">
              <strong>Employee ID:</strong> {selectedId}
            </p>
            <div className="search-container">
              <div className="search-inner">
                <input type="text" value={value} onChange={onChange} />
                <button className="btn btn-primary" onClick={() => onSearch(value)}>Search</button>
              </div>
              <div className="dropdown">
                {empIdResults.length > 0 ? (
                  <div className="dropdown-list">
                    {empIdResults.map((empId) => (
                      <div
                        onClick={() => ondrop(empId)
                        }
                        className="dropdown-row"
                        key={empId}
                      >
                        {empId}
                      </div>
                    ))}
                  </div>
                ) : (
                  value.length > 0 && <div className="dropdown-row">No results found</div>
                )}
              </div>
            </div>
            {searchResults.length > 0 ? (
  <div>
    <table className="table">
      <thead>
        <tr>
          <th className="text-start">First Name</th>
          <th className="text-start">Last Name</th>
          <th className="text-start">Office Block</th>
          <th className="text-start">Department</th>
        </tr>
      </thead>
      <tbody>
        {searchResults.map((user) => (
          <tr key={user.id}>
            <td className="text-start">{user.firstName}</td>
            <td className="text-start">{user.lastName}</td>
            <td className="text-start">{user.officeBlock}</td>
            <td className="text-start">{user.department}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p className="mb-2">
              <strong>Role:</strong> </p>
    <select>
      <option value="">Select Role</option>
      <option value="manager">Manager</option>
      <option value="user">User</option>
      <option value="admin">Admin</option>
      {value === "admin" && (
        <React.Fragment>
          <option value="main admin">Main Admin</option>
          <option value="support admin">Support Admin</option>
        </React.Fragment>
      )}
    </select>
  </div>
) : null}


            <button
              className="btn btn-danger me-2"
              onClick={() => handleReject(selectedUser)}
            >
              Reject
            </button>
            <button
              className="btn btn-success"
              onClick={() => handleAccept(selectedUser)}
            >
              Accept
            </button>
          </div>
        </div>
      ) : (
        <div>
          <h2>New Users</h2>

          <table className="table table-lg p-10">
            <thead>
              <tr>
                <th className="text-start">Name</th>
                <th className="text-end">Information</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user.id}>
                    <td className="text-auto">{user.firstName}</td>
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
