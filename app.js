const express = require('express');
const app= express();
const mongoose = require('mongoose');
const path = require('path');
const mbxgeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const geocoder = mbxgeocoding({accessToken: "pk.eyJ1IjoiaGFyaXN0YXJnYXJ5ZWFuIiwiYSI6ImNrcGNpMnZ4cTE4MGYyb2xsMXRhZXJrNWQifQ.S0FeTOKB9_AdnC2paKVm6A"});

mongoose.connect('mongodb://localhost:27017/Touride',{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopolgy:true,
})

const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{console.log("Database connected:")});

app.use( express.static(path.join(__dirname,'public' )));
app.use(express.urlencoded({extended:true}));
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

const reviewSchema =new mongoose.Schema({
    rating : Number,
    review : String,
});
const Review = mongoose.model('Review',reviewSchema);


app.get('/goldentemple', async (req,res) =>{
    const reviews = await Review.find();
    res.render("GoldenTemple-Info",{reviews});
})

app.post('/rating', async (req,res) => {
    const newReview = new Review(req.body);
    await newReview.save(); 
    res.redirect('/goldentemple');
})


app.listen(4000,() =>{
    console.log("serving on port 4000");
})

// const key = "pk.eyJ1IjoiaGFyaXN0YXJnYXJ5ZWFuIiwiYSI6ImNrcGNpMnZ4cTE4MGYyb2xsMXRhZXJrNWQifQ.S0FeTOKB9_AdnC2paKVm6A";
