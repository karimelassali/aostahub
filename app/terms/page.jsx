import React from 'react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      
      <div className="space-y-6">
        <section>
          <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using this platform, you accept and agree to be bound by the terms
            and provision of this agreement.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">2. User Account</h2>
          <p className="text-gray-700">
            You are responsible for maintaining the confidentiality of your account and password.
            You agree to accept responsibility for all activities that occur under your account.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">3. Acceptable Use</h2>
          <p className="text-gray-700">
            You agree not to use the service for any unlawful purpose or in any way that could
            damage, disable, overburden, or impair our service.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">4. Content</h2>
          <p className="text-gray-700">
            You retain all rights to any content you submit, post or display on or through the service.
            By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use,
            copy, reproduce, process, adapt, modify, publish, transmit, display, and distribute such content.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">5. Termination</h2>
          <p className="text-gray-700">
            We reserve the right to terminate or suspend access to our service immediately,
            without prior notice or liability, for any reason whatsoever.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3">6. Changes to Terms</h2>
          <p className="text-gray-700">
            We reserve the right to modify or replace these terms at any time. If a revision is
            material, we will try to provide at least 30 days notice prior to any new terms taking effect.
          </p>
        </section>
      </div>
    </div>
  );
}
