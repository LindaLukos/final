const express=require('express')
const cors=require('cors');
const app=new express();
const port=3000;
require('./connection')
const blogModels=require('./models/BlogModels')
app.use(express.json())
app.listen(port,()=>{
    console.log("listening to 3000")
})