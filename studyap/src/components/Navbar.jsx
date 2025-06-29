import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { styled, alpha, keyframes } from '@mui/material/styles';
import GroupsIcon from '@mui/icons-material/Groups';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LoginIcon from '@mui/icons-material/Login';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Brightness4Icon from '@mui/icons-material/Brightness4';

// Enhanced animations
const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: calc(200px + 100%) 0; }
`;

const float = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-3px); }
`;

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(255, 107, 53, 0.5), 0 0 10px rgba(255, 107, 53, 0.3); }
  50% { box-shadow: 0 0 20px rgba(255, 107, 53, 0.8), 0 0 30px rgba(255, 107, 53, 0.6); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

// Enhanced styled components
const GlassAppBar = styled(AppBar)(({ theme, scrolled }) => ({
    background: scrolled 
        ? 'rgba(15, 23, 42, 0.95)' 
        : 'linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #475569 75%, #64748b 100%)',
    backdropFilter: 'blur(25px)',
    borderBottom: scrolled ? '1px solid rgba(148, 163, 184, 0.2)' : 'none',
    boxShadow: scrolled 
        ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 16px rgba(0, 0, 0, 0.2)' 
        : '0 4px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(148, 163, 184, 0.8), transparent)',
    },
}));

const StyledButton = styled(Button)(({ theme, active }) => ({
    borderRadius: '16px',
    textTransform: 'none',
    fontWeight: 600,
    padding: '10px 20px',
    margin: '0 6px',
    position: 'relative',
    overflow: 'hidden',
    background: active 
        ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(147, 51, 234, 0.3))' 
        : 'rgba(255, 255, 255, 0.05)',
    color: active ? '#60a5fa' : '#e2e8f0',
    border: active 
        ? '1px solid rgba(59, 130, 246, 0.5)' 
        : '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    animation: active ? `${float} 2s ease-in-out infinite` : 'none',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
        transition: 'left 0.6s ease',
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: active 
            ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))'
            : 'transparent',
        borderRadius: '16px',
        transition: 'opacity 0.3s ease',
    },
    '&:hover': {
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        color: '#93c5fd',
        transform: 'translateY(-2px) scale(1.02)',
        boxShadow: '0 12px 30px rgba(59, 130, 246, 0.3), 0 8px 16px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(59, 130, 246, 0.6)',
        '&::before': {
            left: '100%',
        },
    },
    '&:active': {
        transform: 'translateY(0) scale(1)',
    },
}));

const LogoContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '12px 16px',
    borderRadius: '16px',
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
        transform: 'translateX(-100%)',
        transition: 'transform 0.6s ease',
    },
    '&:hover': {
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        transform: 'scale(1.02)',
        border: '1px solid rgba(59, 130, 246, 0.3)',
        boxShadow: '0 8px 25px rgba(59, 130, 246, 0.2)',
        '&::before': {
            transform: 'translateX(100%)',
        },
    },
}));

const UserSection = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '8px 16px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
    backdropFilter: 'blur(15px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 4px 12px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.08))',
        transform: 'translateY(-1px)',
        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.3), 0 6px 20px rgba(0, 0, 0, 0.15)',
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    borderRadius: '12px',
    margin: '6px 12px',
    padding: '14px 18px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)',
        transition: 'left 0.5s ease',
    },
    '&:hover': {
        backgroundColor: alpha(theme.palette.primary.main, 0.1),
        transform: 'translateX(6px) scale(1.02)',
        boxShadow: '0 4px 12px rgba(59, 130, 246, 0.2)',
        '&::before': {
            left: '100%',
        },
    },
}));

const AdminChip = styled(Chip)(({ theme }) => ({
    background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffab00 100%)',
    color: 'white',
    fontWeight: 700,
    padding: '4px 8px',
    height: '36px',
    borderRadius: '18px',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    boxShadow: '0 4px 12px rgba(255, 107, 53, 0.4)',
    animation: `${glow} 3s ease-in-out infinite`,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent)',
        animation: `${shimmer} 2s infinite`,
    },
    '&:hover': {
        transform: 'scale(1.08) translateY(-2px)',
        boxShadow: '0 8px 25px rgba(255, 107, 53, 0.6)',
        animation: `${pulse} 0.6s ease-in-out`,
    },
}));

const GradientText = styled(Typography)(({ theme }) => ({
    fontWeight: 800,
    fontSize: '1.75rem',
    background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    textShadow: '0 2px 8px rgba(96, 165, 250, 0.3)',
    letterSpacing: '-0.02em',
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
}));

const IconWrapper = styled(Box)(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, rgba(96, 165, 250, 0.2), rgba(167, 139, 250, 0.2))',
    marginRight: '12px',
    transition: 'all 0.3s ease',
    animation: `${float} 3s ease-in-out infinite`,
}));

