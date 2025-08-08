import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Phone, Truck, MapPin, Clock, CheckCircle } from 'lucide-react';

interface SearchTrucksScreenProps {
  orderData: any;
  onDriverFound: (driverData: any) => void;
}

export function SearchTrucksScreen({ orderData, onDriverFound }: SearchTrucksScreenProps) {
  const [searching, setSearching] = useState(true);
  const [driverFound, setDriverFound] = useState(false);

  const mockDriver = {
    name: 'João Silva',
    truckType: 'Caminhão Médio',
    license: 'TRK-1234',
    eta: '15 minutos',
    phone: '+258 84 123 4567',
  };

  useEffect(() => {
    // Simulate searching for drivers
    const timer = setTimeout(() => {
      setSearching(false);
      setDriverFound(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleAcceptDriver = () => {
    onDriverFound(mockDriver);
  };

  if (searching) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        {/* Header */}
        <div className="pt-6 pb-4 px-6 border-b border-gray-100">
          <h1 className="text-2xl font-semibold text-center text-black">Procurando Motoristas</h1>
        </div>

        {/* Searching Animation */}
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="w-32 h-32 mb-8 relative">
            <div className="w-32 h-32 border-4 border-gray-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-32 h-32 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          <div className="text-center space-y-4">
            <h2 className="text-xl font-semibold text-black">
              Aguardando motoristas disponíveis...
            </h2>
            <p className="text-base text-gray-600">
              Enviamos sua solicitação para todos os motoristas da região
            </p>
          </div>

          {/* Order Summary */}
          <div className="w-full mt-8 bg-gray-50 p-4 rounded-xl">
            <h3 className="font-semibold text-black mb-3">Resumo do pedido</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="text-orange-500 mt-0.5" />
                <div>
                  <p>De: {orderData?.pickupAddress || 'Endereço de coleta'}</p>
                  <p>Para: {orderData?.deliveryAddress || 'Endereço de entrega'}</p>
                </div>
              </div>
              {orderData?.date && orderData?.time && (
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-orange-500" />
                  <p>{orderData.date} às {orderData.time}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="pt-6 pb-4 px-6 border-b border-gray-100">
        <div className="flex items-center justify-center gap-2 mb-2">
          <CheckCircle size={24} className="text-green-600" />
          <h1 className="text-2xl font-semibold text-center text-black">Motorista Encontrado!</h1>
        </div>
      </div>

      {/* Driver Info */}
      <div className="flex-1 p-6 space-y-6">
        {/* Driver Card */}
        <div className="bg-green-50 border-2 border-green-200 p-6 rounded-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Truck size={24} className="text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-black">{mockDriver.name}</h3>
              <p className="text-gray-600">{mockDriver.truckType}</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Matrícula:</span>
              <span className="font-semibold">{mockDriver.license}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Tempo estimado:</span>
              <span className="font-semibold text-orange-500">{mockDriver.eta}</span>
            </div>
          </div>
        </div>

        {/* Contact Button */}
        <Button
          onClick={() => window.open(`tel:${mockDriver.phone}`)}
          className="w-full py-4 border-2 border-orange-500 text-orange-500 bg-transparent hover:bg-orange-50 transition-colors rounded-xl font-bold"
        >
          <Phone size={20} className="mr-2" />
          Ligar para Motorista
        </Button>
      </div>

      {/* Confirm Button */}
      <div className="p-6 border-t border-gray-100">
        <Button
          onClick={handleAcceptDriver}
          className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors rounded-xl font-bold"
        >
          Aceitar Motorista
        </Button>
      </div>
    </div>
  );
}