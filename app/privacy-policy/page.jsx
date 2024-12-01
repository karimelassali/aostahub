import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="text-gray-700">
            We collect information that you provide directly to us, including when you create an account,
            update your profile, or communicate with other users. This may include your name, email address,
            profile information, and any other information you choose to provide.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-700">
            We use the information we collect to provide, maintain, and improve our services,
            to communicate with you, and to personalize your experience on our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Information Sharing</h2>
          <p className="text-gray-700">
            We do not sell your personal information. We may share your information only in limited
            circumstances, such as when required by law or with your consent.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Data Security</h2>
          <p className="text-gray-700">
            We implement appropriate technical and organizational measures to protect your personal
            information against unauthorized access, alteration, disclosure, or destruction.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Your Rights</h2>
          <p className="text-gray-700">
            You have the right to access, correct, or delete your personal information. You can also
            object to or restrict certain processing of your information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Contact Us</h2>
          <p className="text-gray-700">
            If you have any questions about this Privacy Policy, please contact us through our Contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
