const User = require('../models/users'); // Path to the User model file
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // Import nodemailer for sending emails
const mongoose = require('mongoose');

// Controller function for user sign-up
function signup(req, res) {
  bcrypt.hash(req.body.password, 8, function (err, hashedPass) {
    if (err) {
      return res.status(500).json({ error: err });
    }

    User.findOne({ email: req.body.email })
      .then(existingUser => {
        if (existingUser) {
          return res.status(409).json({ 
            status: 'Failed',
            message: 'User already exists' });
        }

        const user = new User({
          companyName: req.body.companyName,
          email: req.body.email,
          password: hashedPass,
        });

        user.save()
          .then(() => {
            res.status(201).json({ 
              status: 'Success',
              message: 'User created successfully' });
          })
          .catch(error => {
            console.error('Error during user sign-up:', error);
            res.status(500).json({ message: 'Internal server error occurred' });
          });
      })
      .catch(error => {
        console.error('Error during user sign-up:', error);
        res.status(500).json({ message: 'Internal server error occurred' });
      });
  });
}

// Controller function for user sign-in
function signin(req, res) {
  const { email, password } = req.body;

  // Find the user in the database
  User.findOne({ email: email })
    .then(user => {
      if (!user) {
        console.error('No user found');
        return res.status(404).json({ 
          status:'Failed',
          message: 'User not found' });
      }

      // Compare the input password with the stored hashed password
      bcrypt.compare(password, user.password)
        .then(match => {
          if (match) {
            // Passwords match, generate a token and send a success response
            let token = jwt.sign({ companyName: user.companyName, email: user.email, userId: user._id, status:user.status }, 'secretValue', { expiresIn: '1hr' });
            res.status(200).json({
              status: 'Success',
              token:token,
              message: 'User signed in successfully'
            });
          } else {
            // Passwords don't match, send an error response
            res.status(401).json({ 
              status:'Failed',
              message: 'Password does not match' });
          }
        })
        .catch(error => {
          console.error('Error during password comparison:', error);
          res.status(500).json({ message: 'Internal server error occurred' });
        });
    })
    .catch(error => {
      console.error('Error during user lookup:', error);
      res.status(500).json({ message: 'Internal server error occurred' });
    });
}


async function checkUserStatus(req, res) {
  try {
    const userId = req.params.userId; // userId is already a plain string
    // console.log('====================================');
    // console.log(userId);
    // console.log('====================================');
    const userIdObject = new mongoose.Types.ObjectId(userId); // Convert userId to ObjectId format
    const user = await User.findById(userIdObject); // Use findById with userIdObject

    if (!user) {
      return res.status(404).json({
        status: 'Failed',
        message: 'User not found',
      });
    }

    res.status(200).json({
      status: 'Success',
      userStatus: user.status,
      message: 'User status checked successfully',
    });
  } catch (error) {
    // console.error('Error checking user status:', error);
    res.status(500).json({ message: 'Internal server error occurred' });
  }
}


async function submitEmail(req, res) {
  try {
    const { email } = req.body;

    // Find the user in the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: 'Failed',
        message: 'User not found',
      });
    }

    // Generate a 4-digit PIN code
    const pin = Math.floor(1000 + Math.random() * 9000);

    // Update user with PIN code
    user.pin = pin;
    await user.save();

    // Send email with PIN code to the user
    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE_PROVIDER,
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
     });

    const mailOptions = {
      from: process.env.EMAIL_SERVICE_PROVIDER,
      to: email,
      subject: 'Password Reset PIN',
      text: `Your password reset PIN is: ${pin}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Failed to send email' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({
          status: 'Success',
          message: 'PIN code sent to email successfully',
        });
      }
    });
  } catch (error) {
    console.error('Error submitting email:', error);
    res.status(500).json({ message: 'Internal server error occurred' });
  }
}
// Server-side route handler for resetting PIN
async function resetPin(req, res) {
  try {
    const { pin, password, email } = req.body;

    // Find the user in the database based on the email received from the frontend
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: 'Failed',
        message: 'User not found',
      });
    }

    // Verify if the submitted PIN matches the existing PIN stored in the database
    if (pin !== user.pin) {
      return res.status(400).json({
        status: 'Failed',
        message: 'Invalid PIN',
      });
    }

    // Update the user's password in the database
    // You can use bcrypt to hash the new password before storing it
    user.password = await bcrypt.hash(password, 8);
    await user.save();

    // Clear the PIN field after successful password reset
    user.pin = null;
    await user.save();

    // Send response indicating successful password reset
    res.status(200).json({
      status: 'Success',
      message: 'Password reset successful',
    });
  } catch (error) {
    console.error('Error resetting PIN:', error);
    res.status(500).json({ message: 'Internal server error occurred' });
  }
}


module.exports = { signup, signin, checkUserStatus, submitEmail, resetPin };



module.exports = { signup, signin, checkUserStatus, submitEmail, resetPin };

