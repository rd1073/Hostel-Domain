const mongoose = require("mongoose");

const conn = mongoose.createConnection('mongodb://0.0.0.0:27017/LoginFormPractice');
conn.on('connected', () => {
  console.log('Mongoose connected mongodb');
});
conn.on('error', (err) => {
  console.error(`Mongoose connection error: ${err}`);
});

const logInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

const stuDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  roomno: {
    type: Number,
    required: true
  },
  regno:{
    type:String,
    required:true,
    unique:true
  },
  phoneno:{
    type:Number,
    required:false
  },
  email:{
    type:String,
    required:true
  },
  parentname:{
    type:String,
    required:true
  },
  parentno:{
    type:Number,
    required:false
  }
});


 


const staffDetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  floor: {
    type: Number,
    required: true
  },
  phno:{
    type:Number,
    required: true
  }
  
});

const Collection1 = conn.model('Collection1', logInSchema);
const Collection2 = conn.model('Collection2', stuDetailsSchema);
const Collection3 = conn.model('Collection3', staffDetSchema);


module.exports = {
  Collection1,
  Collection2,
  Collection3
};
