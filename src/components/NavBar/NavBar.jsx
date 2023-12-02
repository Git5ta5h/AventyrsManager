import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';
import { ToastContainer, toast } from 'react-toastify';

const NavItem = ({ to, text }) => (
  <Link to={to} style={{ textDecoration: 'none' }}>
    <Typography variant="h1" component="h1">
      {text}
    </Typography>
  </Link>
);

const NavBar = ({ isAuthenticated, onLogout }) => {
  return isAuthenticated ? (<Box  sx={{
    width: '100%',
    backgroundColor: '#C38370', // Set a background color for the entire navigation bar
    padding: 2, mb: 2, display: "flex", justifyContent:"center", alignItems:"center"
  }}>
    <Stack  direction="row"
        sx={{
          "@media screen and (max-width: 550px)": {width: '95%'},
          justifyContent: 'space-between', // Center the elements horizontally
          alignItems: 'center',    // Center the elements vertically
          width: '80%',
          margin: '0 auto',
        }}>
       <Stack direction="row" spacing={5}>
        <Link to="/orders"  style={{ textDecoration: 'none' }}> <Typography
         sx={{"@media screen and (max-width: 550px)": {fontSize: 20}}}
              variant="h1"
              component="h1">Beställningar</Typography></Link>
        <Link to="/menu"style={{ textDecoration: 'none' }}><Typography
        sx={{"@media screen and (max-width: 550px)": {fontSize: 20}}}
              variant="h1"
              component="h1">Meny</Typography></Link>
        <Link to="/users"style={{ textDecoration: 'none' }}><Typography
        sx={{"@media screen and (max-width: 550px)": {fontSize: 20}}}
              variant="h1"
              component="h1">Användare</Typography></Link>
        <Link to="/statistics"style={{ textDecoration: 'none' }}><Typography
        sx={{"@media screen and (max-width: 550px)": {fontSize: 20}}}
              variant="h1"
              component="h1">Statistik</Typography></Link>
      </Stack>
      <Stack>
        <Link to="/">
        <Button variant="contained" onClick={onLogout}>LOG OUT</Button>
        </Link>
      </Stack>
    </Stack>
    <ToastContainer position="top-right" autoClose={3000} />
    </Box>
    ) : null;
  
}

export default NavBar;