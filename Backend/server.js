const express = require('express')
const bodyParser = require('body-parser');
const cors=require('cors');



require('dotenv').config()
const { MongoClient, CommandSucceededEvent } = require('mongodb');


const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'passwordmanager';
const app = express()
const port = 3000
app.use(bodyParser.json());
app.use(cors());
client.connect();

//Get all the passwords

app.get('/', async(req, res) => {
    const db=client.db();
    const collection=db.collection('passwords');
    const findResult=await collection.find({}).toArray();
  res.json(findResult);
})

//Save a password
app.post('/', async(req, res) => {
    const password=req.body
    const db=client.db();
    const collection=db.collection('passwords');
    const findResult=await collection.insertOne(password);
  res.send({success:true,result:findResult});
})

//delete password
app.delete('/', async(req, res) => {
    const password=req.body
    const db=client.db();
    const collection=db.collection('passwords');
    const findResult=await collection.deleteOne(password);
  res.send({success:true,result:findResult});
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})