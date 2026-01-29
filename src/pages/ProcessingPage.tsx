import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileCheck } from 'lucide-react';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { analyzeDocument } from '../utils/mockApi';
import type { AnalysisResponse } from '../types';

const processingMessages = [
  'Reading document...',
  'Analyzing content...',
  'Finding risky clauses...',
  'Checking terms and conditions...',
  'Preparing simple summary...',
  'Almost ready...',
];

export const ProcessingPage = () => {
  const [messageIndex, setMessageIndex] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const file = location.state?.file as File | undefined;

  useEffect(() => {
    if (!file) {
      navigate('/upload');
      return;
    }

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % processingMessages.length);
    }, 500);

    const analyzeDoc = async () => {
      try {
        const result: AnalysisResponse = await analyzeDocument(file.name);
        navigate('/result', { state: { result, fileName: file.name } });
      } catch (error) {
        console.error('Analysis failed:', error);
        navigate('/upload');
      }
    };

    analyzeDoc();

    return () => {
      clearInterval(messageInterval);
    };
  }, [file, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-2">
            <FileCheck className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Agreement Checker AI</span>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8">
            <LoadingSpinner size="lg" className="mx-auto w-16 h-16" />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Analyzing Your Document
          </h1>

          <div className="h-8 mb-8">
            <p className="text-lg text-gray-600 animate-pulse">
              {processingMessages[messageIndex]}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Document uploaded</span>
                <span className="text-green-600">✓</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">AI analysis in progress</span>
                <LoadingSpinner size="sm" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Generating report</span>
                <span className="text-gray-400">⋯</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            This usually takes less than 2 minutes. Please don't close this page.
          </p>
        </div>
      </div>
    </div>
  );
};
