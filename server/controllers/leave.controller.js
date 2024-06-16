import ServerError from "../utils/server.error.js";
import Leave from "../schemas/leave.schema.js";
import mongoose from "mongoose";

const getAllLeaves = async (req, res, next) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (page - 1) * limit;
        const leaves = await Leave.aggregate([
            {
                $lookup: {
                    from: 'employees',
                    localField: 'emp_id',
                    foreignField: '_id',
                    as: 'employee'
                }
            },
            {
                $unwind: '$employee'
            },
            {
                $sort: { createdAt: -1 } // Sort by createdAt descending, adjust field as needed
            },
            {
                $skip: skip
            },
            {
                $limit: parseInt(limit)
            }
        ]);

        if (!leaves.length) {
            return next(new ServerError("No leaves found", 404));
        }

        res.status(200).json(leaves);
    } catch (error) {
        console.error(error);
        return next(new ServerError("Internal Server Error", 500));
    }
}
const getLeaveById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new ServerError("Please provide a valid id", 400));
        }
        // Convert id to ObjectId
        const objectId = new mongoose.Types.ObjectId(id);
        const leave = await Leave.aggregate([
            {
                $match: {
                    _id: objectId
                }
            },
            {
                $lookup: {
                    from: 'employees',
                    localField: 'emp_id',
                    foreignField: '_id',
                    as: 'employee'
                }
            },
            {
                $unwind: '$employee'
            }
        ]);

        if (!leave.length) {
            return next(new ServerError("Leave not found", 404));
        }
        res.status(200).json(leave[0]); // Return the first (and likely only) document in the result
    } catch (error) {
        return next(new ServerError("Internal Server Error", 500));
    }
}

const createLeave = async (req, res, next) => {
    try {
        const { emp_id, leave_type, from_date, to_date, reason } = req.body;
        if (!emp_id || !from_date || !to_date || !leave_type) {
            return next(new ServerError("Please fill all the fields", 400));
        }
        const newLeave = await Leave.create({
            emp_id,
            leave_type,
            from_date,
            to_date,
            reason,
            status: "new_leave"
        });
        await newLeave.save();
        res.status(201).json({ message: "Leave created successfully" });
    } catch (error) {
        return next(new ServerError("Internal Server Error", 500));
    }
}
const updateLeave = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new ServerError("Please provide a valid id", 400));
        }
        const { emp_id, leave_type, from_date, to_date, reason, status } = req.body;
        if (!emp_id || !from_date || !to_date || !leave_type) {
            return next(new ServerError("Please fill all the fields", 400));
        }
        const updatedLeave = await Leave.findByIdAndUpdate(id, {
            emp_id,
            leave_type,
            from_date,
            to_date,
            reason,
            status
        });
        if (!updateLeave) {
            return next(new ServerError("Cannot update the leave", 400));
        }
        res.status(200).json({
            success: true,
            message: "Leave Updated successfully"
        });
    } catch (error) {
        return next(new ServerError("Internal Server Error", 500));
    }
}
const deleteLeave = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new ServerError("Please provide a valid id", 400));
        }
        const deletedLeave = await Leave.findByIdAndDelete(id);
        if (!deletedLeave) {
            return next(new ServerError("Cannot delete leave", 400));
        }
        res.status(200).json({
            success: true,
            message: "Leave deleted successfully"
        });
    } catch (error) {
        return next(new ServerError("Internal Server Error", 500));
    }
}
export {
    getAllLeaves,
    getLeaveById,
    createLeave,
    updateLeave,
    deleteLeave
}
