import { Link } from 'react-router-dom';
import { FileCheck, ArrowLeft, AlertTriangle } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const DisclaimerPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link to="/" className="flex items-center space-x-2">
            <FileCheck className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">Agreement Checker AI</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <div className="bg-yellow-50 border-2 border-yellow-300 rounded-xl p-6 mb-6">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0" />
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">Important Notice</h2>
              <p className="text-gray-700">
                Please read this disclaimer carefully before using Agreement Checker AI.
                This service provides informational analysis only and is not a substitute for
                professional legal advice.
              </p>
            </div>
          </div>
        </div>

        <Card>
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Disclaimer</h1>
          <p className="text-sm text-gray-500 mb-8">Last updated: January 2024</p>

          <div className="prose prose-blue max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Not Legal Advice</h2>
              <p className="text-gray-700">
                Agreement Checker AI is an informational tool only. The analysis, summaries, and
                recommendations provided by our service do not constitute legal advice. We are not
                a law firm and do not provide legal services. You should not rely on our analysis
                as a substitute for professional legal counsel.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">For Awareness Purposes Only</h2>
              <p className="text-gray-700">
                Our service is designed to help you understand documents better by highlighting
                potential areas of concern in simple language. The analysis is meant to raise
                awareness and should not be considered comprehensive legal review.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Consult a Lawyer</h2>
              <p className="text-gray-700">
                For any legal matters, including but not limited to signing contracts, loan agreements,
                rental agreements, or employment offers, you should consult a qualified lawyer who is
                licensed to practice in your jurisdiction. Legal matters are complex and require
                professional expertise.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">No Guarantee of Accuracy</h2>
              <p className="text-gray-700">
                While we strive to provide accurate analysis, we do not guarantee the completeness,
                accuracy, or reliability of any analysis provided. AI technology has limitations and
                may miss important details or misinterpret certain clauses.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Your Responsibility</h2>
              <p className="text-gray-700">
                You are solely responsible for any decisions you make regarding documents and agreements.
                Agreement Checker AI and its operators are not responsible for any consequences arising
                from your use of our analysis or your decision to sign or not sign any document.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Limitation of Liability</h2>
              <p className="text-gray-700">
                To the maximum extent permitted by law, Agreement Checker AI and its operators shall
                not be liable for any direct, indirect, incidental, consequential, or punitive damages
                arising from your use of our service or reliance on our analysis.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Service Limitations</h2>
              <p className="text-gray-700 mb-2">Our service has the following limitations:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Analysis is automated and may not catch all important details</li>
                <li>Context and specific circumstances are not fully considered</li>
                <li>Local laws and regulations are not specifically analyzed</li>
                <li>Complex legal terminology may be simplified</li>
                <li>Industry-specific terms may be misinterpreted</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">No Attorney-Client Relationship</h2>
              <p className="text-gray-700">
                Use of Agreement Checker AI does not create an attorney-client relationship. We are
                not your lawyers and you are not our clients. Any information you provide or analysis
                you receive is not privileged or confidential in a legal sense.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Jurisdictional Limitations</h2>
              <p className="text-gray-700">
                Laws vary significantly by jurisdiction. Our analysis does not take into account
                specific laws applicable to your location or situation. What may be standard in one
                jurisdiction may be unusual or unenforceable in another.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Use at Your Own Risk</h2>
              <p className="text-gray-700">
                You acknowledge that you use Agreement Checker AI at your own risk. By using our
                service, you agree that you understand these limitations and will not hold us liable
                for any outcomes resulting from your use of our analysis.
              </p>
            </section>

            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mt-8">
              <h3 className="font-semibold text-gray-900 mb-2">Questions?</h3>
              <p className="text-gray-700">
                If you have questions about this disclaimer or need clarification about our service,
                please contact us through our support channels before using the service.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
