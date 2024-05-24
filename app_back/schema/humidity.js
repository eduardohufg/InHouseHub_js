const Mongoose = require("mongoose");
const { t } = require("tar");

const HumiditySchema = new Mongoose.Schema({
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

module.exports = Mongoose.model("Humidity", HumiditySchema);