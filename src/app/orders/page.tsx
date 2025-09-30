'use client';

import { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Clock, 
  CheckCircle,
  AlertCircle,
  XCircle,
  RefreshCw,
  FileText,
  CreditCard
} from 'lucide-react';
import { formatCurrency, formatDate, getStatusColor, getStatusText } from '@/lib/utils';
import { Order } from '@/types';

// Mock data for demonstration
const mockOrders: Order[] = [
  {
    id: 'ORD-1',
    userId: 'user1',
    serviceId: 'kra-pin',
    service: {
      id: 'kra-pin',
      title: 'KRA PIN Registration',
      description: 'Get your Kenya Revenue Authority PIN',
      category: 'Government Services',
      price: 300,
      estimatedTime: '1-2 business days',
      requirements: [],
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: 'completed',
    paymentStatus: 'completed',
    totalAmount: 300,
    files: [],
    completedFiles: [
      {
        id: 'file1',
        name: 'KRA_PIN_Certificate.pdf',
        url: '#',
        size: 250000,
        type: 'application/pdf',
        uploadedAt: new Date(),
      }
    ],
    formData: { fullName: 'John Doe', idNumber: '12345678' },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-17'),
    completedAt: new Date('2024-01-17'),
  },
  {
    id: 'ORD-2',
    userId: 'user1',
    serviceId: 'nhif',
    service: {
      id: 'nhif',
      title: 'NHIF Registration',
      description: 'Register for National Hospital Insurance Fund',
      category: 'Government Services',
      price: 250,
      estimatedTime: '2-3 business days',
      requirements: [],
      active: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    status: 'in_progress',
    paymentStatus: 'completed',
    totalAmount: 250,
    files: [],
    completedFiles: [],
    formData: { fullName: 'John Doe', idNumber: '12345678' },
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18'),
  },
];

export default function OrdersPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Load mock data for demonstration
    setOrders(mockOrders);
  }, []);

  useEffect(() => {
    let filtered = orders;

    if (searchTerm) {
      filtered = filtered.filter(order =>
        order.service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter);
    }

    setFilteredOrders(filtered);
  }, [orders, searchTerm, statusFilter]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'in_progress':
        return <RefreshCw className="h-4 w-4 text-blue-600" />;
      case 'pending':
      case 'payment_pending':
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-600" />;
    }
  };

  const handleDownload = (file: any) => {
    // In a real app, this would download the file
    alert(`Downloading ${file.name}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Orders</h1>
          <p className="text-gray-600">Track and manage your service orders</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-6 flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant={statusFilter === 'all' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('all')}
              size="sm"
            >
              All Orders
            </Button>
            <Button
              variant={statusFilter === 'pending' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('pending')}
              size="sm"
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === 'in_progress' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('in_progress')}
              size="sm"
            >
              In Progress
            </Button>
            <Button
              variant={statusFilter === 'completed' ? 'default' : 'outline'}
              onClick={() => setStatusFilter('completed')}
              size="sm"
            >
              Completed
            </Button>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filters'
                  : 'You haven\'t placed any orders yet'
                }
              </p>
              {!searchTerm && statusFilter === 'all' && (
                <Button onClick={() => router.push('/services')}>
                  Browse Services
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {order.service.title}
                          </h3>
                          <p className="text-sm text-gray-500">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">
                            Ordered on {formatDate(order.createdAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-semibold text-blue-600 mb-1">
                            {formatCurrency(order.totalAmount)}
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(order.status)}>
                              <div className="flex items-center space-x-1">
                                {getStatusIcon(order.status)}
                                <span>{getStatusText(order.status)}</span>
                              </div>
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Service Details</h4>
                          <p className="text-sm text-gray-600">{order.service.description}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-2">Payment Status</h4>
                          <div className="flex items-center space-x-2">
                            <CreditCard className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">
                              {order.paymentStatus === 'completed' ? 'Paid' : 'Pending Payment'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Progress Indicator */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>
                            {order.status === 'completed' 
                              ? '100%' 
                              : order.status === 'in_progress' 
                              ? '50%' 
                              : '25%'
                            }
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              order.status === 'completed' 
                                ? 'bg-green-600 w-full' 
                                : order.status === 'in_progress' 
                                ? 'bg-blue-600 w-1/2' 
                                : 'bg-yellow-600 w-1/4'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Completed Files */}
                      {order.completedFiles.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-sm font-medium text-gray-700 mb-2">
                            Completed Documents ({order.completedFiles.length})
                          </h4>
                          <div className="space-y-2">
                            {order.completedFiles.map((file) => (
                              <div key={file.id} className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                                <div className="flex items-center space-x-2">
                                  <FileText className="h-4 w-4 text-green-600" />
                                  <span className="text-sm font-medium">{file.name}</span>
                                  <span className="text-xs text-gray-500">
                                    {(file.size / 1024).toFixed(1)} KB
                                  </span>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={() => handleDownload(file)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Download className="h-3 w-3 mr-1" />
                                  Download
                                </Button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Actions */}
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                        {order.status === 'payment_pending' && (
                          <Button size="sm">
                            <CreditCard className="h-3 w-3 mr-1" />
                            Pay Now
                          </Button>
                        )}
                        {order.status === 'completed' && (
                          <Button variant="outline" size="sm">
                            <Download className="h-3 w-3 mr-1" />
                            Download Receipt
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}