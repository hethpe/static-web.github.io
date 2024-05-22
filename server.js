// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/user_data', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Define a schema for user data
const userDataSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String
});
const UserData = mongoose.model('UserData', userDataSchema);

// Middleware setup
app.use(bodyParser.json());

// Route to handle form submission
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;

    // Create a new UserData document
    const userData = new UserData({ name, email, message });

    // Save the data to the database
    userData.save((err, savedData) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: 'Internal server error' });
        } else {
            console.log('User data saved:', savedData);
            res.status(200).json({ message: 'User data saved successfully' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
