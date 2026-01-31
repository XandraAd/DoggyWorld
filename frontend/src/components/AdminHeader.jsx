import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Breadcrumbs,
  Badge,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Menu as MenuIcon,
  Person,
  Settings,
  Logout,
  KeyboardArrowDown,
} from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';

const AdminHeader = ({ onMenuToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = React.useState(null);

  // Generate breadcrumbs from path
  const pathnames = location.pathname.split('/').filter((x) => x);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = () => {
    // Add logout logic here
    console.log('Logging out...');
    handleProfileMenuClose();
  };

  const formatBreadcrumbName = (name) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Mock notifications data
  const notifications = [
    { id: 1, text: 'New order received', time: '5 min ago', read: false },
    { id: 2, text: 'Product low in stock', time: '1 hour ago', read: false },
    { id: 3, text: 'New user registered', time: '2 hours ago', read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{ 
        backgroundColor: 'white',
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: 'divider',
        backdropFilter: 'blur(8px)',
        backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.9), rgba(255,255,255,0.8))'
      }}
    >
      <Toolbar sx={{ 
        justifyContent: 'space-between',
        minHeight: { xs: 56, sm: 64 },
        px: { xs: 2, sm: 3 }
      }}>
        {/* Left Side - Breadcrumbs */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <IconButton
            onClick={onMenuToggle}
            sx={{ 
              display: { lg: 'none' },
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Breadcrumbs 
            aria-label="breadcrumb"
            sx={{
              '& .MuiBreadcrumbs-ol': {
                flexWrap: 'nowrap'
              },
              '& .MuiBreadcrumbs-li': {
                whiteSpace: 'nowrap'
              }
            }}
          >
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{ 
                textDecoration: 'none',
                cursor: 'pointer',
                '&:hover': {
                  color: 'primary.main'
                }
              }}
              onClick={() => navigate('/admin')}
            >
              Dashboard
            </Typography>
            {pathnames.map((value, index) => {
              const last = index === pathnames.length - 1;
              const to = `/${pathnames.slice(0, index + 1).join('/')}`;
              const formattedName = formatBreadcrumbName(value);

              return last ? (
                <Typography 
                  key={to} 
                  variant="body2" 
                  color="text.primary" 
                  fontWeight="600"
                  sx={{ 
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: { xs: '120px', sm: '200px' }
                  }}
                >
                  {formattedName}
                </Typography>
              ) : (
                <Typography
                  key={to}
                  variant="body2"
                  color="text.secondary"
                  sx={{ 
                    textDecoration: 'none',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      color: 'primary.main'
                    }
                  }}
                  onClick={() => navigate(to)}
                >
                  {formattedName}
                </Typography>
              );
            })}
          </Breadcrumbs>
        </Box>

        {/* Right Side - Actions & Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
          {/* Notifications */}
          <IconButton
            size="medium"
            onClick={handleNotificationMenuOpen}
            sx={{
              color: 'text.secondary',
              '&:hover': {
                backgroundColor: 'action.hover',
                color: 'text.primary'
              }
            }}
          >
            <Badge 
              badgeContent={unreadCount} 
              color="error"
              sx={{
                '& .MuiBadge-badge': {
                  fontSize: '0.7rem',
                  height: '16px',
                  minWidth: '16px'
                }
              }}
            >
              <NotificationsIcon fontSize="small" />
            </Badge>
          </IconButton>

          <Menu
            anchorEl={notificationAnchorEl}
            open={Boolean(notificationAnchorEl)}
            onClose={handleNotificationMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 320,
                maxHeight: 400,
                '& .MuiMenuItem-root': {
                  py: 1.5
                }
              }
            }}
          >
            <Typography variant="subtitle2" sx={{ px: 2, py: 1, color: 'text.secondary' }}>
              Notifications
            </Typography>
            <Divider />
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <MenuItem key={notification.id} onClick={handleNotificationMenuClose}>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="body2" sx={{ fontWeight: notification.read ? 'normal' : '600' }}>
                      {notification.text}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {notification.time}
                    </Typography>
                  </Box>
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>
                <Typography variant="body2" color="text.secondary">
                  No new notifications
                </Typography>
              </MenuItem>
            )}
          </Menu>

          {/* Profile Menu */}
          <Box 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              cursor: 'pointer',
              px: 1,
              py: 0.5,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'action.hover'
              }
            }}
            onClick={handleProfileMenuOpen}
          >
            <Avatar 
              sx={{ 
                width: 32, 
                height: 32,
                backgroundColor: 'primary.main',
                fontSize: '0.875rem',
                fontWeight: 600
              }}
            >
              A
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Typography variant="body2" fontWeight="500">
                Admin User
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Administrator
              </Typography>
            </Box>
            <KeyboardArrowDown 
              sx={{ 
                fontSize: 18,
                color: 'text.secondary',
                display: { xs: 'none', sm: 'block' }
              }} 
            />
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            PaperProps={{
              sx: {
                mt: 1.5,
                minWidth: 200
              }
            }}
          >
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <Person fontSize="small" />
              </ListItemIcon>
              <ListItemText>Profile</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AdminHeader;