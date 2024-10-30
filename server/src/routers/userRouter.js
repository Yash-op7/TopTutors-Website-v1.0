import express from 'express';
import nodemailer from 'nodemailer';
import {validateNewUser} from '../middlewares/validator.js';

const adminEmail = 'yashm3375@gmail.com';
const dummyTutorEmails = ['toxicmortis69@gmail.com']

// Email configuration
const transporter = nodemailer.createTransport({
    service: 'Gmail', // You can use any email service
    auth: {
        user: adminEmail,
        pass: 'ayanogodinanidealworld98'
    },
});


const userRouter = express.Router();

userRouter.get('/test', (req, res) => {
    res.send('<h1>✅ User router is working.</h1>');
});



userRouter.post('/', validateNewUser, async (req, res) => {
    // TODO 1. create the new user in Mongo DB
    // 

    // 2. email the tutors
    // TODO   - get the tutors' emails from mongoDB

    //        - write the email functionality
    const { name, email, contactNumber } = req.body;
    console.log('new user request', name, email, contactNumber);
    try {
        // Send email to predefined addresses
        const mailOptions = {
            from: adminEmail,
            to: dummyTutorEmails.join(', '), // Predefined emails
            subject: 'New User Registration',
            text: `A new user has registered:\n\nName: ${name}\nEmail: ${email}\nContact Number: ${contactNumber}`,
        };

        await transporter.sendMail(mailOptions);
        
        res.status(201).json({ message: 'User created and email sent!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }

})

export default userRouter;