import { useState } from "react";
import { Button } from "@/components/ui/Button";
// import { toast } from "sonner";

export default function PaymentPage({ plan }) {

    const [loading, setLoading] = useState(false); // loading state

    // handle payment
    const handlePayment = async () => {
        setLoading(true); // set loading state

        try {
            // 1️⃣ Create order on backend
            const res = await fetch("http://localhost:5000/api/payment/create-order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // token verify
                },
                body: JSON.stringify({
                    plan: plan.key, // BASIC / PREMIUM // select plan
                }),
            });

            const order = await res.json(); // order success response
            if (!res.ok) throw new Error(order.message); // if no response then error

            // 2️⃣ Open Razorpay
            openRazorpay(order); // open razorpay page
        } catch (err) {
            //   toast.error(err.message);
            console.log("error here")
            setLoading(false);
        }
    };

    // razorpay functionality
    const openRazorpay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID, // id
            amount: order.amount, // amount
            currency: "INR", // currency type
            name: "Agreement Checker", // project name
            description: "Subscription Payment", // payment description
            order_id: order.orderId, // order id

            handler: async function (response) {
                // 3️⃣ Verify payment
                await verifyPayment(response); // verify payment
            },

            prefill: {
                email: order.email, // order email
            },

            theme: { color: "#2563eb" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoading(false);
    };

    const verifyPayment = async (paymentData) => {
        const res = await fetch("http://localhost:5000/api/payment/verify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(paymentData),
        });

        const data = await res.json();

        if (data.success) {
            window.location.href = "/payment/success";
        } else {
            //   toast.error("Payment verification failed");
            console.log("Payment verification failed");
        }
    };

    return (
        <Button onClick={handlePayment} disabled={loading}>
            {loading ? "Processing..." : "Proceed to Payment"}
        </Button>
    );
}