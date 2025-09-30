export interface User {
  id: string;
  email: string;
  phone?: string;
  name: string;
  role: 'customer' | 'admin' | 'staff';
  createdAt: Date;
  updatedAt: Date;
  referralCode?: string;
  referredBy?: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  estimatedTime: string; // e.g., "1-2 business days"
  requirements: string[];
  active: boolean;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  userId: string;
  serviceId: string;
  service: Service;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  totalAmount: number;
  discountApplied?: number;
  referralCode?: string;
  files: OrderFile[];
  completedFiles: OrderFile[];
  formData: Record<string, any>;
  paymentDetails?: PaymentDetails;
  notes?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export type OrderStatus = 
  | 'pending'
  | 'payment_pending' 
  | 'paid'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';

export interface OrderFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

export interface PaymentDetails {
  method: 'mpesa' | 'stripe' | 'airtel';
  transactionId: string;
  phoneNumber?: string;
  amount: number;
  fees?: number;
  mpesaReceiptNumber?: string;
  processedAt: Date;
}

export interface ReferralCode {
  id: string;
  code: string;
  userId: string;
  discountPercentage: number;
  maxUses: number;
  currentUses: number;
  expiresAt?: Date;
  active: boolean;
  createdAt: Date;
}

export interface ServiceCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  active: boolean;
  sortOrder: number;
}

// Form data interfaces for different services
export interface KRAPinFormData {
  fullName: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
  county: string;
  constituency: string;
  ward: string;
}

export interface HELBFormData {
  fullName: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
  institutionName: string;
  courseOfStudy: string;
  yearOfStudy: string;
  admissionNumber: string;
}

export interface NHIFFormData {
  fullName: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
  employer?: string;
  county: string;
  dependents: {
    name: string;
    idNumber: string;
    relationship: string;
  }[];
}

export interface CVWritingFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  profession: string;
  experience: string;
  education: string;
  skills: string[];
  achievements: string;
  targetJob?: string;
}

export interface BusinessRegistrationFormData {
  businessName: string;
  businessType: 'sole_proprietorship' | 'partnership' | 'limited_company';
  ownerName: string;
  idNumber: string;
  phoneNumber: string;
  email: string;
  businessLocation: string;
  businessActivity: string;
  capitalAmount?: number;
}

// MPesa API Types
export interface MPesaSTKPushRequest {
  BusinessShortCode: string;
  Password: string;
  Timestamp: string;
  TransactionType: string;
  Amount: string;
  PartyA: string;
  PartyB: string;
  PhoneNumber: string;
  CallBackURL: string;
  AccountReference: string;
  TransactionDesc: string;
}

export interface MPesaSTKPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

export interface MPesaCallbackResponse {
  Body: {
    stkCallback: {
      MerchantRequestID: string;
      CheckoutRequestID: string;
      ResultCode: number;
      ResultDesc: string;
      CallbackMetadata?: {
        Item: Array<{
          Name: string;
          Value: string | number;
        }>;
      };
    };
  };
}