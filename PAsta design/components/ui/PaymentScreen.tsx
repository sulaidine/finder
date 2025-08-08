import React, { useState } from 'react';
import { Button } from './ui/button';
import { CreditCard, DollarSign, CheckCircle } from 'lucide-react';

interface PaymentScreenProps {
  orderData: any;
  onPaymentSent: () => void;
}

export function PaymentScreen({ orderData, onPaymentSent }: PaymentScreenProps) {
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const totalAmount = 2500; // Mock amount in MT

  const handlePayment = () => {
    if (paymentMethod) {
      // Simulate payment processing
      setTimeout(() => {
        onPaymentSent();
      }, 1000);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      {/* Header */}
      <div className="pt-12 pb-8">
        <h1 className="text-2xl font-semibold text-center mb-2 text-black">Pagamento</h1>
        <p className="text-base text-gray-600 text-center">
          Confirme os detalhes e efetue o pagamento
        </p>
      </div>

      {/* Payment Details */}
      <div className="flex-1 space-y-6">
        {/* Price Breakdown */}
        <div className="bg-gray-50 p-4 rounded-xl">
          <h3 className="font-semibold text-black mb-3">Resumo do pagamento</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Valor do frete:</span>
              <span className="text-sm">{totalAmount} MT</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Taxa de serviço:</span>
              <span className="text-sm">Incluída</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Total a pagar agora (50%):</span>
              <span className="text-orange-500">{totalAmount / 2} MT</span>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Restante será pago na entrega
            </p>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="space-y-4">
          <h3 className="font-semibold text-black">Método de pagamento</h3>
          
          <button
            onClick={() => setPaymentMethod('card')}
            className={`w-full p-4 border-2 rounded-xl transition-colors ${
              paymentMethod === 'card' 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <CreditCard size={24} className="text-gray-600" />
              <div className="text-left">
                <p className="font-medium">Cartão de Crédito/Débito</p>
                <p className="text-sm text-gray-600">Visa, Mastercard</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => setPaymentMethod('mobile')}
            className={`w-full p-4 border-2 rounded-xl transition-colors ${
              paymentMethod === 'mobile' 
                ? 'border-orange-500 bg-orange-50' 
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <DollarSign size={24} className="text-gray-600" />
              <div className="text-left">
                <p className="font-medium">Dinheiro Móvel</p>
                <p className="text-sm text-gray-600">M-Pesa, E-Mola</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Payment Button */}
      <div className="pt-6">
        <Button
          onClick={handlePayment}
          disabled={!paymentMethod}
          className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold"
        >
          Pagar {totalAmount / 2} MT
        </Button>
      </div>
    </div>
  );
}