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

      <Box sx={{width: "90%"}}>
          <Button onClick={() => setShow(0)} variant="contained" sx={{ backgroundColor: (theme) => theme.palette.primary.main, height: '100%', alignSelf: 'center', m: 2 }}>
          <Typography variant="h2" sx={{color: "#F6EEE0"}}>NYA</Typography>
        </Button>
        <Button onClick={() => setShow(1)} variant="contained" sx={{ backgroundColor: (theme) => theme.palette.secondary.main, height: '100%', alignSelf: 'center', m:2, '&:hover': {backgroundColor: (theme) => theme.palette.secondary.main} }}>
          <Typography variant="h2" sx={{color: "#F6EEE0"}}>HANTERADE</Typography>
        </Button>
      </Box>
      
      <Box style={{ }} sx={{ width: "90%" }}>
        {data.map((order) => order.handled == show ?
            <Box style={{ whiteSpace: 'pre-line' }} key={order.Order_Id}>
              <Box style={{ whiteSpace: 'pre-line' }} sx={{ border:"0.125rem solid #C38370", borderRadius:"0.625rem", justifyContent: "space-between" }}>
                <Box style={{ whiteSpace: 'pre-line' }} sx={{ display: "flex", flexDirection: "column", m: 1, pt:1 }}>
                  <Typography variant="h2" component="h2">ID: {order.Order_Id}</Typography>
                  <Typography variant="h2" component="h2">Namn: {order.Customer_Fname}</Typography>
                  <Typography variant="h2" component="h2">Efternamn: {order.Customer_Lname}</Typography>
                  <Box style={{ whiteSpace: 'pre-line' }} sx={{ border:"0.125rem solid #C38370", borderRadius:"0.625rem", m: 1 }}>
                    <Typography style={{ whiteSpace: 'pre-line' }} sx={{m: 1}} variant="h1" component="h1"><Typography  variant="h1" component="h1" sx={{fontSize: 24}}>Sammanfattning: {summaryOrganize(order.Summary)}</Typography></Typography>
                  </Box>
                  <Box>
                    <Typography variant="h2" component="h2" sx={{fontSize: 22, color: '#1D2026'}}>Beställd: { modDate(order) }</Typography>
                  </Box>
                  <Box>
                    <Typography variant="h2" component="h2" sx={{fontSize: 22, color: '#1D2026'}}>Kommentar: {order.Comment}</Typography>
                    <Typography variant="h2" component="h2" sx={{fontSize: 22, color: '#1D2026'}}>Plats: {order.Seat}</Typography>
                  </Box>
                  <Box sx={{ border:"0.125rem solid #C38370", borderRadius:"0.625rem", m: 1 }} >
                    <Typography variant="h2" component="h2" sx={{fontSize: 26, fontWeight: 600, color: '#1D2026'}}>Summa: {order.Total} kr</Typography>
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