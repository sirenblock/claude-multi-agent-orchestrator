/**
 * @module HowItWorks
 * @description Step-by-step guide showing how to use WhisperAPI
 *
 * Features:
 * - 4-step process visualization
 * - Code examples for developers
 * - Integration timeline
 * - Interactive code snippets
 * - Multiple language examples
 *
 * @example
 * <HowItWorks />
 */

'use client';

import { useState } from 'react';

interface Step {
  number: number;
  title: string;
  description: string;
  duration: string;
  codeExample: CodeExample;
}

interface CodeExample {
  curl: string;
  python: string;
  javascript: string;
  ruby: string;
}

export default function HowItWorks() {
  const [activeLanguage, setActiveLanguage] = useState<keyof CodeExample>('curl');

  const steps: Step[] = [
    {
      number: 1,
      title: 'Get Your API Key',
      description: 'Sign up for a free account and generate your API key in seconds. No credit card required for the free tier.',
      duration: '30 seconds',
      codeExample: {
        curl: `# Add your API key to environment variables
export WHISPER_API_KEY="your_api_key_here"`,
        python: `# Install the WhisperAPI client
pip install whisperapi

# Import and configure
from whisperapi import WhisperAPI
client = WhisperAPI(api_key="your_api_key_here")`,
        javascript: `// Install the WhisperAPI client
npm install whisperapi

// Import and configure
import WhisperAPI from 'whisperapi';
const client = new WhisperAPI({
  apiKey: process.env.WHISPER_API_KEY
});`,
        ruby: `# Install the WhisperAPI gem
gem install whisperapi

# Configure the client
require 'whisperapi'
client = WhisperAPI::Client.new(
  api_key: ENV['WHISPER_API_KEY']
)`,
      },
    },
    {
      number: 2,
      title: 'Upload Your Audio',
      description: 'Send your audio file to our API. We support MP3, WAV, M4A, and more. Files up to 25MB are processed instantly.',
      duration: '5-10 seconds',
      codeExample: {
        curl: `curl -X POST https://api.whisperapi.com/v1/transcribe \\
  -H "Authorization: Bearer $WHISPER_API_KEY" \\
  -F "file=@podcast.mp3" \\
  -F "model=base" \\
  -F "format=json"`,
        python: `# Upload and transcribe
result = client.transcribe(
    file="podcast.mp3",
    model="base",
    format="json"
)

print(result.id)  # job_abc123`,
        javascript: `// Upload and transcribe
const result = await client.transcribe({
  file: 'podcast.mp3',
  model: 'base',
  format: 'json'
});

console.log(result.id);  // job_abc123`,
        ruby: `# Upload and transcribe
result = client.transcribe(
  file: 'podcast.mp3',
  model: 'base',
  format: 'json'
)

puts result.id  # job_abc123`,
      },
    },
    {
      number: 3,
      title: 'Processing',
      description: 'Our M4 Metal-accelerated servers process your audio at 3x real-time speed. A 60-minute file takes just 3 minutes.',
      duration: '1-3 minutes',
      codeExample: {
        curl: `# Check job status
curl https://api.whisperapi.com/v1/jobs/job_abc123 \\
  -H "Authorization: Bearer $WHISPER_API_KEY"

# Response
{
  "id": "job_abc123",
  "status": "processing",
  "progress": 45
}`,
        python: `# Poll for completion
import time

while True:
    status = client.get_job("job_abc123")
    if status.status == "completed":
        break
    print(f"Progress: {status.progress}%")
    time.sleep(5)`,
        javascript: `// Poll for completion
const pollStatus = async (jobId) => {
  while (true) {
    const status = await client.getJob(jobId);
    if (status.status === 'completed') break;
    console.log(\`Progress: \${status.progress}%\`);
    await new Promise(r => setTimeout(r, 5000));
  }
};`,
        ruby: `# Poll for completion
loop do
  status = client.get_job("job_abc123")
  break if status.status == "completed"
  puts "Progress: #{status.progress}%"
  sleep 5
end`,
      },
    },
    {
      number: 4,
      title: 'Get Your Transcript',
      description: 'Download your transcript in JSON, SRT, VTT, or plain text format. Files are available for 24 hours.',
      duration: 'Instant',
      codeExample: {
        curl: `# Download transcript
curl https://api.whisperapi.com/v1/jobs/job_abc123/transcript \\
  -H "Authorization: Bearer $WHISPER_API_KEY"

# Response
{
  "text": "Welcome to the podcast...",
  "segments": [...],
  "language": "en"
}`,
        python: `# Get the transcript
transcript = client.get_transcript("job_abc123")

print(transcript.text)
# "Welcome to the podcast..."

# Save to file
transcript.save("transcript.json")`,
        javascript: `// Get the transcript
const transcript = await client.getTranscript(
  'job_abc123'
);

console.log(transcript.text);
// "Welcome to the podcast..."

// Save to file
await transcript.save('transcript.json');`,
        ruby: `# Get the transcript
transcript = client.get_transcript("job_abc123")

puts transcript.text
# "Welcome to the podcast..."

# Save to file
transcript.save("transcript.json")`,
      },
    },
  ];

  const languages = [
    { id: 'curl', label: 'cURL', icon: '🔧' },
    { id: 'python', label: 'Python', icon: '🐍' },
    { id: 'javascript', label: 'Node.js', icon: '⚡' },
    { id: 'ruby', label: 'Ruby', icon: '💎' },
  ] as const;

  return (
    <section className="py-20 bg-white">
      <div className="section-container">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started with WhisperAPI in minutes. Four simple steps from upload to transcript.
          </p>
        </div>

        {/* Integration Timeline */}
        <div className="mb-16">
          <div className="bg-primary-50 rounded-xl p-8 border border-primary-100">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">5 min</div>
                <div className="text-sm text-gray-600">Total Integration Time</div>
              </div>
              <div className="hidden md:block w-16 h-0.5 bg-primary-300"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">3x</div>
                <div className="text-sm text-gray-600">Faster than Real-time</div>
              </div>
              <div className="hidden md:block w-16 h-0.5 bg-primary-300"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">4</div>
                <div className="text-sm text-gray-600">Simple Steps</div>
              </div>
              <div className="hidden md:block w-16 h-0.5 bg-primary-300"></div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary-600 mb-2">24h</div>
                <div className="text-sm text-gray-600">File Retention</div>
              </div>
            </div>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-gray-100 rounded-lg p-1">
            {languages.map((lang) => (
              <button
                key={lang.id}
                onClick={() => setActiveLanguage(lang.id)}
                className={`px-6 py-2 rounded-md font-medium transition-all duration-200 flex items-center gap-2 ${
                  activeLanguage === lang.id
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <span>{lang.icon}</span>
                <span>{lang.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative"
            >
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-primary-500 to-primary-200 -z-10 hidden md:block"></div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {/* Step Info */}
                <div className="flex gap-6">
                  {/* Step Number */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-lg">
                      {step.number}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">
                        {step.title}
                      </h3>
                      <span className="inline-block bg-primary-100 text-primary-700 px-3 py-1 rounded-full text-xs font-semibold">
                        {step.duration}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Code Example */}
                <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-gray-400 font-mono">
                      {languages.find(l => l.id === activeLanguage)?.label}
                    </div>
                  </div>
                  <pre className="p-4 overflow-x-auto">
                    <code className="text-sm text-gray-100 font-mono">
                      {step.codeExample[activeLanguage]}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Use Case Examples */}
        <div className="mt-20">
          <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Real-World Use Cases
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-primary-50 rounded-xl p-6 border border-primary-100">
              <div className="text-4xl mb-4">🎙️</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Podcast Transcription
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Automatically transcribe your podcast episodes for SEO and accessibility. Generate show notes and searchable content.
              </p>
              <div className="bg-white rounded-lg p-3 text-xs text-gray-700">
                <span className="font-semibold">Example:</span> 60-minute episode in 3 minutes
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <div className="text-4xl mb-4">🎬</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Video Subtitles
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Generate accurate SRT and VTT subtitle files for your video content. Support multiple languages and formats.
              </p>
              <div className="bg-white rounded-lg p-3 text-xs text-gray-700">
                <span className="font-semibold">Example:</span> Export SRT for YouTube upload
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100">
              <div className="text-4xl mb-4">💼</div>
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                Meeting Notes
              </h4>
              <p className="text-gray-600 text-sm mb-4">
                Transcribe team meetings, interviews, and calls automatically. Search and reference conversations easily.
              </p>
              <div className="bg-white rounded-lg p-3 text-xs text-gray-700">
                <span className="font-semibold">Example:</span> 45-minute standup transcribed
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Get Started?
          </h3>
          <p className="text-gray-600 mb-6">
            Start with 60 free minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/signup"
              className="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors shadow-lg"
            >
              Start Free Trial
            </a>
            <a
              href="/docs"
              className="inline-block bg-gray-100 text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
            >
              View Full Documentation
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
