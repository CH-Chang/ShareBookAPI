var express = require('express');
var router = express.Router();

const promoteController = require("../../controllers/web/promoteController");


router.get("/getCarousel", promoteController.getCarousel);
router.get("/getSuggestion", promoteController.getSuggestion);
router.get("/getOfficialSuggestion", promoteController.getOfficialSuggestion);
router.get("/getHotRank", promoteController.getHotRank);
router.get("/getShopbackSuggestion", promoteController.getShopbackSuggestion);

module.exports = router;
