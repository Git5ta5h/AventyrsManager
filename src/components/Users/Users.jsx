import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';


const Users = () => {
    const [data, setData] = useState([]);
    const [targetedId, setTargetedId] = useState(null);
    const [changed, setChanged] = useState(false);
    
    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    const telephonenumberRef = useRef(null);
    const tabRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      fetch('https://hi-fiprogramming.net/projects/aventyrskiosken/dbapi.php?table=Customers')     
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
    }
  // Fetch data initially and then at regular intervals
  fetchData();
  const intervalId = setInterval(fetchData, 10000); // Update every 10 seconds

  if (changed) {
    fetchData();
    console.log('Changes was made');
    setChanged(false);
  }

  return () => {
    // Clean up the interval when the component unmounts
    clearInterval(intervalId);
  };
}, [changed]);
  
  const sendPostRequest = (data) => {
    // SENDING DATA TO DB, RESPONSE 
    var response ="";
    fetch('https://hi-fiprogramming.net/projects/aventyrskiosken/newdb.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Post Response: ", data); // Handle the POST response data here
        response = data;
      })
      .catch(error => {
        console.error('POST Error:', error);
      });
      return response;
  }

  const handleElementClick = (id) =>
  {
    setTargetedId(id); // Set the targetedId when the element is clicked
  };

  const removeClick = (id) =>
  {
    var response = "";

    const data = 
    {
      action:'DELETE',
      table: 'Customers',
      id:id
    }
    response = sendPostRequest(data)
    console.log(response);
    setChanged(true);
  };

  const addClick = () =>
  {
    console.log("Clicked");
        var fname;
        var lname;
        var tele;
        var tab;

        if(firstnameRef.current.value != "")
        {
          fname = firstnameRef.current.value;
        }
        else
        {
          const label = fnTFRef.current.querySelector('.MuiInputLabel-root');
          fname = label.textContent;
        }

        if(lastnameRef.current.value != "")
        {
          lname = lastnameRef.current.value;
        }
        else
        {
          const label = lnTFRef.current.querySelector('.MuiInputLabel-root');
          lname = label.textContent;
        }

        if(telephonenumberRef.current.value != "")
        {
          tele = telephonenumberRef.current.value;
        }
        else
        {
          const label = tnTFRef.current.querySelector('.MuiInputLabel-root');
          tele = label.textContent;
        }

        if(tabRef.current.value != "")
        {
          tab = tabRef.current.value;
        }
        else
        {
          const label = tTFRef.current.querySelector('.MuiInputLabel-root');
          tab = label.textContent;
        }

        var data = {
          action: 'INSERT', //UPDATE, INSERT, DELETE
          table: 'Customers', 
          firstname: fname,
          lastname: lname,
          telephonenumber: tele,
          tab: tab
        };
        var response = sendPostRequest(data)
        console.log(response);
        setChanged(true);
  };
  
 

  return (
    <>
    <br></br>
    <Box sx={{border: "2px solid orange", display: "flex", flexDirection:"row", width: "60%", justifyContent: "space-between"}}>
    <TextField id="TF_FN" label="Förnamn" inputRef={firstnameRef} variant="outlined"  />
    <TextField id="TF_LN" label="Efternamn" inputRef={lastnameRef}  variant="outlined" />
    <TextField id="TF_TN" label="Mobil" inputRef={telephonenumberRef} variant="outlined" />
    <TextField id="TF_T" label="Nota" inputRef={tabRef} variant="outlined" />
      <Box>
      <Link to={`.`}>
      <Button onClick={addClick} variant="contained" sx={{ height: '40px', alignSelf: 'center', mt: 2 }}>
      <AddIcon />
      </Button>
      </Link>
      </Box>
    </Box>
    <br></br>
    <Box sx={{border: "2px solid orange", width: "60%"}}>
        {data.map((customer) => (
            <Box key={customer.Customer_Id}>
                <Box sx={{border: "2px solid orange", display: "flex", flexDirection:"row", width: "100%", justifyContent: "space-between"}}>
                    <Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography variant="h1" component="h1">ID: {customer.Customer_Id}</Typography>
                        <Typography variant="h1" component="h1">Namn: {customer.Firstname}</Typography>
                        <Typography variant="h1" component="h1">Efternamn: {customer.Lastname}</Typography>
                    </Box>
                    <Box>
                    <Typography variant="h1" component="h1">Telefon: {customer.Telephone_Number}</Typography>
                    </Box>
                    <Box>
                    <Typography variant="h1" component="h1">Nota: {customer.Tab} Kr</Typography>
                    </Box>
                    <Box>
                      <Link to={`/edit_user/${customer.Customer_Id}`}>
                      <Button onClick={() => handleElementClick(customer.Customer_Id)} variant="contained" sx={{ height: '40px', alignSelf: 'center', mt: 2 }}>
                    <EditIcon />
                    </Button>
                    </Link>
                    <Link to={`.`}>
                      <Button onClick={() => removeClick(customer.Customer_Id)} color="error" variant="contained" sx={{ height: '40px', alignSelf: 'center', mt: 2 }}>
                    <DeleteIcon />
                    </Button>
                    </Link>
                    </Box>
                </Box>
            </Box>
                ))}
                
    </Box>
    </>
  )

  
}

export default Users