const express = require('express')
const app = express()
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://simpleCrudUser:thG3QAb8cGjb2IRq@cluster0.f4ctco1.mongodb.net/?appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {

    await client.connect();

    const database = client.db("simpleCrud");
    const userCollection = database.collection("users");

    app.get('/users', async (req, res) => {

      const cursor = userCollection.find();
      const result = await cursor.toArray();
      res.send(result)
    });

    app.get('/users/:id' ,async (req, res) =>{

      const id = req.params.id ;

      const query = {
        _id:new ObjectId(id)
      }
 const user = await userCollection.findOne(query)
// console.log(req)
      res.send(user)

    }) ;

    app.post('/users' , async (req, res) =>{

      const newUser = req.body ;
      const result = await userCollection.insertOne(newUser) ;
      res.send(result)
    })


    app.patch('/users/:id' , async (req, res) =>{

      const id = req.params.id;

      const filter = {
        _id: new ObjectId(id)
      }

      const modifiedUser = req.body ;
      const updatedDocument = {
        $set :{

          name: modifiedUser.name ,
          email: modifiedUser.email ,
          role: modifiedUser.role 
        }
      }

      const result = await userCollection.updateOne(filter , updatedDocument) ;

      res.send(result) ;

    })

    app.delete('/users/:id' , async (req, res) =>{
      const id = req.params.id
      const query = {
        _id: new ObjectId(id) 
      }

      const result = await userCollection.deleteOne(query) ;
      res.send(result)
    })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {

    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Simple crud server served!')
})

app.listen(port, () => {
  console.log(`Simple crud server running ${port}`)
})
