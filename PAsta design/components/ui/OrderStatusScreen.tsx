import React from 'react';
import { Button } from './ui/button';
import { MapPin, Phone, MessageCircle, Clock } from 'lucide-react';

interface OrderStatusScreenProps {
  orderData: any;
  driverData: any;
}

export function OrderStatusScreen({ orderData, driverData }: OrderStatusScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="pt-6 pb-4 px-6 border-b border-gray-100">
        <h1 className="text-2xl font-semibold text-center text-black">Status do Pedido</h1>
        <div className="text-center mt-2">
          <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            Em andamento
          </span>
        </div>
      </div>

      <div className="flex-1 p-6 space-y-6">
        {/* Driver Info */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-black mb-3">Seu motorista</h3>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
              <span className="text-sm font-semibold">JS</span>
            </div>
            <div>
              <p className="font-medium">{driverData?.name || 'João Silva'}</p>
              <p className="text-sm text-gray-600">{driverData?.truckType || 'Caminhão Médio'}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              onClick={() => window.open(`tel:${driverData?.phone || '+258841234567'}`)}
              className="flex-1 py-2 border border-orange-500 text-orange-500 bg-transparent hover:bg-orange-50 transition-colors rounded-lg"
            >
              <Phone size={16} className="mr-1" />
              Ligar
            </Button>
            <Button
              onClick={() => window.open(`sms:${driverData?.phone || '+258841234567'}`)}
              className="flex-1 py-2 border border-orange-500 text-orange-500 bg-transparent hover:bg-orange-50 transition-colors rounded-lg"
            >
              <MessageCircle size={16} className="mr-1" />
              SMS
            </Button>
          </div>
        </div>

        {/* Tracking */}
        <div className="space-y-4">
          <h3 className="font-semibold text-black">Acompanhamento</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="font-medium">Pedido confirmado</p>
                <p className="text-sm text-gray-600">10:30</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="font-medium">Motorista a caminho</p>
                <p className="text-sm text-gray-600">10:45</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <Clock size={16} className="text-white" />
              </div>
              <div>
                <p className="font-medium">Coleta em andamento</p>
                <p className="text-sm text-gray-600">Agora</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="text-gray-500">Em trânsito</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <div>
                <p className="text-gray-500">Entregue</p>
              </div>
            </div>
          </div>
        </div>

        {/* Route Info */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-black mb-3">Rota</h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <MapPin size={16} className="text-green-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Coleta</p>
                <p className="text-sm text-gray-600">{orderData?.pickupAddress || 'Endereço de coleta'}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin size={16} className="text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">Entrega</p>
                <p className="text-sm text-gray-600">{orderData?.deliveryAddress || 'Endereço de entrega'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}