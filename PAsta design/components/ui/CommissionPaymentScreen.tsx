import React from 'react';
import { Button } from './ui/button';
import { DollarSign, CheckCircle, Calendar } from 'lucide-react';

interface CommissionPaymentScreenProps {
  onPaymentSent: () => void;
}

export function CommissionPaymentScreen({ onPaymentSent }: CommissionPaymentScreenProps) {
  const mockPayment = {
    amount: 375, // 15% of 2500
    week: 'Semana de 16-22 Dezembro',
    orders: 1,
    totalEarnings: 2125 // 2500 - 375
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      {/* Header */}
      <div className="pt-12 pb-8">
        <h1 className="text-2xl font-semibold text-center mb-2 text-black">Pagamento de Comissão</h1>
        <p className="text-base text-gray-600 text-center">
          {mockPayment.week}
        </p>
      </div>

      <div className="flex-1 space-y-6">
        {/* Payment Summary */}
        <div className="bg-orange-50 border-2 border-orange-200 p-6 rounded-xl">
          <div className="text-center space-y-2">
            <DollarSign size={48} className="text-orange-500 mx-auto" />
            <h2 className="text-3xl font-bold text-black">{mockPayment.amount} MT</h2>
            <p className="text-sm text-gray-600">Comissão a pagar</p>
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-black mb-3">Resumo semanal</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Pedidos completados:</span>
              <span className="font-semibold">{mockPayment.orders}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Total faturado:</span>
              <span className="font-semibold">2500 MT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Seus ganhos:</span>
              <span className="font-semibold text-green-600">{mockPayment.totalEarnings} MT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Comissão (15%):</span>
              <span className="font-semibold text-orange-500">{mockPayment.amount} MT</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-3">
          <h3 className="font-semibold text-black">Método de pagamento</h3>
          <div className="bg-gray-50 p-4 rounded-xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign size={20} className="text-blue-600" />
              </div>
              <div>
                <p className="font-medium">M-Pesa</p>
                <p className="text-sm text-gray-600">84 123 4567</p>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-blue-50 p-4 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <Calendar size={20} className="text-blue-600" />
            <p className="font-semibold text-black">Próximo pagamento</p>
          </div>
          <p className="text-sm text-gray-600">Segunda-feira, 23 de Dezembro às 09:00</p>
        </div>
      </div>

      <Button
        onClick={onPaymentSent}
        className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors rounded-xl font-bold"
      >
        <CheckCircle size={20} className="mr-2" />
        Confirmar Pagamento
      </Button>
    </div>
  );
}