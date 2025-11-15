/**
 * @module UseCases
 * @description Showcase different use cases and industries for WhisperAPI
 *
 * Features:
 * - Multiple industry use cases
 * - Real-world examples with metrics
 * - Visual icons and illustrations
 * - Customer success stories
 * - Industry-specific benefits
 *
 * @example
 * <UseCases />
 */

'use client';

import { motion } from 'framer-motion';
import {
  Mic,
  Video,
  Briefcase,
  GraduationCap,
  Headphones,
  FileText,
  MessageSquare,
  Radio,
  Film,
  Building,
  Users,
  Globe,
  LucideIcon
} from 'lucide-react';

interface UseCase {
  icon: LucideIcon;
  title: string;
  industry: string;
  description: string;
  benefits: string[];
  example: string;
  stats?: {
    label: string;
    value: string;
  };
}

export default function UseCases() {
  const useCases: UseCase[] = [
    {
      icon: Headphones,
      title: 'Podcast Transcription',
      industry: 'Media & Entertainment',
      description: 'Automatically transcribe podcast episodes for show notes, SEO, and accessibility. Generate searchable content from your audio.',
      benefits: [
        'SEO-optimized show notes',
        'Automatic timestamp generation',
        'Multi-speaker detection',
        'Export to multiple formats'
      ],
      example: 'PodcastPro processes 10,000+ hours monthly',
      stats: {
        label: 'Time Saved',
        value: '95%'
      }
    },
    {
      icon: Video,
      title: 'Video Subtitles & Captions',
      industry: 'Content Creation',
      description: 'Generate accurate SRT and VTT subtitle files for YouTube, social media, and video platforms. Make your content accessible to everyone.',
      benefits: [
        'Multi-language support',
        'Perfect timing sync',
        'YouTube-ready SRT files',
        'Accessibility compliance'
      ],
      example: 'VideoStream generates 50K+ subtitle files monthly',
      stats: {
        label: 'Accuracy',
        value: '99.2%'
      }
    },
    {
      icon: Briefcase,
      title: 'Meeting & Call Transcription',
      industry: 'Business & Enterprise',
      description: 'Record and transcribe team meetings, client calls, and interviews automatically. Search and reference conversations easily.',
      benefits: [
        'Searchable meeting notes',
        'Action item extraction',
        'Speaker identification',
        'Secure cloud storage'
      ],
      example: 'CallCenter+ transcribes 100K+ calls weekly',
      stats: {
        label: 'Cost Savings',
        value: '80%'
      }
    },
    {
      icon: GraduationCap,
      title: 'Educational Content',
      industry: 'Education & E-Learning',
      description: 'Transcribe lectures, courses, and educational videos. Make learning materials accessible and searchable for students.',
      benefits: [
        'Student accessibility',
        'Study guide generation',
        'Search within courses',
        'Multi-language learning'
      ],
      example: 'EduLearn transcribes 1,000+ lectures monthly',
      stats: {
        label: 'Student Satisfaction',
        value: '4.8/5'
      }
    },
    {
      icon: Building,
      title: 'Legal & Compliance',
      industry: 'Legal Services',
      description: 'Transcribe depositions, court proceedings, and client meetings with high accuracy. Maintain compliance and documentation.',
      benefits: [
        'Legal-grade accuracy',
        'Secure encryption',
        'Compliance ready',
        'Easy review process'
      ],
      example: 'LegalTech saves $15K monthly on transcription',
      stats: {
        label: 'ROI',
        value: '450%'
      }
    },
    {
      icon: Radio,
      title: 'Radio & Broadcasting',
      industry: 'Broadcasting',
      description: 'Transcribe radio shows, interviews, and live broadcasts. Create archives and searchable content from live audio.',
      benefits: [
        'Real-time processing',
        'Archive creation',
        'Content repurposing',
        'SEO optimization'
      ],
      example: 'MediaFlow processes 24/7 radio streams',
      stats: {
        label: 'Processing Speed',
        value: '3x realtime'
      }
    },
    {
      icon: MessageSquare,
      title: 'Customer Support',
      industry: 'Customer Service',
      description: 'Analyze customer service calls for quality assurance, training, and insights. Improve support quality and response times.',
      benefits: [
        'Quality assurance',
        'Training material',
        'Sentiment analysis',
        'Customer insights'
      ],
      example: 'SupportPro analyzes 50K+ support calls monthly',
      stats: {
        label: 'Quality Improvement',
        value: '35%'
      }
    },
    {
      icon: Globe,
      title: 'Research & Analysis',
      industry: 'Research',
      description: 'Transcribe interviews, focus groups, and research sessions. Analyze qualitative data efficiently at scale.',
      benefits: [
        'Qualitative analysis',
        'Interview transcription',
        'Data extraction',
        'Multi-language support'
      ],
      example: 'ResearchLab transcribes 500+ interviews monthly',
      stats: {
        label: 'Researcher Time Saved',
        value: '20 hrs/week'
      }
    },
    {
      icon: Film,
      title: 'Media Production',
      industry: 'Film & TV',
      description: 'Create scripts from footage, generate subtitles for international distribution, and maintain production documentation.',
      benefits: [
        'Script generation',
        'Post-production efficiency',
        'International subtitles',
        'Archival documentation'
      ],
      example: 'FilmStudio uses WhisperAPI for all productions',
      stats: {
        label: 'Production Time Saved',
        value: '40%'
      }
    },
    {
      icon: FileText,
      title: 'Documentation',
      industry: 'Healthcare',
      description: 'Medical dictation, patient notes, and clinical documentation. HIPAA-compliant transcription for healthcare providers.',
      benefits: [
        'HIPAA compliance',
        'Medical terminology',
        'EHR integration',
        'Secure processing'
      ],
      example: 'HealthPlus processes 10K+ patient notes daily',
      stats: {
        label: 'Doctor Time Saved',
        value: '2 hrs/day'
      }
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="section-container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Built for Every Industry
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From podcasters to enterprise teams, WhisperAPI powers transcription for thousands of use cases
          </p>
        </motion.div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all border border-gray-100 hover:border-primary-200"
              >
                {/* Icon & Title */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-blue-500 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-primary-600 font-medium">
                      {useCase.industry}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {useCase.description}
                </p>

                {/* Benefits */}
                <ul className="space-y-2 mb-4">
                  {useCase.benefits.slice(0, 3).map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>

                {/* Stats or Example */}
                <div className="pt-4 border-t border-gray-100">
                  {useCase.stats ? (
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{useCase.stats.label}</span>
                      <span className="text-2xl font-bold text-primary-600">{useCase.stats.value}</span>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">{useCase.example}</p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white">
            <Users className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Don't See Your Use Case?
            </h3>
            <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              WhisperAPI is flexible enough to handle any audio transcription need. Talk to our team about custom solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/signup"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-gray-100 transition-all shadow-lg"
              >
                Start Free Trial
              </a>
              <a
                href="mailto:enterprise@whisperapi.com"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all border-2 border-white backdrop-blur-sm"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
