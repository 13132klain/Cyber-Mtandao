import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// MPesa Daraja API configuration
const MPESA_BASE_URL = process.env.MPESA_ENVIRONMENT === 'production' 
  ? 'https://api.safaricom.co.ke'
  : 'https://sandbox.safaricom.co.ke';

const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const PASSKEY = process.env.MPESA_PASSKEY;
const SHORTCODE = process.env.MPESA_SHORTCODE;

// Get OAuth token from MPesa
async function getAccessToken(): Promise<string> {
  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
  
  try {
    const response = await axios.get(`${MPESA_BASE_URL}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw new Error('Failed to get access token');
  }
}

// Generate timestamp for MPesa
function generateTimestamp(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}${month}${day}${hours}${minutes}${seconds}`;
}

// Generate password for MPesa
function generatePassword(shortcode: string, passkey: string, timestamp: string): string {
  const data = shortcode + passkey + timestamp;
  return Buffer.from(data).toString('base64');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { phoneNumber, amount, accountReference, transactionDesc } = body;

    // Validate required fields
    if (!phoneNumber || !amount) {
      return NextResponse.json(
        { error: 'Phone number and amount are required' },
        { status: 400 }
      );
    }

    // Format phone number (ensure it starts with 254)
    let formattedPhone = phoneNumber.replace(/\D/g, '');
    if (formattedPhone.startsWith('0')) {
      formattedPhone = '254' + formattedPhone.slice(1);
    }
    if (!formattedPhone.startsWith('254')) {
      formattedPhone = '254' + formattedPhone;
    }

    // Get access token
    const accessToken = await getAccessToken();
    
    // Generate timestamp and password
    const timestamp = generateTimestamp();
    const password = generatePassword(SHORTCODE!, PASSKEY!, timestamp);

    // Prepare STK Push request
    const stkPushData = {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.floor(amount),
      PartyA: formattedPhone,
      PartyB: SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: `${process.env.NEXTAUTH_URL}/api/mpesa/callback`,
      AccountReference: accountReference || 'CyberMtandao',
      TransactionDesc: transactionDesc || 'Payment for cyber services',
    };

    // Make STK Push request
    const response = await axios.post(
      `${MPESA_BASE_URL}/mpesa/stkpush/v1/processrequest`,
      stkPushData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.ResponseCode === '0') {
      return NextResponse.json({
        success: true,
        message: 'STK Push sent successfully',
        data: {
          CheckoutRequestID: response.data.CheckoutRequestID,
          ResponseCode: response.data.ResponseCode,
          ResponseDescription: response.data.ResponseDescription,
          CustomerMessage: response.data.CustomerMessage,
        },
      });
    } else {
      return NextResponse.json(
        { 
          error: 'STK Push failed', 
          message: response.data.ResponseDescription 
        },
        { status: 400 }
      );
    }
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorData = error instanceof Error && 'response' in error ? (error as { response?: { data?: unknown } }).response?.data : null;
    
    console.error('MPesa STK Push error:', errorData || errorMessage);
    
    return NextResponse.json(
      { 
        error: 'Payment processing failed', 
        message: (errorData && typeof errorData === 'object' && 'errorMessage' in errorData) ? (errorData as { errorMessage: string }).errorMessage : errorMessage
      },
      { status: 500 }
    );
  }
}