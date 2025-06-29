import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Login from './components/Login';
import Create from './components/Create';
import Admin from './components/Admin';
import Group from './components/Group';
import Edit from './components/Edit';
// Remove the Edit import from @mui/icons-material if you have an Edit component
// import EditGroup from './components/EditGroup'; // Uncomment if you have this component

const App = () => {
    // Mock user data for standalone frontend
    const [user, setUser] = useState({
        _id: 'user1',
        name: 'Demo User',
        email: 'demo@example.com',
        contactNumber: '1234567890',
        role: 'user',
        isAdmin: false
    });

    // State to store created groups
    const [groups, setGroups] = useState([]);

    const handleLogin = (userData) => {
        // Mock login - set user data based on form input or use default
        const mockUser = {
            _id: userData?.email === 'admin@example.com' ? 'admin1' : 'user1',
            name: userData?.name || 'Demo User',
            email: userData?.email || 'demo@example.com',
            contactNumber: userData?.contactNumber || '1234567890',
            role: userData?.email === 'admin@example.com' ? 'admin' : 'user',
            isAdmin: userData?.email === 'admin@example.com'
        };
        setUser(mockUser);
        console.log('Mock login successful:', mockUser);
    };

    const handleLogout = () => {
        // Mock logout - clear user data
        setUser(null);
        console.log('Mock logout successful');
    };

    const handleCreateGroup = (groupData) => {
        const newGroup = {
            id: Math.random().toString(36).substr(2, 9),
            ...groupData,
            createdBy: user._id,
            createdAt: new Date().toISOString(),
            status: 'pending',
            members: [user._id]
        };
        
        setGroups(prevGroups => [...prevGroups, newGroup]);
        console.log('Group created:', newGroup);
        return newGroup;
    };

    return (
        <div>
            <Navbar user={user} onLogout={handleLogout} />
            <Routes>
                <Route path='/' element={<Home user={user} groups={groups} />} />
                <Route path='/login' element={<Login onLogin={handleLogin} />} />
                <Route path='/group/:id' element={<Group user={user} groups={groups} />} />
                <Route path='/profile' element={<UserProfile user={user} />} />
                <Route path='/create' element={<Create user={user} onCreateGroup={handleCreateGroup} />} />
                <Route path='/edit' element={<Edit user={user} groups={groups} />} />
                <Route path='/admin' element={<Admin user={user} groups={groups} />} />
            </Routes>
        </div>
    );
};

export default App;