import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/css/newUser.css';
import { useSelector } from 'react-redux';

const NewUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [searchResults, setSearchResults] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    fetchNewUsers();
  }, []);

  const fetchNewUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/admin/newuser');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching new users:', error);
    }
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
                  <div className="dropdown-row">No results found</div>
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
              </div>
            )}
            {searchResults.length > 0 &&
              (selectedRole === 'manager' || selectedRole === 'agent') && (
                <div>
                  <p className="mb-2">
                    <strong>Department:</strong>
                  </p>
                  {/* Render department selection */}
                </div>
              )}
            {searchResults.length > 0 && (
              <div>
                {/* Render Accept and Reject buttons */}
              </div>
            )}
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


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../../assets/css/newUser.css';
// import { useSelector } from 'react-redux';

// const NewUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState();
//   // const [selectedLast, setSelectedLast] = useState(null);
//   // const [selectedOffice, setSelectedOffice] = useState(null);
//   // const [selectedId, setSelectedId] = useState(null);
//   const [userInfo, setUserInfo] = useState([]);
//   const [value, setValue] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
//   const [empIdResults, setEmpIdResults] = useState([]);
//   const [selectedRole, setSelectedRole] = useState('');
//   const [departments, setDepartments] = useState([]);
//   const [selectedDepartment, setSelectedDepartment] = useState('');
//   const [ServerMessage, setServerMessage] = useState('');
//   const user = useSelector(state => state.user);



//   useEffect(() => {
//     fetchNewUsers();
//     fetchDepartments();
//     // fetchUsersInfo();
//   }, []);

//   const fetchNewUsers = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/admin/newuser');
//       setUsers(response.data.users);
//     } catch (error) {
//       console.error('Error fetching new users:', error);
//     }
//   };




//   const fetchEmpIds = async (searchTerm) => {
//     try {
//       const response = await axios.get('http://localhost:3003/api/employee');
//       const userData = response.data.user; // Assuming it contains an array of user objects
//       const empIds = userData.map((user) => user.empId);
//       const filteredEmpIds = empIds.filter((empId) =>
//         empId.toString().startsWith(searchTerm)
//       );
//       setEmpIdResults(filteredEmpIds);
//     } catch (error) {
//       console.error('Error fetching empIds:', error);
//     }
//   };




//   //fetch manager and category column from the department table
//   const fetchDepartments = async () => {
//     try {
//       const response = await axios.get('http://localhost:3003/api/departments');
//       setDepartments(response.data.departments);
//     } catch (error) {
//       console.error('Error fetching departments:', error);
//     }
//   };

//   const handleView = (user) => {
//     setSelectedUser({
//       firstName: user.firstName,
//       lastName: user.lastName,
//       officeBlock: user.officeBlock,
//       employeeId: user.employeeId,
//     });
//   };
//   const handleAccept = async (user) => {
//     try {
//       const uname = `${user.firstName}${user.empId.replace(/\D/g, '')}`;

//       // Update the status, username, password, role, and department in the register table
//       await axios.put(`http://localhost:3003/api/update/${user.empId}`, {
//         status: 'Accept',
//         userName: uname,
//         password: user.empId,
//         role: selectedRole,
//         department: selectedDepartment,
//         approve: 'yes',
//         isNew: 'no'
//       });




//       //store userName in userName column pending table where empId is matched
//       await axios.put(`http://localhost:3003/api/pending/${user.empId}`, {
//         userName: uname
//       });


//       console.log('User updated successfully');
//     } catch (error) {
//       console.error('Error accepting user:', error);
//     }
//   };




//   const handleReject = (user) => {
//     // Handle the action when the "Reject" button is clicked for a user
//     console.log('Reject user:', user);
//   };

//   const onChange = (event) => {
//     const searchTerm = event.target.value;
//     setValue(searchTerm);

//     if (searchTerm.length > 0) {
//       fetchEmpIds(searchTerm);
//     } else {
//       setEmpIdResults([]);
//     }
//   };

//   const handleRoleChange = (event) => {
//     setSelectedRole(event.target.value);
//     setValue(event.target.value); // Update the value state with the selected role
//     setSelectedDepartment('');
//   };


