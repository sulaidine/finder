import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface ClientNameScreenProps {
  name: string;
  onNameChange: (name: string) => void;
  onContinue: () => void;
}

export function ClientNameScreen({ name, onNameChange, onContinue }: ClientNameScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      {/* Header */}
      <div className="pt-12 pb-8">
        <h1 className="text-2xl font-semibold text-center mb-2 text-black">Qual é o seu nome?</h1>
        <p className="text-base text-gray-600 text-center">
          Vamos personalizar sua experiência
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 flex flex-col justify-center space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm text-black font-medium">
              Nome completo
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Digite seu nome"
              value={name}
              onChange={(e) => onNameChange(e.target.value)}
              className="py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Button */}
        <div className="pt-6">
          <Button
            onClick={onContinue}
            disabled={!name.trim()}
            className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold"
          >
            Continuar
          </Button>
        </div>
      </div>
    </div>
  );
}