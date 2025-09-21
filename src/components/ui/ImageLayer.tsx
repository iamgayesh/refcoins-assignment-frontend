import Image from "next/image";

export default function ImageLayer() {
  return (
    <div className="relative w-full h-[400px]">
      <Image
        src="/images/hero-bg.png" // put your hero image inside public/images
        alt="Background"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white text-center">
          Find Your Dream Property
        </h1>
      </div>
    </div>
  );
}