//   const handleDepartmentChange = (event) => {
//     setSelectedDepartment(event.target.value);
//   };
//   const onSearch = async (empId) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/admin/searchEmployeeId?employeeId=${encodeURIComponent(empId)}`
//       );
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // const onSearch = async (empId) => {
//   //   try {
//   //   console.log(empId);
//   //     const response = await axios.get(
//   //       `http://localhost:8000/admin/searchEmployeeId?employeeId=${user.employeeId}`
//   //     );
//   //     setSearchResults(response.data);

//   //   } catch (error) {
//   //     console.error(error);
//   //   }
//   //   console.log(searchResults);
//   // };

//   const ondrop = async (searchTerm) => {
//     setValue(searchTerm);
//   };

//   return (
//     <div>
//       {selectedUser ? (
//         <div className="container">
//           <h3>User Information</h3>
//           <div className="my-4">
//             <p className="mb-2">
//               <strong>Name:</strong> {selectedUser.firstName}
//             </p>
//             <p className="mb-2">
//               <strong>Last Name:</strong> {selectedUser.lastName}
//             </p>
//             <p className="mb-2">
//               <strong>Office Block:</strong> {selectedUser.officeBlock}
//             </p>
//             <p className="mb-2">
//               <strong>Employee ID:</strong> {selectedUser.employeeId}
//             </p>
//             <div className="search-container">
//               <div className="search-inner">
//                 <button className="btn btn-primary" onClick={() => onSearch(selectedUser.employeeId)}>
//                   Search
//                 </button>

//               </div>
//               <div className="dropdown">
//                 {searchResults.length < 0 ? (
//              <div className="dropdown-row">No results found</div>
//                 ):(<></>)   }
//               </div>
//             </div>
//             {searchResults.length > 0 ? (
//               <div>
//                 <table className="table">
//                   <thead>
//                     <tr>
//                       <th className="text-start">First Name</th>
//                       <th className="text-start">Last Name</th>
//                       <th className="text-start">Phone Number</th>
//                       <th className="text-start">Department</th>
//                       <th className='text-start'>Role</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {searchResults.map((user) => (
//                       <tr key={user.id}>
//                         <td className="text-start">{user.firstName}</td>
//                         <td className="text-start">{user.lastName}</td>
//                         <td className="text-start">{user.phone_number}</td>
//                         <td className="text-start">{user.department}</td>
//                         <td className="text-start">{user.role}</td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//                 <div>
//                   <p className="mb-2">
//                     <strong>Role:</strong>
//                   </p>
//                   <select value={selectedRole} onChange={handleRoleChange}>
//                     <option value="">Select Role</option>
//                     <option value="manager">Manager</option>
//                     <option value="user">User</option>
//                     <option value="admin">Admin</option>
//                     <option value="agent">Agent</option>
//                   </select>

//                   {selectedRole === 'manager' || selectedRole === 'agent' ? (
//                     <div>
//                       <p className="mb-2">
//                         <strong>Department:</strong>
//                       </p>
//                       <select
//                         value={selectedDepartment}
//                         onChange={handleDepartmentChange}
//                       >
//                         <option value="">Select Department</option>
//                         {selectedRole === 'manager' &&
//                           departments.map((department) => (
//                             <option value={department} key={department}>
//                               {department}
//                             </option>
//                           ))}
//                       </select>
//                     </div>
//                   ) : null}
//                 </div>
//               </div>
//             ) : searchResults.length < 0 && <div className="dropdown-row">No results found</div>}
//             <button
//               className="btn btn-danger me-2"
//               onClick={() => handleReject(selectedUser)}
//             >
//               Reject
//             </button>
//             <button
//               className="btn btn-success"
//               onClick={() => handleAccept(selectedUser)}
//             >
//               Accept
//             </button>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <h2>New Users</h2>

//           <table className="table table-lg p-10">
//             <thead>
//               <tr>
//                 <th className="text-start">Name</th>
//                 <th className="text-end">Information</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.length > 0 ? (
//                 users.map((user) => (
//                   <tr key={user.id}>
//                     <td className="text-auto">{user.firstName}</td>
//                     <td className="text-end">
//                       <button
//                         className="btn btn-primary"
//                         onClick={() => handleView(user)}
//                       >
//                         View
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="2" className="text-center">
//                     There is no account to be approved
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewUsers;
