const mongoose = require(`mongoose`);

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    // isAdmin: {
    //     type: Boolean,
    //     required: true,
    //     default: false
    // },
    role: {
        type: String,
        required: true,
        enum: ["Viewer", "Theatre_Owner", "Admin"],
        default: "Viewer"
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("users", userSchema);