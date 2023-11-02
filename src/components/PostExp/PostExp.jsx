import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import axios from 'axios';




const PostExp = () => {
    console.log("STARINGPHP POST TEST");

      const sendPostRequest = () => {
        console.log("Starting sendPostRequest");
        // Data to send in the POST request
        const data = {
          key1: 'value1',
          key2: 'value2'
        };
        console.log("About to fetch..");
        fetch('https://hi-fiprogramming.net/projects/aventyrskiosken/newdb.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(response => response.json())
          .then(data => {
            console.log(data); // Handle the POST response data here
          })
          .catch(error => {
            console.error('POST Error:', error);
          });
      }
    return (
      <Box>
              
                      <Button onClick={sendPostRequest} variant="contained" sx={{ height: '40px', alignSelf: 'center', mt: 2 }}>
                    <SaveIcon />
                    </Button>
        </Box>

    );
  }
  

export default PostExp