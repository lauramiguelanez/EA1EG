// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Postcard = require("../models/Postcard");
const dataObj = require('./data_load/EA1EG-CSVtoJSON.js');

const bcryptSalt = 10;

console.log('SEEDS!!!');
// console.log('dataObj', dataObj);

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

let users = [
  {
    username: 'pablo',
    password: bcrypt.hashSync('pablo', bcrypt.genSaltSync(bcryptSalt))
  },
  {
    username: 'laura',
    password: bcrypt.hashSync('laura', bcrypt.genSaltSync(bcryptSalt))
  }
];
/* 
User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})  */

const postcards = dataObj;
console.log('SEEDS', postcards);

Postcard.deleteMany()
.then(() => {
  return Postcard.create(postcards)
})
.then(postcardsCreated => {
  console.log(`${postcardsCreated.length} postcards created with the following id:`);
  // console.log(postcardsCreated.map(p => p._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})
