'use client';
import { useParams } from 'next/navigation';
import ProductForm from '@/components/ProductForm';

export default function EditProductPage() {
  const params = useParams();
  return <ProductForm mode="edit" id={params.id} />;
}
