const {buildSchema} = require('graphql')


module.exports = buildSchema(`
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
`);