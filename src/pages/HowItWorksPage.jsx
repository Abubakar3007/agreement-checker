import { Upload, ScanText, Brain, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/Button";

export const HowItWorksPage = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="px-6 py-20 text-center bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
          How Agreement Checker AI Works
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-lg text-gray-600">
          From upload to clear insights — understand your agreement
          in just a few simple steps.
        </p>
      </section>

      {/* Steps */}
      <section className="px-6 py-16">
        <div className="max-w-5xl mx-auto space-y-16">

          {/* Step 1 */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <Upload className="w-20 h-20 text-blue-600 mx-auto" />
            <div>
              <h2 className="text-2xl font-bold">Step 1: Upload Your Document</h2>
              <p className="mt-4 text-gray-600">
                Upload your agreement as a PDF or image file.
                Supported documents include loan agreements,
                rental contracts, and job offer letters.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid items-center gap-8 md:grid-cols-2 md:flex-row-reverse">
            <ScanText className="w-20 h-20 text-blue-600 mx-auto" />
            <div>
              <h2 className="text-2xl font-bold">Step 2: OCR Text Extraction</h2>
              <p className="mt-4 text-gray-600">
                Our OCR engine scans the document and accurately
                extracts readable text, even from scanned PDFs or images.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid items-center gap-8 md:grid-cols-2">
            <Brain className="w-20 h-20 text-blue-600 mx-auto" />
            <div>
              <h2 className="text-2xl font-bold">Step 3: AI Analysis</h2>
              <p className="mt-4 text-gray-600">
                AI analyzes clauses, identifies risks, penalties,
                obligations, and important conditions.
                Complex legal language is simplified.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div className="grid items-center gap-8 md:grid-cols-2 md:flex-row-reverse">
            <FileCheck className="w-20 h-20 text-blue-600 mx-auto" />
            <div>
              <h2 className="text-2xl font-bold">Step 4: Clear Results</h2>
              <p className="mt-4 text-gray-600">
                You receive a simple summary with highlighted risks,
                important clauses, and practical explanations —
                all in easy language.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-16 text-center bg-gray-50">
        <h2 className="text-3xl font-bold">See it in action</h2>
        <p className="mt-4 text-gray-600">
          Upload your document and understand it before signing.
        </p>
        <Link to="/upload">
          <Button size="lg" className="mt-6">
            Upload Document
          </Button>
        </Link>
      </section>

    </div>
  );
};