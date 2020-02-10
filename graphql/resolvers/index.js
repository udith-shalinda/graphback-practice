const Event = require('./../../model/Event');
const User = require('./../../model/User')
// const mongoose = require('mongoose');


module.exports = {
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
            throw err;
        })
    }
}