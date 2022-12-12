const router = require("express").Router();
const Job = require("../models/Job.model");
const Application = require("../models/Application.model");

//POST - add a new application
router.post("/:userId/applications/create", (req, res, next)=>{
    Application.create(req.body)
    .then(createdJob => res.json(createdJob))
    .catch(error => res.json(error))
})

//GET - applications according to its status ["Wishlist", "Applied", "In Process", "Rejected", "Offer"]
router.get("/:userId/applications/:status", (req, res, next)=>{
    const { userId, status } = req.params;

    Application.find({applicant: userId, status: status})
    .then(response => res.json(response))
    .catch(error => res.json(error));
})

module.exports = router;