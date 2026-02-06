const User = require("../model/User");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendMail } = require("../services/mail.service.js");
// register controller
exports.register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body; // find request to body like -email,password,fullname

        // check email, password and fullname
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "Email already registered" });
        }

        // Create new user
        const user = await User.create({ fullName, email, password });

        // send response to frontend these details
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id, // user id
                fullName: user.fullName, // user name
                email: user.email, // user email
            },
        });
    }
    // check if error
    catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// login controller
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body; // request data of email and password from frontend or server when user hit api

        // check for missing fields
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find user by email
        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // 🔐 CREATE JWT TOKEN
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        console.log(token);

        // ✅ SEND TOKEN + USER to frontend
        res.status(200).json({
            success: true,
            message: "Login successful",
            token,
            user: {
                id: user._id, // user id
                fullName: user.fullName, // user name
                email: user.email, // user email
            },
        });
    }
    // if error
    catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

// forgot password
exports.forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ message: "Email is required" });

        const findUser = await User.findOne({ email });
        if (!findUser) return res.status(404).json({ message: "User not found" });

        const resetToken = crypto.randomBytes(32).toString('hex');
        // hash token before saving
        const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

        findUser.resetPasswordToken = hashedToken;
        findUser.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

        await findUser.save();

        // 🔗 reset link
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        console.log(resetUrl);

        await sendMail({
            to: findUser.email,
            subject: "Password Reset Request",
            html: `
        <p>You requested a password reset.</p>
        <p>
          <a href="${resetUrl}" target="_blank" rel="noopener noreferrer">
            Reset Password
          </a>
        </p>
        <p>This link will expire in 10 minutes.</p>
    `
        });

        // for now return success
        res.status(200).json({
            success: true,
            message: "Reset link sent to your email"
        });
    }
    catch (err) {
        console.error("Forgot password error:", err);
        res.status(500).json({ message: "Server error" });
    }
}

// reset password
exports.resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const { token } = req.params;

    console.log("TOKEN:", token, "NEW PASSWORD:", newPassword);

    // password missing
    if (!newPassword) {
      return res.status(400).json({ message: "Password is required" });
    }

    // hash token
    const hashedToken = crypto
      .createHash("sha256")
      .update(token)       // ✅ string only
      .digest("hex");

    // find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid or expired token" });
    }

    // set new password
    user.password = newPassword;

    // clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save(); // password auto-hash via pre-save hook

    res.status(200).json({ message: "Password reset successful" });

  } catch (err) {
    console.error("RESET PASSWORD ERROR:", err);
    res.status(500).json({ message: "Server error" });
  }
};
