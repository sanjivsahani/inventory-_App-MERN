const mongoose = require('mongoose');

const sellsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },
  phone: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
     
  },
 

  address: {
    type: String,
    required: true,
  },
    productname: {
        type: String,
        required:true
    },
    quantity: {
        type: Number,
        required:true,
    }
});

const sellsModel = mongoose.model('sells', sellsSchema);
module.exports = sellsModel;
