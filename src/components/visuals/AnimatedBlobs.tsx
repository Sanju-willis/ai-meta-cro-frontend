// src\components\visuals\AnimatedBlobs.tsx
'use client';

export default function AnimatedBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      <div className="absolute w-[600px] h-[600px] bg-purple-500 blur-[150px] opacity-30 rounded-full top-10 left-1/2 -translate-x-1/2 animate-pulse" />
      <div className="absolute w-[400px] h-[400px] bg-pink-500 blur-[120px] opacity-20 rounded-full bottom-0 right-10 animate-pulse" />
    </div>
  );
}
