const axios = require('axios');
const cheerio = require('cheerio');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

// Function to check appointment slot availability
async function checkAppointmentAvailability() {
    try {
        const response = await axios.get('https://www.usvisascheduling.com/en-US/ofc-schedule/?reschedule=true'); // Replace with actual URL
        const html = response.data;
        const $ = cheerio.load(html);
        // Implement scraping logic to check for available slots
        // Example: Check for specific elements or text indicating availability
        const slotsAvailable = $('body').text().includes('Available');
        if (slotsAvailable) {
            sendNotification("Appointment slots available!");
        } else {
            sendEmail("No appointment slots available.");
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

// Function to send email
function sendEmail(message) {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'het8169@gmail.com', // Replace with your Gmail email address
            pass: 'lzaz zqkv yack stgl' // Replace with your Gmail password
        }
    });

    // Email options
    const mailOptions = {
        from: 'het8169@gmail.com',
        to: 'hp747005@gmail.com', // Replace with your recipient email address
        subject: 'US Visa Appointment Notification',
        text: message
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

// Function to send push notification
function sendNotification(message) {
    // Implement code to send push notification
    console.log("Push notification:", message);
}

// Schedule the scraping task to run every hour (0 * * * *)
cron.schedule('0 * * * *', () => {
    console.log('Running appointment availability check...');
    checkAppointmentAvailability();
});
