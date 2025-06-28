const express = require('express');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files (if any)
app.use(express.static(__dirname));

// Serve index.html at root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Create transporter for nodemailer using environment variables
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});

// POST /contact endpoint sends an email
app.post('/contact', async(req, res) => {
    const { name, email, message } = req.body;

    if (!name ||
        typeof name !== 'string' ||
        name.trim().length < 2 ||
        !email ||
        typeof email !== 'string' ||
        !message ||
        typeof message !== 'string' ||
        message.trim().length < 10
    ) {
        return res.status(400).json({ success: false, error: 'Invalid form data' });
    }

    const mailOptions = {
        from: `"Portfolio Contact Form" <${process.env.SMTP_USER}>`,
        to: process.env.CONTACT_RECEIVER_EMAIL || process.env.SMTP_USER,
        subject: `New Contact Form Message from ${name}`,
        text: `You received a new message from your portfolio contact form.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        replyTo: email
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Contact form email sent:', name, email);
        res.json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: 'Failed to send email' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});