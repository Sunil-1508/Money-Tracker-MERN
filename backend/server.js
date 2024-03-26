import express from 'express'
import mongoose from 'mongoose'
import Data from './model.js'
import TranData from './model2.js'
import cors from 'cors'


const app = express();
const port = 5001;
app.use(express.json())

// Allow only specific origins
const allowedOrigins = ['https://money-tracker-mern-kfd7-1pctp7hnb-sunil-noolus-projects.vercel.app/', '*'];

app.use(cors({
  origin: function (origin, callback) {
    // Check if the request origin is allowed
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

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
    const Tdata = new TranData(req.body);
    if(Tdata.title=='' || Tdata.date=='' || Tdata.amount=='' || Tdata.type=='' || Tdata.ref==''){
      return res.status(400).json({ error: "Incomplete Data" });
    }
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
app.get('/transactions/:id',async (req,res)=>{
  try{
      const Tdata =await TranData.findById(req.params.id);
      console.log(Tdata);
      res.send(Tdata);
  }
  catch(err){
      console.log(err.message);
      res.send(err.message);
  }
})

app.put('/transactions/:id', async (req, res) => {
  try {
    const updatedTransaction = await TranData.findByIdAndUpdate(req.params.id,req.body,{ new: true });

    if (!updatedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json(updatedTransaction);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

app.delete('/transactions/:id', async (req, res) => {
  try {
    const deletedTransaction = await TranData.findByIdAndDelete(req.params.id);

    if (!deletedTransaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server Error' });
  }
});

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
