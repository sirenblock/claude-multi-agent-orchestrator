/**
 * @module SocialProof
 * @description Social proof section with customer logos, testimonials, and stats
 *
 * Features:
 * - Customer logos grid (10+ placeholder companies)
 * - User testimonials with photos, names, and companies
 * - Key statistics (transcriptions, accuracy, customers)
 * - Trust indicators and social validation
 *
 * @example
 * <SocialProof />
 */

'use client';

export default function SocialProof() {
  const companyLogos = [
    { name: 'TechCorp', industry: 'Technology' },
    { name: 'MediaFlow', industry: 'Media' },
    { name: 'EduLearn', industry: 'Education' },
    { name: 'HealthPlus', industry: 'Healthcare' },
    { name: 'FinServe', industry: 'Finance' },
    { name: 'LegalTech', industry: 'Legal' },
    { name: 'PodcastPro', industry: 'Media' },
    { name: 'ResearchLab', industry: 'Research' },
    { name: 'CallCenter+', industry: 'Support' },
    { name: 'VideoStream', industry: 'Entertainment' },
    { name: 'TranscribeCo', industry: 'Services' },
    { name: 'AIVentures', industry: 'Technology' },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'CTO',
      company: 'PodcastPro',
      image: '/avatars/avatar-1.jpg',
      content: "WhisperAPI cut our transcription costs by 75% while maintaining exceptional accuracy. The API integration took less than an hour. It's been a game-changer for our podcast platform.",
      rating: 5,
    },
    {
      id: 2,
      name: 'Marcus Johnson',
      role: 'Lead Developer',
      company: 'MediaFlow',
      image: '/avatars/avatar-2.jpg',
      content: "The speed is incredible. We process 10,000+ hours of audio monthly, and WhisperAPI handles it flawlessly. The M4 Metal acceleration makes a real difference.",
      rating: 5,
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      role: 'Product Manager',
      company: 'EduLearn',
      image: '/avatars/avatar-3.jpg',
      content: "Simple, affordable, and reliable. We've been using WhisperAPI for 8 months to transcribe lectures. The 99.2% accuracy rate is impressive, even with technical terminology.",
      rating: 5,
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Founder',
      company: 'CallCenter+',
      image: '/avatars/avatar-4.jpg',
      content: "Best transcription API we've tested. The documentation is clear, the support is responsive, and the pricing is transparent. Highly recommended for any voice application.",
      rating: 5,
    },
    {
      id: 5,
      name: 'Aisha Patel',
      role: 'Engineering Lead',
      company: 'HealthPlus',
      image: '/avatars/avatar-5.jpg',
      content: "HIPAA compliance and SOC2 certification were crucial for us. WhisperAPI met all our security requirements while delivering fast, accurate transcriptions for patient consultations.",
      rating: 5,
    },
    {
      id: 6,
      name: 'James Wilson',
      role: 'VP Engineering',
      company: 'LegalTech',
      image: '/avatars/avatar-6.jpg',
      content: "We switched from a major cloud provider and saved over $15K monthly. The accuracy is better, the API is faster, and the customer support is exceptional. No regrets.",
      rating: 5,
    },
  ];

  const stats = [
    {
      value: '500M+',
      label: 'Minutes Transcribed',
      description: 'Processed monthly across all customers',
    },
    {
      value: '99.2%',
      label: 'Accuracy Rate',
      description: 'On real-world audio samples',
    },
    {
      value: '10,000+',
      label: 'Active Developers',
      description: 'Building with WhisperAPI',
    },
    {
      value: '2,500+',
      label: 'Companies',
      description: 'Trust us for transcription',
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        {/* Company Logos */}
        <div className="mb-20">
          <p className="text-center text-gray-600 font-medium mb-8 uppercase tracking-wide text-sm">
            Trusted by leading companies worldwide
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {companyLogos.map((company, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-4 grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
              >
                <div className="text-center">
                  <div className="font-bold text-xl text-gray-800 mb-1">{company.name}</div>
                  <div className="text-xs text-gray-500">{company.industry}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Statistics */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted at Scale
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of developers and companies using WhisperAPI for production-grade transcription
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="text-center p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="text-5xl font-bold text-primary-600 mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Developers Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real feedback from teams building with WhisperAPI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-shadow"
              >
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-blue-500 flex items-center justify-center text-white font-bold text-lg mr-4">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Social Proof Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary-50 to-blue-50 rounded-2xl p-8 border border-primary-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-primary-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <div className="font-semibold text-gray-900 mb-1">Lightning Fast</div>
              <div className="text-sm text-gray-600">Average response time under 2 seconds</div>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-primary-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div className="font-semibold text-gray-900 mb-1">Enterprise Ready</div>
              <div className="text-sm text-gray-600">SOC2 certified with 99.9% uptime SLA</div>
            </div>
            <div className="flex flex-col items-center">
              <svg className="w-12 h-12 text-primary-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="font-semibold text-gray-900 mb-1">Best Value</div>
              <div className="text-sm text-gray-600">80% cheaper than major cloud providers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
