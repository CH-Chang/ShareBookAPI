var express = require('express');
var router = express.Router();

const memberController = require("../../controllers/web/memberController");

const authMiddleware = require("../../middleware/web/authMiddleware")


router.post("/login", memberController.login);
router.post("/register", memberController.register);
router.post("/schoolVerify", [authMiddleware], memberController.schoolVerify);
router.post("/editInformation", [authMiddleware], memberController.editInformation);
router.post("/getRegisterValidateCode", memberController.getRegisterValidateCode);
router.post("/getSchoolVerifyValidateCode", [authMiddleware], memberController.getSchoolVerifyValidateCode);
router.post("/getEditInformationValidateCode", [authMiddleware], memberController.getEditInformationValidateCode);

router.get("/getRegisterFormData", memberController.getRegisterFormData);
router.get("/getEditInformationFormData", memberController.getEditInformationFormData);
router.get("/getEditSchoolFormData", memberController.getEditSchoolFormData);

module.exports = router;
