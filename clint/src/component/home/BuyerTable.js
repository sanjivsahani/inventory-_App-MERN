import React, { useEffect, useState } from "react";
import { Grid, Paper, TextField, Typography, Button } from "@mui/material";
import {TableContainer,Table,TableHead,TableBody,TableRow,TableCell,} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BusinessIcon from "@mui/icons-material/Business";
import axios from "axios";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import { useNavigate } from "react-router-dom";

// Style for Buyer-table
const inputStyle = { padding: "10px" };
const avatarStyle = {
  backgroundColor: "#68f79a",
  color: "#ffff",
  fontSize: "40px",
  borderRadius: "50px",
  padding: "8px",
};
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  height: "70vh",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};


const BuyerTable = () => {

  const [data, SetData] = useState([]);
  const [updateData, SetUpdateData] = useState({
    companyName: "",phone: "",ownerName: "",email: "",productName: "",
    stock: "",address: "",country: "",state: "",zip: "",pan: "",});

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //  navigate page to create buyer
  const navigate = useNavigate();

 // create a config to send the auth token 

  const config = {
    headers: {
  // we are finding the token from localstorage
      Authorization: localStorage.getItem("token"),
    },
  };
  // Navigate page after clicking button add buyer  
  const handle_navigate = () => {
    navigate("/buyer");
  };

  const handleChange = (e) => {
    SetUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  // axios call for delete buyer information
  const handle_delete = (id) => {
    axios
      .delete(`http://localhost:8080/buyer/deletebuyer/${id}`, config)
      .then((res) => {
        console.log(res.data);
      });
  };

  // axios call for Update buyer information  
  const update_btn = (ele, index) => {
    handleOpen();
    SetUpdateData(ele);
  };
  const update_submit = (id) => {
    console.log(id);
    axios
      .put(`http://localhost:8080/buyer/updatebuyer/${id}`, updateData, config)
      .then((res) => {
        console.log(res.data);

        handleClose();
      });
  };

  // axios call for Get  buyer information
  useEffect(() => {
    axios.get("http://localhost:8080/buyer/getbuyer", config).then((res) => {
      SetData(res.data);
    });
  }, []);

  return (
    <>
      <h2 align="center">Buyer Data Table</h2>
      <div style={{ textAlign: "right", marginRight: "30px" }}>
        <Button variant="contained" onClick={handle_navigate}>
          Add Buyer
        </Button>
      </div>
      <TableContainer
        component={Paper}
        sx={{ maxHeight: "300px", marginTop: "30px" }}
      >
        <Table aria-label="simple table" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell align="center">companyName</TableCell>
              <TableCell align="center">phone</TableCell>
              <TableCell align="center">ownerName</TableCell>
              <TableCell align="center"> email</TableCell>
              <TableCell align="center"> productName</TableCell>
              <TableCell align="center"> stock</TableCell>
              <TableCell align="center"> address</TableCell>
              <TableCell align="center"> country</TableCell>
              <TableCell align="center"> state</TableCell>
              <TableCell align="center"> zip</TableCell>
              <TableCell align="center"> pan</TableCell>
              <TableCell align="center"> Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((ele, index) => {
              return (
                <TableRow
                  key={ele.id}
                  sx={{ "&:last-child td, &:last-chid th": { border: 0 } }}
                >
                  <TableCell align="center"> {ele.companyName}</TableCell>
                  <TableCell align="center"> {ele.phone}</TableCell>
                  <TableCell align="center"> {ele.ownerName}</TableCell>
                  <TableCell align="center"> {ele.email}</TableCell>
                  <TableCell align="center"> {ele.productName}</TableCell>
                  <TableCell align="center"> {ele.stock}</TableCell>
                  <TableCell align="center"> {ele.address}</TableCell>
                  <TableCell align="center"> {ele.country}</TableCell>
                  <TableCell align="center"> {ele.state}</TableCell>
                  <TableCell align="center"> {ele.zip}</TableCell>
                  <TableCell align="center"> {ele.pan}</TableCell>
                  <TableCell align="center">
                    <EditIcon onClick={() => update_btn(ele, index)} />
                    <DeleteIcon onClick={() => handle_delete(ele._id)} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
{/*  Update modal  */}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
        >
          <Fade in={open}>
            <Box>
              <Grid>
                <Paper elevation={10} sx={style}>
                  <Grid align="center">
                    <BusinessIcon style={avatarStyle} />
                    <Typography variant="h5">Busniess Info Update</Typography>
                  </Grid>
                  <Grid align="center">
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="Companyname"
                        name="companyName"
                        onChange={handleChange}
                        value={updateData.companyName}
                        style={inputStyle}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Phone"
                        style={inputStyle}
                        name="phone"
                        onChange={handleChange}
                        value={updateData.phone}
                      />
                    </div>
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="Ownername"
                        style={inputStyle}
                        name="ownerName"
                        onChange={handleChange}
                        value={updateData.ownerName}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Email"
                        style={inputStyle}
                        name="email"
                        onChange={handleChange}
                        value={updateData.email}
                      />
                    </div>
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="Product"
                        style={inputStyle}
                        name="productName"
                        onChange={handleChange}
                        value={updateData.productName}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Stock"
                        style={inputStyle}
                        name="stock"
                        onChange={handleChange}
                        value={updateData.stock}
                      />
                    </div>
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="Address"
                        style={inputStyle}
                        name="address"
                        onChange={handleChange}
                        value={updateData.address}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Country"
                        style={inputStyle}
                        name="country"
                        onChange={handleChange}
                        value={updateData.country}
                      />
                    </div>
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="State"
                        style={inputStyle}
                        name="state"
                        onChange={handleChange}
                        value={updateData.state}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Zip"
                        style={inputStyle}
                        name="zip"
                        onChange={handleChange}
                        value={updateData.zip}
                      />
                    </div>
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="Pan"
                        style={inputStyle}
                        name="pan"
                        onChange={handleChange}
                        value={updateData.pan}
                      />
                    </div>
                    <Button
                      variant="contained"
                      color="success"
                      style={{ marginRight: "10px" }}
                      onClick={() => update_submit(updateData._id)}
                    >
                      Update Business
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleClose}
                    >
                      {" "}
                      Cancel
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default BuyerTable;
