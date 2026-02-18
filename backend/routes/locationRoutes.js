const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  updateLocation,
  getByCode
} = require("../controllers/locationController");

router.post("/update", auth, updateLocation);
router.get("/:code", getByCode);

module.exports = router;
