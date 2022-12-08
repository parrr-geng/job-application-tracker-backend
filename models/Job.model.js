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
        recruiter: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        description: String,
        status: {
            type: String,
            enum:["wishlist", "applied"]
        }

    },
    {
        timestamps: true,
    }
);

module.exports = model("Job", jobSchema);