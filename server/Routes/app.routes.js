import { Router } from "express";
import { createApplicant, deleteApplicant, getAllApplicant, getApplicantById, updateApplicant } from "../controllers/application.controller.js";

const applicationRoutes = Router();

applicationRoutes.route("/").get(getAllApplicant);
applicationRoutes.route("/:id").get(getApplicantById);
applicationRoutes.route("/new-application").post(createApplicant);
applicationRoutes.route("/update/:id").post(updateApplicant);
applicationRoutes.route("/delete/:id").delete(deleteApplicant);

export default applicationRoutes;