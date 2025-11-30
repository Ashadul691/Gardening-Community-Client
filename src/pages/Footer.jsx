import { Link } from "react-router-dom";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-green-700 to-green-800 dark:from-gray-800 dark:to-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Leaf className="w-8 h-8" />
              <h3 className="text-2xl font-bold">Garden Hub</h3>
            </div>
            <p className="text-green-100 dark:text-gray-300 mb-4">
              Your community for gardening enthusiasts. Share, learn, and grow together!
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-green-100 dark:text-gray-300 hover:text-yellow-300 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gardeners" className="text-green-100 dark:text-gray-300 hover:text-yellow-300 transition">
                  Explore Gardeners
                </Link>
              </li>
              <li>
                <Link to="/tips" className="text-green-100 dark:text-gray-300 hover:text-yellow-300 transition">
                  Browse Tips
                </Link>
              </li>
              <li>
                <Link to="/share-tip" className="text-green-100 dark:text-gray-300 hover:text-yellow-300 transition">
                  Share a Tip
                </Link>
              </li>
            </ul>
          </div>

          {/* Topics */}
          <div>
            <h4 className="text-xl font-bold mb-4">Popular Topics</h4>
            <ul className="space-y-2 text-green-100 dark:text-gray-300">
              <li>Composting</li>
              <li>Hydroponics</li>
              <li>Balcony Gardens</li>
              <li>Plant Care</li>
              <li>Pest Control</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-green-100 dark:text-gray-300">
                <Mail className="w-5 h-5" />
                <span>info@gardenhub.com</span>
              </li>
              <li className="flex items-center gap-2 text-green-100 dark:text-gray-300">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2 text-green-100 dark:text-gray-300">
                <MapPin className="w-5 h-5" />
                <span>123 Green St, Garden City</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-green-600 dark:border-gray-700 pt-6 text-center">
          <p className="text-green-100 dark:text-gray-300">
            © {new Date().getFullYear()} Garden Hub. All rights reserved. Built with 💚 for gardeners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;