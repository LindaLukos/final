// ============================================
// 1. UPDATED CREATE COMPONENT (Replace your existing Create.js)
// ============================================
// File: src/components/Create.js

import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [form, setForm] = useState({
        title: '',
        subject: '',
        description: '',
        meetingSchedule: '',
        maxMembers: 10
    });
    
    const [groups, setGroups] = useState(() => {
        // Load existing groups from localStorage
        const savedGroups = localStorage.getItem('studyGroups');
        return savedGroups ? JSON.parse(savedGroups) : [];
    });
    
    const [showSuccess, setShowSuccess] = useState(false);
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};
        
        if (!form.title.trim()) {
            newErrors.title = 'Group title is required';
        }
        
        if (!form.subject.trim()) {
            newErrors.subject = 'Subject is required';
        }
        
        if (!form.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (form.description.trim().length < 20) {
            newErrors.description = 'Description must be at least 20 characters';
        }

        if (!form.meetingSchedule.trim()) {
            newErrors.meetingSchedule = 'Meeting schedule is required';
        }

        if (form.maxMembers < 2 || form.maxMembers > 50) {
            newErrors.maxMembers = 'Max members must be between 2 and 50';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            return;
        }

        // Create new group
        const newGroup = {
            id: Math.random().toString(36).substr(2, 9),
            ...form,
            createdAt: new Date().toISOString(),
            createdBy: 'current-user-id', // Replace with actual user ID
            members: ['current-user-id'], // Replace with actual user ID
            status: 'active',
            maxMembers: parseInt(form.maxMembers)
        };

        // Update groups state
        const updatedGroups = [...groups, newGroup];
        setGroups(updatedGroups);
        
        // Save to localStorage
        localStorage.setItem('studyGroups', JSON.stringify(updatedGroups));
        
        // Show success message
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);

        // Reset form
        setForm({
            title: '',
            subject: '',
            description: '',
            meetingSchedule: '',
            maxMembers: 10
        });

        console.log('Group created successfully:', newGroup);
    };

    return (
        <Box sx={{ padding: 3, maxWidth: 1200, margin: 'auto' }}>
            <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
                Study Group Management
            </Typography>

            <Grid container spacing={4}>
                {/* Create Group Form */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Create New Study Group
                            </Typography>

                            {/* Success Message */}
                            {showSuccess && (
                                <Alert severity="success" sx={{ mb: 2 }}>
                                    Study group created successfully!
                                </Alert>
                            )}

                            <TextField
                                fullWidth
                                name="title"
                                label="Group Title"
                                value={form.title}
                                onChange={handleChange}
                                margin="normal"
                                required
                                error={!!errors.title}
                                helperText={errors.title}
                            />

                            <TextField
                                fullWidth
                                name="subject"
                                label="Subject"
                                value={form.subject}
                                onChange={handleChange}
                                margin="normal"
                                required
                                error={!!errors.subject}
                                helperText={errors.subject}
                            />

                            <TextField
                                fullWidth
                                name="description"
                                label="Description"
                                value={form.description}
                                onChange={handleChange}
                                margin="normal"
                                multiline
                                rows={4}
                                required
                                error={!!errors.description}
                                helperText={errors.description}
                            />

                            <TextField
                                fullWidth
                                name="meetingSchedule"
                                label="Meeting Schedule"
                                value={form.meetingSchedule}
                                onChange={handleChange}
                                margin="normal"
                                required
                                placeholder="e.g., Tuesdays and Thursdays 6PM"
                                error={!!errors.meetingSchedule}
                                helperText={errors.meetingSchedule}
                            />

                            <TextField
                                fullWidth
                                name="maxMembers"
                                label="Maximum Members"
                                type="number"
                                value={form.maxMembers}
                                onChange={handleChange}
                                margin="normal"
                                required
                                inputProps={{ min: 2, max: 50 }}
                                error={!!errors.maxMembers}
                                helperText={errors.maxMembers}
                            />

                            <Button
                                variant="contained"
                                onClick={handleSubmit}
                                sx={{ mt: 2 }}
                                fullWidth
                                size="large"
                            >
                                Create Group
                            </Button>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Groups List */}
                <Grid item xs={12} md={6}>
                    <Card>
                        <CardContent>
                            <Typography variant="h5" gutterBottom>
                                Created Groups ({groups.length})
                            </Typography>

                            {groups.length === 0 ? (
                                <Typography variant="body2" color="text.secondary" align="center" sx={{ py: 4 }}>
                                    No study groups created yet. Create your first group!
                                </Typography>
                            ) : (
                                <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
                                    {groups.map((group) => (
                                        <Card key={group.id} sx={{ mb: 2, backgroundColor: '#f5f5f5' }}>
                                            <CardContent sx={{ pb: 2 }}>
                                                <Typography variant="h6" gutterBottom>
                                                    {group.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary" gutterBottom>
                                                    Subject: {group.subject}
                                                </Typography>
                                                <Typography variant="body2" gutterBottom>
                                                    {group.description}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Schedule: {group.meetingSchedule}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    Members: {group.members.length}/{group.maxMembers}
                                                </Typography>
                                                <Typography variant="caption" color="text.secondary">
                                                    Created: {new Date(group.createdAt).toLocaleDateString()}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Create;