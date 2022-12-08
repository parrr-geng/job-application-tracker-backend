const {Schema, model} = require("mongoose");

const jobSchema = new Schema(
    {
        title: String,
        company: String,
        location: String,
        jobType: {
            type: String,
            enum: ["Full-time", "Part-time", "Contract", "Internship"]
        },
        recruiter: String,
        description: String,
        status: {
            type: String,
            enum:["wishlist", "applied"]
        },
        createdBy: {
            type: Schema.Types.ObjectId,
            rel: "User"
        }

    },
    {
        timestamps: true,
    }
);

module.exports = model("Job", jobSchema);