import React from 'react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface WelcomeScreenProps {
  onContinue: () => void;
}

export function WelcomeScreen({ onContinue }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      {/* Truck Image - 50% of screen height */}
      <div className="flex-1 flex items-center justify-center mb-8">
        <div className="w-full max-w-sm">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1566472515693-d8c8c8e0b3f7?q=80&w=800&auto=format&fit=crop"
            alt="Caminhão de carga com container laranja"
            className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-2xl shadow-lg"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center space-y-6">
        {/* Title */}
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-black leading-tight">
            Seu parceiro logístico para entregas sem complicações.
          </h1>
          
          {/* Subtitle */}
          <p className="text-base text-gray-600 leading-relaxed px-2">
            Nosso serviço de logística oferece soluções completas para todas as suas necessidades de envio.
          </p>
        </div>

        {/* Button */}
        <div className="pt-6">
          <Button
            onClick={onContinue}
            className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors rounded-xl font-bold"
          >
            Começar
          </Button>
        </div>
      </div>
    </div>
  );
}