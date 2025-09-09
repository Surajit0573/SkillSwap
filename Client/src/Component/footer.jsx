import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Github, Linkedin, Twitter, Instagram, Mail, Send, ExternalLink, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-gray-300 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative z-10 pt-12 pb-8 sm:pt-16 lg:pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Branding Section */}
            <div className="branding col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="mb-6">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-teal-400 bg-clip-text text-transparent mb-4">
                  SkillSwap
                </h2>
                <p className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4">
                  Empowering creativity through learning. Join thousands of learners in their journey to master new skills.
                </p>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500">
                  <span>© 2024 SkillSwap.</span>
                  <span>All rights reserved.</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="quick-links">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 relative">
                Quick Links
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h3>
              <nav>
                <ul className="space-y-3">
                  <li>
                    <NavLink 
                      to="/" 
                      className="group flex items-center text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/courses" 
                      className="group flex items-center text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                      Courses
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/about" 
                      className="group flex items-center text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                      About Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      to="/contact" 
                      className="group flex items-center text-sm sm:text-base text-gray-400 hover:text-white transition-all duration-300 hover:translate-x-1"
                    >
                      <span className="w-2 h-2 bg-gray-600 rounded-full mr-3 group-hover:bg-blue-400 transition-colors"></span>
                      Contact Us
                    </NavLink>
                  </li>
                </ul>
              </nav>
            </div>

            {/* Social Media Section */}
            <div className="social-media">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 relative">
                Connect With Me
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h3>
              <p className="text-gray-400 text-sm mb-4">Follow for updates and insights</p>
              <div className="flex flex-wrap gap-4">
                <a 
                  href="https://github.com/Surajit0573" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center justify-center w-10 h-10 bg-slate-800 hover:bg-slate-700 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-3"
                  aria-label="GitHub Profile"
                >
                  <Github className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a 
                  href="https://www.linkedin.com/in/surajit-maity23/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center justify-center w-10 h-10 bg-slate-800 hover:bg-blue-600 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-3"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a 
                  href="https://twitter.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center justify-center w-10 h-10 bg-slate-800 hover:bg-sky-500 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-3"
                  aria-label="Twitter Profile"
                >
                  <Twitter className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
                <a 
                  href="https://instagram.com" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center justify-center w-10 h-10 bg-slate-800 hover:bg-gradient-to-r hover:from-pink-500 hover:to-orange-500 rounded-lg transition-all duration-300 hover:scale-110 hover:rotate-3"
                  aria-label="Instagram Profile"
                >
                  <Instagram className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="newsletter col-span-1 sm:col-span-2 lg:col-span-1">
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-4 sm:mb-6 relative">
                Stay Updated
                <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
              </h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Subscribe to our newsletter for the latest course updates, learning tips, and exclusive offers.
              </p>
              <form className="space-y-4">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-10 pr-4 py-3 text-sm bg-slate-800 border border-slate-700 text-gray-100 placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                <button 
                  type="submit"
                  className="group w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

          {/* Divider */}
          <div className="mt-12 pt-8 border-t border-slate-700/50">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              
              {/* Legal Links */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-4 sm:gap-6">
                <NavLink 
                  to="/terms" 
                  className="group text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors duration-300"
                >
                  Terms of Service
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </NavLink>
                <NavLink 
                  to="/privacy" 
                  className="group text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors duration-300"
                >
                  Privacy Policy
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </NavLink>
                <NavLink 
                  to="/cookies" 
                  className="group text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors duration-300"
                >
                  Cookie Policy
                  <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </NavLink>
              </div>

              {/* Back to Top Button */}
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 text-gray-400 hover:text-white text-sm transition-all duration-300 hover:translate-y-1"
                aria-label="Back to top"
              >
                <span className="hidden sm:inline">Back to top</span>
                <div className="w-8 h-8 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-lg">
                  <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </button>
            </div>

            {/* Bottom Text */}
            <div className="mt-6 pt-4 text-center">
              <p className="text-xs text-gray-500">
                Made with ❤️ for learners worldwide • Powered by innovation
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}