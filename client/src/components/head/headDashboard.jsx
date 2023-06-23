import React, { useState, useEffect } from 'react';
import '../../assets/css/dashboard.css';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Dashboard = () => {
    const [totalOpenTickets, setTotalOpenTickets] = useState('');
    const [totalClosedTickets, setTotalClosedTickets] = useState('');
    const [totalAssignedTickets, setTotalAssignedTickets] = useState('');
    const user = useSelector((state) => state.user);

    useEffect(() => {
        // Make the API requests to fetch the total number of users, managers, and agents
        axios.get('http://localhost:8000/head/totalOpenTickets')
            .then(response => {
                const totalUsers = response.data;
                setTotalOpenTickets(totalUsers);
                console.log(totalUsers);
            })
            .catch(error => {
                console.error('Error fetching total number of users:', error);
            });

        axios.get('http://localhost:8000/head/totalClosedTickets')
            .then(response => {
                const totalManagers = response.data;
                setTotalClosedTickets(totalManagers);
                console.log(totalManagers);
            })
            .catch(error => {
                console.error('Error fetching total number of managers:', error);
            });

        axios.get(`http://localhost:8000/head/totalAssignedTickets?department=${user.department}`)
            .then(response => {
                const totalAgents = response.data;
                setTotalAssignedTickets(totalAgents);
                console.log(totalAgents);
            })
            .catch(error => {
                console.error('Error fetching total number of agents:', error);
            });
    }, []);

    return (
        <>
            <div className="dashboard bg-dark">
                <div className="box bg-dark text-light text-center">
                    <h3>Manager Dashboard</h3>
                </div>
            </div>
            <div className="dashboard m-5">
                <div className="box">
                    <h2>{totalOpenTickets}</h2>
                    <p>Total Number of Open Tickets</p>
                </div>
                <div className="box">
                    <h2>{totalAssignedTickets}</h2>
                    <p>Total Number of Assigned Tickets</p>
                </div>
                <div className="box">
                    <h2>{totalClosedTickets}</h2>
                    <p>Total Number of Closed</p>
                </div>
                {/* ...other boxes */}
            </div>
        
        </>
    );
};

export default Dashboard;
