import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
  serverTimestamp,
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './firebase';
import { 
  User, 
  Service, 
  Order, 
  OrderFile, 
  ReferralCode,
  ServiceCategory 
} from '@/types';

// Users
export const createUser = async (userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'users'), {
    ...userData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getUser = async (userId: string): Promise<User | null> => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as User;
  }
  return null;
};

export const updateUser = async (userId: string, updates: Partial<User>): Promise<void> => {
  const docRef = doc(db, 'users', userId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

// Services
export const getServices = async (): Promise<Service[]> => {
  const q = query(
    collection(db, 'services'),
    where('active', '==', true),
    orderBy('title', 'asc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Service[];
};

export const getService = async (serviceId: string): Promise<Service | null> => {
  const docRef = doc(db, 'services', serviceId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Service;
  }
  return null;
};

export const createService = async (serviceData: Omit<Service, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'services'), {
    ...serviceData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateService = async (serviceId: string, updates: Partial<Service>): Promise<void> => {
  const docRef = doc(db, 'services', serviceId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

// Orders
export const createOrder = async (orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'orders'), {
    ...orderData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getOrder = async (orderId: string): Promise<Order | null> => {
  const docRef = doc(db, 'orders', orderId);
  const docSnap = await getDoc(docRef);
  
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() } as Order;
  }
  return null;
};

export const getUserOrders = async (userId: string): Promise<Order[]> => {
  const q = query(
    collection(db, 'orders'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Order[];
};

export const getAllOrders = async (): Promise<Order[]> => {
  const q = query(
    collection(db, 'orders'),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as Order[];
};

export const updateOrder = async (orderId: string, updates: Partial<Order>): Promise<void> => {
  const docRef = doc(db, 'orders', orderId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp(),
  });
};

// File uploads
export const uploadFile = async (file: File, path: string): Promise<{ url: string; name: string; size: number }> => {
  const fileRef = ref(storage, path);
  const snapshot = await uploadBytes(fileRef, file);
  const url = await getDownloadURL(snapshot.ref);
  
  return {
    url,
    name: file.name,
    size: file.size,
  };
};

export const deleteFile = async (url: string): Promise<void> => {
  const fileRef = ref(storage, url);
  await deleteObject(fileRef);
};

// Referral codes
export const createReferralCode = async (codeData: Omit<ReferralCode, 'id' | 'createdAt'>): Promise<string> => {
  const docRef = await addDoc(collection(db, 'referralCodes'), {
    ...codeData,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
};

export const getReferralCode = async (code: string): Promise<ReferralCode | null> => {
  const q = query(
    collection(db, 'referralCodes'),
    where('code', '==', code),
    where('active', '==', true),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return { id: doc.id, ...doc.data() } as ReferralCode;
  }
  return null;
};

export const updateReferralCode = async (codeId: string, updates: Partial<ReferralCode>): Promise<void> => {
  const docRef = doc(db, 'referralCodes', codeId);
  await updateDoc(docRef, updates);
};

// Service categories
export const getServiceCategories = async (): Promise<ServiceCategory[]> => {
  const q = query(
    collection(db, 'serviceCategories'),
    where('active', '==', true),
    orderBy('sortOrder', 'asc')
  );
  const querySnapshot = await getDocs(q);
  
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as ServiceCategory[];
};

// Real-time listeners
export const subscribeToUserOrders = (
  userId: string,
  callback: (orders: Order[]) => void
): (() => void) => {
  const q = query(
    collection(db, 'orders'),
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
    callback(orders);
  });
};

export const subscribeToAllOrders = (
  callback: (orders: Order[]) => void
): (() => void) => {
  const q = query(
    collection(db, 'orders'),
    orderBy('createdAt', 'desc')
  );
  
  return onSnapshot(q, (querySnapshot) => {
    const orders = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Order[];
    callback(orders);
  });
};