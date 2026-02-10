const router = require("express").Router();
const {
 
  homeController,
  getHomeData,
    updateHomeData

} = require("../../controller/Homecontroller/homecontroller.js");

router.post("/homepost", homeController);
router.get("/gethome", getHomeData);
router.put("/updatehome/:id", updateHomeData);

module.exports = router;
