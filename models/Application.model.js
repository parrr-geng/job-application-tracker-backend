const {Schema, model} = require("mongoose");

const applicationSchema = new Schema(
    {
        job:{
            type: Schema.Types.ObjectId,
            rel: "Job",
            required: true
        },
        jobTitle: String,
        status:{
            type: String,
            enum: ["Wishlist", "Applied", "In Process", "Rejected", "Offer"]
        },
        coverLetter: String,
        notes: String,
        dateApplied: String,
        applicant:{
            type:Schema.Types.ObjectId,
            rel: "User"
        },
    }, 
    {
        timestamps: true
    }
);

module.exports = model("Application", applicationSchema);