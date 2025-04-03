
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { Search, Filter } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

// Mock data for medicines
const mockMedicines = [
  {
    id: 1,
    name: "Paracetamol 500mg",
    generic: "Paracetamol",
    category: "Pain Relief",
    marketPrice: 25,
    janaPrice: 5.5,
    savings: "78%",
    availability: true,
  },
  {
    id: 2,
    name: "Metformin 500mg",
    generic: "Metformin",
    category: "Diabetes",
    marketPrice: 120,
    janaPrice: 18.5,
    savings: "85%",
    availability: true,
  },
  {
    id: 3,
    name: "Amlodipine 5mg",
    generic: "Amlodipine",
    category: "Blood Pressure",
    marketPrice: 85,
    janaPrice: 12.8,
    savings: "85%",
    availability: true,
  },
  {
    id: 4,
    name: "Atorvastatin 10mg",
    generic: "Atorvastatin",
    category: "Cholesterol",
    marketPrice: 130,
    janaPrice: 22.5,
    savings: "83%",
    availability: false,
  },
  {
    id: 5,
    name: "Azithromycin 500mg",
    generic: "Azithromycin",
    category: "Antibiotics",
    marketPrice: 180,
    janaPrice: 35.6,
    savings: "80%",
    availability: true,
  },
  {
    id: 6,
    name: "Pantoprazole 40mg",
    generic: "Pantoprazole",
    category: "Digestive",
    marketPrice: 95,
    janaPrice: 16.8,
    savings: "82%",
    availability: true,
  },
  {
    id: 7,
    name: "Montelukast 10mg",
    generic: "Montelukast",
    category: "Respiratory",
    marketPrice: 210,
    janaPrice: 32.5,
    savings: "85%",
    availability: true,
  },
  {
    id: 8,
    name: "Cetirizine 10mg",
    generic: "Cetirizine",
    category: "Allergy",
    marketPrice: 75,
    janaPrice: 8.9,
    savings: "88%",
    availability: true,
  },
];

const Medicines = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [category, setCategory] = useState("all");
  const [availability, setAvailability] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  
  // Filter and sort medicines
  const filteredMedicines = mockMedicines
    .filter(medicine => 
      (medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
       medicine.generic.toLowerCase().includes(searchQuery.toLowerCase())) &&
      (category === "all" || medicine.category === category) &&
      (availability === "all" || 
       (availability === "available" && medicine.availability) ||
       (availability === "unavailable" && !medicine.availability)) &&
      (medicine.janaPrice >= priceRange[0] && medicine.janaPrice <= priceRange[1])
    )
    .sort((a, b) => {
      switch(sortBy) {
        case "price-asc":
          return a.janaPrice - b.janaPrice;
        case "price-desc":
          return b.janaPrice - a.janaPrice;
        case "savings":
          return parseInt(b.savings) - parseInt(a.savings);
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const handlePriceRangeChange = (values: number[]) => {
    setPriceRange(values);
  };

  return (
    <MainLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">Medicine Database</h1>
        
        {/* Search and filter section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search medicines by name or generic..." 
                  className="pl-10"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Button>
              Search
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Pain Relief">Pain Relief</SelectItem>
                  <SelectItem value="Diabetes">Diabetes</SelectItem>
                  <SelectItem value="Blood Pressure">Blood Pressure</SelectItem>
                  <SelectItem value="Cholesterol">Cholesterol</SelectItem>
                  <SelectItem value="Antibiotics">Antibiotics</SelectItem>
                  <SelectItem value="Digestive">Digestive</SelectItem>
                  <SelectItem value="Respiratory">Respiratory</SelectItem>
                  <SelectItem value="Allergy">Allergy</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Sort By</label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price-asc">Price (Low to High)</SelectItem>
                  <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                  <SelectItem value="savings">Highest Savings</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Availability</label>
              <Select value={availability} onValueChange={setAvailability}>
                <SelectTrigger>
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="available">In Stock</SelectItem>
                  <SelectItem value="unavailable">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">
                Jana Aushadhi Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <div className="px-2">
                <Slider 
                  defaultValue={[0, 200]} 
                  max={200} 
                  step={5} 
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-500 mb-4">Showing {filteredMedicines.length} results</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMedicines.map(medicine => (
              <Card key={medicine.id} className={medicine.availability ? "" : "opacity-70"}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{medicine.name}</h3>
                      <p className="text-sm text-gray-500">Generic: {medicine.generic}</p>
                    </div>
                    <div className="bg-medic-blue/10 text-medic-blue text-xs font-medium py-1 px-2 rounded">
                      {medicine.category}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4 text-center">
                    <div>
                      <p className="text-xs text-gray-500">Market Price</p>
                      <p className="text-lg font-semibold">₹{medicine.marketPrice}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Jana Aushadhi</p>
                      <p className="text-lg font-semibold text-medic-green">₹{medicine.janaPrice}</p>
                    </div>
                  </div>
                  
                  <div className="bg-medic-green/10 p-2 rounded text-center mb-4">
                    <p className="text-medic-green font-medium">Save {medicine.savings}</p>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${medicine.availability ? 'text-medic-green' : 'text-medic-red'}`}>
                      {medicine.availability ? 'In Stock' : 'Out of Stock'}
                    </span>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </MainLayout>
  );
};

export default Medicines;
