const Mongoose = require("mongoose");
const { t } = require("tar");

const PressureSchema = new Mongoose.Schema({
    id: {
        type: Object,
    },
    value: {
        type: Number,
        //required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = Mongoose.model("Pressure", PressureSchema);