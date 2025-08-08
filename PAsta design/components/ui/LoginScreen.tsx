import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface LoginScreenProps {
  phoneNumber: string;
  onPhoneChange: (phone: string) => void;
  onSendCode: () => void;
}

export function LoginScreen({ phoneNumber, onPhoneChange, onSendCode }: LoginScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      {/* Header */}
      <div className="pt-12 pb-8">
        <h1 className="text-2xl font-semibold text-center mb-2 text-black">Truck Finder</h1>
        <p className="text-base text-gray-600 text-center">Entre com seu número de telefone</p>
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col justify-center space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm text-black font-medium">
              Número de telefone
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-sm text-black">
                +258
              </span>
              <Input
                id="phone"
                type="tel"
                placeholder="84 123 4567"
                value={phoneNumber}
                onChange={(e) => onPhoneChange(e.target.value)}
                className="pl-16 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Info Message */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <p className="text-sm text-black text-center leading-relaxed">
              Você receberá um código de 6 dígitos por SMS, e-mail ou WhatsApp.
            </p>
          </div>
        </div>

        {/* Button */}
        <div className="pt-6">
          <Button
            onClick={onSendCode}
            disabled={!phoneNumber.trim()}
            className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold"
          >
            Enviar código
          </Button>
        </div>
      </div>
    </div>
  );
}