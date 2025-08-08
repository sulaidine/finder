import React from 'react';
import { Button } from './ui/button';
import { BarChart, Users, DollarSign, Truck } from 'lucide-react';

interface ManagementSystemScreenProps {
  onSetupComplete: () => void;
}

export function ManagementSystemScreen({ onSetupComplete }: ManagementSystemScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      {/* Header */}
      <div className="pt-12 pb-8">
        <h1 className="text-2xl font-semibold text-center mb-2 text-black">Sistema de Gestão</h1>
        <p className="text-base text-gray-600 text-center">
          Seu painel de controle está pronto
        </p>
      </div>

      <div className="flex-1 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Truck size={20} className="text-blue-600" />
              <span className="text-sm font-medium">Viagens</span>
            </div>
            <p className="text-2xl font-bold text-black">0</p>
          </div>
          
          <div className="bg-green-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign size={20} className="text-green-600" />
              <span className="text-sm font-medium">Ganhos</span>
            </div>
            <p className="text-2xl font-bold text-black">0 MT</p>
          </div>
          
          <div className="bg-orange-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <Users size={20} className="text-orange-600" />
              <span className="text-sm font-medium">Clientes</span>
            </div>
            <p className="text-2xl font-bold text-black">0</p>
          </div>
          
          <div className="bg-purple-50 p-4 rounded-xl">
            <div className="flex items-center gap-2 mb-2">
              <BarChart size={20} className="text-purple-600" />
              <span className="text-sm font-medium">Rating</span>
            </div>
            <p className="text-2xl font-bold text-black">5.0</p>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <h3 className="font-semibold text-black">Funcionalidades disponíveis:</h3>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Truck size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-black">Receber Pedidos</p>
                <p className="text-sm text-gray-600">Aceite ou recuse pedidos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <DollarSign size={20} className="text-green-600" />
              </div>
              <div>
                <p className="font-medium text-black">Gestão Financeira</p>
                <p className="text-sm text-gray-600">Acompanhe seus ganhos</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Button
        onClick={onSetupComplete}
        className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors rounded-xl font-bold"
      >
        Começar a Receber Pedidos
      </Button>
    </div>
  );
}