import React, { useState, useEffect } from 'react';
import '../../assets/css/modal.css'

function Department() {
  const [departments, setDepartments] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [renameValue, setRenameValue] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addValue, setAddValue] = useState('');

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/departments'); // Replace with your API endpoint for fetching departments
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleDelete = (departmentId) => {
    setSelectedDepartment(departmentId);
    setShowConfirmationModal(true);
  };

  const handleConfirmation = (confirmed) => {
    if (confirmed) {
      deleteDepartment(selectedDepartment);
    }
    setSelectedDepartment(null);
    setShowConfirmationModal(false);
  };

  const deleteDepartment = async (departmentId) => {
    try {
      await fetch(`http://localhost:4000/api/departments/${departmentId}`, {
        method: 'DELETE', // Replace with the appropriate HTTP method for deleting a department
      });
      // Remove the deleted department from the local state
      setDepartments((prevDepartments) =>
        prevDepartments.filter((department) => department.id !== departmentId)
      );
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  const handleRename = (departmentId) => {
    setSelectedDepartment(departmentId);
    setShowRenameModal(true);
    const selectedDepartment = departments.find((department) => department.id === departmentId);
    setRenameValue(selectedDepartment.title);
  };

  const handleRenameConfirmation = async () => {
    try {
      // Update the department title in the department table
      await fetch(`http://localhost:4000/api/departments/${selectedDepartment}`, {
        method: 'PUT', // Replace with the appropriate HTTP method for updating a department
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: renameValue }),
      });

      // Update the department title in the local state
      const updatedDepartments = departments.map((department) => {
        if (department.id === selectedDepartment) {
          return { ...department, title: renameValue };
        }
        return department;
      });
      setDepartments(updatedDepartments);

      // Close the rename modal
      setShowRenameModal(false);
      setSelectedDepartment(null);
      setRenameValue('');
    } catch (error) {
      console.error('Error updating department:', error);
    }
  };

  const handleRenameCancel = () => {
    // Close the rename modal
    setShowRenameModal(false);
    setSelectedDepartment(null);
    setRenameValue('');
  };

  const handleAdd = () => {
    setShowAddModal(true);
  };

  const handleAddConfirmation = async () => {
    try {
      // Add the new department to the department table
      await fetch('http://localhost:4000/api/departments', {
        method: 'POST', // Replace with the appropriate HTTP method for adding a department
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title: addValue }),
      });

      // Fetch the updated list of departments
      fetchDepartments();

      // Close the add modal
      setShowAddModal(false);
      setAddValue('');
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  const handleAddCancel = () => {
    // Close the add modal
    setShowAddModal(false);
    setAddValue('');
  };

  return (
    <div>
      <h2>Manage Departments</h2>
      <button onClick={handleAdd}>Add</button>
      <table className='table'>
        <thead>
          <tr>
            <th className='text-start'>Title</th>
            <th className='text-end'>Action</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.title}</td>
              <td>
                <button onClick={() => handleDelete(department.id)}>Delete</button>
                <button onClick={() => handleRename(department.id)}>Rename</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showConfirmationModal && (
        // <div className="modal-overlay">
        //   <div className="confirmation-modal">
        //     <h3>Are you sure?</h3>
        //     <div>
        //       <button onClick={() => handleConfirmation(false)}>No</button>
        //       <button onClick={() => handleConfirmation(true)}>Yes</button>
        //     </div>
        //   </div>
        // </div>
        <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
        <h3>Are you sure?</h3>
        </div>
        <div className="body">
        <button onClick={() => handleConfirmation(false)}>No</button>
        //       <button onClick={() => handleConfirmation(true)}>Yes</button>
        </div>
      </div>
    </div>
      )}
      {showRenameModal && (
        // <div className="modal-overlay">
        //   <div className="rename-modal">
        //     <h3>Rename Department</h3>
        //     <input
        //       type="text"
        //       value={renameValue}
        //       onChange={(e) => setRenameValue(e.target.value)}
        //     />
        //     <div>
        //       <button onClick={handleRenameConfirmation}>Edit</button>
        //       <button onClick={handleRenameCancel}>Cancel</button>
        //     </div>
        //   </div>
        // </div>
        <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
        <h3>Rename Department</h3>
        </div>
        <div className="body">
        <input
              type="text"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
            />
        </div>
        <div className="footer">
        <button onClick={handleRenameConfirmation}>Edit</button>
        //       <button onClick={handleRenameCancel}>Cancel</button>
        </div>
      </div>
    </div>
        
      )}
      {showAddModal && (
        // <div className="modal-overlay">
        //   <div className="add-modal">
            // <h3>Add Department</h3>
            // <label htmlFor="addTitle">Title:</label>
            // <input
            //   id="addTitle"
            //   type="text"
            //   value={addValue}
            //   onChange={(e) => setAddValue(e.target.value)}
            // />
            // <div>
            //   <button onClick={handleAddConfirmation}>Add</button>
            //   <button onClick={handleAddCancel}>Cancel</button>
            // </div>
        //   </div>
        // </div>
        <div className="modalBackground">
      <div className="modalContainer">
        
        <div className="title">
        <h3>Add Department</h3>
        </div>
        <div className="body">
        <label htmlFor="addTitle">Title:</label>
            <input
              id="addTitle"
              type="text"
              value={addValue}
              onChange={(e) => setAddValue(e.target.value)}
            />
        </div>
        <div className="footer">
        <button onClick={handleAddConfirmation}>Add</button>
        <button onClick={handleAddCancel} id="cancelBtn">Cancel</button>
        </div>
      </div>
    </div>
      )}
    </div>
  );
}

export default Department;
