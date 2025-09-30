import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/firestore';
import { generateOrderId } from '@/lib/utils';
// import { auth } from '@/lib/firebase'; // TODO: Implement auth middleware

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { 
      serviceId, 
      service, 
      formData, 
      files, 
      totalAmount, 
      discountApplied, 
      referralCode 
    } = body;

    // Get user from authorization header (implement proper auth middleware)
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // For now, we'll use a mock user ID
    const userId = 'mock-user-id'; // TODO: Extract from auth token

    // Generate order ID
    const orderId = generateOrderId();

    // Create order in Firestore
    const orderData = {
      userId,
      serviceId,
      service,
      status: 'pending' as const,
      paymentStatus: 'pending' as const,
      totalAmount,
      discountApplied: discountApplied || 0,
      referralCode: referralCode || undefined,
      files: files || [],
      completedFiles: [],
      formData,
      notes: '',
      adminNotes: '',
    };

    await createOrder(orderData);

    return NextResponse.json({
      success: true,
      orderId,
      message: 'Order created successfully',
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Create order error:', error);
    return NextResponse.json(
      { error: 'Failed to create order', message: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Get user orders - implement proper auth
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Mock response for now
    return NextResponse.json({
      orders: [],
      message: 'Orders retrieved successfully',
    });

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Failed to get orders', message: errorMessage },
      { status: 500 }
    );
  }
}