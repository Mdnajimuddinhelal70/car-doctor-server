const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vuirhca.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
   
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } 
  catch {
    
  }
}
run().catch(console.dir);





app.get('/',( req, res) => {
    res.send('doctor is running')
})

app.listen(port, () => {
    console.log(`Car doctor server is running on port ${port}`)
})