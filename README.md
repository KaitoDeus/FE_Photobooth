# PhotoBooth Frontend

Modern, responsive frontend application for the PhotoBooth system built with React, TypeScript, and Vite.

## 📁 Project Structure

```
frontend/
├── src/
│   ├── api/                    # API services
│   ├── components/             # Shared components
│   │   ├── common/            # Reusable UI components
│   │   ├── EditEffectsPanel/  # Filter selection panel
│   │   └── QrModal/           # QR code modal
│   ├── hooks/                  # Custom React hooks
│   ├── i18n/                   # Internationalization
│   ├── pages/                  # Page components
│   │   ├── Welcome/
│   │   ├── ModeSelection/
│   │   ├── CameraSetup/
│   │   ├── LivePreview/
│   │   ├── Countdown/
│   │   ├── Review/
│   │   ├── Actions/
│   │   └── ThankYou/
│   ├── styles/                 # Global styles
│   ├── types/                  # TypeScript types
│   ├── utils/                  # Utility functions
│   ├── App.tsx                # Main application
│   └── main.tsx               # Entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev    # http://localhost:3001

# Build for production
npm run build
```

## 📝 License

MIT License
