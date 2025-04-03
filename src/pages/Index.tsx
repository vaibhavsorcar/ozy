
import React from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, TrendingDown, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MainLayout from '@/components/layout/MainLayout';

const Index = () => {
  // This will be replaced by real data later
  const featuredMedicines = [
    { id: 1, name: "Paracetamol", price: 8.5, janaPrice: 3.5, savings: "58%" },
    { id: 2, name: "Metformin", price: 15.75, janaPrice: 6.25, savings: "60%" },
    { id: 3, name: "Amlodipine", price: 22.5, janaPrice: 7.8, savings: "65%" },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-medic-blue/10 to-medic-green/10">
        <div className="container px-4 py-16 md:py-24">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Affordable Medicine <span className="text-medic-blue">Near You</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Compare prices between Jana Aushadhi Stores and local pharmacies to save on your prescriptions.
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="flex gap-2">
                <Input 
                  placeholder="Search for medicines..." 
                  className="shadow-sm" 
                />
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                icon: <Search className="h-10 w-10 text-medic-blue" />,
                title: "Find Medicines",
                description: "Search our extensive database of medicines available in India"
              },
              {
                icon: <TrendingDown className="h-10 w-10 text-medic-green" />,
                title: "Compare Prices",
                description: "See price differences between Jana Aushadhi stores and others"
              },
              {
                icon: <MapPin className="h-10 w-10 text-medic-red" />,
                title: "Locate Nearby",
                description: "Find the closest pharmacies with the best prices"
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="inline-flex items-center justify-center p-2 bg-gray-100 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Medicines Section */}
      <section className="py-16 bg-white">
        <div className="container px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Save Money on Common Medicines
            </h2>
            <p className="text-gray-600">
              See how much you could save by using Jana Aushadhi stores
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featuredMedicines.map((medicine) => (
              <div key={medicine.id} className="border rounded-lg overflow-hidden shadow-md">
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-3">{medicine.name}</h3>
                  <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                    <div>
                      <p className="text-sm text-gray-500">Market Price</p>
                      <p className="text-lg font-semibold">₹{medicine.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Jana Aushadhi</p>
                      <p className="text-lg font-semibold text-medic-green">₹{medicine.janaPrice}</p>
                    </div>
                  </div>
                  <div className="bg-medic-green/10 p-2 rounded text-center">
                    <p className="text-medic-green font-medium">Save {medicine.savings}</p>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 text-center">
                  <Link to={`/medicines/${medicine.id}`} className="text-medic-blue hover:underline">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild>
              <Link to="/medicines">Browse All Medicines</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Jana Aushadhi */}
      <section className="bg-gray-50 py-16">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">What is Jana Aushadhi?</h2>
                <p className="text-gray-600 mb-4">
                  Pradhan Mantri Bhartiya Janaushadhi Pariyojana (PMBJP) is a campaign launched by the Department of
                  Pharmaceuticals to provide quality medicines at affordable prices.
                </p>
                <p className="text-gray-600 mb-6">
                  These stores sell generic medicines which are identical to branded medicines in terms of quality and efficacy,
                  but at a fraction of the price.
                </p>
                <div className="flex gap-4">
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 text-medic-green mr-2" />
                    <span>Quality Assured</span>
                  </div>
                  <div className="flex items-center">
                    <TrendingDown className="h-5 w-5 text-medic-green mr-2" />
                    <span>50-90% Lower Prices</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-white shadow-xl p-4 rounded-lg rotate-2">
                  <div className="bg-medic-blue/10 p-8 rounded">
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-4">Average Savings</h3>
                      <div className="text-5xl font-bold text-medic-blue mb-2">60%</div>
                      <p className="text-gray-600">on prescription medicines</p>
                    </div>
                    <div className="mt-6 pt-6 border-t border-dashed">
                      <div className="flex justify-between items-center mb-2">
                        <span>Antibiotics</span>
                        <span className="font-semibold">50-75% off</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Diabetes Medication</span>
                        <span className="font-semibold">60-80% off</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Cardiac Medication</span>
                        <span className="font-semibold">70-90% off</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 h-24 w-24 bg-medic-green/10 rounded-full -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
