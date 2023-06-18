import React, { useEffect, useState } from "react";
import axios from 'axios';

function UserList() {
  const [users, setUsers] = useState([]);
  const [selectedRole, setSelectedRole] = useState("User");

  useEffect(() => {
    fetchUsers();
  }, [selectedRole]);

  const fetchUsers = async () => {
    try {
      let url;
      if (selectedRole === "User") {
        url = 'http://localhost:3003/api/User'; // Replace with your API endpoint for user data
      } else if (selectedRole === "Manager") {
        url = 'http://localhost:3003/api/manager'; // Replace with your API endpoint for manager data
      } else if (selectedRole === "Agent") {
        url = 'http://localhost:3003/api/agent'; // Replace with your API endpoint for agent data
      }

      const response = await axios.get(url);
      setUsers(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  return (
    <div className="mt-3">
      <div className="mb-3">
        <span><strong>choose Role: </strong></span>
        <select value={selectedRole} onChange={handleRoleChange}>
          <option value="User">User</option>
          <option value="Manager">Manager</option>
          <option value="Agent">Agent</option>
        </select>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Employee ID</th>
            <th className="text-end">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.firstName}</td>
              <td className="text-auto">{user.empId}</td>
              <td className="text-end">
                {user.activation === "active" ? (
                  <button className="btn btn-danger">Inactive</button>
                ) : (
                  <button className="btn btn-success">Active</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
