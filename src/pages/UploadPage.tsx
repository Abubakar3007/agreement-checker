import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FileCheck, ArrowLeft } from 'lucide-react';
import { FileUploader } from '../components/ui/FileUploader';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

export const UploadPage = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      navigate('/processing', { state: { file: selectedFile } });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <FileCheck className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Agreement Checker AI</span>
            </Link>
            <Link to="/dashboard">
              <Button variant="ghost">My Documents</Button>
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Upload Your Document
          </h1>
          <p className="text-gray-600">
            Upload your agreement, loan paper, rental contract, or job offer letter for instant analysis
          </p>
        </div>

        <Card className="mb-6">
          <FileUploader
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            onClear={handleClearFile}
          />
        </Card>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            size="lg"
            fullWidth
            onClick={handleAnalyze}
            disabled={!selectedFile}
          >
            Analyze Document
          </Button>
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="font-semibold text-gray-900 mb-3">What happens next?</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Our AI will analyze your document in under 2 minutes</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>You'll receive a simple summary with risk highlights</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Get actionable recommendations before signing</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span>Your document is processed securely and never shared</span>
            </li>
          </ul>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            By uploading, you agree to our{' '}
            <Link to="/terms" className="text-blue-600 hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-blue-600 hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
