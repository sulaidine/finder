import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface TransporterApplicationScreenProps {
  onSubmitApplication: () => void;
}

export function TransporterApplicationScreen({ onSubmitApplication }: TransporterApplicationScreenProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    license: '',
    truckType: ''
  });

  const handleSubmit = () => {
    if (Object.values(formData).every(value => value.trim())) {
      onSubmitApplication();
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white p-6">
      {/* Header */}
      <div className="pt-12 pb-8">
        <h1 className="text-2xl font-semibold text-center mb-2 text-black">Candidatura de Transportadora</h1>
        <p className="text-base text-gray-600 text-center">
          Preencha seus dados para se tornar nosso parceiro
        </p>
      </div>

      {/* Form */}
      <div className="flex-1 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-sm text-black font-medium">
              Nome da empresa
            </Label>
            <Input
              type="text"
              placeholder="Ex: Transportes Silva Lda"
              value={formData.companyName}
              onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              className="py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-black font-medium">
              Pessoa de contacto
            </Label>
            <Input
              type="text"
              placeholder="Nome do responsável"
              value={formData.contactPerson}
              onChange={(e) => setFormData({...formData, contactPerson: e.target.value})}
              className="py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-black font-medium">
              Email empresarial
            </Label>
            <Input
              type="email"
              placeholder="empresa@exemplo.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-black font-medium">
              Licença de transporte
            </Label>
            <Input
              type="text"
              placeholder="Número da licença"
              value={formData.license}
              onChange={(e) => setFormData({...formData, license: e.target.value})}
              className="py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm text-black font-medium">
              Tipo de caminhão
            </Label>
            <Input
              type="text"
              placeholder="Ex: Caminhão médio, caminhão grande"
              value={formData.truckType}
              onChange={(e) => setFormData({...formData, truckType: e.target.value})}
              className="py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500"
            />
          </div>
        </div>
      </div>

      {/* Button */}
      <div className="pt-6">
        <Button
          onClick={handleSubmit}
          disabled={!Object.values(formData).every(value => value.trim())}
          className="w-full py-4 bg-black text-white hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-bold"
        >
          Enviar Candidatura
        </Button>
      </div>
    </div>
  );
}