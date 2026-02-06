import { FileText, Home, Briefcase, Shield } from "lucide-react";

export const UseCasesPage = () => {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="px-6 py-20 text-center bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-4xl font-bold md:text-5xl">
          Use Cases
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-gray-600">
          Agreement Checker AI is designed to help you understand
          different types of agreements clearly.
        </p>
      </section>

      {/* Cards */}
      <section className="px-6 py-16">
        <div className="grid max-w-6xl gap-8 mx-auto md:grid-cols-2 lg:grid-cols-4">

          <div className="p-6 border rounded-xl">
            <FileText className="w-10 h-10 text-blue-600" />
            <h3 className="mt-4 font-semibold">Loan Agreements</h3>
            <p className="mt-2 text-sm text-gray-600">
              Interest rates, penalties, EMIs, foreclosure charges,
              and hidden conditions explained clearly.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <Home className="w-10 h-10 text-blue-600" />
            <h3 className="mt-4 font-semibold">Rental Agreements</h3>
            <p className="mt-2 text-sm text-gray-600">
              Security deposit, notice period, maintenance,
              termination rules, and tenant responsibilities.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <Briefcase className="w-10 h-10 text-blue-600" />
            <h3 className="mt-4 font-semibold">Job Offer Letters</h3>
            <p className="mt-2 text-sm text-gray-600">
              Salary breakup, bonds, notice period,
              non-compete clauses, and exit conditions.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <Shield className="w-10 h-10 text-blue-600" />
            <h3 className="mt-4 font-semibold">Other Documents</h3>
            <p className="mt-2 text-sm text-gray-600">
              Insurance policies, bonds, service contracts —
              more document types coming soon.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};