import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface VerificationScreenProps {
  code: string;
  onCodeChange: (code: string) => void;
  onConfirm: () => void;
  onResend: () => void;
}

export function VerificationScreen({ code, onCodeChange, onConfirm, onResend }: VerificationScreenProps) {
  const [digits, setDigits] = useState(['', '', '', '', '', '']);

  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    onCodeChange(newDigits.join(''));

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !digits[index] && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      {/* Header */}
      <div className="pt-12 pb-8">
        <h1 className="text-2xl font-semibold text-center mb-2 text-black">Digite o código recebido</h1>
        <p className="text-base text-gray-600 text-center">
          Enviamos um código de 6 dígitos para seu telefone
        </p>
      </div>

      {/* Code Input */}
      <div className="flex-1 flex flex-col justify-center space-y-8">
        <div className="space-y-6">
          {/* 6 Digit Input Fields */}
          <div className="flex justify-center space-x-3">
            {digits.map((digit, index) => (
              <Input
                key={index}
                id={`digit-${index}`}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleDigitChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-orange-500"
              />
            ))}
          </div>

          {/* Resend Link */}
          <div className="text-center">
            <button
              onClick={onResend}
              className="text-orange-500 underline hover:no-underline transition-all"
            >
              Reenviar código
            </button>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="pt-6">
          <Button
            onClick={onConfirm}
            disabled={digits.some(d => !d)}
            className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold"
          >
            Confirmar
          </Button>
        </div>
      </div>
    </div>
  );
}