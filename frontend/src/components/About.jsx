import React from "react";
import { CheckCircle, Star } from "lucide-react";

function About() {
  return (
    <div className="bg-gradient-to-b from-green-50 to-green-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto"> {/* Adjusted width */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">About Us</h1>
          <p className="text-lg text-gray-600 mt-4">
            Discover who we are, what we do, and why we’re passionate about serving you.
          </p>
        </header>

        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Our Story</h2>
              <p className="text-gray-700 leading-relaxed">
                Founded in 2020, our mission has been to deliver innovative solutions that make a difference.
                We started as a small team of passionate individuals and have grown into a dynamic organization.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Our core values of innovation, integrity, and excellence guide everything we do.
              </p>
            </div>

            <div>
              <img
                src="https://via.placeholder.com/600x400"
                alt="Our team"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </section>

        <section className="bg-white p-8 rounded-lg shadow-lg mb-16">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">Our Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex items-center justify-center text-teal-500 mb-4">
                <Star size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Top-notch Quality</h3>
              <p className="text-gray-600 mt-2">
                We are committed to delivering the highest quality in every product and service.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-teal-500 mb-4">
                <CheckCircle size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Customer Focus</h3>
              <p className="text-gray-600 mt-2">
                Our customers are at the heart of everything we do. We value your trust and feedback.
              </p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center text-teal-500 mb-4">
                <Star size={48} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Innovative Solutions</h3>
              <p className="text-gray-600 mt-2">
                We push the boundaries of innovation to deliver creative and effective solutions.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="p-6 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Join Our Journey</h2>
            <p className="text-lg leading-relaxed mb-6">
              Whether you're a customer, partner, or future team member, we invite you to be a part of our journey
              as we continue to grow and innovate.
            </p>
            <button
              className="bg-white text-teal-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
            >
              Contact Us Today
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default About;
