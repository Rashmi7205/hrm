import { Router } from "express";
import { createApplicant, deleteApplicant, getAllApplicant, getApplicantById, updateApplicant } from "../controllers/application.controller.js";
import {upload }from '../middlewares/fileupload.middleware.js';

const applicationRoutes = Router();

applicationRoutes.route("/").get(getAllApplicant);
applicationRoutes.route("/:id").get(getApplicantById);
// applicationRoutes.route("/new-application").post(upload.single('resume'),createApplicant);
applicationRoutes.post("/new-application",upload.single('resume'),createApplicant)
applicationRoutes.route("/update/:id").post(updateApplicant);
applicationRoutes.route("/delete/:id").delete(deleteApplicant);

export default applicationRoutes;