import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ScheduleIcon from '@mui/icons-material/Schedule';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BookIcon from '@mui/icons-material/Book';
import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
    const [groups, setGroups] = useState([]);
    const [userGroups, setUserGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Enhanced mock groups data with realistic details
        const mockGroups = [
            {
                _id: 'group1',
                title: 'AP Biology Mastery',
                subject: 'Biology', 
                description: 'Comprehensive study sessions covering cell biology, genetics, evolution, and ecology. Perfect for AP exam preparation with practice tests and lab discussions.',
                level: 'Advanced',
                meetingTime: 'Weekdays 6:00 PM',
                location: 'Online & Library Study Room A',
                tags: ['AP Exam', 'Lab Work', 'Practice Tests'],
                members: [
                    { _id: 'user1', name: 'Alex Chen', avatar: 'AC' },
                    { _id: 'user2', name: 'Maya Patel', avatar: 'MP' },
                    { _id: 'user3', name: 'Jordan Smith', avatar: 'JS' },
                    { _id: 'user4', name: 'Sofia Rodriguez', avatar: 'SR' }
                ],
                creator: { _id: 'user2', name: 'Maya Patel' },
                createdDate: '2025-06-15',
                maxMembers: 8
            },
            {
                _id: 'group2',
                title: 'Calculus Problem Solvers',
                subject: 'Mathematics',
                description: 'Tackle challenging calculus problems together! Focus on derivatives, integrals, and real-world applications. Weekly problem sets and exam prep.',
                level: 'Intermediate',
                meetingTime: 'Tue/Thu 7:30 PM',
                location: 'Math Building Room 204',
                tags: ['Problem Solving', 'Exam Prep', 'Derivatives'],
                members: [
                    { _id: 'user1', name: 'Alex Chen', avatar: 'AC' },
                    { _id: 'user5', name: 'Ethan Williams', avatar: 'EW' },
                    { _id: 'user6', name: 'Priya Kumar', avatar: 'PK' }
                ],
                creator: { _id: 'user1', name: 'Alex Chen' },
                createdDate: '2025-06-20',
                maxMembers: 6
            },
            {
                _id: 'group3',
                title: 'Physics Lab Explorers',
                subject: 'Physics',
                description: 'Hands-on physics experiments and lab report collaboration. From mechanics to electromagnetism, we make physics fun and understandable!',
                level: 'Beginner',
                meetingTime: 'Mon/Wed 4:00 PM',
                location: 'Physics Lab 101',
                tags: ['Lab Work', 'Experiments', 'Reports'],
                members: [
                    { _id: 'user7', name: 'Marcus Johnson', avatar: 'MJ' },
                    { _id: 'user8', name: 'Lily Zhang', avatar: 'LZ' },
                    { _id: 'user9', name: 'Carlos Mendez', avatar: 'CM' },
                    { _id: 'user10', name: 'Zoe Davis', avatar: 'ZD' },
                    { _id: 'user11', name: 'Ryan Park', avatar: 'RP' }
                ],
                creator: { _id: 'user7', name: 'Marcus Johnson' },
                createdDate: '2025-06-18',
                maxMembers: 10
            },
            {
                _id: 'group4',
                title: 'World Literature Circle',
                subject: 'English Literature',
                description: 'Dive deep into classic and contemporary world literature. Discuss themes, analyze characters, and explore cultural contexts through engaging book discussions.',
                level: 'Advanced',
                meetingTime: 'Saturday 2:00 PM',
                location: 'Campus Coffee House',
                tags: ['Book Club', 'Analysis', 'Discussion'],
                members: [
                    { _id: 'user12', name: 'Isabella Thompson', avatar: 'IT' },
                    { _id: 'user13', name: 'Noah Anderson', avatar: 'NA' },
                    { _id: 'user14', name: 'Aisha Okafor', avatar: 'AO' }
                ],
                creator: { _id: 'user12', name: 'Isabella Thompson' },
                createdDate: '2025-06-12',
                maxMembers: 8
            },
            {
                _id: 'group5',
                title: 'Organic Chemistry Warriors',
                subject: 'Chemistry',
                description: 'Conquer organic chemistry together! Master reaction mechanisms, synthesis pathways, and stereochemistry. Study sessions include practice problems and model building.',
                level: 'Advanced',
                meetingTime: 'Mon/Wed/Fri 5:00 PM',
                location: 'Chemistry Building Room 302',
                tags: ['Organic Chemistry', 'Mechanisms', 'Synthesis'],
                members: [
                    { _id: 'user15', name: 'Grace Liu', avatar: 'GL' },
                    { _id: 'user16', name: 'Ahmed Hassan', avatar: 'AH' },
                    { _id: 'user17', name: 'Emma O\'Connor', avatar: 'EO' },
                    { _id: 'user18', name: 'David Kim', avatar: 'DK' }
                ],
                creator: { _id: 'user15', name: 'Grace Liu' },
                createdDate: '2025-06-10',
                maxMembers: 6
            },
            {
                _id: 'group6',
                title: 'Spanish Conversation Club',
                subject: 'Spanish',
                description: 'Practice Spanish conversation in a supportive environment. All levels welcome! Focus on speaking fluency, pronunciation, and cultural understanding.',
                level: 'All Levels',
                meetingTime: 'Tuesday 6:00 PM',
                location: 'Language Center Room 105',
                tags: ['Conversation', 'Cultural Exchange', 'Fluency'],
                members: [
                    { _id: 'user19', name: 'Maria Santos', avatar: 'MS' },
                    { _id: 'user20', name: 'Jake Morrison', avatar: 'JM' }
                ],
                creator: { _id: 'user19', name: 'Maria Santos' },
                createdDate: '2025-06-22',
                maxMembers: 12
            }
        ];
        
        setGroups(mockGroups);
        // Mock: User is initially in groups 1 and 2
        setUserGroups(['group1', 'group2']);
    }, []);

    const joinGroup = (groupId) => {
        const currentUserId = user?._id || 'user1';
        const group = groups.find(g => g._id === groupId);
        
        if (!userGroups.includes(groupId)) {
            if (group.members.length >= group.maxMembers) {
                alert('This group is full. Cannot join at this time.');
                return;
            }
            
            setUserGroups([...userGroups, groupId]);
            // Update the groups to reflect new member
            setGroups(prevGroups => 
                prevGroups.map(group => 
                    group._id === groupId 
                        ? {
                            ...group,
                            members: [...group.members, { 
                                _id: currentUserId, 
                                name: user?.name || 'Demo User',
                                avatar: (user?.name || 'Demo User').split(' ').map(n => n[0]).join('').toUpperCase()
                            }]
                        }
                        : group
                )
            );
            alert('Successfully joined the group! Welcome aboard! 🎉');
        }
    };

    const leaveGroup = (groupId) => {
        const currentUserId = user?._id || 'user1';
        
        if (userGroups.includes(groupId)) {
            setUserGroups(userGroups.filter(id => id !== groupId));
            // Update the groups to remove the member
            setGroups(prevGroups => 
                prevGroups.map(group => 
                    group._id === groupId 
                        ? {
                            ...group,
                            members: group.members.filter(member => member._id !== currentUserId)
                        }
                        : group
                )
            );
            alert('You have left the group. Hope to see you again soon!');
        }
    };

    const isUserInGroup = (groupId) => {
        return userGroups.includes(groupId);
    };

    const isUserLoggedIn = () => {
        return user !== null;
    };

    const getLevelColor = (level) => {
        switch(level) {
            case 'Beginner': return 'success';
            case 'Intermediate': return 'warning';
            case 'Advanced': return 'error';
            default: return 'primary';
        }
    };

    return (
        <Box sx={{ padding: 3, backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
            <Box sx={{ mb: 4, textAlign: 'center' }}>
                <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: '#2c3e50' }}>
                    🎓 Discover Study Groups
                </Typography>
                <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                    Join collaborative learning communities and excel together
                </Typography>
                
                {!user && (
                    <Box sx={{ 
                        p: 2, 
                        bgcolor: 'info.light', 
                        color: 'info.contrastText', 
                        borderRadius: 2,
                        display: 'inline-block'
                    }}>
                        <Typography variant="body1">
                            📚 Please log in to join study groups and start your learning journey!
                        </Typography>
                    </Box>
                )}
            </Box>

            <Grid container spacing={3}>
                {groups.map((group) => (
                    <Grid item xs={12} sm={6} lg={4} key={group._id}>
                        <Card 
                            sx={{ 
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                transition: 'transform 0.2s, box-shadow 0.2s',
                                '&:hover': {
                                    transform: 'translateY(-4px)',
                                    boxShadow: 4
                                }
                            }}
                        >
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', lineHeight: 1.2 }}>
                                        {group.title}
                                    </Typography>
                                    <Chip 
                                        label={group.level} 
                                        color={getLevelColor(group.level)}
                                        size="small"
                                        variant="outlined"
                                    />
                                </Box>
                                
                                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                    <BookIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {group.subject}
                                    </Typography>
                                </Box>
                                
                                <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.4 }}>
                                    {group.description}
                                </Typography>

                                <Box sx={{ mb: 2 }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                                        <ScheduleIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {group.meetingTime}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <LocationOnIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {group.location}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ mb: 2 }}>
                                    {group.tags.map((tag, index) => (
                                        <Chip 
                                            key={index}
                                            label={tag} 
                                            size="small" 
                                            sx={{ mr: 0.5, mb: 0.5 }}
                                            variant="outlined"
                                        />
                                    ))}
                                </Box>

                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <GroupIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {group.members.length}/{group.maxMembers}
                                        </Typography>
                                        <AvatarGroup max={3} sx={{ ml: 1 }}>
                                            {group.members.map((member, index) => (
                                                <Avatar 
                                                    key={index}
                                                    sx={{ width: 24, height: 24, fontSize: 12 }}
                                                >
                                                    {member.avatar}
                                                </Avatar>
                                            ))}
                                        </AvatarGroup>
                                    </Box>
                                </Box>

                                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                                    <PersonIcon sx={{ mr: 1, fontSize: 16, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        Created by {group.creator?.name}
                                    </Typography>
                                </Box>
                            </CardContent>
                            
                            <CardActions sx={{ p: 2, pt: 0 }}>
                                <Button 
                                    size="small" 
                                    onClick={() => navigate(`/group/${group._id}`)}
                                    variant="outlined"
                                    fullWidth
                                >
                                    View Details
                                </Button>
                                
                                {isUserLoggedIn() && (
                                    <Box sx={{ ml: 1, width: '100%' }}>
                                        {isUserInGroup(group._id) ? (
                                            <Button 
                                                size="small" 
                                                variant="outlined"
                                                color="secondary"
                                                onClick={() => leaveGroup(group._id)}
                                                fullWidth
                                            >
                                                Leave Group
                                            </Button>
                                        ) : (
                                            <Button 
                                                size="small" 
                                                variant="contained"
                                                onClick={() => joinGroup(group._id)}
                                                fullWidth
                                                disabled={group.members.length >= group.maxMembers}
                                            >
                                                {group.members.length >= group.maxMembers ? 'Group Full' : 'Join Group'}
                                            </Button>
                                        )}
                                    </Box>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Home;