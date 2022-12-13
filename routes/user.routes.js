const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");
const fileUploader = require("../config/cloudinary.config");
const nodeMailer = require('nodemailer');

// GET  show the logged-in user's profile information
router.get("/profile/:userId", (req, res, next) => {
    const { userId } = req.params;

    User.findById(userId)
    .then(foundUser => res.json(foundUser))
    .catch(err => res.json(err));
});

// POST  upload image file
router.post("/upload", fileUploader.single("profileImageURL"), (req, res, next)=>{
  if (!req.file){
    next(new Error("No file uploaded!"));
    return;
  }

  res.json({fileUrl: req.file.path});
});

// PUT  edit user's profile information
router.put('/profile/:userId/edit', (req, res, next) => {
    const { userId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    User.findByIdAndUpdate(userId, req.body, { new: true })
      .then((updatedUser) => res.json(updatedUser))
      .catch(error => res.json(error));
});

// Post  to post the feedback to the website hoster's email address
router.post("/contact", (req, res, next) => {
  const transporter = nodeMailer.createTransport({
      service: "Gmail",
      auth: {
          user:"parrr.geng@gmail.com",
          pass:"",
      },
  })

  const mailOptions = {
      from: "parrr.geng@gmail.com",
      to: "parrr.geng@gmail.com",
      subject: req.body.subject,
      text: `You got a message from
      Email: ${req.body.email}
      Message: ${req.body.message}`
  };

  const mailResponse = {
      from: "parrr.geng@gmail.com",
      to: req.body.email,
      subject: "Email sent confirmation",
      text: `We have received your email and you'll be contacted shortly!\n${req.body.message}`
  }

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) { 
          res.json('error')
      } else {
          console.log('Message sent successfuly!')
          transporter.sendMail(mailResponse,(error, info))
          res.redirect("/")
      }
  });
});

module.exports = router;