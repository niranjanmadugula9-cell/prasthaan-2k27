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
  mobile_number: { type: String,unique: true},
  email_address: String,
  password: String,
  RegesteredEvents: [Number]
});
const User = mongoose.model('User', userSchema);
app.post('/register', async (req, res) => {
  try {
    const lastUser = await User.findOne().sort({ _id: -1 });
    const lastNum = lastUser ? parseInt(lastUser.uid.split('-')[1]) : 1000;
    const newUid = `PR26-${lastNum + 1}`;

    const newUser = new User({ ...req.body, uid: newUid, registeredEvents: [] });
    await newUser.save();
    res.json({ success: true, uid: newUid });
  } catch (error) {
    res.status(400).json({ success: false, message: "Mobile number already registered." });
  }
});
app.post('/login', async (req, res) => {
  const { mobile, pass } = req.body;
  try {
    const user = await User.findOne({ mobile, pass });
    if (user) {
      res.json({ success: true, user });
    } else {
      res.json({ success: false, message: "Invalid Mobile or Password." });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error." });
  }
});
app.post('/add-event', async (req, res) => {
  const { uid, eventId } = req.body;
  try {
    await User.findOneAndUpdate({ uid }, { $addToSet: { registeredEvents: eventId } });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false });
  }
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);

