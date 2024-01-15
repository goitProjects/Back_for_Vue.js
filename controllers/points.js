const Points = require("../models/points");

const getAllPoints = async (req, res) => {
    const points = await Points.find({owner: req.user._id});
    res.status(200).json(points);
};
const addPoint = async (req, res) => {
    try {
        console.log("req.body: ", req.body, req.user._id);
        const {title, description, img, coordinates} = req.body;
        await Points.create({ title, description, img, coordinates, owner: req.user._id});
        res.status(200).json({ points: "addPoints" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const updatePoint = async (req, res) => {
    const {id, title, description, img, coordinates} = req.body;
    const point = await Points.findById(id);

    if (!point) {
        return res.status(404).json({message: "Point not found"});
    }

    // Объект для обновления
    let updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (img !== undefined) updateData.img = img;
    if (coordinates !== undefined) updateData.coordinates = coordinates;

    // Обновляем только если есть что обновлять
    if (Object.keys(updateData).length > 0) {
        await Points.findByIdAndUpdate(point._id, updateData);
    }

    res.status(200).json({
        message: "success",
    });
};
const deletePoint = async (req, res) => {
    const {id} = req.body;
    await Points.findByIdAndDelete(id);
    res.status(200).json({
        message: "deletePoint",
    });
};
module.exports = {getAllPoints, addPoint, updatePoint, deletePoint};
