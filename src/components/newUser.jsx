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

  const handleAccept = (user) => {
    // Handle the action when the "Accept" button is clicked for a user
    console.log('Accept user:', user);
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

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    // Perform the actual search using an API or search algorithm
    const results = users.filter((user) => {
      const empId = user.empId.toString().toLowerCase();
      return empId.includes(searchTerm.toLowerCase());
    });
    setSearchResults(results);
  };

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
          onClick={() => onSearch(empId)}
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
