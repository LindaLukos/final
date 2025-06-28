import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

// Styled components for enhanced aesthetics
const GlassAppBar = styled(AppBar)(({ theme, scrolled }) => ({
    background: scrolled 
        ? 'rgba(25, 118, 210, 0.95)' 
        : 'linear-gradient(135deg, #1976d2 0%, #42a5f5 50%, #64b5f6 100%)',
    backdropFilter: 'blur(20px)',
    borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none',
    boxShadow: scrolled 
        ? '0 8px 32px rgba(0, 0, 0, 0.1)' 
        : '0 4px 20px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const StyledButton = styled(Button)(({ theme, active }) => ({
    borderRadius: '12px',
    textTransform: 'none',
    fontWeight: 600,
    padding: '8px 16px',
    margin: '0 4px',
    position: 'relative',
    overflow: 'hidden',
    background: active 
        ? 'rgba(255, 255, 255, 0.15)' 
        : 'transparent',
    color: 'white',
    border: active ? '1px solid rgba(255, 255, 255, 0.3)' : '1px solid transparent',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
        transition: 'left 0.5s',
    },
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        transform: 'translateY(-2px)',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        '&::before': {
            left: '100%',
        },
    },
    '&:active': {
        transform: 'translateY(0)',
    },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '8px 12px',
    borderRadius: '12px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        transform: 'scale(1.05)',
    },
}));

const UserSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '4px 8px',
    borderRadius: '20px',
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    borderRadius: '8px',
    margin: '4px 8px',
    padding: '12px 16px',
    transition: 'all 0.2s ease',
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        transform: 'translateX(4px)',
    },
}));

const AdminChip = styled(Chip)(({ theme }) => ({
    background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
    color: 'white',
    fontWeight: 600,
    animation: 'glow 2s ease-in-out infinite alternate',
    '@keyframes glow': {
        from: { boxShadow: '0 0 5px rgba(255, 107, 53, 0.5)' },
        to: { boxShadow: '0 0 20px rgba(255, 107, 53, 0.8)' },
    },
}));

const Navbar = ({ user, onLogout }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10;
            setScrolled(isScrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        onLogout();
        handleClose();
        navigate('/');
    };

    const handleLogoClick = () => {
        navigate('/');
    };

    const handleProfileClick = () => {
        navigate('/profile');
        handleClose();
    };

    const isActive = (path) => location.pathname === path;

    const getInitials = (name) => {
        return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'U';
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <GlassAppBar position="fixed" elevation={0} scrolled={scrolled}>
                <Toolbar sx={{ padding: { xs: 1, sm: 2 } }}>
                    <LogoContainer onClick={handleLogoClick} sx={{ flexGrow: 1 }}>
                        <GroupsIcon 
                            sx={{ 
                                fontSize: 32, 
                                mr: 1, 
                                color: '#fff',
                                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))'
                            }} 
                        />
                        <Typography 
                            variant="h5" 
                            component="div" 
                            sx={{ 
                                fontWeight: 700,
                                background: 'linear-gradient(45deg, #fff, #e3f2fd)',
                                backgroundClip: 'text',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                                letterSpacing: '-0.5px'
                            }}
                        >
                            StudySync
                        </Typography>
                    </LogoContainer>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <StyledButton 
                                startIcon={<HomeIcon />}
                                active={isActive('/')}
                            >
                                Home
                            </StyledButton>
                        </Link>
                        
                        {user ? (
                            <>
                                <Link to='/create-group' style={{ textDecoration: 'none' }}>
                                    <StyledButton 
                                        startIcon={<AddIcon />}
                                        active={isActive('/create-group')}
                                    >
                                        Create Group
                                    </StyledButton>
                                </Link>
                                
                                {(user.role === 'admin' || user.isAdmin) && (
                                    <Link to='/admin' style={{ textDecoration: 'none' }}>
                                        <AdminChip
                                            icon={<AdminPanelSettingsIcon />}
                                            label="Admin"
                                            onClick={() => navigate('/admin')}
                                            sx={{ 
                                                cursor: 'pointer',
                                                '&:hover': { transform: 'scale(1.05)' }
                                            }}
                                        />
                                    </Link>
                                )}
                                
                                <UserSection>
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            color: 'white',
                                            fontWeight: 500,
                                            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
                                        }}
                                    >
                                        {user.name}
                                    </Typography>
                                    <IconButton
                                        onClick={handleMenu}
                                        sx={{
                                            p: 0,
                                            transition: 'all 0.3s ease',
                                            '&:hover': { 
                                                transform: 'scale(1.1) rotate(5deg)',
                                            }
                                        }}
                                    >
                                        <Badge 
                                            color="error" 
                                            variant="dot" 
                                            invisible={!user.isAdmin}
                                            overlap="circular"
                                        >
                                            <Avatar 
                                                sx={{ 
                                                    width: 36, 
                                                    height: 36,
                                                    background: 'linear-gradient(45deg, #FF6B6B, #4ECDC4)',
                                                    color: 'white',
                                                    fontWeight: 600,
                                                    fontSize: '14px',
                                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                                                }}
                                            >
                                                {getInitials(user.name)}
                                            </Avatar>
                                        </Badge>
                                    </IconButton>
                                </UserSection>
                                
                                <Menu
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                    PaperProps={{
                                        sx: {
                                            mt: 1,
                                            borderRadius: '12px',
                                            minWidth: 200,
                                            background: 'rgba(255, 255, 255, 0.95)',
                                            backdropFilter: 'blur(20px)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                        }
                                    }}
                                >
                                    <StyledMenuItem onClick={handleProfileClick}>
                                        <PersonIcon sx={{ mr: 2, color: 'primary.main' }} />
                                        My Profile
                                    </StyledMenuItem>
                                    <StyledMenuItem onClick={handleLogout}>
                                        <LogoutIcon sx={{ mr: 2, color: 'error.main' }} />
                                        Logout
                                    </StyledMenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Link to='/login' style={{ textDecoration: 'none' }}>
                                <StyledButton 
                                    startIcon={<LoginIcon />}
                                    variant="outlined"
                                    sx={{ 
                                        borderColor: "rgba(255, 255, 255, 0.5)",
                                        background: 'rgba(255, 255, 255, 0.1)',
                                        '&:hover': {
                                            borderColor: "white",
                                            background: 'rgba(255, 255, 255, 0.2)',
                                        }
                                    }}
                                >
                                    Login / Sign Up
                                </StyledButton>
                            </Link>
                        )}
                    </Box>
                </Toolbar>
            </GlassAppBar>
            {/* Spacer to prevent content from hiding behind fixed navbar */}
            <Box sx={{ height: '64px' }} />
        </Box>
    );
};

export default Navbar;