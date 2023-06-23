// import React, { useEffect, useState } from "react";
// import axios from 'axios';

// function UserList() {
//   const [users, setUsers] = useState([]);
//   const [selectedRole, setSelectedRole] = useState("User");

//   useEffect(() => {
//     fetchUsers();
//   }, [selectedRole]);

//   const fetchUsers = async () => {
//     try {
//       let url;
//       if (selectedRole === "User") {
//         url = 'http://localhost:8000/admin/user';
//       } else if (selectedRole === "Manager") {
//         url = 'http://localhost:8000/admin/manager';
//       } else if (selectedRole === "Agent") {
//         url = 'http://localhost:8000/admin/agent';
//       }
  
//       const response = await axios.get(url);
//       console.log("API response:", response.data);
  
//       setUsers(prevUsers => response.data); // Update the state using the callback form of setUsers
//       console.log("Users state:", users);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };
  


//   const handleRoleChange = (event) => {
//     setSelectedRole(event.target.value);
//   };

//   return (
//     <div className="mt-3">
//       <div className="mb-3">
//         <span><strong>Choose Role: </strong></span>
//         <select value={selectedRole} onChange={handleRoleChange}>
//           <option value="User">User</option>
//           <option value="Manager">Manager</option>
//           <option value="Agent">Agent</option>
//         </select>
//       </div>

//       {users.length > 0 ? (
//         <table className="table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Employee ID</th>
//               <th className="text-end">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.firstName}</td>
//                 <td className="text-auto">{user.employeeId}</td>
//                 <td className="text-end">
//                   {user.status === "active" ? (
//                     <button className="btn btn-danger" onClick= {handleInactive}   >Inactive</button>
//                   ) : (
//                     <button className="btn btn-success"  onClick= {handleInactive}>Active</button>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No users available</p>
//       )}
//     </div>
//   );
// }

// export default UserList;
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
        url = 'http://localhost:8000/admin/user';
      } else if (selectedRole === "Manager") {
        url = 'http://localhost:8000/admin/manager';
      } else if (selectedRole === "Agent") {
        url = 'http://localhost:8000/admin/agent';
      }
  
      const response = await axios.get(url);
      console.log("API response:", response.data);
  
      setUsers(response.data);
      console.log("Users state:", users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };
// try {
    //   const url = `http://localhost:8000/admin/user/${userId}`;
    //   const response = await axios.put(url, { status: newStatus });
    //   console.log("API response:", response.data);

    //   // Update the status in the users state
    //   setUsers(prevUsers =>
    //     prevUsers.map(user =>
    //       user.id === userId ? { ...user, status: newStatus } : user
    //     )
    //   );
    // } catch (error) {
    //   console.error("Error updating user status:", error);
    // }
    //
    // const handleStatusChange = async (userId, newStatus) => {
    //   try {
    //     const response = await axios.put(`/admin/user?${userId}`, { status: newStatus });
    //     console.log("API response:", response.data);
    
    //     // Update the status in the users state
    //     setUsers(prevUsers =>
    //       prevUsers.map(user =>
    //         user.id === userId ? { ...user, status: newStatus } : user
    //       )
    //     );
    //   } catch (error) {
    //     console.error("Error updating user status:", error);
    //   }
    // }
    
    const handleStatusChange = async (userId,newStatus) => {

      try {
        await axios.put(`http://localhost:3003/api/activate?userId=${userId}&newStatus=${newStatus}`);
          setUsers(prevUsers =>
          prevUsers.map(user =>
            user.id === userId ? { ...user, status: newStatus } : user
          )
        );
      } catch(error){
        console.log("client error");
      }
    }

  return (
    <div className="mt-3">
      <div className="mb-3">
        <span><strong>Choose Role: </strong></span>
        <select value={selectedRole} onChange={handleRoleChange}>
          <option value="User">User</option>
          <option value="Manager">Manager</option>
          <option value="Agent">Agent</option>
        </select>
      </div>

      {users.length > 0 ? (
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
                <td className="text-auto">{user.employeeId}</td>
                <td className="text-end">
                  {user.status === "active" ? (
                    <button className="btn btn-danger" onClick={() => handleStatusChange(user.employeeId, "Inactive")}>
                      Inactive
                    </button>
                  ) : (
                    <button className="btn btn-success" onClick={() => handleStatusChange(user.employeeId, "active")}>
                      Active
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No users available</p>
      )}
    </div>
  );
}

export default UserList;
