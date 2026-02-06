import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Card } from '../components/ui/Card';

export const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl px-4 py-12 mx-auto sm:px-6 lg:px-8">
        
        <Link to="/" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-700">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card>
          <h1 className="mb-6 text-3xl font-bold text-gray-900">Privacy Policy</h1>
          <p className="mb-8 text-sm text-gray-500">Last updated: January 2024</p>

          <div className="space-y-6 prose prose-blue max-w-none">
            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">1. Information We Collect</h2>
              <p className="mb-2 text-gray-700">We collect the following types of information:</p>
              <ul className="pl-6 space-y-2 text-gray-700 list-disc">
                <li>Account information (email address)</li>
                <li>Uploaded documents for analysis purposes</li>
                <li>Usage data and analytics</li>
                <li>Technical information (IP address, browser type)</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">2. How We Use Your Information</h2>
              <p className="mb-2 text-gray-700">Your information is used to:</p>
              <ul className="pl-6 space-y-2 text-gray-700 list-disc">
                <li>Provide document analysis services</li>
                <li>Maintain and improve our service</li>
                <li>Communicate with you about your account</li>
                <li>Ensure service security and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">3. Data Storage and Security</h2>
              <p className="text-gray-700">
                We store your data securely using industry-standard encryption and security practices.
                Your uploaded documents are processed and stored on secure servers. We implement
                appropriate technical and organizational measures to protect your personal information.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">4. Data Sharing</h2>
              <p className="text-gray-700">
                We do not sell your personal information. We may share your information only in the
                following circumstances:
              </p>
              <ul className="pl-6 space-y-2 text-gray-700 list-disc">
                <li>With your explicit consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and property</li>
                <li>With service providers who assist in operating our service</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">5. Your Rights</h2>
              <p className="mb-2 text-gray-700">You have the right to:</p>
              <ul className="pl-6 space-y-2 text-gray-700 list-disc">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Object to processing of your information</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">6. Document Retention</h2>
              <p className="text-gray-700">
                Uploaded documents and analysis results are retained until you choose to delete them
                or close your account. You can delete individual documents at any time from your dashboard.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">7. Cookies and Tracking</h2>
              <p className="text-gray-700">
                We use cookies and similar technologies to improve your experience, analyze usage,
                and maintain session security. You can control cookie preferences through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">8. Children's Privacy</h2>
              <p className="text-gray-700">
                Our service is not intended for users under 18 years of age. We do not knowingly
                collect information from children.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">9. Changes to Privacy Policy</h2>
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of significant
                changes by email or through our service.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-xl font-semibold text-gray-900">10. Contact Us</h2>
              <p className="text-gray-700">
                If you have questions about this Privacy Policy or want to exercise your rights,
                please contact us through our support channels.
              </p>
            </section>
          </div>
        </Card>
      </div>
    </div>
  );
};
