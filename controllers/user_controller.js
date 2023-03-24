import User from "../models/User.js";

// UPDATE
export const updateUser = async (req, res, next) => {

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            { $set: req.body }, 
            { new: true}
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        next(err);
    }
};

// DELETE
export const deleteUser = async (req, res, next) => {

    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).send("Delete user successful!");
    } catch (err) {
        next(err);
    }
};

// GET ONE
export const getUser = async (req, res, next) => {

    try {
        const getUser = await User.findById(req.params.id);
        res.status(200).json(getUser);
    } catch (err) {
        next(err);
    }
};

// GET ALL
export const getUsers = async (req, res, next) => {

    try {
        const getUsers = await User.find();
        res.status(200).json(getUsers);
    } catch (err) {
        next(err);
    }
};