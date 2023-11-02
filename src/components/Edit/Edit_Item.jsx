import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


const Edit_Item = () =>
{
    const nameRef = useRef(null);
    const descRef = useRef(null);
    const optsRef = useRef(null);
    const priceRef = useRef(null);
    const typeRef = useRef(null);

    const nTFRef = useRef(null);
    const descTFRef = useRef(null);
    const optsTFRef = useRef(null);
    const priceTFRef = useRef(null);
    const typeTFRef = useRef(null);

    const { id } = useParams(); 
    const [data, setData] = useState([]);
    
    useEffect(() => {
        fetch('https://hi-fiprogramming.net/projects/aventyrskiosken/dbapi.php?table=Items')
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

      
      // USED TO BE WITHIN useEffect, move back if not working.
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
        var name;
        var desc;
        var price;
        var opts;
        var type;

        if(nameRef.current.value != "")
        {
          name = nameRef.current.value;
        }
        else
        {
          const label = nTFRef.current.querySelector('.MuiInputLabel-root');
          name = label.textContent;
        }

        if(descRef.current.value != "")
        {
          desc = descRef.current.value;
        }
        else
        {
          const label = descTFRef.current.querySelector('.MuiInputLabel-root');
          desc = label.textContent;
        }
        if(optsRef.current.value != "")
        {
          opts = optsRef.current.value;
        }
        else
        {
          const label = optsTFRef.current.querySelector('.MuiInputLabel-root');
          opts = label.textContent;
        }
        if(priceRef.current.value != "")
        {
          price = priceRef.current.value;
        }
        else
        {
          const label = priceTFRef.current.querySelector('.MuiInputLabel-root');
          price = label.textContent;
        }
        if(typeRef.current.value != "")
        {
          type = typeRef.current.value;
        }
        else
        {
          const label = typeTFRef.current.querySelector('.MuiInputLabel-root');
          type = label.textContent;
        }

        var data = {
          action: 'UPDATE', //UPDATE, INSERT, DELETE
          table: 'Items', 
          id: id,
          name: name,
          description: desc,
          price: price,
          type: type,
          customize: opts
        };
        var response = sendPostRequest(data)
        console.log(response);
      }
    return (
      <Box>
        <h1>Redigera Produkt</h1>
        <p>ID: {id}</p>
        {data.map((item, i) => (
        <Box key={i}>
            {item.Item_Id === id ?
            (<Box sx={{display: "flex", flexDirection:"column"}}>
                Namn<TextField id="TF_N" inputRef={nameRef} ref={nTFRef} label={item.Name}  variant="filled"  />
                Typ<TextField id="TF_TYPE" inputRef={typeRef} ref={typeTFRef} label={item.Type} variant="filled"  />
                Beskrivning<TextField id="TF_DESC" inputRef={descRef} ref={descTFRef} label={item.Description}  variant="filled" />
                Alternativ<TextField id="TF_ALTS" inputRef={optsRef} ref={optsTFRef} label={item.Customize} variant="filled" />
                Pris<TextField id="TF_PRICE" inputRef={priceRef} ref={priceTFRef} label={item.Price} variant="filled" />
                <Box>
                <Link to={`/menu`}>
                <Button onClick={handleClick} variant="contained" sx={{ height: '40px', alignSelf: 'center', mt: 2 }}>
            <SaveIcon />
            </Button>
            </Link>
            <Link to={`/menu`}>
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

export default Edit_Item