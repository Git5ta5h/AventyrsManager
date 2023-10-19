import { useEffect, useState } from 'react';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import RemoveShoppingCart from '@mui/icons-material/RemoveShoppingCart';
import Box from '@mui/material/Box';

import AddIcon from '@mui/icons-material/Add';

const Menu = () => {
    const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://hi-fiprogramming.net/projects/aventyrskiosken/dbapi.php?table=Items')

     
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Assuming the response contains JSON data
    })
    .then(data => {
      // Handle the data here
      console.log(data);
      setData(data)
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
    
  }, []); 

  return (
    <>
    <Box sx={{border: "2px solid orange", width: "60%", mt: 2}}>
        {data.map((item) => (
            <Box key={item.Item_Id}>
                <Box sx={{display: "flex", flexDirection:"row", width: "100%", justifyContent: "space-between", align: "center", border:"2px solid gray", borderRadius:"10px"}}>
                    <Box component="img" src={item.Image_path} sx={{width: "10rem", height:"7rem", borderRadius: "10px", objectFit:"fill", border:"2px solid gray"}}/>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography variant="h1" component="h1">{item.Name}</Typography>
                        <Typography variant="h3" component="h3">{item.Description}</Typography>
                        <Typography variant="h2" component="h2">{item.Price}</Typography>
                    </Box>
                    <Box>
                      <Button variant="contained" sx={{height: "40px", alignSelf:"top"}}><EditIcon/></Button>
                      <Button variant="contained" color="error" sx={{height: "40px", alignSelf:"bottom"}}><RemoveShoppingCart/></Button>
                    </Box>
                </Box>
            </Box>
                    
                ))}
    </Box>
    </>
  ) 
}

export default Menu