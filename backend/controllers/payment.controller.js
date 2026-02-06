const Razorpay = require("razorpay");
const crypto = require("crypto");
const User = require("../model/User");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_SECRET,
});

const PLANS = {
    BASIC: 199,
    PREMIUM: 499,
};

exports.createOrder = async (req, res) => {
    const { plan } = req.body;

    const amount = PLANS[plan];
    if (!amount) {
        return res.status(400).json({ message: "Invalid plan" });
    }

    const order = await razorpay.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
    });

    res.json({
        orderId: order.id,
        amount: order.amount,
        email: req.user.email,
    });
};

exports.verifyPayment = async (req, res) => {
    const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RAZORPAY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ success: false });
    }

    // ✅ Payment verified → upgrade user
    await User.findByIdAndUpdate(req.user.id, {
        plan: "BASIC", // or PREMIUM (store from order table ideally)
        planActivatedAt: new Date(),
    });

    res.json({ success: true });
};
