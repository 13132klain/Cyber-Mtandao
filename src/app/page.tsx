import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  FileText, 
  CreditCard, 
  Shield, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Smartphone,
  Users,
  Star,
  MapPin,
  Globe,
  Zap
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <MapPin className="h-8 w-8 text-red-600" />,
      title: "Proudly Kenyan",
      description: "Built for Kenyans, by Kenyans. We understand local requirements and processes."
    },
    {
      icon: <CreditCard className="h-8 w-8 text-green-600" />,
      title: "M-Pesa Powered",
      description: "Pay instantly with M-Pesa STK Push. No cards needed - just your phone."
    },
    {
      icon: <Globe className="h-8 w-8 text-black" />,
      title: "Government Approved",
      description: "Licensed and certified to handle official government document processing."
    },
    {
      icon: <Zap className="h-8 w-8 text-orange-600" />,
      title: "Haraka Sana",
      description: "Lightning fast service delivery - most documents ready within hours."
    }
  ];

  const popularServices = [
    {
      title: "KRA PIN Registration",
      description: "Get your KRA PIN certificate quickly and easily",
      price: "KES 300",
      duration: "1-2 days",
      popular: true,
      icon: "building",
      savings: "Save 2 hours"
    },
    {
      title: "NHIF Registration",
      description: "Register for National Hospital Insurance Fund",
      price: "KES 250",
      duration: "2-3 days",
      popular: true,
      icon: "heart",
      savings: "Save 3 hours"
    },
    {
      title: "HELB Application",
      description: "Apply for Higher Education Loans Board funding",
      price: "KES 400",
      duration: "3-5 days",
      popular: false,
      icon: "graduation",
      savings: "Save 4 hours"
    },
    {
      title: "CV Writing Service",
      description: "Professional CV writing by experts",
      price: "KES 500",
      duration: "1-2 days",
      popular: true,
      icon: "filetext",
      savings: "Save 5 hours"
    }
  ];

  const getServiceIcon = (iconType: string, className: string = "h-5 w-5") => {
    switch (iconType) {
      case "building":
        return <FileText className={className} />;
      case "heart":
        return <Shield className={className} />;
      case "graduation":
        return <Users className={className} />;
      case "filetext":
        return <Star className={className} />;
      default:
        return <FileText className={className} />;
    }
  };

  const howItWorks = [
    {
      step: "01",
      title: "Choose Your Service",
      description: "Browse our comprehensive catalog of government and business services. Filter by category, price, or processing time to find exactly what you need.",
      icon: "smartphone",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      step: "02",
      title: "Upload Documents",
      description: "Securely upload your required documents through our encrypted platform. Our system guides you through each requirement with helpful tips.",
      icon: "filetext",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      step: "03",
      title: "Pay with M-Pesa",
      description: "Complete your payment instantly using M-Pesa STK Push, Paybill, or other secure payment methods. Get immediate confirmation.",
      icon: "creditcard",
      color: "from-red-500 to-red-600",
      bgColor: "bg-red-50",
      borderColor: "border-red-200"
    },
    {
      step: "04",
      title: "Track & Download",
      description: "Monitor your order progress in real-time and download your completed documents securely. Get notifications at every step.",
      icon: "checkcircle",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ];

  const getStepIcon = (iconType: string, className: string = "h-8 w-8") => {
    switch (iconType) {
      case "smartphone":
        return <Smartphone className={className} />;
      case "filetext":
        return <FileText className={className} />;
      case "creditcard":
        return <CreditCard className={className} />;
      case "checkcircle":
        return <CheckCircle className={className} />;
      default:
        return <Smartphone className={className} />;
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-white py-20 sm:py-32 overflow-hidden">
        {/* Subtle background */}
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-30" />
        </div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-12">
            {/* Clean badge */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-50 to-green-50 text-black rounded-full text-sm font-medium border border-red-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
              Trusted by 10,000+ Kenyans 🇰🇪
            </div>

            {/* Minimalist headline */}
            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
                Government services
                <br />
                <span className="bg-gradient-to-r from-red-600 via-black to-green-600 bg-clip-text text-transparent">made simple</span>
              </h1>
              
              <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Get your KRA PIN, NHIF, HELB, and business documents processed online.
                <br className="hidden sm:block" />
                <span className="text-gray-500">No queues. No hassle. Pay with M-Pesa.</span>
              </p>
            </div>

            {/* Clean CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/services">
                <Button size="lg" className="text-lg px-8 py-4 bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900 transition-all transform hover:scale-105">
                  🇰🇪 Browse Services
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-green-600 text-green-700 hover:bg-green-50 hover:border-green-700 transition-colors">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Simple trust indicators */}
            <div className="flex justify-center items-center gap-8 text-sm text-gray-500 pt-8">
              <div className="flex items-center">
                <Shield className="h-4 w-4 mr-2 text-green-600" />
                <span>Secure & Licensed</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="h-4 w-4 mr-2 text-red-600" />
                <span>Fast Delivery</span>
              </div>
              <div className="flex items-center">
                <CreditCard className="h-4 w-4 mr-2 text-black" />
                <span>M-Pesa Payments</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Cyber Mtandao? 🇰🇪
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We make digital services simple, secure, and accessible to everyone.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-br from-green-100 to-red-100 rounded-full blur-3xl opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200 mb-6">
              <Zap className="h-4 w-4 text-orange-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Simple Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works 🚀
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get your documents processed in 4 simple steps. Our streamlined process 
              ensures fast, secure, and reliable service delivery.
            </p>
          </div>
          
          {/* Desktop Layout */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-12 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-green-200 via-red-200 to-purple-200 z-0"></div>
              
              <div className="grid grid-cols-4 gap-6 relative z-10">
                {howItWorks.map((step, index) => (
                  <div key={index} className="text-center group">
                    {/* Step Circle */}
                    <div className={`relative mx-auto w-12 h-12 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-md mb-4 group-hover:scale-125 transition-all duration-500 ease-out group-hover:shadow-xl animate-pulse group-hover:animate-none`}>
                      <span className="text-white font-bold text-sm">{step.step}</span>
                      <div className="absolute -inset-1 bg-white rounded-full -z-10 group-hover:animate-ping"></div>
                    </div>
                    
                    {/* Content Card */}
                    <div className={`${step.bgColor} ${step.borderColor} border rounded-lg p-4 h-auto hover:shadow-lg transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:scale-105 transform-gpu animate-fade-in-up`} style={{animationDelay: `${index * 150}ms`}}>
                      <div className={`inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br ${step.color} rounded-lg mb-3 text-white transition-transform duration-300 group-hover:rotate-12`}>
                        {getStepIcon(step.icon, "h-4 w-4")}
                      </div>
                      <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors duration-300">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-xs leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Mobile Layout */}
          <div className="lg:hidden space-y-4">
            {howItWorks.map((step, index) => (
              <div key={index} className={`flex items-start space-x-3 animate-slide-in-left opacity-0`} style={{animationDelay: `${index * 200}ms`, animationFillMode: 'forwards'}}>
                <div className={`flex-shrink-0 w-10 h-10 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-all duration-400 ease-out hover:shadow-lg animate-bounce`} style={{animationDelay: `${index * 300}ms`}}>
                  <span className="text-white font-bold text-xs">{step.step}</span>
                </div>
                <div className={`flex-1 ${step.bgColor} ${step.borderColor} border rounded-lg p-3 hover:shadow-md transition-all duration-400 ease-out hover:-translate-y-1 hover:scale-[1.02] transform-gpu`}>
                  <div className="flex items-center mb-2">
                    <div className={`inline-flex items-center justify-center w-6 h-6 bg-gradient-to-br ${step.color} rounded-md mr-2 text-white transition-transform duration-300 hover:rotate-12`}>
                      {getStepIcon(step.icon, "h-3 w-3")}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 hover:text-gray-700 transition-colors duration-300">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed hover:text-gray-800 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Call to Action */}
          <div className="text-center mt-12">
            <div className="bg-white rounded-xl shadow-md border border-gray-100 p-6 max-w-xl mx-auto hover:shadow-lg transition-all duration-500 ease-out hover:-translate-y-1 hover:scale-105 transform-gpu animate-fade-in-up" style={{animationDelay: '800ms'}}>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Ready to get started? 🇰🇪
              </h3>
              <p className="text-gray-600 mb-4 text-sm">
                Join thousands of Kenyans who have simplified their document processing
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                <Link href="/services">
                  <Button size="sm" className="bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900 transform hover:scale-105 transition-all duration-300">
                    Browse Services
                    <ArrowRight className="ml-2 h-3 w-3" />
                  </Button>
                </Link>
                <Link href="/auth/register">
                  <Button size="sm" variant="outline" className="border-green-600 text-green-700 hover:bg-green-50 transform hover:scale-105 transition-all duration-300">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-red-50 to-green-50 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-blue-50 to-purple-50 rounded-full blur-3xl opacity-30"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-50 to-green-50 rounded-full shadow-sm border border-red-100 mb-6">
              <Star className="h-4 w-4 text-orange-500 mr-2" />
              <span className="text-sm font-medium text-gray-700">Most Requested</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Popular Services 🔥
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied customers with our most trusted services
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularServices.map((service, index) => (
              <div key={index} className={`group relative bg-white border border-gray-200 rounded-xl p-4 hover:shadow-xl hover:border-red-300 transition-all duration-500 ease-out hover:-translate-y-2 hover:scale-105 transform-gpu animate-fade-in-up cursor-pointer`} style={{animationDelay: `${index * 100}ms`}}>
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-2 -right-2 z-10">
                    <div className="bg-gradient-to-r from-red-600 to-black text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg animate-bounce-soft">
                      🔥 Popular
                    </div>
                  </div>
                )}
                
                {/* Service Icon */}
                <div className={`inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-red-600 to-black rounded-lg mb-3 text-white shadow-md group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                  {getServiceIcon(service.icon)}
                </div>
                
                {/* Service Content */}
                <div className="space-y-3">
                  <div>
                    <h3 className="text-base font-semibold text-gray-900 mb-1 group-hover:text-red-700 transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 text-xs leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                  
                  {/* Pricing and Duration */}
                  <div className="flex justify-between items-center">
                    <div>
                      <span className={`text-lg font-bold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent`}>
                        {service.price}
                      </span>
                      <div className="text-xs text-gray-500">{service.duration}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-green-600 font-medium">{service.savings}</div>
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="h-3 w-3 mr-1" />
                        Fast
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Button */}
                  <button className={`w-full bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300 transform group-hover:scale-105 shadow-sm hover:shadow-md`}>
                    Order Now
                  </button>
                </div>
                
                {/* Hover overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-50 to-black/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            ))}
          </div>
          
          {/* View All Services CTA */}
          <div className="text-center mt-10">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4">
              <Link href="/services">
                <Button size="lg" variant="outline" className="border-2 border-gray-300 text-gray-700 hover:border-red-500 hover:text-red-600 hover:bg-red-50 transition-all duration-300 transform hover:scale-105">
                  <Globe className="mr-2 h-4 w-4" />
                  View All Services
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <div className="text-sm text-gray-500">
                <span className="font-medium text-green-600">15+</span> services available
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-black to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-xl text-blue-100">Happy Customers 😊</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">25,000+</div>
              <div className="text-xl text-blue-100">Documents Processed 📄</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.9/5</div>
              <div className="text-xl text-blue-100">Customer Rating ⭐</div>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to get started? 🚀
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied customers who trust us with their important documents.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-3">
                Create Free Account 🆓
              </Button>
            </Link>
            <Link href="/services">
              <Button size="lg" variant="outline" className="text-lg px-8 py-3 border-white text-white hover:bg-white hover:text-gray-900">
                Browse Services 👀
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
