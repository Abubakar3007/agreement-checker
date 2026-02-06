import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FileCheck, Lock, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";

export const ResetPasswordPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
 const { token } = useParams();
console.log("RESET TOKEN:", token);


  const { resetPassword } = useAuth();

  const handleReset = async (e) => {
    e.preventDefault();
    console.log("RESET PASSWORD:", newPassword);
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);

    try {
      await resetPassword(token, newPassword);
      setSuccess(true);
    } catch (err) {
      setError("Failed to reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-b from-blue-50 to-white">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-center mb-6 space-x-2">
            <FileCheck className="w-10 h-10 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">
              Agreement Checker AI
            </span>
          </Link>

          <h1 className="mb-2 text-3xl font-bold text-gray-900">
            Create New Password
          </h1>
          <p className="text-gray-600">
            Choose a strong password to secure your account
          </p>
        </div>

        <Card>
          {success ? (
            <div className="py-6 text-center">
              <h2 className="mb-2 text-xl font-semibold text-gray-900">
                Password Reset Successful 🎉
              </h2>
              <p className="mb-6 text-gray-600">
                You can now log in with your new password
              </p>
              <Link to="/login">
                <Button fullWidth>Go to Login</Button>
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-6">
              {error && (
                <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              )}

              {/* New Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  New Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter new password"
                    required
                  />
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Confirm new password"
                    required
                  />
                </div>
              </div>

              <Button type="submit" size="lg" fullWidth disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
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
      </div>
    </div>
  );
};