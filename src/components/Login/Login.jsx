import {useState, useEffect} from 'react';
import { useNavigate, Route, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from "@mui/material/Typography";
import useAdminStore from "./Admin_Id";
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [isAuthenticated, setAuthenticated] = useState(false);
    const [response, setResponse] = useState()

    const [data, setData] = useState([]);

    const [userId, setUserId] = useState();
    const { Id, Username, Password, setAdminInfo } = useAdminStore();

    const [formData, setFormData] = useState({
        Username: '',
        Password: ''
      });


    
      useEffect(() => {
        fetch('https://hi-fiprogramming.net/projects/aventyrskiosken/dbapi.php?table=Admins')
    
         
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Assuming the response contains JSON data
        })
        .then(data => {
          // Handle the data here
          console.log(data);
          setData(data);
         
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    
      }, []); 

      useEffect(() => {
        const foundItem = data.find(item => 
          formData.Username.toUpperCase() === item.Username.toUpperCase() &&
          formData.Password == item.Password
        );
    
        if (foundItem && foundItem.Admin_Id) {
          console.log('Authorized Admin ID:', foundItem.Admin_Id);
          setCustomerInfo(foundItem.Admin_Id, formData.Username.toUpperCase(), formData.Password.toUpperCase());
        } 
        // Note: Avoid using `customerId` directly here because it might not be updated yet due to the asynchronous nature of state updates.
      }, [formData, data, setAdminInfo]);
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
        const isAuthorized = data.some((item) => 
            formData.Username.toUpperCase() == item.Username.toUpperCase() &&
            formData.Password== item.Password
            );

            if (isAuthorized) {
                setAuthenticated(true);
                onLogin(true);
                navigate('/orders');
                setResponse(isAuthorized);
                
                console.log(Id, Username, Password);
                

              } else {
                console.log('Authorization failed');
                setResponse(!isAuthorized);
              }

    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };

  return (
    <Box sx={{ display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center", minHeight:"100vh", width: "60%"}}>
          <form onSubmit={handleSubmit}>
        <FormControl sx={{width: "100%", height: "450px", display:"flex", flexDirection:"column", justifyContent:"center", border:"2px solid green", borderRadius:"10px"}}>
            <TextField sx={{m: 2}} name="Username" label="Användarnamn" value={formData.Username} onChange={handleChange}/>
            <TextField sx={{m: 2}} name="Password" label="Lösenord" value={formData.Password} onChange={handleChange} type={"password"}/>
            <Button type="submit" variant="contained" sx={{ m: 2, p: 1 }}>Logga in</Button>
            {response ? <Typography sx={{color:"red", alignSelf:"center", fontWeight:"700"}}>Fel namn eller lösenord</Typography> : null}
        </FormControl>
        </form>
    </Box>
  )
}

export default Login