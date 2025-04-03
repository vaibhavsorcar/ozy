
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, MapPin, Star, Navigation, Phone, Clock } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

// Mock data for pharmacies
const mockPharmacies = [
  {
    id: 1,
    name: "Jana Aushadhi Kendra",
    type: "Jana Aushadhi",
    address: "123 Main Street, New Delhi",
    distance: 0.8,
    rating: 4.5,
    openNow: true,
    hours: "8:00 AM - 10:00 PM",
    phone: "+91 98765 43210",
    coordinate: { lat: 28.6139, lng: 77.2090 }
  },
  {
    id: 2,
    name: "City Pharmacy",
    type: "Private",
    address: "456 Park Avenue, New Delhi",
    distance: 1.2,
    rating: 4.2,
    openNow: true,
    hours: "9:00 AM - 9:00 PM",
    phone: "+91 98765 43211",
    coordinate: { lat: 28.6129, lng: 77.2195 }
  },
  {
    id: 3,
    name: "Central Jana Aushadhi Store",
    type: "Jana Aushadhi",
    address: "789 Central Road, New Delhi",
    distance: 1.5,
    rating: 4.7,
    openNow: true,
    hours: "8:00 AM - 11:00 PM",
    phone: "+91 98765 43212",
    coordinate: { lat: 28.6219, lng: 77.2080 }
  },
  {
    id: 4,
    name: "HealthCare Pharmacy",
    type: "Private",
    address: "101 Hospital Road, New Delhi",
    distance: 1.9,
    rating: 3.9,
    openNow: false,
    hours: "9:00 AM - 8:00 PM",
    phone: "+91 98765 43213",
    coordinate: { lat: 28.6339, lng: 77.2190 }
  },
  {
    id: 5,
    name: "Government Medical Store",
    type: "Government",
    address: "202 Gov't Plaza, New Delhi",
    distance: 2.3,
    rating: 4.0,
    openNow: true,
    hours: "10:00 AM - 6:00 PM",
    phone: "+91 98765 43214",
    coordinate: { lat: 28.6039, lng: 77.2290 }
  },
  {
    id: 6,
    name: "Metro Jana Aushadhi",
    type: "Jana Aushadhi",
    address: "303 Metro Complex, New Delhi",
    distance: 2.8,
    rating: 4.6,
    openNow: true,
    hours: "8:00 AM - 10:00 PM",
    phone: "+91 98765 43215",
    coordinate: { lat: 28.6239, lng: 77.1990 }
  },
];

// This component will be replaced with an actual map later
const MapPlaceholder = () => (
  <div className="bg-gray-100 rounded-lg h-[600px] flex items-center justify-center">
    <div className="text-center">
      <MapPin className="h-16 w-16 mx-auto mb-4 text-gray-400" />
      <p className="text-lg text-gray-500">Map will be displayed here</p>
      <p className="text-sm text-gray-400">Requires Google Maps API integration</p>
    </div>
  </div>
);

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < Math.floor(rating) 
              ? 'text-yellow-400 fill-yellow-400' 
              : i < rating 
              ? 'text-yellow-400 fill-yellow-400 opacity-50' 
              : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-1 text-sm">{rating}</span>
    </div>
  );
};

