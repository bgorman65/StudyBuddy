const express = require('express');
const router = express.Router();
const schemas = require('../models/schemas');
const bcrypt = require('bcrypt');
const OpenAI = require('openai');
const { default: axios } = require('axios');
const cron = require('node-cron');
require('dotenv').config();


// Creating new instance of OpenAI with the API key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});


// Get for register to make sure the username and email are unique
router.get('/users/register', async (req, res) => {
    try {
        // Get all users emails and usernames
        const users = await schemas.Users.find({}, { email: 1, username: 1, _id: 0 });
        res.json(users);
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving users' });
    }
});


// Login a user
router.post('/users/login', async (req, res) => {
    // Getting the data from the request body
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await schemas.Users.findOne({ username });
        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Password mismatch');
            return res.status(400).json({ message: 'Invalid Credentials' });
        }

        // If the username and password are correct, send a status of 200
        res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ message: 'Server Error' });
    }
});


// Register a new user
router.post('/users/register', async (req, res) => {
    // Getting the data from the request body
    const { email, username, password } = req.body;

    try {
        // Generate a salt
        const salt = await bcrypt.genSalt(10);
        // Hash the password with the salt
        const hashedPassword = await bcrypt.hash(password, salt);

        // Creating a new user with hashed password
        const userData = { email: email, username: username, password: hashedPassword }
        const newUser = new schemas.Users(userData);
        const saveUser = await newUser.save();
        
        if (saveUser) {
            res.send('User Registered');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error registering user' });
    }
});


// Post for logs
router.post('/logs/create', async (req, res) => { 
    // Getting the data from the request body
    const {username, interval, count, time, entryDate} = req.body;

    try{
        // Creating a new log
        const logData = {username, interval, count, time, entryDate};
        const newLog = new schemas.Logs(logData);
        const saveLog = await newLog.save();
        
        // If the log is saved, send a status of 200
        if (saveLog) {
            res.send('Log Saved');
        }
    }
    catch(error){
        res.status(500).json({ message: 'Error saving log' });
    }
});


// Get for logs by user
router.get('/logs/username', async (req, res) => {
    // Getting the username from the request query
    const username = req.query.username;

    try {
        // Find all logs by username
        const logs = await schemas.Logs.find({ username }, { _id: 0, username: 1, interval: 1, count: 1, time:1,  entryDate: 1 });
        
        res.json(logs);
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving logs' });
    }
});


// Getting response from OpenAI
router.post("/api/openai", async (req, res) => {
    // Getting the prompt from the request body
    const prompt = req.body.prompt;

    // Getting the response from OpenAI
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: prompt }]
        });
        res.json({ response: response.choices[0].message.content });
    } catch (error) {
        console.error('Error getting response from OpenAI:', error);
        res.status(500).json({ message: 'Error getting response from OpenAI' });
    }
});


// Get for sending reminder email
router.get("/sendReminder", async (req, res) => {
    // Getting the username from the request query
    const username = req.query.username;
    const date = req.query.date;
    const time = req.query.time;

    try {
        // Get email and username by username
        const user = await schemas.Users.findOne(
            { username },
            { projection: { password: 0 } }  // Exclude specific field
        );
        console.log("Sending Test Email");
        sendMail(user.username, user.email);
        console.log("Test Email Sent\n\n");

        // Construct the reminder date and time
        const reminderDate = new Date(`${date} ${time}`);
        const reminderTime = new Date(reminderDate.getTime() - 15 * 60 * 1000); // 15 minutes before the reminder date and time
        const cronTime = `${reminderTime.getMinutes()} ${reminderTime.getHours()} ${reminderTime.getDate()} ${reminderTime.getMonth() + 1} *`;
        console.log(`Scheduling email reminder: ${cronTime} for ${user.username}`);
        // Schedule the reminder email
        cron.schedule(cronTime, () => {
            sendMail(user.username, user.email);
        });
        // Send the user data
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving email' });
    }
});


// Send reminder email
function sendMail(username, email) {
    // Setting the headers for the email
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.set('Authorization', 'Basic ' + btoa(process.env.MAILJET_KEY + ":" + process.env.MAILJET_SECRET));
  
    // Constructing the data for the email
    const data = JSON.stringify({
      "Messages": [{
        "From": {"Email": "study.buddy.reminder@gmail.com", "Name": "Study Buddy"},
        "To": [{"Email": email, "Name": username}],
        "Subject": "Reminder from Study Buddy",
        "TextPart": "You have a study session scheduled in 15 minutes. Happy Studying!",
      }]
    });
  
    // Setting the request options
    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: data,
    };
  
    // Sending the email
    fetch("https://api.mailjet.com/v3.1/send", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
  

module.exports = router;