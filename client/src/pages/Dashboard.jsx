import  { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  AppBar,
  CssBaseline,
  Paper,
  Grid
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  AccountCircle,
  Logout,
  Payment
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  ResponsiveContainer
} from 'recharts';

const drawerWidth = 240;

const chartData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 600 },
  { name: 'Mar', users: 800 },
  { name: 'Apr', users: 500 },
  { name: 'May', users: 700 },
  { name: 'Jun', users: 900 },
];

function Dashboard() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClose = () => setAnchorEl(null);
  const goToProfile = () => {
    handleClose();
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    toast.success('Logout successful!');
    handleClose();
    navigate('/');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" noWrap>
            Dashboard
          </Typography>
          <Box>
              <IconButton onClick={goToProfile} size="small">
                <Avatar src="https://i.pravatar.cc/40" />
              </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth, cursor:'pointer',
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>

            <ListItem button onClick={() => navigate('/dashboard')}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem button onClick={() => navigate('/products')}>
              <ListItemIcon><DashboardIcon /></ListItemIcon>
              <ListItemText primary="Products" />
            </ListItem>
           
            <ListItem button onClick={() => handleLogout()}>
              <ListItemIcon><Logout /></ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
            
          </List>
        </Box>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> 
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="subtitle1">Total Users</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>1,200</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="subtitle1">Active Users</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>890</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="subtitle1">New Signups</Typography>
              <Typography variant="h5" sx={{ fontWeight: 'bold' }}>130</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>User Growth Over Time</Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid stroke="#ccc" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip />
                  <Line type="monotone" dataKey="users" stroke="#1976d2" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Dashboard;
