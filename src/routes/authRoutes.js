const express = require("express");
const {
  login,
  register,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const router = express.Router();
router.get("/me", protect, (req, res) => {
  res.json(req.user);
});

router.delete("/admin-test", protect, adminOnly, (req, res) => {
  res.json({ message: "Admin route working" });
});
router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);


module.exports = router;
