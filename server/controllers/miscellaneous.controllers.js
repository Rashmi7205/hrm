import ServerError from '../middlewares/error.middleware.js';
import Employee from '../schemas/employee.schema.js';
export const getAllEmpNames = async (req, res, next) => {
    try {
        const result = await Employee.aggregate([
            {
                $project: {
                    name: 1,
                    position: 1,
                    dept_name: 1,
                }
            }
        ]);
        if (!result) {
            next(new ServerError("Cannot find result", 404));
        }
        return res.status(200).json({
            result
        });

    } catch (error) {
        next(new ServerError("Internal Server Error", 501));
    }
}
