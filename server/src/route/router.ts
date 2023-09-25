import express from "express";
import dashbaordController from "../controller/dashboard.js";
import d1 from "../dao/dailyData.js"
import uploadController from "../controller/upload.js";
import multer from "multer";
import { login } from "../controller/login.js";

const router = express.Router();

// dashboard
router.get("/getList", dashbaordController.getList);
router.get("/getBrand", dashbaordController.getBrand);
router.get("/getBrand1", dashbaordController.getBrand1);
router.get("/getBrand2", dashbaordController.getBrand2);
router.get("/deleteAll", dashbaordController.deleteAll);
router.get("/getRecord",dashbaordController.getRecord);
router.get("/getKeyword",dashbaordController.getKeyword);
router.post('/login',login)

//upload
router.post(
  "/upload",
  multer().single("file"),
  uploadController.uploadXlsx
);


export default router;
