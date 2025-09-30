import Link from 'next/link';
import { Phone, Mail, MapPin, Clock, Flag } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      {/* Kenyan flag accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-black via-red-600 to-green-600"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-br from-red-600 via-black to-green-600 p-2 rounded-lg">
                <Flag className="h-5 w-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Cyber Mtandao 🇰🇪</h3>
            </div>
            <p className="text-gray-300">
              Your trusted online platform for digital government and business services. 
              No queues, no stress - just simple, fast, and secure online services.
            </p>
            <div className="flex space-x-4">
              <div className="bg-green-600 p-2 rounded-lg">
                <Phone className="h-5 w-5" />
              </div>
              <div>
                <p className="font-medium">Call Us 📞</p>
                <p className="text-gray-300">+254 700 123 456</p>
                <p className="text-sm text-green-400">WhatsApp Available</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links 🔗</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-gray-300 hover:text-green-400 transition-colors flex items-center">
                  <span className="mr-2">📋</span> All Services
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-gray-300 hover:text-green-400 transition-colors flex items-center">
                  <span className="mr-2">❓</span> How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-gray-300 hover:text-green-400 transition-colors flex items-center">
                  <span className="mr-2">💰</span> Pricing
                </Link>
              </li>
              <li>
                <Link href="/support" className="text-gray-300 hover:text-green-400 transition-colors flex items-center">
                  <span className="mr-2">🛟</span> Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Popular Services 🔥</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/kra-pin" className="text-gray-300 hover:text-red-400 transition-colors flex items-center">
                  <span className="mr-2">🏛️</span> KRA PIN Registration
                </Link>
              </li>
              <li>
                <Link href="/services/nhif" className="text-gray-300 hover:text-red-400 transition-colors flex items-center">
                  <span className="mr-2">🏥</span> NHIF Registration
                </Link>
              </li>
              <li>
                <Link href="/services/helb" className="text-gray-300 hover:text-red-400 transition-colors flex items-center">
                  <span className="mr-2">🎓</span> HELB Application
                </Link>
              </li>
              <li>
                <Link href="/services/cv-writing" className="text-gray-300 hover:text-red-400 transition-colors flex items-center">
                  <span className="mr-2">📄</span> CV Writing
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info 📞</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Mail className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Email 📧</p>
                  <p className="text-gray-300">support@cybermtandao.co.ke</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Location 📍</p>
                  <p className="text-gray-300">Nairobi, Kenya 🇰🇪</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Support Hours ⏰</p>
                  <p className="text-gray-300">Mon-Fri: 8AM-6PM EAT</p>
                  <p className="text-sm text-green-400">Weekends: 9AM-2PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">🇰🇪</span>
              <p className="text-gray-300">
                © {currentYear} Cyber Mtandao. All rights reserved. Made with ❤️ in Kenya.
              </p>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-300 hover:text-green-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-red-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}