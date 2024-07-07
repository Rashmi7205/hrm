import ServerError from '../utils/server.error.js';
import Employee, { BankInfo } from '../schemas/employee.schema.js';
import mongoose from 'mongoose';
const getAllEmployees = async(req, res,next)=> {
    try {
        const {search} = Array.isArray(req.body.search) ? req.body.search : [req.body.search];
        let {limit,skip} = req.body;
        if(!limit || !skip){
            limit  = 50;
            skip = 0;
        }
        if(search){
            const empList = await Employee.aggregate([
                // Match the employees based on search criteria
                {
                    $match: {
                        $or: [
                            { name: { $in: search } },
                            { position: { $in: search} },
                            { email: { $in: search } },
                            { dept_name: { $in: search } }
                        ]
                    }
                },
                // Apply limit and skip for pagination
                { $skip: skip },
                { $limit: limit },
                {
                    $project:{
                        _id:1,
                        name:1,
                        position:1,
                        email:1,
                        dept_name:1,
                        date_of_joining:1,
                        phone_number:1,
                        status:1,
                        
                    }
                }                
            ]);
            return res.status(200).json({
                empList
            });
        }else{
            const empList = await Employee.aggregate([
                { $skip: skip },
                { $limit: limit },
                {
                    $project:{
                        _id:1,
                        name:1,
                        position:1,
                        email:1,
                        dept_name:1,
                        date_of_joining:1,
                        phone_number:1
                    }
                }   
               
            ]);
            return res.status(200).json({
                empList
            });
        }   
    } catch (error) {
        next(new ServerError("Internal Server Error",501));
    }
 }
const getEmployeeById = async(req, res,next)=> {
    try {
       const {id }  = req.params;
       if(!id){
        return next(new ServerError("Id is missing | Emp id is required",402));
       }
       const emp = await Employee.aggregate([
        {
            $match:{
                _id:new mongoose.Types.ObjectId(id)
            }
        },
        {
            $lookup:{
                from:"leaves",
                localField:"_id",
                foreignField:"emp_id",
                as:"leaves"
            }
        },
        {
            $lookup:{
                from:"bankinfos",
                localField:"bank_info",
                foreignField:"_id",
                as:"bankinfo"
            } 
        }
       ]);
       if(!emp){
        return next(new ServerError("Cannot Find Employee",400));
       }
       res.status(200).json({
            emp
       });
    } catch (error) {
        next(new ServerError("Internal Server Error",501));
    }
 }
const createEmployee = async (req, res,next) =>{ 
    try {
        const {fullname,position,dept,doj,phone,email} = req.body.empinfo;
        const {passNo,passExpDate,dob,maritalStatus} = req.body.personalInfo;
        const {accNo,bankName,panNo,ifscCode} = req.body.bankInfo;
        const {skills} = req.body.skills;
        
        if(!fullname||!position||!dept||!doj||!phone||!email){
            return next(new ServerError("Missing Emp info params",400));
        }
        if(!accNo || !bankName||!panNo||!ifscCode){
            return next(new ServerError("Missing Banking info params",400));
        }
        if(!passNo||!passExpDate||!dob||!maritalStatus){
            return next(new ServerError("Missing personal info params",400));
        }
        const bankInfo = {
            name_of_bank:bankName,
            pan_no:panNo,
            ifsc_no:ifscCode
        };
        const newBankInfo = await  BankInfo.create(bankInfo);
        newBankInfo.save();
        if(!bankInfo){
            return next(new ServerError("Cannot Save Bank setails",400));
        }
        let newEmpObj = {
            name:fullname,
            position,
            dept_name:dept,
            date_of_joining:doj,
            phone_number:phone,
            email:email,
            passport_no:passNo,
            passport_exp_date:passExpDate,
            dob:dob,
            bank_info:[newBankInfo?._id],
            skills
        };
        if(req.body.experience && req.body.experience.length){
            let expList = req.body.experience;
            expList.forEach((exp)=>{
                if(!exp.company_name||!exp.designation||!exp.from||!exp.to){
                    return next(new ServerError("Field Mismatch ",400));
                }
            });
            newEmpObj = {
                ...newEmpObj,
                experience:expList
            }
        }
        const newEmp = await Employee.create(newEmpObj);
        if(!newEmp){
            return next(new ServerError("Cannot Create employee",400));
        }
        await newEmp.save();
        res.status(200).json(newEmp);
    } catch (error) {
        next(new ServerError(error.message,501));
    }
}
const updateEmployee = async (req, res, next) =>{ 
    try {
        const {id} = req.params;
        if(!id){
            return next(new ServerError("Emp id required",400));
        }
        const {fullname,position,dept,doj,phone,email} = req.body.empinfo;
        const {passNo,passExpDate,dob,maritalStatus} = req.body.personalInfo;
        const {accNo,bankName,panNo,ifscCode} = req.body.bankInfo;
        
        if(!fullname||!position||!dept||!doj||!phone||!email){
            return next(new ServerError("Missing Emp info params",400));
        }
        if(!accNo || !bankName||!panNo||!ifscCode){
            return next(new ServerError("Missing Banking info params",400));
        }
        if(!passNo||!passExpDate||!dob||!maritalStatus){
            return next(new ServerError("Missing personal info params",400));
        }
        const bankInfo = {
            name_of_bank:bankName,
            pan_no:panNo,
            ifsc_no:ifscCode
        };
        const newBankInfo = await  BankInfo.create(bankInfo);
        newBankInfo.save();
        if(!bankInfo){
            return next(new ServerError("Cannot Save Bank setails",400));
        }
        let updatedEmp = {
            name:fullname,
            position,
            dept_name:dept,
            date_of_joining:doj,
            phone_number:phone,
            email:email,
            passport_no:passNo,
            passport_exp_date:passExpDate,
            dob:dob,
            bank_info:[newBankInfo?._id],
        };
        if(req.body.experience && req.body.experience.length){
            let expList = req.body.experience;
            expList.forEach((exp)=>{
                if(!exp.company_name||!exp.designation||!exp.from||!exp.to){
                    return next(new ServerError("Field Mismatch ",400));
                }
            });
            updatedEmp = {
                ...updatedEmp,
                experience:expList
            }
        }
        const updateCureentEmp = await Employee.findByIdAndUpdate(id,updatedEmp);
        if(!updateCureentEmp){
            return next(new ServerError("Cannot Update Emp",400));
        }   
        res.status(200).json({success:true,message:"Employee updated successfully"});
    } catch (error) {
        next(new ServerError("Internal Server Error",501));
    }
}
const deleteEmployee = async (req, res,next) =>{ 
    try {
        const {id} = req.params;
        if(!id){
            return next(new ServerError("Missing Employee ID",400));
        }
        const deleteEmp = await Employee.findByIdAndDelete(id);
        if(!deleteEmp){
            return next(new ServerError("Cannot delete emp",400));
        }
        res.status(200).json({
            success:true,
            message:"Emp deleted successfully"
        });
    } catch (error) {
        next(new ServerError("Internal Server Error",501));
    }
}

export{
    createEmployee,
    updateEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployee
}
