import React, { useState, useEffect } from 'react';
import '../../assets/css/dashboard.css';
import axios from 'axios';

const Dashboard = () => {
    const [totalUsers, setTotalUsers] = useState('');
    const [totalManagers, setTotalManagers] = useState('');
    const [totalAgents, setTotalAgents] = useState('');
    const [totalDepartments, setTotalDepartments] = useState('');
    const [totalNewAccounts, setTotalNewAccounts] = useState('');
    const [totalAccepted, setTotalAccepted] = useState('');
    const [totalRejected, setTotalRejected] = useState('');

    useEffect(() => {
        // Make the API requests to fetch the total number of users, managers, and agents
        axios.get('http://localhost:8000/admin/totalUsers')
            .then(response => {
                const totalUsers = response.data;
                setTotalUsers(totalUsers);
                console.log(totalUsers);
            })
            .catch(error => {
                console.error('Error fetching total number of users:', error);
            });

        axios.get('http://localhost:8000/admin/totalManagers')
            .then(response => {
                const totalManagers = response.data;
                setTotalManagers(totalManagers);
                console.log(totalManagers);
            })
            .catch(error => {
                console.error('Error fetching total number of managers:', error);
            });

        axios.get('http://localhost:8000/admin/totalAgents')
            .then(response => {
                const totalAgents = response.data;
                setTotalAgents(totalAgents);
                console.log(totalAgents);
            })
            .catch(error => {
                console.error('Error fetching total number of agents:', error);
            });
        axios.get('http://localhost:8000/admin/totalDepartments')
            .then(response => {
                const totalAgents = response.data;
                setTotalDepartments(totalAgents);
                console.log(totalAgents);
            })
            .catch(error => {
                console.error('Error fetching total number of agents:', error);
            });
        axios.get('http://localhost:8000/admin/totalNewAccounts')
            .then(response => {
                const totalAgents = response.data;
                setTotalNewAccounts(totalAgents);
                console.log(totalAgents);
            })
            .catch(error => {
                console.error('Error fetching total number of agents:', error);
            });
        axios.get('http://localhost:8000/admin/totalAccepted')
            .then(response => {
                const totalAgents = response.data;
                setTotalAccepted(totalAgents);
                console.log(totalAgents);
            })
            .catch(error => {
                console.error('Error fetching total number of agents:', error);
            });
        axios.get('http://localhost:8000/admin/totalRejected')
            .then(response => {
                const totalAgents = response.data;
                setTotalRejected(totalAgents);
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
                    <h3>Admin Dashboard</h3>
                </div>
            </div>
            <div className="dashboard m-5">
                <div className="box">
                    <h2>{totalUsers}</h2>
                    <p>Total Number of Users</p>
                </div>
                <div className="box">
                    <h2>{totalManagers}</h2>
                    <p>Total Number of Managers</p>
                </div>
                <div className="box">
                    <h2>{totalAgents}</h2>
                    <p>Total Number of Agents</p>
                </div>
                {/* ...other boxes */}
            </div>
            <div className="dashboard m-5">
                <div className="box">
                    <h2>{totalDepartments}</h2>
                    <p>Total Number of Departments</p>
                </div>
                <div className="box">
                    <h2>{totalManagers}</h2>
                    <p>Total Number of New Accounts</p>
                </div>
                <div className="box">
                    <h2>{totalAccepted}</h2>
                    <p>Total Number of Accepted Accounts</p>
                </div>
                {/* ...other boxes */}
            </div>
            <div className="dashboard m-5">
                <div className="box">
                    <h2>{totalRejected}</h2>
                    <p>Total Number of Rejected Accounts</p>
                </div>
        
            </div>
        </>
    );
};

export default Dashboard;
