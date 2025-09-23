import Image from "next/image";

export default function ImageLayer() {
  return (
    <div className="relative w-full h-64 sm:h-72 md:h-96 lg:h-[400px]">
      <Image
        src="/images/hero-bg.png"
        alt="Background"
        fill
        priority
        className="object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/30 flex items-center justify-center transition-colors">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white dark:text-gray-100 text-center px-4">
          Find Your Dream Property
        </h1>
      </div>
    </div>
  );
}
