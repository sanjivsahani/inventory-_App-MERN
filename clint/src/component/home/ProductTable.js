import React, { useEffect, useState } from 'react'
import { TableContainer,Table,TableHead,TableBody,TableRow,TableCell,Paper} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Grid,  TextField } from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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
const inputStyle = { padding: "10px" };
const avatarStyle = {
  backgroundColor: "#68f79a",
  color: "#ffff",
  fontSize: "40px",
  borderRadius: "50px",
  padding: "8px",
};

function ProductTable() {

 const [data, SetData] = useState([]);
 const [updateData, SetUpdateData] = useState({
    name: "",
    quantity: "",
    price: "",
    modelNo: "",
 })
  // modal open close
 const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  //  handlechange for update product Data
  const handleChange = (e) => {
    SetUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

// update button for update product data 
  const update_btn = (ele) => {
    handleOpen();
   SetUpdateData(ele);
 }; 

  //  navigate page after clciking to add product info
  const navigate=useNavigate();
  const handle_navigate = () => {
    navigate("/product");
  };

// create a config to send the auth token 
 const config = {
    headers: {
// we are finding the token from localstorage
      Authorization: localStorage.getItem("token"),
    },
  };
 
// axios req for update product info
const update_submit = (id) => {
  console.log(id);axios.put(`http://localhost:8080/product/updateproduct/${id}`,updateData,config)
    .then((res) => {
      console.log(res.data);
      handleClose();
    });
};

//  axios req for delete product info
const handle_delete = (id) => {
  axios
    .delete(`http://localhost:8080/product/deleteproduct/${id}`, config)
    .then((res) => {
      console.log(res.data);
    });
};

  // axios request for getting product Detail info
    useEffect(() => {
        axios
          .get("http://localhost:8080/product/getproduct", config)
          .then((res) => {
            SetData(res.data);
          });
      }, []);

  return (
 <>

<h2 align="center"> Product Data Table</h2>
      <div style={{ textAlign: "right", marginRight: "30px" }}>
        <Button variant="contained" onClick={handle_navigate}  >
          Add Product
        </Button>
      </div>
    <TableContainer component={Paper}
    sx={{ maxHeight: '300px'}} >
    
        <Table aria-label='simple table' stickyHeader>
            <TableHead >     
                <TableRow>
                   <TableCell align='center'>name</TableCell>  
                   <TableCell align='center'>quantity</TableCell>  
                   <TableCell align='center'>price</TableCell>  
                   <TableCell align='center'>modelNo</TableCell> 
                   <TableCell align='center'>options</TableCell>  
                </TableRow>
            </TableHead>
               <TableBody>
               {
               data.map((ele,index)=>{
                   return(
                    <TableRow key= {ele.id}
            sx = {{ '&:last-child td, &:last-chid th':{border:0}}}
            >
            <TableCell align='center'> {ele.name}</TableCell>
            <TableCell align='center'> {ele.quantity}</TableCell>
            <TableCell align='center'> {ele.price}</TableCell>
            <TableCell align='center'> {ele.modelNo}</TableCell>
            <TableCell align='center' > 
             <EditIcon  onClick={()=> update_btn (ele,index)} />
             <DeleteIcon onClick={() => handle_delete(ele._id)} />
            </TableCell>
            </TableRow>
                   )
               })   
              }  
            </TableBody>
        </Table>
    </TableContainer>
{/*  modal for Update product */}
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
                    <Typography variant="h5">Product Update</Typography>
                  </Grid>
                  <Grid align="center">
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="name"
                        name="name"
                        onChange={handleChange}
                        value={updateData.name}
                        style={inputStyle}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="qunatity"
                        style={inputStyle}
                        name="quantity"
                        onChange={handleChange}
                        value={updateData.quantity}
                      />
                    </div>
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="price"
                        style={inputStyle}
                        name="price"
                        onChange={handleChange}
                        value={updateData.price}
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="modelNo"
                        style={inputStyle}
                        name="modelNo"
                        onChange={handleChange}
                        value={updateData.modelNo}
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
  )
}
export default ProductTable