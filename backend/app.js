const express= require('express');
const bodyParser= require('body-parser');
const mongoose= require('mongoose');
const productRoutes=require('./routes/product');
const contactRoutes=require('./routes/contact');
const path=require('path');
const app= express();

mongoose.connect("mongodb+srv://somesh:"+process.env.MONGO_ATLAS_PW+"@cluster0.immmq.mongodb.net/shivoham?retryWrites=true&w=majority").then(()=>{
  console.log("Connected Successfully");
}).catch(()=>{
  console.log("Connection Failed");
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With , Content-Type, Accept, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  next();
});

app.use("/images",express.static(path.join("backend/images"))); //Used to provide access to images folder of our backend folder

app.use("/start",(req,res,next)=>{
  res.status(200).json({message:"Sever Started"});
});

app.use('/api/contact',contactRoutes);
app.use('/api/product',productRoutes);

module.exports=app;
