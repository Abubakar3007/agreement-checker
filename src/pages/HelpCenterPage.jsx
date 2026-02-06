import { Link } from "react-router-dom";
import {
    FileCheck,
    Search,
    HelpCircle,
    FileText,
    Shield,
    CreditCard,
    Users,
    ArrowLeft,
    ChevronDown,
} from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useState } from "react";

export const HelpCenterPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [openFaq, setOpenFaq] = useState(null);

    const categories = [
        { icon: FileText, title: "Getting Started", key: "gettingStarted" },
        { icon: Shield, title: "Security & Privacy", key: "security" },
        { icon: CreditCard, title: "Billing & Payments", key: "billing" },
        { icon: Users, title: "Account & Profile", key: "account" },
    ];

    const faqs = [
        {
            question: "How do I upload a document?",
            answer:
                "You can upload a document from the dashboard by clicking on the Upload button and selecting a file.",
        },
        {
            question: "Which file formats are supported?",
            answer: "We support PDF, JPG, JPEG, PNG, and WEBP formats.",
        },
        {
            question: "How long does document processing take?",
            answer:
                "Most documents are processed within a few seconds depending on size and quality.",
        },
        {
            question: "Is my data secure?",
            answer:
                "Yes, your documents are securely processed and not shared with third parties.",
        },
        {
            question: "How does billing work?",
            answer:
                "Billing is based on your selected plan or document usage.",
        },
        {
            question: "Can I delete my account?",
            answer:
                "Yes, you can delete your account from the account settings page.",
        },
    ];

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
            <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:px-8">
                {/* Back */}
                <Link
                    to="/"
                    className="inline-flex items-center mb-8 text-blue-600 hover:text-blue-700"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Link>

                {/* Header */}
                <div className="mb-12 text-center">
                    <HelpCircle className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">
                        Help Center
                    </h1>
                    <p className="max-w-3xl mx-auto mb-8 text-xl text-gray-600">
                        Find answers to common questions and learn how to use our platform.
                    </p>

                    {/* Search */}
                    <div className="relative max-w-2xl mx-auto">
                        <Search className="absolute w-5 h-5 text-gray-400 -translate-y-1/2 left-4 top-1/2" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search for help..."
                            className="w-full py-4 pl-12 pr-4 text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                </div>

                {/* Categories */}
                <div className="mb-12">
                    <h2 className="mb-6 text-2xl font-bold text-center text-gray-900">
                        Help Categories
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {categories.map((category, index) => (
                            <Card key={index} hover className="text-center">
                                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full">
                                    <category.icon className="w-8 h-8 text-blue-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                    {category.title}
                                </h3>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* FAQ */}
                <div className="max-w-4xl mx-auto mb-12">
                    <h2 className="mb-6 text-2xl font-bold text-gray-900">
                        Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <Card
                                key={index}
                                onClick={() => toggleFaq(index)}
                                className="cursor-pointer select-none"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-lg font-semibold text-gray-900">
                                            {faq.question}
                                        </h3>

                                        {openFaq === index && (
                                            <p className="mt-2 text-gray-600 transition-all duration-300">
                                                {faq.answer}
                                            </p>
                                        )}
                                    </div>

                                    <ChevronDown
                                        className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === index ? "rotate-180" : ""
                                            }`}
                                    />
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>

                {/* Contact */}
                <Card className="max-w-4xl mx-auto border-2 border-blue-200 bg-blue-50">
                    <div className="text-center">
                        <h2 className="mb-4 text-2xl font-bold text-gray-900">
                            Still need help?
                        </h2>
                        <p className="mb-6 text-gray-600">
                            If you couldn’t find what you were looking for, feel free to contact us.
                        </p>
                        <Link to="/contact">
                            <Button size="lg">Contact Support</Button>
                        </Link>
                    </div>
                </Card>
            </div>
        </div>
    );
};
