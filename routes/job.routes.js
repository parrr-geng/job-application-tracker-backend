const router = require("express").Router();
const Job = require("../models/Job.model");

//GET - view the logged-in user's job posts
router.get("/:userId/jobs", (req, res, next)=>{
    const {userId} = req.params;

    Job.find({createdBy: userId})
    .then(response => res.json(response))
    .catch(error => res.json(error));
});

//POST - create a new job post by the logged-in user
router.post("/:userId/job/create", (req, res, next)=>{
    const { userId } = req.params;

    const {title, company, location, jobType, recruiter, description} = req.body;

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

module.exports = router;