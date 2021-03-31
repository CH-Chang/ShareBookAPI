var express = require('express');
var router = express.Router();

const searchController = require("../../controllers/web/searchController");


router.get("/getSuggestion", searchController.getSuggestion);
router.get("/getCondition", searchController.getCondition);
router.get("/search", searchController.search);

module.exports = router;
