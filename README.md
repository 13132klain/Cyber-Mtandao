# Cyber Mtandao Platform

A Next.js-based digital service platform for government and business services in Kenya, featuring M-Pesa payments and Firebase integration.

## 🇰🇪 Features

- **Kenyan Government Services**: KRA PIN, NHIF, HELB applications
- **M-Pesa Integration**: Secure mobile money payments via Daraja API
- **Firebase Backend**: Authentication, Firestore database, and file storage
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Professional UI**: Clean design with Kenyan branding

## 🚀 Live Demo

Visit: [https://cyber-mtandao.netlify.app](https://cyber-mtandao.netlify.app)

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Payments**: M-Pesa Daraja API
- **Deployment**: Netlify
- **Icons**: Lucide React

## 📱 Services Offered

1. **KRA PIN Registration** - KES 300
2. **NHIF Registration** - KES 250  
3. **HELB Application** - KES 400
4. **Professional CV Writing** - KES 500
5. **Business Registration** - KES 800
6. **Good Conduct Certificate** - KES 350

## 🔧 Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 🌐 Environment Variables

Create `.env.local` with:

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# M-Pesa Daraja API
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
```

## 📄 License

MIT License - Built with ❤️ in Kenya 🇰🇪