const Navbar = ({ user, onLogout }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [scrolled, setScrolled] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    // Handle scroll effect with enhanced smoothness
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 20;
            setScrolled(isScrolled);
        };

        const throttledHandleScroll = throttle(handleScroll, 16); // 60fps
        window.addEventListener('scroll', throttledHandleScroll, { passive: true });
        return () => window.removeEventListener('scroll', throttledHandleScroll);
    }, []);

    // Throttle function for performance
    const throttle = (func, limit) => {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    };

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
                <Toolbar sx={{ padding: { xs: 1, sm: 2 }, minHeight: '80px' }}>
                    <LogoContainer onClick={handleLogoClick} sx={{ flexGrow: 1 }}>
                        <IconWrapper>
                            <GroupsIcon 
                                sx={{ 
                                    fontSize: 28, 
                                    color: '#60a5fa',
                                    filter: 'drop-shadow(0 2px 8px rgba(96, 165, 250, 0.4))'
                                }} 
                            />
                        </IconWrapper>
                        <GradientText variant="h5" component="div">
                            StudySync
                        </GradientText>
                    </LogoContainer>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Link to='/' style={{ textDecoration: 'none' }}>
                            <StyledButton 
                                startIcon={<HomeIcon sx={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />}
                                active={isActive('/')}
                            >
                                Home
                            </StyledButton>
                        </Link>
                        
                        {user ? (
                            <>
                                <Link to='/create' style={{ textDecoration: 'none' }}>
                                    <StyledButton 
                                        startIcon={<AddIcon sx={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />}
                                        active={isActive('/create')}
                                    >
                                        Create Group
                                    </StyledButton>
                                </Link>
                                
                                {(user.role === 'admin' || user.isAdmin) && (
                                    <Link to='/admin' style={{ textDecoration: 'none' }}>
                                        <AdminChip
                                            icon={<AdminPanelSettingsIcon sx={{ fontSize: '18px !important' }} />}
                                            label="Admin"
                                            onClick={() => navigate('/admin')}
                                            sx={{ 
                                                cursor: 'pointer',
                                                fontFamily: '"Inter", "Roboto", sans-serif',
                                            }}
                                        />
                                    </Link>
                                )}
                                
                                <UserSection>
                                    <Typography 
                                        variant="body2" 
                                        sx={{ 
                                            color: '#e2e8f0',
                                            fontWeight: 600,
                                            textShadow: '0 1px 3px rgba(0,0,0,0.4)',
                                            fontSize: '0.9rem',
                                            fontFamily: '"Inter", "Roboto", sans-serif',
                                        }}
                                    >
                                        {user.name}
                                    </Typography>
                                    <IconButton
                                        onClick={handleMenu}
                                        sx={{
                                            p: 0,
                                            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
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
                                            sx={{
                                                '& .MuiBadge-dot': {
                                                    background: 'linear-gradient(45deg, #ff6b35, #f7931e)',
                                                    boxShadow: '0 0 10px rgba(255, 107, 53, 0.8)',
                                                    animation: `${pulse} 2s infinite`,
                                                }
                                            }}
                                        >
                                            <Avatar 
                                                sx={{ 
                                                    width: 40, 
                                                    height: 40,
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    color: 'white',
                                                    fontWeight: 700,
                                                    fontSize: '16px',
                                                    border: '2px solid rgba(255, 255, 255, 0.3)',
                                                    boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
                                                    fontFamily: '"Inter", "Roboto", sans-serif',
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
                                            mt: 2,
                                            borderRadius: '16px',
                                            minWidth: 220,
                                            background: 'rgba(15, 23, 42, 0.95)',
                                            backdropFilter: 'blur(25px)',
                                            border: '1px solid rgba(148, 163, 184, 0.2)',
                                            boxShadow: '0 12px 40px rgba(0, 0, 0, 0.3), 0 4px 20px rgba(0, 0, 0, 0.2)',
                                            '& .MuiList-root': {
                                                padding: '8px',
                                            }
                                        }
                                    }}
                                >
                                    <StyledMenuItem onClick={handleProfileClick}>
                                        <PersonIcon sx={{ mr: 2, color: '#60a5fa' }} />
                                        <Typography sx={{ color: '#e2e8f0', fontWeight: 500 }}>
                                            My Profile
                                        </Typography>
                                    </StyledMenuItem>
                                    <StyledMenuItem onClick={handleLogout}>
                                        <LogoutIcon sx={{ mr: 2, color: '#f87171' }} />
                                        <Typography sx={{ color: '#e2e8f0', fontWeight: 500 }}>
                                            Logout
                                        </Typography>
                                    </StyledMenuItem>
                                </Menu>
                            </>
                        ) : (
                            <Link to='/login' style={{ textDecoration: 'none' }}>
                                <StyledButton 
                                    startIcon={<LoginIcon sx={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))' }} />}
                                    variant="outlined"
                                    sx={{ 
                                        borderColor: "rgba(148, 163, 184, 0.3)",
                                        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))',
                                        '&:hover': {
                                            borderColor: "#60a5fa",
                                            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(147, 51, 234, 0.2))',
                                            color: '#93c5fd',
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
            {/* Enhanced spacer */}
            <Box sx={{ height: '80px' }} />
        </Box>
    );
};

export default Navbar;