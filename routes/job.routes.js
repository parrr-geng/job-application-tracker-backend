const router = require("express").Router();
const Job = require("../models/Job.model");
const User = require("../models/User.model");
const Application = require("../models/Application.model");


//POST - create a new job post by the logged-in user
router.post("/:userId/job/create", (req, res, next)=>{
    const { userId } = req.params;

    const {title, company, location, jobType, recruiter, description, public} = req.body;

    Job.create({title, company, location, jobType, recruiter, description, createdBy: userId})
    .then(createdJob => res.json(createdJob))
    .catch(err => res.json(err));
})


//GET - view the details of a job-post
router.get("/jobs/:jobId", (req, res, next)=>{
    const { jobId } = req.params;

    Job.findById( jobId )
    .then(foundJob => res.json(foundJob))
    .catch(err => res.json(err));
})

//Edit - edit a specific job post that is created by this logged-in user
router.put("/jobs/:jobId/edit", (req, res, next)=>{
    const { jobId } = req.params;
    
    Job.findByIdAndUpdate(jobId, req.body)
    .then(foundJob => res.json(foundJob))
    .catch(err => res.json(err));
})

//DELETE - delete a job post that is created by the logged-in user
router.delete("/jobs/:jobId/delete", (req, res, next)=>{
    const { jobId } = req.params;

    Job.findByIdAndRemove( jobId )
    .then(()=>res.json(
        {message: "Job removed successfully."}
    ))
    .catch(err => res.json(err));
});


//GET - view the logged-in user's job posts
router.get("/:userId/jobs", (req, res, next)=>{
    const {userId} = req.params;

    Job.find({createdBy: userId})
    .then(response => res.json(response))
    .catch(error => res.json(error));
});

//GET - view all the job posts created on this platform
router.get("/jobs", (req, res, next)=>{

    Job.find()
    .then(response => res.json(response))
    .catch(error => res.json(error));
})


module.exports = router;