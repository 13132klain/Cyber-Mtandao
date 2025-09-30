import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-KE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

export function formatPhone(phone: string): string {
  // Format Kenyan phone numbers
  let cleaned = phone.replace(/\D/g, '');
  
  // If starts with 0, replace with 254
  if (cleaned.startsWith('0')) {
    cleaned = '254' + cleaned.slice(1);
  }
  
  // If doesn't start with 254, add it
  if (!cleaned.startsWith('254')) {
    cleaned = '254' + cleaned;
  }
  
  return cleaned;
}

export function generateReferralCode(userId: string): string {
  const prefix = 'CYBER';
  const suffix = userId.slice(-4).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}${suffix}${random}`;
}

export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  return `ORD-${timestamp}-${random}`.toUpperCase();
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'payment_pending':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'paid':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'in_progress':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'completed':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'refunded':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function getStatusText(status: string): string {
  switch (status.toLowerCase()) {
    case 'pending':
      return 'Pending';
    case 'payment_pending':
      return 'Payment Pending';
    case 'paid':
      return 'Paid';
    case 'in_progress':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    case 'refunded':
      return 'Refunded';
    default:
      return status;
  }
}

export function validateKenyanPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, '');
  
  // Check if it's a valid Kenyan phone number
  // Format: 254XXXXXXXXX (12 digits) or 0XXXXXXXXX (10 digits)
  
  // For international format (254XXXXXXXXX)
  if (cleaned.startsWith('254') && cleaned.length === 12) {
    const localPart = cleaned.substring(3); // Remove 254
    return isValidKenyanLocalNumber(localPart);
  }
  
  // For local format (0XXXXXXXXX)
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    const localPart = cleaned.substring(1); // Remove 0
    return isValidKenyanLocalNumber(localPart);
  }
  
  return false;
}

// Helper function to validate the local part of Kenyan phone numbers
function isValidKenyanLocalNumber(localPart: string): boolean {
  if (localPart.length !== 9) return false;
  
  // Kenyan mobile numbers start with:
  // 7XX - Safaricom, Airtel
  // 1XX - Safaricom, Airtel (some ranges)
  // Check first digit
  const firstDigit = localPart[0];
  
  // Most common: 7XX numbers (700-799)
  if (firstDigit === '7') {
    return true;
  }
  
  // Some 1XX numbers are valid
  if (firstDigit === '1') {
    const secondDigit = localPart[1];
    // 10X, 11X are common ranges
    if (secondDigit === '0' || secondDigit === '1') {
      return true;
    }
  }
  
  return false;
}

export function validateKenyanID(id: string): boolean {
  const cleaned = id.replace(/\D/g, '');
  return cleaned.length >= 7 && cleaned.length <= 8;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function getFileExtension(filename: string): string {
  return filename.split('.').pop()?.toLowerCase() || '';
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}