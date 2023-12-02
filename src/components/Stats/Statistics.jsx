import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import TextField from '@mui/material/TextField';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Button } from '@mui/material';

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  BarController
);

const Statistics = () => {
  const [salesData, setSalesData] = useState([]);
  const [ordersData, setOrdersData] = useState([]);
  const [dynamicArray, setDynamicArray] = useState([]);
  const [changed, setChanged] = useState(false);

  const fetchData = async () => {
    try {
      // Fetch your sales and orders data here and set the state
      // Example:
      const salesResponse = await fetch(
        'https://hi-fiprogramming.net/projects/aventyrskiosken/dbapi.php?table=Sales'
      );
      if (!salesResponse.ok) {
        throw new Error('Network response for sales was not ok');
      }
      const salesData = await salesResponse.json();
      setSalesData(salesData);

      const ordersResponse = await fetch(
        'https://hi-fiprogramming.net/projects/aventyrskiosken/dbapi.php?table=Orders'
      );
      if (!ordersResponse.ok) {
        throw new Error('Network response for orders was not ok');
      }
      const ordersData = await ordersResponse.json();
      setOrdersData(ordersData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const sendPostRequest = (data) => {
    var response = "";
    fetch('https://hi-fiprogramming.net/projects/aventyrskiosken/newdb.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    }).then(console.log("Raw Response" + response))
      .then( response => response.json())
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
    fetchData(); // Fetch data initially

    const intervalId = setInterval(() => {
      fetchData();
      console.log('Data updated'); // Log that data is updated
    }, 10000); // Update every 10 seconds

    return () => {
      // Clean up the interval when the component unmounts
      clearInterval(intervalId);
    };
  }, [changed]);

  const pageStyle = {
    width: '90%',
    height: '60%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  };

  const prepLbls = (salesData) => {
    return salesData.map((item) => item.Name); 
  };

  const prepSales = (salesData) => {
    return salesData.map((item) => item.sales);
  };

  const dataP = {
    labels: prepLbls(salesData), // Use salesData to generate labels
    datasets: [
      {
        label: 'Data Series 1',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: prepSales(salesData), // Use salesData to generate data
      },
    ],
  };

  const options = {
    layout: {
      padding: {
        left: 5,
        right: 5,
        top: 10,
        bottom: 5,
      },
      margin: {
        left: 5,
        right: 5,
        top: 5,
        bottom: 5,
      },
    },
  };

  const modified = (sum) =>
  {
    let mod = sum;
    mod.replace('"', 'x');
        if(mod.includes('""'))
        {
            while (mod.includes('""'))
            {
                mod = mod.replace('""', '\n');
            }
    }
    while (mod.includes('"'))
    {
        mod = mod.replace('"', '');
    }
    console.log(mod);
    return mod;
  }

  const exportToPDF = () => {
    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'pt', 'letter');
  
    // Capture the content you want to export to PDF using html2canvas
    const content = document.getElementById('exportContent'); // Replace 'exportContent' with the ID of your content
  
    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 40, 40, 500, 750); // You can adjust the position and dimensions
      pdf.save('exported-document.pdf'); // Save the PDF with a given name
    });
  };

  const clearSales = () => 
  {
    var data =
    {
        action : 'CLEARSALES',
    };

    sendPostRequest(data);
  }
  const clearCustomers = () =>
  {
    var data =
    {
        action : 'CLEARCUSTOMERS',
    };

    sendPostRequest(data);
  }

  return (
    <div id="exportContent" style={pageStyle}>
      <div style={{ width: '100%', height: '60%', border: '2px solid black', marginTop: '10px' }}>
        <Bar data={dataP} options={options} />
      </div>
  
      <Box sx={{width: '100%', height: '100%', border: '2px solid black', marginTop: '10px', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', m: 1 }}>
        <Box sx={{width: '100%', display:"flex", justifyContent:"space-around", p: 1}}> 
          <button onClick={exportToPDF}>Exportera PDF</button>
        <button onClick={clearSales}>Rensa försälnings-statistik</button>
        <button onClick={clearCustomers}>Rensa användare</button></Box>
      <table style={{ borderCollapse: 'collapse' , width: '100%'}}>
      <thead>
        <tr>
          <th style={{ border: '2px solid black' }}>Id</th>
          <th style={{ border: '2px solid black' }}>Beställare</th>
          <th style={{ border: '2px solid black' }}>Beställning</th>
          <th style={{ border: '2px solid black' }}>Kommentar</th>
          <th style={{ border: '2px solid black' }}>Plats</th>
          <th style={{ border: '2px solid black' }}>Belopp</th>
        </tr>
      </thead>
      <tbody>
        {ordersData.map((order) => (
          <tr key={order.Order_Id} style={{ border: '2px solid black' }}>
            <td style={{ border: '2px solid black' }}>{order.Order_Id}</td>
            <td style={{ border: '2px solid black' }}>{order.Customer_Fname + " " + order.Customer_Lname + " (" + order.Customer_Id + ")"}</td>
            <td style={{ border: '2px solid black', whiteSpace: "pre-line"}}>
                <p>{modified(order.Summary)}</p>
              </td>
            <td style={{ border: '2px solid black' }}>{order.Comment}</td>
            <td style={{ border: '2px solid black' }}>{order.Seat}</td>
            <td style={{ border: '2px solid black' }}>{order.Total + "kr"}</td>
          </tr>
        ))}
      </tbody>
    </table>
      </Box>
    </div>
  );
};

export default Statistics;