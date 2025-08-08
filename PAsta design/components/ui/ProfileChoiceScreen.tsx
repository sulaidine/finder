import React from 'react';
import { User, Truck } from 'lucide-react';
import { UserType } from '../App';

interface ProfileChoiceScreenProps {
  onSelectProfile: (type: UserType) => void;
}

export function ProfileChoiceScreen({ onSelectProfile }: ProfileChoiceScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      {/* Header */}
      <div className="pt-12 pb-8">
        <h1 className="text-2xl font-semibold text-center mb-2 text-black">Bem-vindo ao Truck Finder</h1>
        <p className="text-base text-gray-600 text-center">Você é cliente ou transportadora?</p>
      </div>

      {/* Profile Options */}
      <div className="flex-1 flex flex-col justify-center space-y-6">
        <div className="space-y-4">
          {/* Client Option */}
          <button
            onClick={() => onSelectProfile('client')}
            className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-orange-500 hover:bg-orange-50 transition-all group"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                <User size={32} className="text-gray-600 group-hover:text-orange-500" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-black mb-1">Cliente</h3>
                <p className="text-gray-600 text-sm">
                  Preciso enviar mercadorias
                </p>
              </div>
            </div>
          </button>

          {/* Transporter Option */}
          <button
            onClick={() => onSelectProfile('transporter')}
            className="w-full p-6 border-2 border-gray-200 rounded-2xl hover:border-orange-500 hover:bg-orange-50 transition-all group"
          >
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-orange-100 transition-colors">
                <Truck size={32} className="text-gray-600 group-hover:text-orange-500" />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-black mb-1">Transportadora</h3>
                <p className="text-gray-600 text-sm">
                  Ofereço serviços de transporte
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}