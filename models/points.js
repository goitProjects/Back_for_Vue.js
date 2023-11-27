const { Schema, model } = require('mongoose');

const pointsSchema = new Schema({
    id: {
        type: String,
        required: [true, 'id is required'],
        unique: true
    },
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    img: {
        type: String,
    },
    coordinates: {
        type: [Number], // Определяет coordinates как массив чисел
        required: [true, 'Coordinates are required']
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: [true, 'owner is required'],
    },
}, { versionKey: false, timestamps: true });


const Points = model('points', pointsSchema);

module.exports = Points;