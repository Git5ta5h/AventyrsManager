import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import Box from '@mui/material/Box';

const NavBar = () => {
  return (
    <Box sx={{width: "60%", border:"2px solid green", padding: 1}}>
    <Stack  direction="row" sx={{justifyContent: "space-between", alignItems:"center"}}>
      <Stack direction="row" sx={{width:"20%", justifyContent:"space-around"}}>
        <Link to="/orders"  style={{ textDecoration: 'none' }}> <Typography
              variant="h1"
              component="h1">Beställningar</Typography></Link>
        <Link to="/users"style={{ textDecoration: 'none' }}><Typography
              variant="h1"
              component="h1">Användare</Typography></Link>
        <Link to="/menu"style={{ textDecoration: 'none' }}><Typography
              variant="h1"
              component="h1">Meny</Typography></Link>
      </Stack>
      <Stack>
        <Button variant="contained">LOG IN</Button>
      </Stack>
    </Stack>
    </Box>
  )
}

export default NavBar
