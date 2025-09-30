'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Clock, 
  Star,
  FileText,
  Building2,
  Briefcase,
  File,
  ArrowRight
} from 'lucide-react';
import { services, serviceCategories } from '@/lib/seed-data';
import { formatCurrency } from '@/lib/utils';

const categoryIcons = {
  'Government Services': Building2,
  'Business Services': Briefcase,
  'Professional Services': FileText,
  'Document Services': File,
};

export default function ServicesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [filteredServices, setFilteredServices] = useState(services);

  useEffect(() => {
    let filtered = services;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(service => service.category === selectedCategory);
    }

    setFilteredServices(filtered);
  }, [searchTerm, selectedCategory]);

  const popularServices = services.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-white to-gray-50 py-16 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-red-50 to-green-50 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-br from-black/5 to-red-50 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-50 to-green-50 rounded-full shadow-sm border border-red-100 mb-6">
              <Building2 className="h-4 w-4 text-red-600 mr-2" />
              <span className="text-sm font-medium text-gray-700">All Services</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Our <span className="bg-gradient-to-r from-red-600 via-black to-green-600 bg-clip-text text-transparent">Services</span> 🇰🇪
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Choose from our comprehensive range of digital services. All processed by professionals with secure payment via M-Pesa.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 focus:border-red-500 focus:ring-red-500"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedCategory === 'all' ? 'default' : 'outline'}
                onClick={() => setSelectedCategory('all')}
                size="sm"
                className={selectedCategory === 'all' ? 'bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900' : 'border-gray-300 hover:border-red-500 hover:text-red-600'}
              >
                All Services
              </Button>
              {serviceCategories.map((category) => (
                <Button
                  key={category.name}
                  variant={selectedCategory === category.name ? 'default' : 'outline'}
                  onClick={() => setSelectedCategory(category.name)}
                  size="sm"
                  className={selectedCategory === category.name ? 'bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900' : 'border-gray-300 hover:border-red-500 hover:text-red-600'}
                >
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      {selectedCategory === 'all' && !searchTerm && (
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Popular Services 🔥</h2>
              <div className="flex items-center text-sm text-gray-500">
                <Star className="h-4 w-4 mr-1 text-orange-500" />
                Most requested
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {popularServices.map((service, index) => {
                const IconComponent = categoryIcons[service.category as keyof typeof categoryIcons];
                return (
                  <div key={index} className="group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-xl hover:border-red-300 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 transform-gpu">
                    <div className="absolute -top-2 -right-2 z-10">
                      <div className="bg-gradient-to-r from-red-600 to-black text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                        🔥 Popular
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-600 to-black rounded-lg text-white shadow-md group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                            {formatCurrency(service.price)}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {service.estimatedTime}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-red-700 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 text-xs leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                          {service.description}
                        </p>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        Requirements: {service.requirements.length} items
                      </div>
                      
                      <Link href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Button className="w-full bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900 transition-all duration-300 transform group-hover:scale-105">
                          Order Now
                        </Button>
                      </Link>
                    </div>
                    
                    {/* Hover overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-black/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* All Services Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              {selectedCategory === 'all' ? 'All Services' : selectedCategory}
            </h2>
            <div className="text-sm text-gray-500">
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
            </div>
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-500 mb-4">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <Button onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredServices.map((service, index) => {
                const IconComponent = categoryIcons[service.category as keyof typeof categoryIcons];
                return (
                  <div key={index} className="group bg-white border border-gray-200 rounded-xl p-4 hover:shadow-lg hover:border-red-300 transition-all duration-300 ease-out hover:-translate-y-1 transform-gpu">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-600 to-black rounded-lg text-white shadow-md group-hover:scale-110 transition-all duration-300">
                          <IconComponent className="h-5 w-5" />
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                            {formatCurrency(service.price)}
                          </div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {service.estimatedTime}
                          </div>
                        </div>
                      </div>
                      
                      <Badge variant="outline" className="text-xs w-fit border-gray-300">
                        {service.category}
                      </Badge>
                      
                      <div>
                        <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-red-700 transition-colors duration-300">
                          {service.title}
                        </h3>
                        <p className="text-gray-600 text-xs leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                          {service.description}
                        </p>
                      </div>
                      
                      <div className="text-xs text-gray-500">
                        <strong>Requirements:</strong>
                        <ul className="mt-1 space-y-1">
                          {service.requirements.slice(0, 3).map((req, idx) => (
                            <li key={idx} className="flex items-start">
                              <span className="text-red-600 mr-1">•</span>
                              {req}
                            </li>
                          ))}
                          {service.requirements.length > 3 && (
                            <li className="text-red-600">
                              +{service.requirements.length - 3} more
                            </li>
                          )}
                        </ul>
                      </div>
                      
                      <Link href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                        <Button className="w-full bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900 transition-all duration-300 transform group-hover:scale-105">
                          Order Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-red-600 via-black to-green-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative">
          <h2 className="text-3xl font-bold mb-4">
            Can't find what you're looking for? 🔍
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Contact us for custom services or if you need help with a specific document.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black transition-all duration-300">
              Contact Support
            </Button>
            <Button size="lg" className="bg-white text-black hover:bg-gray-100 transition-all duration-300">
              Request Custom Service
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}