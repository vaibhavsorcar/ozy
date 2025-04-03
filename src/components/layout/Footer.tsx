
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-white border-t mt-auto">
      <div className="container px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 font-bold text-xl mb-4">
              <span className="text-medic-blue">Medi</span>
              <span className="text-medic-green">Chain</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">
              Find and compare medicine prices across Jana Aushadhi stores and local pharmacies.
            </p>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/medicines" className="text-gray-600 hover:text-medic-blue">
                  Find Medicines
                </Link>
              </li>
              <li>
                <Link to="/pharmacies" className="text-gray-600 hover:text-medic-blue">
                  Nearest Pharmacies
                </Link>
              </li>
              <li>
                <Link to="/compare" className="text-gray-600 hover:text-medic-blue">
                  Compare Prices
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/about" className="text-gray-600 hover:text-medic-blue">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-medic-blue">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-medic-blue">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/terms" className="text-gray-600 hover:text-medic-blue">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-600 hover:text-medic-blue">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-gradient h-1 my-6 rounded-full"></div>
        
        <div className="text-center text-xs text-gray-500">
          &copy; {new Date().getFullYear()} MediChain Price Guide. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
