import Image from 'next/image';

export function ProductCarousel({ images }: { images: string[] }) {
  // Simple carousel: show all images in a horizontal scroll
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {images.map((img, idx) => (
        <Image key={idx} src={img} alt={`Product image ${idx + 1}`} width={300} height={200} className="rounded object-cover" />
      ))}
    </div>
  );
}
