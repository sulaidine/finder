import React from 'react';
import { Button } from './ui/button';
import { FileText, CheckCircle } from 'lucide-react';

interface PartnershipAgreementScreenProps {
  onAgree: () => void;
}

export function PartnershipAgreementScreen({ onAgree }: PartnershipAgreementScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      {/* Header */}
      <div className="pt-12 pb-8">
        <h1 className="text-2xl font-semibold text-center mb-2 text-black">Acordo de Parceria</h1>
        <p className="text-base text-gray-600 text-center">
          Revise e aceite os termos do nosso acordo
        </p>
      </div>

      <div className="flex-1 space-y-6">
        {/* Agreement Preview */}
        <div className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
          <div className="flex items-center gap-3 mb-4">
            <FileText size={24} className="text-orange-500" />
            <h3 className="font-semibold text-black">Contrato de Parceria Truck Finder</h3>
          </div>
          
          <div className="space-y-4 text-sm text-gray-700">
            <p><strong>1. Comissão:</strong> 15% sobre cada frete completado</p>
            <p><strong>2. Pagamento:</strong> Semanal, todas as segundas-feiras</p>
            <p><strong>3. Responsabilidades:</strong> Manter veículos em bom estado</p>
            <p><strong>4. Cancelamentos:</strong> Penalidade de 50MT por cancelamento</p>
          </div>
        </div>

        {/* Benefits */}
        <div className="space-y-3">
          <h3 className="font-semibold text-black">Benefícios da parceria:</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-green-500" />
              Acesso a mais clientes
            </li>
            <li className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-green-500" />
              Sistema de pagamento seguro
            </li>
            <li className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-green-500" />
              Suporte 24/7
            </li>
            <li className="flex items-center gap-2 text-sm">
              <CheckCircle size={16} className="text-green-500" />
              App de gestão gratuito
            </li>
          </ul>
        </div>
      </div>

      <Button
        onClick={onAgree}
        className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors rounded-xl font-bold"
      >
        Aceitar e Continuar
      </Button>
    </div>
  );
}