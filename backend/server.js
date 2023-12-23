import express from 'express'
import mongoose from 'mongoose'
import Data from './model.js'
import TranData from './model2.js'
import cors from 'cors'


const app = express();
const port = 5001;
app.use(express.json())
app.use(cors())

app.listen(port, ()=> console.log(`server running in port ${port}`))

mongoose.connect('mongodb+srv://sunilnoolu:sunil123@cluster0.shxe0yc.mongodb.net/Cluster0?retryWrites=true&w=majority')
.then(()=>{ console.log("connected to MongoDB ");  })
.catch(err => console.log(err))

// For Login and Register------------------------------------------------------------------------------------------------->
app.post('/post', async (req, res) => {
    try {
      const newData = new Data(req.body);
      const { username } = newData;
      const user = await Data.findOne({ username });
  
      if (user) {
        return res.status(401).json({ error: "User already exists" });
      }
  
      await newData.save();
      res.status(200).json({ message: "Successfully registered" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
app.post('/validate', async (req, res) => {
  try {
      const { username, password } = req.body;
      const user = await Data.findOne({ username });
  
      if (user && user.password === password) {
        //res.status(200).json({ message: "Successfully logged in" });
        return res.send(user._id);
      }
   
      res.status(401).json({ error: "Invalid credentials" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});
//For Transactions in dashboard----------------------------------------------------------------------------------------->
app.post('/transactions', async (req, res) => {
  try {
    const Tdata = new Data(req.body);
    await Tdata.save();
    res.status(200).json({ message: "Successfully Saved Data to DB" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/transactions',async (req,res)=>{
  try{
      const Tdata =await TranData.find();
      return res.send(Tdata);
  }
  catch(err){
      console.log(err.message);
      res.send(err.message);
  }
})
//To get data ---------------------------------------------------------------------------------------------------------->
app.get('/getdata',async (req,res)=>{
    try{
        const allData =await Data.find();
        return res.send(allData);
    }
    catch(err){
        console.log(err.message);
        res.send(err.message);
    }
})

app.get('/getdata/:id',async (req,res)=>{
    try{
        const data =await Data.findById(req.params.id);
        res.send(data);
    }
    catch(err){
        console.log(err.message);
        res.send(err.message);
    }
})

app.delete('/deletedata',async (req,res)=>{
    try{
        
        await Data.deleteMany();
        return res.send('All data Deleted Succesfully');
    }
    catch(err){
        console.error(err.message);
        res.status(500).send(err.message);
    }
})
