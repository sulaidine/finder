import React from 'react';
import { Button } from './ui/button';
import { Clock, CheckCircle, Phone } from 'lucide-react';

interface WaitingContactScreenProps {
  onContactReceived: () => void;
}

export function WaitingContactScreen({ onContactReceived }: WaitingContactScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center">
          <Clock size={48} className="text-blue-600" />
        </div>
        
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-semibold text-black">Candidatura Enviada!</h1>
          <p className="text-base text-gray-600">
            Nossa equipe irá analisar sua candidatura e entrar em contacto em até 48 horas.
          </p>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl w-full">
          <h3 className="font-semibold text-black mb-2">Próximos passos:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-500" />
              Análise dos documentos
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} className="text-gray-400" />
              Contacto telefónico
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle size={16} className="text-gray-400" />
              Assinatura do acordo
            </li>
          </ul>
        </div>
      </div>

      <Button
        onClick={onContactReceived}
        className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors rounded-xl font-bold"
      >
        Simular Contacto Recebido
      </Button>
    </div>
  );
}