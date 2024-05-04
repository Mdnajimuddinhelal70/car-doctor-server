const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vuirhca.mongodb.net/carDoctorsDb?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    const serviceCollection = client.db("carDoctorsDb").collection("services");
    const bookingCollection = client.db('carDoctorsDb').collection('bookings')

    app.get("/services", async (req, res) => {
      const cursor = serviceCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/services/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) }
      
      const options = {
        projection: { name: 1, title: 1, service_id: 1, price: 1, img: 1},
      };
      const result = await serviceCollection?.findOne(query, options);
      res.send(result)
    });

    // bookings 

   app.get('/bookings', async(req, res) => {
    console.log(req.query)
    let query = {};
    if(req.query?.email) {
      query = { email: req.query.email}
    }
    const result = await bookingCollection.find(query).toArray();
    res.send(result)
   })


    app.post('/bookings', async(req, res) => {
      const booking = req.body;
      console.log(booking)
      const result = await bookingCollection?.insertOne(booking)
      res.send(result)
    })

    // Delete
    app.delete('/bookings/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const result = await bookingCollection.deleteOne(query);
      res.send(result)
    })

    // Updatings
   app.patch('/bookings/:id', async(req, res) => {
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)}
    const updatedBooking = req.body;
    console.log(updatedBooking)

     const updateDoc = {
      $set: {
        status: updatedBooking.status
      },
    };
    const result = await bookingCollection.updateOne(filter, updateDoc)
    res.send(result)
   })


    console.log("Car doctors Database is Connected successfully!");
  } catch {}
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("doctor is running");
});

app.listen(port, () => {
  console.log(`Car doctor server is running on port ${port}`);
});
