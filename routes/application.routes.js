const router = require("express").Router();
const Job = require("../models/Job.model");
const Application = require("../models/Application.model");

//POST - add a new application
router.post("/:userId/applications/create", (req, res, next)=>{
    Application.create(req.body)
    .then(createdJob => res.json(createdJob))
    .catch(error => res.json(error))
})

//GET - view a specific application
router.get("/applications/:applicationId", (req, res, next)=>{
    const { applicationId } = req.params;

    Application.findById(applicationId)
    .then(foundApplication => res.json(foundApplication))
    .catch(error=>res.json(error));
})

//EDIT - edit a specific application
router.put("/applications/:applicationId/edit", (req, res, next)=>{
    const { applicationId } = req.params;
    
    Application.findByIdAndUpdate(applicationId, req.body)
    .then(foundApplication => res.json(foundApplication))
    .catch(err => res.json(err));
})


//DELETE - delete a specific application 
router.delete("/applications/:applicationId/delete", (req, res, next)=>{
    const { applicationId } = req.params;

    Application.findByIdAndRemove( applicationId )
    .then(()=>res.json(
        {message: "Application removed successfully."}
    ))
    .catch(err => res.json(err));
});

//GET - applications according to its status ["Wishlist", "Applied", "In Process", "Rejected", "Offer"]
router.get("/:userId/applications/:status", (req, res, next)=>{
    const { userId, status } = req.params;

    Application.find({applicant: userId, status: status})
    .then(response => res.json(response))
    .catch(error => res.json(error));
})

module.exports = router;