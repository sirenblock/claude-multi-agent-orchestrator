/**
 * @module FAQ
 * @description FAQ section with accordion-style questions, search, filtering, and structured data
 *
 * Features:
 * - 16 comprehensive FAQs addressing common objections
 * - Search functionality to filter questions
 * - Category-based filtering
 * - Accordion interface with smooth animations
 * - FAQPage structured data for SEO
 * - Conversion-focused copy
 *
 * @example
 * <FAQ />
 */

'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: "How does the 1-to-1 video personalization actually work?",
    answer: "Our AI technology analyzes your script and creates unlimited personalized videos by dynamically inserting prospect-specific information (name, company, pain points) into your recorded message. You record once, and our AI generates thousands of unique videos - each one appearing as if you recorded it individually for that prospect.",
    category: "Product"
  },
  {
    question: "What's the difference between this and traditional video tools like Loom or Vidyard?",
    answer: "Traditional tools require you to record a separate video for each prospect - which is impossible at scale. Our platform lets you record ONE video template, and we automatically personalize it for every prospect. It's the difference between spending 10 hours recording 100 videos versus 10 minutes creating 100 personalized videos.",
    category: "Product"
  },
  {
    question: "How long does it take to set up my first campaign?",
    answer: "Most users create their first personalized video campaign in under 15 minutes. Simply: 1) Record your video template (3-5 minutes), 2) Upload your prospect list (1 minute), 3) Map personalization fields (2 minutes), 4) Generate videos (automated). Our guided onboarding walks you through each step.",
    category: "Getting Started"
  },
  {
    question: "Do I need any technical skills or video editing experience?",
    answer: "No technical or video editing skills required. If you can record a video on your phone and upload a CSV file, you can use our platform. Our interface is designed for sales teams, not video producers. We handle all the technical complexity behind the scenes.",
    category: "Getting Started"
  },
  {
    question: "What kind of results can I expect?",
    answer: "Our customers typically see 3-5x higher email open rates, 8-12x higher click-through rates, and 40-60% increase in booked meetings compared to text-only outreach. Some customers report response rates as high as 35% on cold outreach campaigns. Results vary by industry, targeting, and message quality.",
    category: "Results"
  },
  {
    question: "How much does it cost compared to hiring SDRs to do this manually?",
    answer: "Our platform costs a fraction of one SDR salary while delivering personalization at scale that would be impossible manually. For the cost of $299-999/month, you get unlimited video generation capability that would require a team of 5-10 SDRs working full-time to replicate. Most customers achieve ROI within the first month.",
    category: "Pricing"
  },
  {
    question: "Is there a free trial? What's your refund policy?",
    answer: "Yes! We offer a 14-day free trial with full access to all features - no credit card required. If you upgrade to a paid plan, we offer a 30-day money-back guarantee. If you're not satisfied for any reason within 30 days, we'll refund your payment, no questions asked.",
    category: "Pricing"
  },
  {
    question: "What integrations do you support?",
    answer: "We integrate with all major sales and marketing tools including Salesforce, HubSpot, Outreach, SalesLoft, Apollo, LinkedIn Sales Navigator, and more. You can also use our API or Zapier integration to connect with any other tools in your stack. Videos can be embedded in emails, landing pages, or shared via link.",
    category: "Integrations"
  },
  {
    question: "How realistic do the personalized videos look? Can prospects tell it's automated?",
    answer: "Our AI technology creates seamless personalization that looks and sounds completely natural. Prospects consistently report they thought the video was recorded specifically for them. The key is our advanced lip-sync and voice cloning technology that matches your natural speaking patterns perfectly.",
    category: "Product"
  },
  {
    question: "Is my data secure? Are you compliant with GDPR and other privacy regulations?",
    answer: "Yes, we take security and compliance extremely seriously. We're SOC 2 Type II certified, GDPR compliant, and CCPA compliant. All data is encrypted in transit and at rest. We never share your data with third parties, and you maintain full ownership of all your videos and prospect data.",
    category: "Security"
  },
  {
    question: "Can I use this for industries with strict compliance requirements (finance, healthcare, etc.)?",
    answer: "Yes, our platform is used by companies in regulated industries including financial services, healthcare, and legal. We offer custom compliance packages, BAA agreements for HIPAA compliance, and dedicated infrastructure options. Contact our enterprise team to discuss your specific compliance requirements.",
    category: "Security"
  },
  {
    question: "What if I don't like how my personalized videos turn out?",
    answer: "You have full control over every aspect of your videos. Preview before sending, regenerate with different personalization parameters, or re-record your template anytime. Our team provides personalized coaching to help optimize your video scripts and delivery. Plus, our 30-day money-back guarantee means you can try risk-free.",
    category: "Results"
  },
  {
    question: "How many videos can I create per month?",
    answer: "Video generation limits depend on your plan: Starter (500 videos/month), Professional (2,500 videos/month), Enterprise (unlimited). Most customers find the Professional plan more than sufficient. You can upgrade or downgrade anytime, and unused videos don't roll over.",
    category: "Pricing"
  },
  {
    question: "Can I personalize videos in languages other than English?",
    answer: "Yes! We support video personalization in 25+ languages including Spanish, French, German, Portuguese, Mandarin, Japanese, and more. Our AI handles pronunciation and lip-sync for each language naturally. You can even create multi-language campaigns from a single template.",
    category: "Product"
  },
  {
    question: "What kind of support do you offer?",
    answer: "All plans include email support with 24-hour response time. Professional and Enterprise plans include dedicated customer success manager, live chat support, and onboarding assistance. Enterprise customers get priority support with 2-hour SLA and optional dedicated Slack channel.",
    category: "Support"
  },
  {
    question: "How do you compare to competitors like BombBomb or Vidyard GoVideo?",
    answer: "Unlike BombBomb or Vidyard which require recording each video individually, we use AI to generate unlimited personalized variations from one recording. This means you can scale to thousands of prospects in minutes instead of hours. We're the only platform offering true 1-to-1 personalization at infinite scale.",
    category: "Product"
  }
];

const categories = ['All', 'Product', 'Getting Started', 'Pricing', 'Results', 'Security', 'Integrations', 'Support'];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFAQs = useMemo(() => {
    return faqs.filter(faq => {
      const matchesSearch =
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || faq.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Structured data for SEO
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section id="faq" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-2 bg-blue-100 rounded-full mb-4">
            <HelpCircle className="w-6 h-6 text-blue-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about personalized video outreach at scale
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-8"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-12 justify-center"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                  : 'bg-white text-gray-600 border border-gray-300 hover:border-blue-600 hover:text-blue-600'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex-1 pr-4">
                      <div className="flex items-start gap-3">
                        <span className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full whitespace-nowrap mt-0.5">
                          {faq.category}
                        </span>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-500 transition-transform flex-shrink-0 ${
                        openIndex === index ? 'transform rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-5 pt-2">
                          <p className="text-gray-600 leading-relaxed pl-0 md:pl-20">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <p className="text-gray-500 text-lg">
                No questions found matching your search. Try different keywords or browse all categories.
              </p>
            </motion.div>
          )}
        </div>

        {/* Still have questions CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Still have questions?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Our team is here to help. Get in touch and we'll answer any questions you have about personalized video outreach.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30"
            >
              Contact Sales
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors border-2 border-blue-600"
            >
              Schedule a Demo
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
