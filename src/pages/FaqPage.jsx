export const Faq = () => {
  const faqs = [
    {
      q: "Is Agreement Checker AI free to use?",
      a: "Yes, basic document analysis is free. Advanced features may be added later."
    },
    {
      q: "Is this legal advice?",
      a: "No. This tool provides informational insights only. Always consult a lawyer for legal advice."
    },
    {
      q: "Are my documents safe?",
      a: "Yes. Uploaded documents are processed securely and are not shared with anyone."
    },
    {
      q: "What file formats are supported?",
      a: "PDF, JPG, PNG, and other image formats are supported."
    },
    {
      q: "How accurate is the AI analysis?",
      a: "The AI is highly accurate for awareness purposes, but results should be reviewed carefully."
    },
    {
      q: "Do I need to sign up?",
      a: "No signup is required for basic usage."
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="px-6 py-20 text-center bg-gradient-to-b from-blue-50 to-white">
        <h1 className="text-4xl font-bold md:text-5xl">
          Frequently Asked Questions
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-gray-600">
          Everything you need to know about Agreement Checker AI.
        </p>
      </section>

      {/* FAQ List */}
      <section className="px-6 py-16">
        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((item, i) => (
            <div key={i} className="p-6 border rounded-xl">
              <h3 className="font-semibold">{item.q}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};