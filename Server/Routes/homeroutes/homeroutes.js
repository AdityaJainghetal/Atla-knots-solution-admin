const router = require("express").Router();
const {
 
  createContent,
  getHomeData,
    updateHomeData,
    deletedContent

} = require("../../controller/Homecontroller/homecontroller");

router.post("/create", createContent);
router.get("/product", getHomeData);
router.delete("/product/:id",deletedContent)
router.put("/updatehome/:id", updateHomeData);

module.exports = router;
