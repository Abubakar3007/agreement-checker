import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Send, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useState } from "react";
// import { toast } from "sonner";

export const ContactPage = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });


    const handleSubmit = async (e) => {

        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("http://localhost:5000/api/form/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data?.error || "Something went wrong");
            }

            console.log("Message sent successfully!");
            setIsSubmitted(true);
            setFormData({ name: "", email: "", subject: "", message: "" });

            setTimeout(() => setIsSubmitted(false), 5000);
        } catch (error) {
            console.log("Failed to send message");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <Link
                    to="/"
                    className="inline-flex items-center mb-8 text-blue-600 hover:text-blue-700"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Link>

                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">
                        Contact Us
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl text-gray-600">
                        Have questions or need help? We’re here to support you.
                    </p>
                </div>

                <div className="grid gap-8 mb-12 lg:grid-cols-3">
                    <Card className="text-center">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                            <Mail className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            Email Support
                        </h3>
                        <a
                            href="mailto:support@agreementchecker.ai"
                            className="text-blue-600 hover:text-blue-700"
                        >
                            support@agreementchecker.ai
                        </a>
                    </Card>

                    <Card className="text-center">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                            <Phone className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            Phone Support
                        </h3>
                        <a
                            href="tel:+911234567890"
                            className="text-blue-600 hover:text-blue-700"
                        >
                            +91 123 456 7890
                        </a>
                    </Card>

                    <Card className="text-center">
                        <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-yellow-100 rounded-full">
                            <MapPin className="w-8 h-8 text-yellow-600" />
                        </div>
                        <h3 className="mb-2 text-lg font-semibold text-gray-900">
                            Office Address
                        </h3>
                        <p className="text-gray-600">
                            Mumbai, Maharashtra <br />
                            India
                        </p>
                    </Card>
                </div>

                <Card className="max-w-3xl mx-auto">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">
                        Send Us a Message
                    </h2>

                    {isSubmitted && (
                        <div className="p-4 mb-6 text-green-800 border border-green-200 rounded-lg bg-green-50">
                            Your message has been sent successfully. We’ll get back to you soon.
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {["name", "email", "subject"].map((field) => (
                            <div key={field}>
                                <label className="block mb-2 text-sm font-medium text-gray-700 capitalize">
                                    {field === "email" ? "Email Address" : field}
                                </label>
                                <input
                                    type={field === "email" ? "email" : "text"}
                                    value={formData[field]}
                                    name={field}
                                    onChange={(e) =>
                                        setFormData({ ...formData, [field]: e.target.value })
                                    }
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        ))}

                        <div>
                            <label className="block mb-2 text-sm font-medium text-gray-700">
                                Message
                            </label>
                            <textarea
                                rows={6}
                                value={formData.message}
                                name="message"
                                onChange={(e) =>
                                    setFormData({ ...formData, message: e.target.value })
                                }
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <Button type="submit" disabled={loading} className="w-full" size="lg">
                            {loading ? (
                                <span className="flex items-center justify-center">
                                    <span className="mr-2 animate-spin">⏳</span>
                                    Sending...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center">
                                    <Send className="w-5 h-5 mr-2" />
                                    Send Message
                                </span>
                            )}
                        </Button>
                    </form>
                </Card>

                <div className="mt-12 text-center">
                    <p className="mb-4 text-gray-600">Business Hours</p>
                    <p className="font-medium text-gray-900">
                        Monday – Friday, 10:00 AM – 6:00 PM
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                        We usually respond within 24 business hours.
                    </p>
                </div>
            </div>
        </div>
    );
};
