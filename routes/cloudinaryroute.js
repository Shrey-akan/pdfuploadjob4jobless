const router=require("express").Router();
const cloudinary= require("../controller/cloudinary");

router.post("/uploadpdf",cloudinary.cloudinaryset);
router.post("/deletepdf",cloudinary.deleteimage);
router.post("/updatepdf",cloudinary.updateimage);
router.get("/getpdf/:uid",cloudinary.getImage);
module.exports = router