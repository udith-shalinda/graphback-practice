
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require("path");
const graphqlHttp = require('express-graphql')
const {buildSchema} = require('graphql')

//model
const Event = require('./model/Event');
const User = require('./model/User')

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
    schema:buildSchema(`
        type Event{
            _id:ID!
            title:String!
            price:Float!
            date:String!
        }
        type User{
            _id:ID!
            email:String!
            password:String
        }
        input EventInput{
            title:String!
            price:Float!
            date:String!
        }
        input UserInput{
            email:String!
            password:String!
        }

        type RootQuery{
            events:[Event!]!
        }
        type RootMutaion{
            createEvent(eventInput:EventInput):Event
            createUser(userInput:UserInput):User
        }

        schema {
            query:RootQuery
            mutation:RootMutaion
        }
    `),
    rootValue:{
        events:()=>{
            return Event.find()
            .then(events=>{
                return events.map(event=>{
                    // console.log(event);
                    return {
                        ...event._doc,
                        _id:event._doc._id.toString(),
                    };
                })
            }).catch(err=>{
                console.log(err);
                throw err;
            });
        },
        createEvent:(args)=>{
            const eve = new Event({
                title:args.eventInput.title,
                price:args.eventInput.price,
                date :args.eventInput.date
            })
            return eve.save().then(result=>{
                console.log(result);
                return {...result._doc};
            }).catch(err=>{
                console.log(err);
                throw err;
            });
        }
    },
    createUser:(args)=>{
        const user = new User({
            email:args.userInput.email,
            password:args.userInput.password,
        });
        return user.save().then(result=>{
            return {...result._doc};
        }).catch(err=>{
            console.log(err);
            throw err;s
        })
    },
    graphiql:true
}));


module.exports = app;