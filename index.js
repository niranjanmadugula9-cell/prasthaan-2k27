const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // New: Added mongoose for database
const app = express();

app.use(cors());
app.use(express.json());

// 1. Connect to your Database
mongoose.connect('YOUR_CONNECTION_STRING_HERE')
  .then(() => console.log("Connected to Database!"))
  .catch(err => console.error("Database connection error:", err));

// 2. Define the "Shape" of your data (Schema)
const registrationSchema = new mongoose.Schema({
  name: String,
  college: String,
  event: String,
  phone: String
});

const Registration = mongoose.model('Registration', registrationSchema);

// 3. Create a Route to Save Data
app.post('/register', async (req, res) => {
  try {
    const studentData = new Registration(req.body);
    await studentData.save(); // This saves it to the database
    res.json({ success: true, message: "Registration Successful!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error saving data." });
  }
});

// 4. Update the Port for Render
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
