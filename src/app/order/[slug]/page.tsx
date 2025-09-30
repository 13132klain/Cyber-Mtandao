'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { services, sampleFormFields } from '@/lib/seed-data';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeft, Upload, FileText, CreditCard, CheckCircle, Clock, Shield, Smartphone, AlertCircle, Info } from 'lucide-react';
import Link from 'next/link';

export default function OrderPage() {
  const params = useParams();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [service, setService] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    if (params.slug) {
      const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
      const foundService = services.find(s => 
        s.title.toLowerCase().replace(/\s+/g, '-') === slug
      );
      setService(foundService);
    }
  }, [params.slug]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(step + 1);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handlePayment = async () => {
    if (!phoneNumber || !service) return;

    try {
      // First create the order
      const orderResponse = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user?.getIdToken()}`,
        },
        body: JSON.stringify({
          serviceId: service.title.toLowerCase().replace(/\s+/g, '-'),
          service,
          formData,
          files: uploadedFiles.map(f => ({ name: f.name, size: f.size, type: f.type })),
          totalAmount: service.price,
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      // Initiate MPesa payment
      const paymentResponse = await fetch('/api/mpesa/stk-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber,
          amount: service.price,
          accountReference: orderData.orderId,
          transactionDesc: `Payment for ${service.title}`,
        }),
      });

      const paymentData = await paymentResponse.json();

      if (paymentData.success) {
        alert(`Payment request sent! Please check your phone for the MPesa prompt. Order ID: ${orderData.orderId}`);
        // Redirect to orders page or success page
        router.push('/orders');
      } else {
        alert(`Payment failed: ${paymentData.message}`);
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment processing failed. Please try again.');
    }
  };

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

  const formFields = sampleFormFields[service.title.toLowerCase().replace(/\s+/g, '') as keyof typeof sampleFormFields] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-red-50 to-green-50 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-10 left-10 w-48 h-48 bg-gradient-to-br from-black/5 to-red-50 rounded-full blur-3xl opacity-20"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <Link href="/services">
              <Button variant="ghost" size="sm" className="hover:bg-red-50 hover:text-red-600 transition-colors duration-300">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Services
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              {[1, 2, 3].map((stepNumber) => (
                <div
                  key={stepNumber}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                    step >= stepNumber
                      ? 'bg-gradient-to-r from-red-600 to-black text-white shadow-lg scale-110'
                      : 'bg-white border-2 border-gray-200 text-gray-600'
                  }`}
                >
                  {step > stepNumber ? <CheckCircle className="h-5 w-5" /> : stepNumber}
                </div>
              ))}
            </div>
          </div>
          
          {/* Progress Description */}
          <div className="mt-4 text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white rounded-full shadow-sm border border-gray-200">
              {step === 1 && (
                <>
                  <FileText className="h-4 w-4 text-red-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Service Information</span>
                </>
              )}
              {step === 2 && (
                <>
                  <Upload className="h-4 w-4 text-red-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Upload Documents</span>
                </>
              )}
              {step === 3 && (
                <>
                  <CreditCard className="h-4 w-4 text-red-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Payment & Review</span>
                </>
              )}
            </div>
          </div>
        </div>

        {step === 1 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-600 to-black rounded-lg text-white shadow-md mr-4">
                  <FileText className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{service.title}</h2>
                  <p className="text-gray-600 text-sm">Please fill in the required information</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-red-50 to-green-50 border border-red-100 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                      {formatCurrency(service.price)}
                    </span>
                    <div className="flex items-center text-sm text-gray-600 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {service.estimatedTime}
                    </div>
                  </div>
                  <div className="flex items-center text-sm text-green-600">
                    <Shield className="h-4 w-4 mr-1" />
                    Secure Process
                  </div>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              {formFields.map((field: any, index: number) => (
                <div key={index} className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-red-500 transition-colors duration-300"
                      rows={3}
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                      required={field.required}
                    />
                  ) : field.type === 'select' ? (
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg focus:border-red-500 focus:ring-red-500 transition-colors duration-300"
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                      required={field.required}
                    >
                      <option value="">Select {field.label}</option>
                      {field.options?.map((option: string) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      type={field.type}
                      value={formData[field.name] || ''}
                      onChange={(e) => setFormData(prev => ({ ...prev, [field.name]: e.target.value }))}
                      required={field.required}
                      className="focus:border-red-500 focus:ring-red-500"
                    />
                  )}
                </div>
              ))}
              <Button type="submit" className="w-full bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900 py-3 text-base font-medium transition-all duration-300 transform hover:scale-105">
                Continue to File Upload 📄
              </Button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-600 to-black rounded-lg text-white shadow-md mr-4">
                  <Upload className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Upload Documents</h2>
                  <p className="text-gray-600 text-sm">Upload all required documents for your service</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 hover:border-red-400 rounded-xl p-8 text-center transition-colors duration-300 hover:bg-red-50/50">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="space-y-2">
                  <p className="text-lg font-medium text-gray-900">Drop files here or click to upload</p>
                  <p className="text-sm text-gray-500">PDF, JPG, PNG, DOC, DOCX (Max 10MB)</p>
                </div>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={handleFileUpload}
                  className="mt-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gradient-to-r file:from-red-600 file:to-black file:text-white hover:file:from-red-700 hover:file:to-gray-900 transition-all duration-300"
                />
              </div>

              {uploadedFiles.length > 0 && (
                <div className="space-y-3">
                  <h4 className="font-medium text-gray-900">Uploaded Files ({uploadedFiles.length})</h4>
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                      <div className="flex items-center space-x-3">
                        <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-br from-red-600 to-black rounded-lg text-white">
                          <FileText className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{file.name}</p>
                          <p className="text-xs text-gray-500">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setUploadedFiles(prev => prev.filter((_, i) => i !== index))}
                        className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)} className="border-gray-300 hover:border-red-500 hover:text-red-600">
                  ← Back
                </Button>
                <Button 
                  onClick={() => setStep(3)}
                  disabled={uploadedFiles.length === 0}
                  className="bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900 transition-all duration-300 transform hover:scale-105"
                >
                  Continue to Payment 💳
                </Button>
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-600 to-black rounded-lg text-white shadow-md mr-4">
                  <FileText className="h-6 w-6" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100">
                  <div>
                    <span className="font-medium text-gray-900">{service.title}</span>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {service.estimatedTime}
                    </div>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">{formatCurrency(service.price)}</span>
                </div>
                <div className="bg-gradient-to-r from-red-50 to-green-50 border border-red-100 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                      {formatCurrency(service.price)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex items-center mb-4">
                <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-lg text-white shadow-md mr-3">
                  <Smartphone className="h-5 w-5" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Pay with M-Pesa</h2>
              </div>
              
              <div className="space-y-4">
                {/* Phone Number Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Phone Number
                    <span className="text-red-500 ml-1">*</span>
                  </label>
                  
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                      <span className="text-sm text-gray-500">+254</span>
                    </div>
                    <Input
                      type="tel"
                      placeholder="700123456"
                      value={phoneNumber.replace(/^254/, '')}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        if (value.length <= 9) {
                          setPhoneNumber('254' + value);
                        }
                      }}
                      className="pl-16 focus:border-green-500 focus:ring-green-500"
                      maxLength={9}
                    />
                  </div>
                  
                  {phoneNumber && phoneNumber.length > 3 && phoneNumber.length < 12 && (
                    <p className="text-xs text-orange-600">Enter 9 digits (e.g., 700123456)</p>
                  )}
                </div>
                
                {/* Simple Instructions */}
                <div className="bg-blue-50 rounded-lg p-3">
                  <p className="text-sm text-blue-800">
                    You'll receive an M-Pesa prompt on your phone to complete payment
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4">
              <Button 
                variant="outline" 
                onClick={() => setStep(2)} 
                className="border-gray-300 hover:border-red-500 hover:text-red-600"
              >
                ← Back
              </Button>
              
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-1">Total Amount</p>
                <Button 
                  size="lg" 
                  onClick={handlePayment} 
                  className="bg-green-600 hover:bg-green-700 text-white font-semibold"
                  disabled={!phoneNumber || phoneNumber.length !== 12}
                >
                  Pay {formatCurrency(service.price)}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}