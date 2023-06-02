// import React ,{useState,useEffect} from "react";
// import axios from 'axios'
// import "./table.css";

// const Table = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:3003/api/newuser");
//       console.log("Response data:", response.data);
//       setUsers(response.data);
//       console.log("Users:", users);
//     } catch (error) {
//       console.error("Error fetching users:", error);
//     }
//   };
  

//   const handleView = (userId) => {
//     console.log("View user:", userId);
//     // Implement the logic for handling the "View" action here
//   };

//   console.log("Users:", users); // Check the value of users

//   return (
//     <div className="table-wrapper">
//       <table className="table">
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th></th> {/* Empty column for gap */}
//             <th>Information</th>
//           </tr>
//         </thead>
//         <tbody>
//           {user.map((user, idx) => (
//             <tr key={idx}>
//               <td>{user.name}</td>
//               <td></td> {/* Empty column for gap */}
//               <td>{user.information}
//                 <button className="btn" onClick={() => handleView(user.id)}>
//                   View
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
  
// export default Table;  
