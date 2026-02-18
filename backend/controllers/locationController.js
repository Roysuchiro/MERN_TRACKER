const User = require("../models/User");

// Update Location
exports.updateLocation = async (req, res) => {
  try {
    const { lat, lng } = req.body;

    await User.findByIdAndUpdate(req.user.id, {
      location: { lat, lng }
    });

    res.json({ msg: "Location updated" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Find User By Code
exports.getByCode = async (req, res) => {
  try {
    const user = await User.findOne({
      uniqueCode: req.params.code
    }).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).send("Server error");
  }
};
