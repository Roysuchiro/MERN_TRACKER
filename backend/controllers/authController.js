const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate Unique Code
function generateCode() {
  return "TRK-" + Math.random().toString(36).substr(2, 6).toUpperCase();
}

// Register
exports.register = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    let user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = new User({
      name,
      username,
      password: hash,
      uniqueCode: generateCode()
    });

    await user.save();

    res.json({ msg: "Registration successful" });
  } catch (err) {
    res.status(500).send("Server error");
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
      (err, token) => {
        if (err) throw err;

        res.json({
          token,
          name: user.name,
          code: user.uniqueCode,
          id: user._id
        });
      }
    );
  } catch (err) {
    res.status(500).send("Server error");
  }
};
