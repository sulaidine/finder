import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { MapPin, Calendar, Clock, Package } from 'lucide-react';

interface CreateOrderScreenProps {
  onOrderCreate: (orderData: any) => void;
}

export function CreateOrderScreen({ onOrderCreate }: CreateOrderScreenProps) {
  const [orderData, setOrderData] = useState({
    pickupAddress: '',
    deliveryAddress: '',
    date: '',
    time: '',
    description: ''
  });

  const handleSubmit = () => {
    if (orderData.pickupAddress && orderData.deliveryAddress && orderData.date && orderData.time) {
      onOrderCreate(orderData);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      {/* Header */}
      <div className="pt-12 pb-8">
        <h1 className="text-2xl font-semibold text-center mb-2 text-black">Criar Pedido</h1>
        <p className="text-base text-gray-600 text-center">
          Preencha os detalhes da sua entrega
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6">
        <div className="space-y-4">
          {/* Pickup Address */}
          <div className="space-y-2">
            <Label className="text-sm text-black font-medium flex items-center gap-2">
              <MapPin size={16} className="text-orange-500" />
              Endereço de coleta
            </Label>
            <Input
              type="text"
              placeholder="Digite o endereço de coleta"
              value={orderData.pickupAddress}
              onChange={(e) => setOrderData({...orderData, pickupAddress: e.target.value})}
              className="py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500"
            />
          </div>

          {/* Delivery Address */}
          <div className="space-y-2">
            <Label className="text-sm text-black font-medium flex items-center gap-2">
              <MapPin size={16} className="text-orange-500" />
              Endereço de entrega
            </Label>
            <Input
              type="text"
              placeholder="Digite o endereço de entrega"
              value={orderData.deliveryAddress}
              onChange={(e) => setOrderData({...orderData, deliveryAddress: e.target.value})}
              className="py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500"
            />
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-sm text-black font-medium flex items-center gap-2">
                <Calendar size={16} className="text-orange-500" />
                Data
              </Label>
              <Input
                type="date"
                value={orderData.date}
                onChange={(e) => setOrderData({...orderData, date: e.target.value})}
                className="py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm text-black font-medium flex items-center gap-2">
                <Clock size={16} className="text-orange-500" />
                Hora
              </Label>
              <Input
                type="time"
                value={orderData.time}
                onChange={(e) => setOrderData({...orderData, time: e.target.value})}
                className="py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label className="text-sm text-black font-medium flex items-center gap-2">
              <Package size={16} className="text-orange-500" />
              Descrição da carga
            </Label>
            <Input
              type="text"
              placeholder="Descreva o que será transportado"
              value={orderData.description}
              onChange={(e) => setOrderData({...orderData, description: e.target.value})}
              className="py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="pt-6">
        <Button
          onClick={handleSubmit}
          disabled={!orderData.pickupAddress || !orderData.deliveryAddress || !orderData.date || !orderData.time}
          className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold"
        >
          Buscar Motoristas
        </Button>
      </div>
    </div>
  );
}