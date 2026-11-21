'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiMaximize2, FiX, FiLayers, FiCode } from 'react-icons/fi';

interface ImagePlaceholderProps {
  src?: string;
  alt: string;
  aspect?: string;
  label?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function ImagePlaceholder({
  src,
  alt,
  label = 'Architecture & Systems Preview',
  width = 1200,
  height = 675,
  className = '',
}: ImagePlaceholderProps) {
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (src && !error) {
    return (
      <>
        <div
          onClick={() => setIsOpen(true)}
          className={`relative w-full aspect-video rounded-lg border border-gray-200/90 dark:border-slate-800 bg-[#090d14] overflow-hidden shadow-2xs cursor-zoom-in group/img ${className}`}
          title="Click to view full screenshot"
        >
          <Image
            src={src}
            alt={alt}
            width={width}
            height={height}
            onError={() => setError(true)}
            className="w-full h-full object-contain bg-[#090d14] transition-transform duration-300 group-hover/img:scale-[1.02]"
          />
          {/* Hover Badge */}
          <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded bg-black/75 backdrop-blur-xs text-[11px] font-mono text-white/95 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1.5 pointer-events-none border border-white/10 shadow-sm">
            <FiMaximize2 className="w-3 h-3 text-emerald-400" />
            <span>Enlarge</span>
          </div>
        </div>

        {/* Lightbox Modal */}
        {isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-6xl w-full bg-[#0a0d16] border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col"
            >
              {/* Modal Top Bar */}
              <div className="flex items-center justify-between px-5 py-3 border-b border-slate-800 bg-[#0f1422] text-xs font-medium text-gray-300">
                <span className="font-mono text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  {alt}
                </span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded hover:bg-slate-800 text-gray-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close image preview"
                >
                  <FiX className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Image */}
              <div className="p-3 sm:p-6 flex items-center justify-center bg-[#070a10]">
                <Image
                  src={src}
                  alt={alt}
                  width={1920}
                  height={1080}
                  className="w-auto h-auto max-h-[82vh] max-w-full rounded-lg object-contain border border-slate-800"
                />
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // Graceful fallback for components without screenshot assets
  return (
    <div
      className={`w-full aspect-video rounded-lg border border-gray-200/90 dark:border-slate-800 bg-gray-50/90 dark:bg-[#0a0d16] flex flex-col items-center justify-center p-6 text-center select-none ${className}`}
    >
      <div className="p-2.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-2">
        <FiLayers className="w-5 h-5" />
      </div>
      <span className="text-xs font-semibold text-gray-800 dark:text-gray-200 mb-1">
        {label}
      </span>
      <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400 flex items-center gap-1.5">
        <FiCode className="w-3.5 h-3.5 text-emerald-500" />
        Verified Project Implementation
      </span>
    </div>
  );
}
