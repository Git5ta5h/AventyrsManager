import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import EditIcon from '@mui/icons-material/Edit';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import RemoveShoppingCart from '@mui/icons-material/RemoveShoppingCart';
import Box from '@mui/material/Box';
import socketIOClient from 'socket.io-client';


const Menu = () => {
  const serverEndpoint = 'http://localhost:5175';
  const socket = socketIOClient(serverEndpoint);
    const [data, setData] = useState([]);
    const [targetedId, setTargetedId] = useState(null);
    const [changed, setChanged] = useState(false);
    const [show, setShow] = useState(1);

    useEffect(() => {
      const fetchData = async () => {
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
      }
  
      
  
      // Fetch data initially and then at regular intervals
      fetchData();
      const intervalId = setInterval(fetchData, 10000); // Update every 10 seconds
  
      if (changed) {
        fetchData();
        console.log('Changes were made');
        setChanged(false);
      }
  
      return () => {
        // Clean up the interval when the component unmounts
        clearInterval(intervalId);
      };
    }, [changed]);

  const sendPostRequest = (data) => {
    var response = "";
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

  useEffect(() => {
    // Listen for notifications from the server
    socket.on('notification', (data) => {
      console.log('Customer Received notification from the server:', data);
    });

    return () => {
      socket.disconnect(); // Clean up the socket connection when the component unmounts
    };
  }, []);


  const sendUpdateItemsPrompt = () =>
  {
    console.log("send-prompt function called");
    socket.emit('updateItemsPrompt', '');
  }
  const deleteData = () => 
  {
    resetBasket();
  }

  const handleElementClick = (id) =>
  {
    setTargetedId(id); // Set the targetedId when the element is clicked
  };

  const handledClick = (id,val) => {
    var response = "";
    var data = {
      action: val,
      id: id,
    };

      //Item_Id , 0
    var response = sendPostRequest(data)
    console.log("Response: " + response);
    setChanged(true);
  };

  const styleAvailable =
  {
    display: "flex", flexDirection:"row", width: "100%", justifyContent: "space-between", align: "center", border:"0.125rem solid #C38370", borderRadius:"0.625rem"}
  const styleUnavailable =
  {
    display: "flex", flexDirection:"row", width: "100%", justifyContent: "space-between", align: "center", border:"0.125rem solid #C38370", borderRadius:"0.625rem", backgroundColor: "lightgrey"
  };

  return (
    <>
    <Box sx={{width: "90%", mt: 2, mb: 3, pt: 1}}>
        {data.map((item) => 
             <Box key={item.Item_Id} sx={{ width: "100%", display:"flex", flexDirection: "column", alignItems: "center", justifyContent:"center", m:1}}>
                <Box sx= {  item.Available == show ? styleAvailable:styleUnavailable}> 
                    <Box component="img" src={item.Image_path} sx={{width: "10rem", height:"7rem", objectFit:"fill", border:"0.125rem solid #C38370", borderRadius:"0.625rem"}}/>
                    <Box sx={{display: "flex", flexDirection: "column", width: "250px", m: 1}}>
                        <Typography variant="h1" component="h1">{item.Name}</Typography>
                        <Typography variant="h2" component="h3">{item.Type}</Typography>
                        <Typography variant="h3" component="h3">{item.Description}</Typography>
                        <Typography variant="h2" component="h2">{item.Price} kr</Typography>
                        <Typography variant="h2" component="h2">{item.Customize}</Typography>
                    </Box>
                    <Box sx={{display: "flex", flexDirection:"row"}}>
                    <Link to={`/edit_item/${item.Item_Id}`}>
                      <Button onClick={() => handleElementClick(item.Item_Id)} variant="contained" sx={{ height: '100%', alignSelf: 'center', mt: 0 }}>
                    <EditIcon />
                    </Button>
                    </Link>
                      {item.Available == show ?
                      <Button variant="contained" color="error" onClick={() => {sendUpdateItemsPrompt() , handledClick(item.Item_Id, "UNAVAILABLE")}} sx={{height: "100%", alignSelf:"bottom"}}><RemoveShoppingCart/></Button>:
                      <Button variant="contained" onClick={() => {sendUpdateItemsPrompt() , handledClick(item.Item_Id, "AVAILABLE")}} sx={{height: "100%", alignSelf:"bottom"}}><ShoppingCart/></Button>
                      }
                    </Box>
                </Box>
            </Box>
                    
                )}
    </Box> 
    </>
  ) 
}

export default Menu