import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

function Contact() {
  return (
    <div className="bg-gradient-to-r from-gray-50 to-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto"> {/* Adjusted width */}
        <header className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-lg text-gray-600 mt-4">
            We’re here to help and answer any questions you might have. Feel free to reach out to us!
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 p-3 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 p-3 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Your email address"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  className="mt-1 p-3 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500"
                  placeholder="Your message..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
            <ul className="space-y-6">
              <li className="flex items-center gap-4">
                <Mail className="text-teal-500" size={24} />
                <div>
                  <p className="text-gray-900 font-semibold">Email</p>
                  <p className="text-gray-600">support@example.com</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="text-teal-500" size={24} />
                <div>
                  <p className="text-gray-900 font-semibold">Phone</p>
                  <p className="text-gray-600">+1 (123) 456-7890</p>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <MapPin className="text-teal-500" size={24} />
                <div>
                  <p className="text-gray-900 font-semibold">Address</p>
                  <p className="text-gray-600">123 Business Avenue, Suite 100<br />City, State, ZIP</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
