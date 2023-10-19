import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


const Edit_User = () => {

  
    const firstnameRef = useRef(null);
    const lastnameRef = useRef(null);
    const telephonenumberRef = useRef(null);
    const tabRef = useRef(null);
    
    const fnTFRef = useRef(null);
    const lnTFRef = useRef(null);
    const tnTFRef = useRef(null);
    const tTFRef = useRef(null);

    const { id } = useParams(); 
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch('https://hi-fiprogramming.net/projects/aventyrskiosken/dbapi.php?table=Customers')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok!');
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


      const handleClick = () =>
      {
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
          action: 'UPDATE', //UPDATE, INSERT, DELETE
          table: 'Customers', 
          id: id,
          firstname: fname,
          lastname: lname,
          telephonenumber: tele,
          tab: tab
        };
        var response = sendPostRequest(data)
        console.log(response);
      }

   

    return (
      <Box>
              <h1>Redigera Användare</h1>
              <p>ID: {id}</p>
              {data.map((customer, i) => (
                <Box key={i}>
                    {customer.Customer_Id === id ?
                    (<Box sx={{display: "flex", flexDirection:"column"}}>
                        Namn<TextField id="TF_FN" inputRef={firstnameRef} ref={fnTFRef} label={customer.Firstname}  variant="filled"  />
                        Efternamn<TextField id="TF_LN" inputRef={lastnameRef} ref={lnTFRef} label={customer.Lastname}  variant="filled" />
                        Telefonnummer<TextField id="TF_TN" inputRef={telephonenumberRef} ref={tnTFRef} label={customer.Telephone_Number} variant="filled" />
                        Nota<TextField id="TF_T" inputRef={tabRef} ref={tTFRef} label={customer.Tab} variant="filled" />
                      <Box>
                      <Link to={`/users`}>
                      <Button onClick={handleClick} variant="contained" sx={{ height: '40px', alignSelf: 'center', mt: 2 }}>
                    <SaveIcon />
                    </Button>
                    </Link>
                    <Link to={`/users`}>
                    <Button onClick={() => sendPostRequest} color="error" variant="contained" sx={{ height: '40px', alignSelf: 'center', mt: 2 }}>
                    <CancelIcon />
                    </Button>
                    </Link>
                    </Box>
                    </Box>
                    
                    ) : null}
                    
                    
                    
                </Box>
                
    ))}
      </Box>
      
      
    );
  }
  
  

export default Edit_User