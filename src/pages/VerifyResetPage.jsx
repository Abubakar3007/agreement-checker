import { useState } from "react";
import { Link } from "react-router-dom";
import { FileCheck, ShieldCheck, ArrowLeft } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Card } from "../components/ui/Card";

export const VerifyResetPage = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // 🔗 API call later
      // await verifyResetCode(code);

      console.log("Verifying code:", code);
    } catch (err) {
      setError("Invalid or expired verification code");
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

          <h1 className="mb-2 text-3xl font-bold text-gray-900">Verify Your Email</h1>
          <p className="text-gray-600">Enter the verification code sent to your email</p>
        </div>

        <Card>
          <form onSubmit={handleVerify} className="space-y-6">
            {/* if error when we submitting email */}
            {error && (
              <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Code */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Verification Code</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <ShieldCheck className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter 6-digit code"
                  required
                />
              </div>
            </div>

            <Button type="submit" size="lg" fullWidth disabled={loading}>
              {loading ? "Verifying..." : "Verify Code"}
            </Button>

            <Link
              to="/forgot-password"
              className="flex items-center justify-center text-sm text-blue-600 hover:underline"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Link>
          </form>
        </Card>
      </div>
    </div>
  );
};