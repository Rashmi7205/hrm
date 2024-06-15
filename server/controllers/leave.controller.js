import ServerError from "../utils/server.error.js";
import Leave from "../schemas/leave.schema.js";

const getAllLeaves = async (req, res, next) => {
    try {
        // const leaves = await req.db.Leave.find().populate("employee");
    } catch (error) {
        return next(new ServerError("Internal Server Error", 500));
    }
}
const getLeaveById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new ServerError("Please provide a valid id", 400));
        }
        const leave = await Leave.findById(id).populate("employee");
        if (!leave) {
            return next(new ServerError("Leave not found", 404));
        }
        res.status(200).json(leave);
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
        if(!id){
            return next(new ServerError("Please provide a valid id", 400));
        }
        const { emp_id, leave_type, from_date, to_date, reason, status } = req.body;
        if (!emp_id || !from_date || !to_date || !leave_type) {
            return next(new ServerError("Please fill all the fields", 400));
        }
    } catch (error) {
        return next(new ServerError("Internal Server Error", 500));
    }
}
const deleteLeave = async (req, res, next) => {
    try {

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
