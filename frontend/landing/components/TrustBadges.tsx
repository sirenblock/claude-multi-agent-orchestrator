/**
 * @module TrustBadges
 * @description Trust badges showcasing compliance, security, and reliability
 *
 * Features:
 * - Compliance badges (SOC2, GDPR, ISO)
 * - Reliability metrics (uptime, SLA)
 * - Security certifications
 * - Industry standards
 *
 * @example
 * <TrustBadges />
 */

'use client';

export default function TrustBadges() {
  const badges = [
    {
      id: 'soc2',
      name: 'SOC 2 Type II',
      description: 'Certified',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'gdpr',
      name: 'GDPR',
      description: 'Compliant',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'uptime',
      name: '99.9%',
      description: 'Uptime SLA',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      color: 'from-yellow-500 to-orange-600',
    },
    {
      id: 'hipaa',
      name: 'HIPAA',
      description: 'Ready',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: 'from-purple-500 to-purple-600',
    },
    {
      id: 'iso',
      name: 'ISO 27001',
      description: 'Certified',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      id: 'encryption',
      name: 'AES-256',
      description: 'Encryption',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
        </svg>
      ),
      color: 'from-red-500 to-pink-600',
    },
  ];

  const securityFeatures = [
    {
      title: 'Data Encryption',
      description: 'End-to-end encryption for all data in transit and at rest',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: 'Zero Data Retention',
      description: 'Audio files automatically deleted after processing',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
    },
    {
      title: 'Role-Based Access',
      description: 'Granular permissions and team management controls',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      title: 'Audit Logging',
      description: 'Comprehensive activity logs for compliance and security',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Enterprise-Grade Security & Compliance
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Built with security and privacy at our core. Trusted by enterprises worldwide.
          </p>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-16">
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all border border-gray-200 group"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br ${badge.color} text-white mb-4 group-hover:scale-110 transition-transform`}>
                {badge.icon}
              </div>
              <div className="font-bold text-gray-900 mb-1">{badge.name}</div>
              <div className="text-sm text-gray-600">{badge.description}</div>
            </div>
          ))}
        </div>

        {/* Security Features */}
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-200">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
            Built for Security & Privacy
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center text-primary-600">
                  {feature.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                  <p className="text-gray-600 text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Trust Elements */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Uptime last 90 days</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">&lt;2sec</div>
                <div className="text-sm text-gray-600">Average response time</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary-600 mb-2">24/7</div>
                <div className="text-sm text-gray-600">Enterprise support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance Statement */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 max-w-3xl mx-auto">
            WhisperAPI is committed to maintaining the highest standards of security and compliance.
            Our infrastructure is regularly audited by third-party security firms, and we maintain
            certifications for SOC 2 Type II, ISO 27001, and GDPR compliance. All audio data is
            encrypted in transit and at rest, and automatically deleted after processing.
          </p>
          <div className="mt-6">
            <a
              href="/security"
              className="text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center"
            >
              Learn more about our security practices
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
