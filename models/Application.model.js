const {Schema, model} = require("mongoose");

const applicationSchema = new Schema(
    {
    status:{
        type: String,
        enum: ["applied", "interviewed", "rejected", "accepted"]
    },
    lastContacted: Date
    }, 
    {
        timestamps: true
    }
);

module.exports = model("Application", applicationSchema);