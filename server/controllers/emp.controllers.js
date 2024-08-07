import ServerError from '../utils/server.error.js';
import Employee, { BankInfo } from '../schemas/employee.schema.js';
import Payroll from '../schemas/payroll.schema.js';
import mongoose from 'mongoose';
import { ID, InputFile } from 'node-appwrite';
import fs from 'fs';
import path from 'path';
import storage from '../config/appwrite.config.js';
import StorageService from '../services/storageService.js';


const getAllEmployees = async (req, res, next) => {
    try {
        const search = Array.isArray(req.body.search) ? req.body.search : [req.body.search];

        let { limit, skip } = req.body;
        if (!limit || !skip) {
            limit = 50;
            skip = 0;
        }
        if (search.length) {
            const empList = await Employee.aggregate([
                // Match the employees based on search criteria
                {
                    $match: {
                        $or: [
                            { name: { $in: search } },
                            { position: { $in: search } },
                            { email: { $in: search } },
                            { dept_name: { $in: search } }
                        ]
                    }
                },
                // Apply limit and skip for pagination
                { $skip: skip },
                { $limit: limit },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        position: 1,
                        email: 1,
                        dept_name: 1,
                        date_of_joining: 1,
                        phone_number: 1,
                        status: 1,
                    }
                }
            ]);
            return res.status(200).json({
                empList
            });
        } else {
            const empList = await Employee.aggregate([
                { $skip: skip },
                { $limit: limit },
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        position: 1,
                        email: 1,
                        dept_name: 1,
                        date_of_joining: 1,
                        phone_number: 1
                    }
                }

            ]);
            return res.status(200).json({
                empList
            });
        }
    } catch (error) {
        next(new ServerError("Internal Server Error", 501));
    }
}
const getEmployeeById = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new ServerError("Id is missing | Emp id is required", 402));
        }
        const emp = await Employee.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "leaves",
                    localField: "_id",
                    foreignField: "emp_id",
                    as: "leaves"
                }
            },
            {
                $lookup: {
                    from: "bankinfos",
                    localField: "bank_info",
                    foreignField: "_id",
                    as: "bankinfo"
                }
            },
            {
                $lookup: {
                    from: "payrolls",
                    localField: "_id",
                    foreignField: "emp_id",
                    as: "salary_info"
                }
            },
            {
                $unwind: "$salary_info"
            },
            {
                $unwind: "$bankinfo"
            }
        ]);
        if (!emp) {
            return next(new ServerError("Cannot Find Employee", 400));
        }
        res.status(200).json({
            emp
        });
    } catch (error) {
        next(new ServerError("Internal Server Error", 501));
    }
}
const createEmployee = async (req, res, next) => {
    try {
        const { fullname, position, dept, doj, phone, email } = req.body.empinfo;
        const { passNo, passExpDate, dob, maritalStatus } = req.body.personalInfo;
        const { accNo, bankName, panNo, ifscCode } = req.body.bankInfo;
        const { skills } = req.body.skills || [];

        if (!fullname || !position || !dept || !doj || !phone || !email) {
            return next(new ServerError("Missing Emp info params", 400));
        }
        if (!accNo || !bankName || !panNo || !ifscCode) {
            return next(new ServerError("Missing Banking info params", 400));
        }
        if (!passNo || !passExpDate || !dob || !maritalStatus) {
            return next(new ServerError("Missing personal info params", 400));
        }
        const bankInfo = {
            name_of_bank: bankName,
            account_number: accNo,
            pan_no: panNo,
            ifsc_no: ifscCode
        };
        const newBankInfo = await BankInfo.create(bankInfo);
        newBankInfo.save();
        if (!bankInfo) {
            return next(new ServerError("Cannot Save Bank setails", 400));
        }
        let newEmpObj = {
            name: fullname,
            position,
            marital_status: maritalStatus,
            dept_name: dept,
            date_of_joining: doj,
            phone_number: phone,
            email: email,
            passport_no: passNo,
            passport_exp_date: passExpDate,
            dob: dob,
            bank_info: [newBankInfo?._id],
            skills
        };
        if (req.body.experience && req.body.experience.length) {
            let expList = req.body.experience;
            expList.forEach((exp) => {
                if (!exp.company_name || !exp.designation || !exp.from || !exp.to) {
                    return next(new ServerError("Field Mismatch ", 400));
                }
            });
            newEmpObj = {
                ...newEmpObj,
                experience: expList
            }
        }
        const newEmp = await Employee.create(newEmpObj);
        if (!newEmp) {
            return next(new ServerError("Cannot Create employee", 400));
        }
        await newEmp.save();
        res.status(200).json(newEmp);
    } catch (error) {
        next(new ServerError(error.message, 501));
    }
}
const base64ToBuffer = (dataURL) => {
    const base64Data = dataURL.replace(/^data:.+;base64,/, '');
    return Buffer.from(base64Data, 'base64');
};

const updateEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new ServerError("Emp id required", 400));
        }

        const { fullname, position, dept, phone, email, skills, maritalStatus,profile_pic} = req.body.empInfo;
        const { passNo, passExpDate, dob } = req.body.personalInfo;
        const { accountNumber, bankName, panNo, ifscCode } = req.body.bankInfo;
        const { pay_period, pay_status, pay_rate } = req.body.salaryInfo;
        const experience = req.body.experienceInfo || [];
        let documentList = req.body.documentInfo;

        //image uplaod
        if(req.body.image){
            const image = req.body.image;
            const fileBuffer = base64ToBuffer(image);
            const filePath = path.join('./uploads', `${fullname}.jpg`);
            fs.writeFileSync(filePath, fileBuffer);
            const storageService = new StorageService(process.env.APPWRITE_IMG_BUCKET_ID);
            if(profile_pic){
                await storageService.deleteFile(profile_pic.split("/")[7]);
            }
            const uploadResult = await storageService.uploadFile(filePath,`${fullname}.jpg`);
            if(uploadResult){

                req.body.image = `${process.env.APPWRITE_URI}/storage/buckets/${process.env.APPWRITE_IMG_BUCKET_ID}/files/${uploadResult.$id}/view/?project=${process.env.APPWRITE_PROJECT_ID}`;
            }
            fs.unlinkSync(filePath);
        }
        
        //document upload
        if (documentList.length) {
            const updatedDocuments = await Promise.all(documentList.map(async (doc) => {
                if (!doc.document_file || !doc.document_name || !doc.document_url) {
                    throw new Error("Field Mismatch");
                }
    
                const fileBuffer = base64ToBuffer(doc.document_file);
                const filePath = path.join('./uploads', `${doc.document_name}`);
                fs.writeFileSync(filePath, fileBuffer);
    
                const result = await storage.createFile(
                    process.env.APPWRITE_DOC_BUCKET_ID,
                    ID.unique(),
                    InputFile.fromPath(filePath, `${doc.document_name}.pdf`)
                );
    
                // Update the document object
                doc.document_file = result?.$id;
                doc.document_url = result?.$id;
                doc.document_name = result?.name;
    
    
                fs.unlinkSync(filePath);
    
                return doc;
            }));
            documentList = updatedDocuments;
        }
        if (!pay_period || !pay_rate || !pay_status) {
            return next(new ServerError("Salary Info Required", 400));
        }

        await Payroll.updateOne({ emp_id: id }, {
            pay_period,
            status: pay_status,
            pay_rate
        });

        if (!fullname || !position || !dept || !skills || !phone || !email) {
            return next(new ServerError("Missing Emp info params", 400));
        }
        if (!accountNumber || !bankName || !panNo || !ifscCode) {
            return next(new ServerError("Missing Banking info params", 400));
        }
        if (!passNo || !passExpDate || !dob) {
            return next(new ServerError("Missing personal info params", 400));
        }
        const bankInfo = {
            name_of_bank: bankName,
            pan_no: panNo,
            ifsc_no: ifscCode,
            account_number: accountNumber
        };
        const newBankInfo = await BankInfo.create(bankInfo);
        newBankInfo.save();
        if (!bankInfo) {
            return next(new ServerError("Cannot Save Bank setails", 400));
        }
        
        const updateCureentEmp = await Employee.findByIdAndUpdate(id,{
            name:fullname,
            position:position,
            dept_name:dept,
            skills:skills,
            phone:phone,
            email:email,
            bank_info:[newBankInfo._id],
            dob:dob,
            passport_no:passNo,
            passport_exp_date:passExpDate,
            marital_status:maritalStatus,
            experience,
           documents :documentList,
           profile_pic:req.body.image
        });
        if (!updateCureentEmp) {
            return next(new ServerError("Cannot Update Emp", 400));
        }
        res.status(200).json({ success: true, message: "Employee updated successfully",updateCureentEmp });
    } catch (error) {
        console.log(error);
        next(new ServerError("Internal Server Error", 501));
    }
}
const deleteEmployee = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!id) {
            return next(new ServerError("Missing Employee ID", 400));
        }
        const deleteEmp = await Employee.findByIdAndDelete(id);
        if (!deleteEmp) {
            return next(new ServerError("Cannot delete emp", 400));
        }
        res.status(200).json({
            success: true,
            message: "Emp deleted successfully"
        });
    } catch (error) {
        next(new ServerError("Internal Server Error", 501));
    }
}

export {
    createEmployee,
    updateEmployee,
    getAllEmployees,
    getEmployeeById,
    deleteEmployee
}
