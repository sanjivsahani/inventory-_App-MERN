import React, { useState } from 'react'
import { Grid, Paper, TextField, Typography, Button } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BusniessInfo = () => {
    const paperStyle = { height: "95vh", padding: "25px",  margin: "10px  auto",  width: "100vh" };
    const inputStyle = { padding: "10px" }
    const avatarStyle = { backgroundColor: "#68f79a", color: "#ffff", fontSize :"40px", borderRadius:"50px",padding:"8px"}
     
const [busniessInfoData, SetBusniessInfoData] = useState({
    companyName: "", phone: "",ownerName: "", email:"",address: "",
    country:"", state:"",zip:"",pan:""});

    //     handleChange for busniess info Update
      const handleChange =(e)=>{
        SetBusniessInfoData({...busniessInfoData, [e.target.name]:e.target.value})
    }

       // navigation  page after clicking bussinesstable page
       const navigate = useNavigate()
      const busniessInfo_btn_submit = async() => {
           navigate('/businesstable')

        // create a config to send the auth token 
      const config = {
        headers: {
          //  we are finding the token from localstorage 
          "Authorization": localStorage.getItem("token") 
        },   
      };
     
   // axios req for create Business info  
  await axios.post("http://localhost:8080/business/createbusinessInfo",busniessInfoData,config).then((res)=>{
        console.log(res.data)
  })
    };
    
   return (
    <Grid  >
 <Paper elevation={10} style={paperStyle}>
     <Grid align="center">
         <BusinessIcon style={avatarStyle} />
         <Typography variant="h5">
             Busniess Info
         </Typography>
     </Grid>
     <Grid align="center">
         <div>
             <TextField
                 required
                 id="outlined-required"
                 label="Companyname"
                 name='companyName'
                 onChange={handleChange}
                 style={inputStyle}
             />
             <TextField
                 required
                 id="outlined-required"
                 label="Phone"
                 style={inputStyle}
                 name='phone'
                 onChange={handleChange}
             />
         </div>
         <div>
             <TextField
                 required
                 id="outlined-required"
                 label="Ownername"
                 style={inputStyle}
                 name='ownerName'
                 onChange={handleChange}
             />
             <TextField
                 required
                 id="outlined-required"
                 label="Email"
                 style={inputStyle}
                 name='email'
                 onChange={handleChange}
             />
         </div>
         <div>
             <TextField
                 required
                 id="outlined-required"
                 label="Address"
                 style={inputStyle}
                 name='address'
                 onChange={handleChange}
             />
             <TextField
                 required
                 id="outlined-required"
                 label="Country"
                 style={inputStyle}
                 name='country'
                 onChange={handleChange}
             />
         </div>
         <div>
             <TextField
                 required
                 id="outlined-required"
                 label="State"
                 style={inputStyle}
                 name='state'
                 onChange={handleChange}
             />
             <TextField
                 required
                 id="outlined-required"
                 label="Zip"
                 style={inputStyle}
                 name='zip'
                 onChange={handleChange}
             />
         </div>
         <div>
             <TextField
                 required
                 id="outlined-required"
                 label="Pan"
                 style={inputStyle}
                 name='pan'
                 onChange={handleChange}
             />
         </div>   
         <Button variant="contained"  style={{marginRight:'10px'}} onClick={busniessInfo_btn_submit} >Add Business</Button>
     </Grid>
 </Paper>
</Grid>
   )
 }
 
 export default BusniessInfo