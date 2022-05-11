import React from 'react'
import { Grid, Paper, TextField, Typography, Button } from '@mui/material'
import BusinessIcon from '@mui/icons-material/Business';


const Order = () => {
    const paperStyle = { height: "40vh", padding: "25px", marginTop: "65px", marginRight:"10%", width: "100vh" };
    const inputStyle = { padding: "10px" }
    const avatarStyle = { backgroundColor: "#68f79a", color: "#ffff", fontSize :"40px", borderRadius:"50px",padding:"8px"}

    return (
        <Grid  >
            <Paper elevation={10} style={paperStyle}>
                <Grid align="center">
                    <BusinessIcon style={avatarStyle} />
                    <Typography variant="h5">
                      Order Details
                    </Typography>
                </Grid>
                <Grid align="center">
                    <div>
                        <TextField
                            required
                            id="outlined-required"
                            label="Order"

                            style={inputStyle}
                        />
                        <TextField
                            required
                            id="outlined-required"
                            label="Supplier"
                            style={inputStyle}
                        />
                    </div>
                   
                    <Button variant="contained" >Submit</Button>
                </Grid>
            </Paper>

        </Grid>
    )
}

export default Order;