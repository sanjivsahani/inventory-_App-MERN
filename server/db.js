const mongoose=require('mongoose')
// const mongoURI="mongodb+srv://admin:n4TCEyQE6rNykSEP@cluster0.5npci.mongodb.net/user?retryWrites=true&w=majority"
const mongoURI = "mongodb://localhost:27017/inventory"
const connection =()=>{
    mongoose.connect(mongoURI,()=>{
      console.log ("mongodb is Connected") 
    })
}

module.exports=connection

