"use client";
import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.back()} className="mb-4 text-blue-600 hover:underline">&larr; Back to Products</button>
  );
}
