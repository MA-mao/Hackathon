import React, { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I create a resume?",
      answer: "Go to 'Create Resume' page, fill in your personal details, education, experience, and skills. Then click 'Download PDF' to get your resume."
    },
    {
      question: "Is this resume builder free?",
      answer: "Yes, our resume builder is completely free with no hidden charges. You can create and download unlimited resumes."
    },
    {
      question: "Can I edit my resume after saving?",
      answer: "Currently, you need to create a new resume. We're working on an edit feature that will be available soon."
    },
    {
      question: "Are the templates ATS-friendly?",
      answer: "Yes, all our templates are designed to be ATS (Applicant Tracking System) friendly to ensure your resume gets noticed by recruiters."
    },
    {
      question: "What format will my resume be in?",
      answer: "Your resume will be downloaded as a PDF file, which is the standard format accepted by most companies."
    },
    {
      question: "Do I need to create an account?",
      answer: "No, you can create and download resumes without an account. However, creating an account allows you to save and access your resumes later."
    },
    {
      question: "Can I use my resume for multiple job applications?",
      answer: "Yes, you can use the same resume or customize it for different job applications by editing the content."
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we use Firebase for secure data storage and never share your personal information with third parties."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about our resume builder
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-blue-300 transition"
            >
              <button
                className="w-full p-6 text-left flex justify-between items-center bg-white hover:bg-gray-50"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                <span className="text-blue-600 text-xl">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              
              {openIndex === index && (
                <div className="p-6 pt-0">
                  <div className="pl-6 border-l-4 border-blue-500">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Please contact our support team.
          </p>
          <a 
            href="mailto:support@resumebuilder.com"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}