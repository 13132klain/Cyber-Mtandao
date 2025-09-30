'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { services } from '@/lib/seed-data';
import { formatCurrency } from '@/lib/utils';
import Link from 'next/link';
import { ArrowLeft, Clock, CheckCircle, FileText, Shield, CreditCard } from 'lucide-react';

export default function ServiceDetailPage() {
  const params = useParams();
  const [service, setService] = useState<typeof services[0] | null>(null);

  useEffect(() => {
    if (params.slug) {
      const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
      const foundService = services.find(s => 
        s.title.toLowerCase().replace(/\s+/g, '-') === slug
      );
      setService(foundService || null);
    }
  }, [params.slug]);

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Service not found</h2>
          <Link href="/services">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/services" className="inline-block mb-6">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Services
          </Button>
        </Link>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <Badge variant="outline" className="mb-2">
                  {service.category}
                </Badge>
                <CardTitle className="text-2xl">{service.title}</CardTitle>
                <CardDescription className="text-base mt-2">
                  {service.description}
                </CardDescription>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {formatCurrency(service.price)}
                </div>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Clock className="h-4 w-4 mr-1" />
                  {service.estimatedTime}
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center">
                  <FileText className="mr-2 h-5 w-5" />
                  Required Documents
                </h3>
                <ul className="space-y-2">
                  {service.requirements.map((req: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      {req}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600 mb-2" />
                  <h4 className="font-medium mb-2">Secure Process</h4>
                  <ul className="text-sm space-y-1">
                    <li>• End-to-end encryption</li>
                    <li>• Professional processing</li>
                    <li>• Money-back guarantee</li>
                  </ul>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <CreditCard className="h-6 w-6 text-blue-600 mb-2" />
                  <h4 className="font-medium mb-2">Payment</h4>
                  <ul className="text-sm space-y-1">
                    <li>• MPesa STK Push</li>
                    <li>• Secure processing</li>
                    <li>• Digital receipts</li>
                  </ul>
                </div>
              </div>

              <div className="text-center pt-4">
                <Link href={`/order/${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Button size="lg" className="px-8">
                    Order Now - {formatCurrency(service.price)}
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}