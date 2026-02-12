const router = require("express").Router();
const {
 
  createContent,
  getHomeData,
    updateHomeData

} = require("../../controller/Homecontroller/homecontroller");

router.post("/create", createContent);
router.get("/product", getHomeData);
router.put("/updatehome/:id", updateHomeData);

module.exports = router;
