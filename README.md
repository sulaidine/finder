# Truck Finder App

Um aplicativo React Native desenvolvido com Expo para conectar clientes que precisam transportar cargas com transportadoras disponíveis.

## 🚀 Funcionalidades

### Para Clientes
- ✅ Cadastro e autenticação por SMS
- ✅ Criação de pedidos de transporte
- ✅ Busca automática de motoristas disponíveis
- ✅ Sistema de pagamento integrado
- ✅ Acompanhamento em tempo real do pedido
- ✅ Comunicação direta com o motorista

### Para Transportadoras
- ✅ Processo de candidatura e aprovação
- ✅ Sistema de gestão de pedidos
- ✅ Recebimento e aceitação de pedidos
- ✅ Controle financeiro e comissões
- ✅ Dashboard com estatísticas

### Recursos Gerais
- ✅ Tema claro/escuro com persistência
- ✅ Interface responsiva para diferentes tamanhos de tela
- ✅ Navegação fluida com animações
- ✅ Gerenciamento de estado com Redux
- ✅ Suporte a múltiplos idiomas (preparado)

## 🛠️ Tecnologias Utilizadas

- **React Native** - Framework principal
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **React Navigation** - Navegação entre telas
- **Redux Toolkit** - Gerenciamento de estado
- **React Native Reanimated** - Animações
- **Expo Location** - Serviços de localização
- **Expo Notifications** - Notificações push

## 📱 Instalação e Execução

### Pré-requisitos
- Node.js (versão 18 ou superior)
- npm ou yarn
- Expo CLI
- Dispositivo físico ou emulador Android/iOS

### Passos para instalação

1. **Clone o repositório**
```bash
git clone <repository-url>
cd truck-finder-app
```

2. **Instale as dependências**
```bash
npm install
```

3. **Configure as fontes**
Baixe as fontes Poppins do Google Fonts e coloque na pasta `assets/fonts/`:
- Poppins-Regular.ttf
- Poppins-Medium.ttf
- Poppins-SemiBold.ttf
- Poppins-Bold.ttf

4. **Execute o projeto**
```bash
npm start
```

5. **Execute em dispositivo específico**
```bash
# Android
npm run android

# iOS
npm run ios
```

## 🏗️ Build para Produção

### Configuração do EAS Build

1. **Instale o EAS CLI**
```bash
npm install -g @expo/eas-cli
```

2. **Faça login na sua conta Expo**
```bash
eas login
```

3. **Configure o projeto**
```bash
eas build:configure
```

### Builds

**Android APK (para testes)**
```bash
npm run build:android
```

**iOS IPA**
```bash
npm run build:ios
```

**Build para ambas as plataformas**
```bash
npm run build:all
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   └── ui/             # Componentes de interface
├── constants/          # Constantes (cores, espaçamentos, etc.)
├── contexts/           # Contexts do React (tema, etc.)
├── navigation/         # Configuração de navegação
├── screens/           # Telas da aplicação
│   ├── auth/          # Telas de autenticação
│   ├── client/        # Telas específicas do cliente
│   └── transporter/   # Telas específicas da transportadora
├── store/             # Configuração do Redux
│   └── slices/        # Slices do Redux Toolkit
├── types/             # Definições de tipos TypeScript
└── utils/             # Funções utilitárias
```

## 🎨 Design System

O app utiliza um design system consistente com:

- **Cores**: Sistema de cores adaptável para tema claro/escuro
- **Tipografia**: Família Poppins com diferentes pesos
- **Espaçamentos**: Sistema baseado em múltiplos de 8px
- **Componentes**: Biblioteca de componentes reutilizáveis

## 🔧 Configurações

### Permissões

O app solicita as seguintes permissões:

**Android:**
- `ACCESS_FINE_LOCATION` - Localização precisa
- `ACCESS_COARSE_LOCATION` - Localização aproximada
- `CAMERA` - Câmera para documentos
- `RECEIVE_BOOT_COMPLETED` - Notificações
- `VIBRATE` - Vibração

**iOS:**
- `NSLocationWhenInUseUsageDescription` - Localização em uso
- `NSLocationAlwaysAndWhenInUseUsageDescription` - Localização sempre
- `NSCameraUsageDescription` - Acesso à câmera

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_API_URL=https://api.truckfinder.com
EXPO_PUBLIC_MAPS_API_KEY=your_maps_api_key
```

## 🧪 Testes

```bash
# Executar testes
npm test

# Executar testes com coverage
npm run test:coverage
```

## 📝 Scripts Disponíveis

- `npm start` - Inicia o servidor de desenvolvimento
- `npm run android` - Executa no Android
- `npm run ios` - Executa no iOS
- `npm run build:android` - Build para Android
- `npm run build:ios` - Build para iOS
- `npm run build:all` - Build para ambas as plataformas

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, envie um email para suporte@truckfinder.com ou abra uma issue no GitHub.

---

Desenvolvido com ❤️ para facilitar o transporte de cargas em Moçambique.