import { NextRequest, NextResponse } from 'next/server';
import { updateOrder } from '@/lib/firestore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('MPesa Callback received:', JSON.stringify(body, null, 2));

    const { Body } = body;
    if (!Body || !Body.stkCallback) {
      return NextResponse.json({ error: 'Invalid callback data' }, { status: 400 });
    }

    const { stkCallback } = Body;
    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc } = stkCallback;

    // Extract transaction details if payment was successful
    let transactionDetails = {};
    if (ResultCode === 0 && stkCallback.CallbackMetadata) {
      const items = stkCallback.CallbackMetadata.Item;
      
      for (const item of items) {
        switch (item.Name) {
          case 'Amount':
            transactionDetails = { ...transactionDetails, amount: item.Value };
            break;
          case 'MpesaReceiptNumber':
            transactionDetails = { ...transactionDetails, mpesaReceiptNumber: item.Value };
            break;
          case 'TransactionDate':
            transactionDetails = { ...transactionDetails, transactionDate: item.Value };
            break;
          case 'PhoneNumber':
            transactionDetails = { ...transactionDetails, phoneNumber: item.Value };
            break;
        }
      }
    }

    // Update order status based on payment result
    const paymentStatus = ResultCode === 0 ? 'completed' : 'failed';
    const orderStatus = ResultCode === 0 ? 'paid' : 'payment_pending';

    // Find and update the order (you'll need to implement order lookup by MerchantRequestID)
    // For now, we'll log the callback data
    console.log('Payment Status:', paymentStatus);
    console.log('Transaction Details:', transactionDetails);

    // TODO: Update order in Firestore
    // await updateOrder(orderId, {
    //   paymentStatus,
    //   status: orderStatus,
    //   paymentDetails: {
    //     method: 'mpesa',
    //     transactionId: MerchantRequestID,
    //     ...transactionDetails,
    //     processedAt: new Date(),
    //   },
    // });

    // Send response to MPesa
    return NextResponse.json({ 
      ResultCode: 0, 
      ResultDesc: 'Callback processed successfully' 
    });

  } catch (error) {
    console.error('MPesa callback error:', error);
    return NextResponse.json(
      { ResultCode: 1, ResultDesc: 'Callback processing failed' },
      { status: 500 }
    );
  }
}

// Handle GET requests (for testing)
export async function GET() {
  return NextResponse.json({ 
    message: 'MPesa callback endpoint is active',
    timestamp: new Date().toISOString()
  });
}