const Pharmacies = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  
  // Filter pharmacies based on search query and active tab
  const filteredPharmacies = mockPharmacies.filter(pharmacy => {
    const matchesSearch = pharmacy.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pharmacy.address.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTab = activeTab === "all" || 
                       (activeTab === "jana" && pharmacy.type === "Jana Aushadhi") ||
                       (activeTab === "private" && pharmacy.type === "Private") ||
                       (activeTab === "government" && pharmacy.type === "Government");
    
    return matchesSearch && matchesTab;
  });

  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Find Nearby Pharmacies</h1>
        
        {/* Search and filter section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input 
                placeholder="Search by pharmacy name or address..." 
                className="pl-10"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            </div>
            <Button>
              Find Pharmacies
            </Button>
            <Button variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Use my location
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All Pharmacies</TabsTrigger>
            <TabsTrigger value="jana">Jana Aushadhi</TabsTrigger>
            <TabsTrigger value="private">Private</TabsTrigger>
            <TabsTrigger value="government">Government</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Map Column */}
              <div className="lg:col-span-2">
                <MapPlaceholder />
              </div>
              
              {/* Pharmacy List Column */}
              <div className="lg:col-span-1 overflow-auto max-h-[600px] pr-2">
                <div className="space-y-4">
                  {filteredPharmacies.map(pharmacy => (
                    <Card key={pharmacy.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="mb-2 flex justify-between">
                          <h3 className="font-semibold">{pharmacy.name}</h3>
                          <Badge 
                            variant={pharmacy.type === "Jana Aushadhi" ? "default" : "secondary"}
                          >
                            {pharmacy.type}
                          </Badge>
                        </div>
                        
                        <div className="text-sm text-gray-600 flex items-start mb-2">
                          <MapPin className="h-4 w-4 mr-1 mt-0.5 shrink-0" />
                          <span>{pharmacy.address}</span>
                        </div>
                        
                        <div className="flex items-center text-sm mb-3">
                          <Navigation className="h-4 w-4 mr-1 text-medic-blue" />
                          <span>{pharmacy.distance} km away</span>
                        </div>
                        
                        <div className="mb-3">
                          <StarRating rating={pharmacy.rating} />
                        </div>
                        
                        <div className="text-sm flex justify-between">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className={pharmacy.openNow ? "text-medic-green" : "text-medic-red"}>
                              {pharmacy.openNow ? "Open Now" : "Closed"}
                            </span>
                          </div>
                          <Button size="sm" variant="outline">
                            Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="jana" className="mt-0">
            {/* Same layout as "all" tab but filtered for Jana Aushadhi */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MapPlaceholder />
              </div>
              <div className="lg:col-span-1 overflow-auto max-h-[600px] pr-2">
                <div className="space-y-4">
                  {filteredPharmacies.map(pharmacy => (
                    <Card key={pharmacy.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="mb-2 flex justify-between">
                          <h3 className="font-semibold">{pharmacy.name}</h3>
                          <Badge variant="default">{pharmacy.type}</Badge>
                        </div>
                        
                        <div className="text-sm text-gray-600 flex items-start mb-2">
                          <MapPin className="h-4 w-4 mr-1 mt-0.5 shrink-0" />
                          <span>{pharmacy.address}</span>
                        </div>
                        
                        <div className="flex items-center text-sm mb-3">
                          <Navigation className="h-4 w-4 mr-1 text-medic-blue" />
                          <span>{pharmacy.distance} km away</span>
                        </div>
                        
                        <div className="mb-3">
                          <StarRating rating={pharmacy.rating} />
                        </div>
                        
                        <div className="text-sm flex justify-between">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className={pharmacy.openNow ? "text-medic-green" : "text-medic-red"}>
                              {pharmacy.openNow ? "Open Now" : "Closed"}
                            </span>
                          </div>
                          <Button size="sm" variant="outline">
                            Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="private" className="mt-0">
            {/* Same layout as other tabs but filtered for Private pharmacies */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MapPlaceholder />
              </div>
              <div className="lg:col-span-1 overflow-auto max-h-[600px] pr-2">
                <div className="space-y-4">
                  {filteredPharmacies.map(pharmacy => (
                    <Card key={pharmacy.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        {/* Same card content as above */}
                        <div className="mb-2 flex justify-between">
                          <h3 className="font-semibold">{pharmacy.name}</h3>
                          <Badge variant="secondary">{pharmacy.type}</Badge>
                        </div>
                        
                        <div className="text-sm text-gray-600 flex items-start mb-2">
                          <MapPin className="h-4 w-4 mr-1 mt-0.5 shrink-0" />
                          <span>{pharmacy.address}</span>
                        </div>
                        
                        <div className="flex items-center text-sm mb-3">
                          <Navigation className="h-4 w-4 mr-1 text-medic-blue" />
                          <span>{pharmacy.distance} km away</span>
                        </div>
                        
                        <div className="mb-3">
                          <StarRating rating={pharmacy.rating} />
                        </div>
                        
                        <div className="text-sm flex justify-between">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className={pharmacy.openNow ? "text-medic-green" : "text-medic-red"}>
                              {pharmacy.openNow ? "Open Now" : "Closed"}
                            </span>
                          </div>
                          <Button size="sm" variant="outline">
                            Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="government" className="mt-0">
            {/* Same layout as other tabs but filtered for Government pharmacies */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MapPlaceholder />
              </div>
              <div className="lg:col-span-1 overflow-auto max-h-[600px] pr-2">
                <div className="space-y-4">
                  {filteredPharmacies.map(pharmacy => (
                    <Card key={pharmacy.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        {/* Same card content as above */}
                        <div className="mb-2 flex justify-between">
                          <h3 className="font-semibold">{pharmacy.name}</h3>
                          <Badge variant="outline">{pharmacy.type}</Badge>
                        </div>
                        
                        <div className="text-sm text-gray-600 flex items-start mb-2">
                          <MapPin className="h-4 w-4 mr-1 mt-0.5 shrink-0" />
                          <span>{pharmacy.address}</span>
                        </div>
                        
                        <div className="flex items-center text-sm mb-3">
                          <Navigation className="h-4 w-4 mr-1 text-medic-blue" />
                          <span>{pharmacy.distance} km away</span>
                        </div>
                        
                        <div className="mb-3">
                          <StarRating rating={pharmacy.rating} />
                        </div>
                        
                        <div className="text-sm flex justify-between">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            <span className={pharmacy.openNow ? "text-medic-green" : "text-medic-red"}>
                              {pharmacy.openNow ? "Open Now" : "Closed"}
                            </span>
                          </div>
                          <Button size="sm" variant="outline">
                            Details
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Pharmacies;
