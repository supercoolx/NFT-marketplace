const express = require('express');
const apiCtrl = require('../controller/apiCtrl.js');
const userCtrl = require('../controller/userCtrl.js');
const router = express.Router();

router.post("/login", userCtrl.login);
router.get("/user/:id", userCtrl.user);
router.post("/user/update", userCtrl.update);

router.post("/save_collection", apiCtrl.saveCollection);
router.post("/collections", apiCtrl.collections);

router.post("/save_item", apiCtrl.saveItem);
router.get("/item", apiCtrl.items);
router.get("/view_item", apiCtrl.viewItem);

router.get("/categories", apiCtrl.getCategories);

// marketplace
router.post("/setNftSelling", apiCtrl.setNftSelling);
router.post("/setNftBuy", apiCtrl.setNftBuy);

module.exports = router;