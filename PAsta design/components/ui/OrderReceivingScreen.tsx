import React from 'react';
import { Button } from './ui/button';
import { MapPin, Clock, Package, DollarSign } from 'lucide-react';

interface OrderReceivingScreenProps {
  onAcceptOrder: () => void;
}

export function OrderReceivingScreen({ onAcceptOrder }: OrderReceivingScreenProps) {
  const mockOrder = {
    id: 'ORD-001',
    pickupAddress: 'Av. Julius Nyerere, 123',
    deliveryAddress: 'Av. Eduardo Mondlane, 456',
    date: '2024-12-20',
    time: '14:30',
    description: 'Caixas de produtos eletrónicos',
    amount: 2500,
    distance: '15 km'
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      {/* Header */}
      <div className="pt-12 pb-8">
        <h1 className="text-2xl font-semibold text-center mb-2 text-black">Novo Pedido</h1>
        <p className="text-base text-gray-600 text-center">
          Pedido #{mockOrder.id}
        </p>
      </div>

      <div className="flex-1 space-y-6">
        {/* Order Details */}
        <div className="bg-gray-50 p-4 rounded-xl space-y-4">
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-green-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-black">Coleta</p>
              <p className="text-sm text-gray-600">{mockOrder.pickupAddress}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <MapPin size={20} className="text-red-500 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-black">Entrega</p>
              <p className="text-sm text-gray-600">{mockOrder.deliveryAddress}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Clock size={20} className="text-orange-500" />
            <p className="text-sm">{mockOrder.date} às {mockOrder.time}</p>
          </div>
          
          <div className="flex items-start gap-3">
            <Package size={20} className="text-purple-500" />
            <div>
              <p className="text-sm font-medium text-black">Carga</p>
              <p className="text-sm text-gray-600">{mockOrder.description}</p>
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="bg-green-50 border-2 border-green-200 p-4 rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <DollarSign size={20} className="text-green-600" />
            <p className="font-semibold text-black">Informações de pagamento</p>
          </div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Valor total:</span>
              <span className="font-semibold">{mockOrder.amount} MT</span>
            </div>
            <div className="flex justify-between">
              <span>Sua comissão (15%):</span>
              <span className="font-semibold text-green-600">{mockOrder.amount * 0.15} MT</span>
            </div>
            <div className="flex justify-between">
              <span>Distância:</span>
              <span>{mockOrder.distance}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button
            onClick={onAcceptOrder}
            className="w-full py-4 bg-green-600 text-white hover:bg-green-700 transition-colors rounded-xl font-bold"
          >
            Aceitar Pedido
          </Button>
          
          <Button
            className="w-full py-4 border-2 border-red-500 text-red-500 bg-transparent hover:bg-red-50 transition-colors rounded-xl font-bold"
          >
            Recusar Pedido
          </Button>
        </div>
      </div>
    </div>
  );
}