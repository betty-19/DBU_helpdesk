import React, { useState, useEffect } from 'react';
import '../../assets/css/dashboard.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Dashboard = () => {
    const [totalAssignedTickets, setTotalAssignedTickets] = useState('');
    const [totalClosedTickets, setTotalClosedTickets] = useState('');

    const empId = useSelector((state) => state.user.employeeId);
    useEffect(() => {
        // Make the API requests to fetch the total number of users, managers, and agents
        axios.get(`http://localhost:8000/agent/totalAssignedTickets?assignedId=${empId}`)
            .then(response => {
                const totalUsers = response.data;
                setTotalAssignedTickets(totalUsers);
                console.log(totalUsers);
            })
            .catch(error => {
                console.error('Error fetching total number of users:', error);
            });

        axios.get(`http://localhost:8000/agent/totalClosedTickets?assignedId=${empId}`)
            .then(response => {
                const totalManagers = response.data;
                setTotalClosedTickets(totalManagers);
                console.log(totalManagers);
            })
            .catch(error => {
                console.error('Error fetching total number of managers:', error);
            });
    }, []);

    return (
        <>
            <div className="dashboard bg-dark">
                <div className="box bg-dark text-light text-center">
                    <h3>Agent Dashboard</h3>
                </div>
            </div>
            <div className="dashboard m-5 d-flex flex-column">
                <div className="box">
                    <h2>{totalAssignedTickets}</h2>
                    <p>Total Number of Assigned Tickets</p>
                </div>
                <div className="box">
                    <h2>{totalClosedTickets}</h2>
                    <p>Total Number of Closed Tickets</p>
                </div>
                {/* ...other boxes */}
            </div>
    
        </>
    );
};

export default Dashboard;
