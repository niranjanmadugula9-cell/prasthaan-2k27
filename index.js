const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://niranjansuccess:Niranjan21022007@cluster0.j9gwcpr.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log("Connected to MongoDB successfully!"))
  .catch(err => console.error("Database connection error:", err));

const registrationSchema = new mongoose.Schema({
   Full_namename: String,
  mobile_number: String,
  email_address: String,
  password: String
});

const Registration = mongoose.model('Registration', registrationSchema);

app.get('/', (req, res) => {
  res.send("Prasthaan 2K27 Backend is Live!");
});

app.post('/register', async (req, res) => {
  try {
    const studentData = new Registration(req.body);
    await studentData.save(); 
    res.json({ success: true, message: "Registration Successful! See you at Prasthaan." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error. Please try again." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
