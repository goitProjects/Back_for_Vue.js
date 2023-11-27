const Points = require("../models/points");

const getAllPoints = async (req, res) => {
    const points = await Points.find({owner:req.user._id});
    console.log(points);
    res.status(200).json(
    points,
    );
};
const addPoint = async (req, res) => {
    const {id, title, description, img} = req.body;
    await Points.create({ id, title, description, img,owner:req.user._id });
    res.status(200).json({
        points: "addPoints"
    });
};
const updatePoint = async (req, res) => {
    const { id, title, description, img,coordinates } = req.body;
    const point = await Points.findOne({ "id": id });

    if (!point) {
        return res.status(404).json({ message: "Point not found" });
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
        message: "success"
    });
};
const deletePoint = async (req, res) => {
    const { id } = req.body;
    const point = await Points.findOne({"id": id});
    console.log(point)
    await Points.findByIdAndDelete(point._id);
    res.status(200).json({
        message: "deletePoint"
    });
};
module.exports = {getAllPoints,addPoint,updatePoint,deletePoint};