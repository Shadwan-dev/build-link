// app/api/products/route.ts
import { NextRequest, NextResponse } from 'next/server';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '@/src/lib/firebase';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category');
    const limitCount = parseInt(searchParams.get('limit') || '50');

    let productsQuery;
    const productsRef = collection(db, 'products');

    if (category && category !== 'all') {
      productsQuery = query(
        productsRef,
        where('category', '==', category),
        where('active', '==', true),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
    } else {
      productsQuery = query(
        productsRef,
        where('active', '==', true),
        orderBy('createdAt', 'desc'),
        limit(limitCount)
      );
    }

    const snapshot = await getDocs(productsQuery);
    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({
      success: true,
      products,
      count: products.length,
    });
  } catch (error) {
    console.error('Error obteniendo productos:', error);
    return NextResponse.json(
      { success: false, error: 'Error al obtener productos' },
      { status: 500 }
    );
  }
}
