const express = require("express");
const { register, login } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin, isVendor, isUser } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/register", register); // Admin or other users can register
router.post("/login", login);

// Example of protected routes:
router.get("/admin-dashboard", protect, isAdmin, (req, res) => {
  res.status(200).json({ message: "Welcome to the Admin Dashboard" });
});

router.get("/vendor-dashboard", protect, isVendor, (req, res) => {
  res.status(200).json({ message: "Welcome to the Vendor Dashboard" });
});

router.get("/user-profile", protect, isUser, (req, res) => {
  res.status(200).json({ message: "Welcome to your profile" });
});

module.exports = router;
