import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import CheckIcon from '@mui/icons-material/Check';
import Unpublished from '@mui/icons-material/Unpublished';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';

const Orders = () => {
  const [data, setData] = useState([]);
  const [changed, setChanged] = useState(false);
  const [show, setShow] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      fetch('https://hi-fiprogramming.net/projects/aventyrskiosken/dbapi.php?table=Orders')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json(); // Assuming the response contains JSON data
        })
        .then(data => {
          // Handle the data here
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
      setChanged(false);
    }

    return () => {
      // Clean up the interval when the component unmounts

      clearInterval(intervalId);
    };
  }, [changed]);



  
  const sendPostRequest = (data) => {
    // SENDING DATA TO DB, RESPONSE 
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
        response = data;
      })
      .catch(error => {
        console.error('POST Error:', error);
      });
    return response;
  }


  const handledClick = (id,val) => {
    var response = "";
    var data = {
      action: val,
      id: id,
    };

    var response = sendPostRequest(data)
    setChanged(true);
  };

  const summaryOrganize = (summary) => {
    var res = "\n" + summary.split("|").join('\n');
    res = res.split('"').join('');
    return res;
  }
  const modDate = (order) => 
  {
    if (order.Created) {
      const createdDate = new Date(order.Created);
      if (!isNaN(createdDate.getTime())) {
        // Check if parsing was successful and createdDate is a valid Date object
        return createdDate.getHours() + ":" + createdDate.getMinutes() + " | " + createdDate.getDate() + "/" + createdDate.getMonth();
      }
    }
  }

  return (
    <>
      <br></br>
     
      <Box sx={{width: "60%"}}>
          <Button onClick={() => setShow(0)} variant="contained" sx={{ height: '100%', alignSelf: 'center', mt: 0 }}>
            <h2>NYA</h2>
        </Button>
        <Button onClick={() => setShow(1)} variant="contained" sx={{ color: "white", background: "grey", height: '100%', alignSelf: 'center', mt: 0 }}>
            <h2>HANTERADE</h2>
        </Button>
      </Box>
      
      <Box style={{ whiteSpace: 'pre-line' }} sx={{ border: "4px solid blue", width: "60%" }}>
        {data.map((order) => order.handled == show ?
            <Box style={{ whiteSpace: 'pre-line' }} key={order.Order_Id}>
              <Box style={{ whiteSpace: 'pre-line' }} sx={{ border: "2px solid orange", justifyContent: "space-between" }}>
                <Box style={{ whiteSpace: 'pre-line' }} sx={{ display: "flex", flexDirection: "column" }}>
                  <Typography variant="h1" component="h1">ID: {order.Order_Id}</Typography>
                  <Typography variant="h1" component="h1">Namn: {order.Customer_Fname}</Typography>
                  <Typography variant="h1" component="h1">Efternamn: {order.Customer_Lname}</Typography>
                  <Box style={{ whiteSpace: 'pre-line' }} sx={{ border: "2px solid orange" }}>
                    <Typography style={{ whiteSpace: 'pre-line' }} variant="h1" component="h1">Sammanfattning: {summaryOrganize(order.Summary)}</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h1" component="h1">Beställd: { modDate(order) }</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h1" component="h1">Kommentar: {order.Comment}</Typography>
                    <Typography variant="h1" component="h1">Plats: {order.Seat}</Typography>
                  </Box>
                  <Box sx={{ border: "2px solid orange" }} >
                    <Typography variant="h1" component="h1">Summa: {order.Total} kr</Typography>
                  </Box>
                  {show == 0 ? (
                      <Box sx={{ display: "flex", width: "100%" }}>
                      <Button onClick={() => handledClick(order.Order_Id, 'HANDLED')} variant="contained" style={{ width: '100%' }} sx={{ height: '40px', alignSelf: 'center', mt: 2 }}>
                        <CheckIcon />
                      </Button>
                    </Box>
                  ) : (
                    <Box sx={{ display: "flex", width: "100%" }}>
                    <Button onClick={() => handledClick(order.Order_Id, 'UNHANDLED')} color="error" variant="contained" style={{ width: '100%' }} sx={{ height: '40px', alignSelf: 'center', mt: 2 }}>
                      <Unpublished/>
                    </Button>
                  </Box>
                  )}
                
                </Box>
              </Box>
            </Box> : null
          )}
      </Box>
    </>
    
  )


}

export default Orders