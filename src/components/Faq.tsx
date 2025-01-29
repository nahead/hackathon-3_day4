"use client"
import React, { useState } from 'react';

const faqData = [
  {
    question: 'How do I create an account?',
    answer: 'To create an account, click on the Sign Up button and fill out the registration form.',
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept Visa, MasterCard, PayPal, and other major payment methods.',
  },
  {
    question: 'How can I reset my password?',
    answer: 'Click on the Forgot Password link on the login page and follow the instructions.',
  },
];

const FAQHelpCenter = () => {
  const [search, setSearch] = useState('');
  const [filteredFAQs, setFilteredFAQs] = useState(faqData);

  const handleSearch = (e: { target: { value: string; }; }) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    setFilteredFAQs(
      faqData.filter((faq) =>
        faq.question.toLowerCase().includes(value) ||
        faq.answer.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="sm:max-w-[390] sm:ml-0 md:max-w-4xl md:mx-auto p-6 bg-gray-50 rounded-lg shadow-md ">
      <h1 className="text-3xl font-bold font-clash text-center mb-6">FAQ and Help Center</h1>

      {/* Searchable FAQ Section */}
      <section className="faq-section mb-8">
        <h2 className="text-2xl font-semibold  font-satoshi mb-4">Frequently Asked Questions</h2>
        <input
          type="text"
          placeholder="Search for answers..."
          value={search}
          onChange={handleSearch}
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="faq-list space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div key={index} className="faq-item p-4 border border-gray-200 rounded-lg bg-white">
              <h3 className="text-lg font-medium text-gray-800">{faq.question}</h3>
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            </div>
          ))}
          {filteredFAQs.length === 0 && (
            <p className="text-gray-500">No FAQs match your search.</p>
          )}
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-section mb-8">
        <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
        <form className="contact-form space-y-4">
          <div className="form-group">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message:</label>
            <textarea
              id="message"
              name="message"
             
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </section>
    </div>
  );
};

export default FAQHelpCenter;