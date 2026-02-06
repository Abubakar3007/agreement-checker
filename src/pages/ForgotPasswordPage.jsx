import { useState } from "react";
import { Link } from "react-router-dom";
import { FileCheck, Mail, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const { forgotPassword } = useAuth();

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setLoading(true);
    
    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center mb-6 space-x-2">
            <FileCheck className="w-10 h-10 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">Agreement Checker AI</span>
          </Link>

          <h1 className="mb-2 text-3xl font-bold text-gray-900">Reset Password</h1>
          <p className="text-gray-600">Enter your email and we&apos;ll send you a link to reset your password</p>
        </div>

        <Card>
          {success ? (
            <div className="py-4 text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-gray-900">Check Your Email</h2>
              <p className="mb-6 text-gray-600">We&apos;ve sent a password reset link to <strong>{email}</strong></p>

              <Link to="/login">
                <Button variant="outline" fullWidth>Back to Login</Button>
              </Link>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
                <div className="relative">
                  {/* mail icon */}
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  {/* mail input */}
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <Button type="submit" size="lg" fullWidth disabled={loading}>
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>

              <Link
                to="/login"
                className="flex items-center justify-center text-sm text-blue-600 hover:underline"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Login
              </Link>
            </form>
          )}
        </Card>

        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-600 hover:text-gray-900">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};