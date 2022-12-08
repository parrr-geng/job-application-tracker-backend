const router = require("express").Router();
const User = require("../models/User.model");
const mongoose = require("mongoose");

// GET  show the logged-in user's profile information
router.get("/profile/:userId", (req, res, next) => {
    const { userId } = req.params;

    User.findById(userId)
    .then(foundUser => res.json(foundUser))
    .catch(err => res.json(err));
});


// PUT  edit user's profile information
router.put('/profile/:userId', (req, res, next) => {
    const { userId } = req.params;
   
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: 'Specified id is not valid' });
      return;
    }
   
    User.findByIdAndUpdate(userId, req.body, { new: true })
      .then((updatedUser) => res.json(updatedUser))
      .catch(error => res.json(error));
});

module.exports = router;