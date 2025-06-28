import React, { useState } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import GroupDetails from './components/GroupDetails';
import UserProfile from './components/UserProfile';
import EditGroup from './components/EditGroup';
import Login from './components/Login';
import Create from './components/Create';
import Admin from './components/Admin';

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

    return (
        <div>
            <Navbar user={user} onLogout={handleLogout} />
            <Routes>
                <Route path='/' element={<Home user={user} />} />
                <Route path='/login' element={<Login onLogin={handleLogin} />} />
                <Route path='/group/:id' element={<GroupDetails user={user} />} />
                <Route path='/profile' element={<UserProfile user={user} />} />
                <Route path='/create-group' element={<Create user={user} />} />
                <Route path='/edit-group/:id' element={<EditGroup user={user} />} />
                <Route path='/admin' element={<Admin user={user} />} />
            </Routes>
        </div>
    );
};

export default App;