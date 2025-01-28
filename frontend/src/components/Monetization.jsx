import React from "react";
import { DollarSign, BarChart2, Users } from "lucide-react";

function Monetization() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto"> {/* Adjusted width */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Monetization for Health Influencers</h1>
          <p className="text-lg text-gray-600 mt-4">
            Unlock your earning potential and make a lasting impact on your audience.
          </p>
        </header>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Why Monetize?</h2>
              <p className="text-gray-700 leading-relaxed">
                As a health influencer, you have a unique opportunity to inspire and guide your audience towards healthier lifestyles.
                Monetization allows you to turn your passion into a sustainable career while providing value to your followers.
              </p>
              <ul className="list-disc list-inside text-gray-700">
                <li>Expand your reach and influence</li>
                <li>Generate income through authentic partnerships</li>
                <li>Fund your content creation and initiatives</li>
              </ul>
            </div>

            <div>
              <img
                src="https://via.placeholder.com/600x400"
                alt="Monetization graphic"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Monetization Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center text-green-500 mb-4">
                <DollarSign size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Affiliate Marketing</h3>
              <p className="text-gray-600 mt-2">
                Earn commissions by promoting health products and services you trust.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-green-500 mb-4">
                <BarChart2 size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Sponsored Content</h3>
              <p className="text-gray-600 mt-2">
                Collaborate with brands to create authentic content that resonates with your audience.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-green-500 mb-4">
                <Users size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Membership Programs</h3>
              <p className="text-gray-600 mt-2">
                Offer exclusive content and perks to your most loyal followers.
              </p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">How to Get Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <img
                src="https://via.placeholder.com/600x400"
                alt="Getting started graphic"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">1. Define Your Niche</h3>
              <p className="text-gray-700 leading-relaxed">
                Identify the specific area of health and wellness you are passionate about and want to focus on.
              </p>
              <h3 className="text-xl font-semibold text-gray-900">2. Build Your Audience</h3>
              <p className="text-gray-700 leading-relaxed">
                Engage with your followers through valuable content, social media, and community interactions.
              </p>
              <h3 className="text-xl font-semibold text-gray-900">3. Partner with Brands</h3>
              <p className="text-gray-700 leading-relaxed">
                Reach out to brands that align with your values and audience to explore collaboration opportunities.
              </p>
              <h3 className="text-xl font-semibold text-gray-900">4. Create Quality Content</h3>
              <p className="text-gray-700 leading-relaxed">
                Consistently produce high-quality content that educates, entertains, and inspires your audience.
              </p>
            </div>
          </div>
        </section>

        <footer className="text-center text-gray-600">
          <p>&copy; 2025 Health Influencers. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Monetization;
