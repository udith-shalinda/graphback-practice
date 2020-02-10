
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require("path");
const graphqlHttp = require('express-graphql')

//model
const Event = require('./model/Event');
const User = require('./model/User')

const graphSchema = require('./graphql/schema/index');
const resolvers = require('./graphql/resolvers/index');

// const userRoutes = require("./routes/user");




const app = express();


//ODjmkgYPiqNhMgTk

mongoose.connect("mongodb+srv://max:ODjmkgYPiqNhMgTk@testone-e21ea.mongodb.net/graphql" ,{useNewUrlParser:true})
.then(()=>{
    console.log("Database connected successfully");
    app.listen(5000);
})
.catch(()=>{
    console.log("Connection failed");
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
// app.use('/image',express.static(path.join("backend/image")));

app.use((req,res,next)=>{
    res.setHeader("Access-control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin ,X-Requested-With , Content-Type,Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET ,POST,PUT,PATCH,DELETE,OPTIONS"); 
    next();
});




// app.use("/user",userRoutes);


app.use("/graphql",graphqlHttp({
    schema:graphSchema,
    rootValue:resolvers,
    graphiql:true
}));


module.exports = app;