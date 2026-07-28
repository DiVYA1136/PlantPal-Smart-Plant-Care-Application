# PlantPal – Smart Plant Care Assistant 🌿

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-10.12-FFCA28?logo=firebase)](https://firebase.google.com/)
[![Vite](https://img.shields.io/badge/Vite-5.2-646CFF?logo=vite)](https://vitejs.dev/)

**PlantPal** is a smart plant care assistant application featuring automated watering scheduling, growth tracking charts, AI leaf disease diagnostics, exportable PDF care passports, micro-climate weather integration, voice search, and a complete admin management console.

---

## 🌟 Key Features & SaaS Architecture

1. **Smart Care Engine & Scheduling**:
   - Calculates next due watering dates dynamically based on species rules and local outdoor humidity.
   - Interactive daily task checklist with one-click watering logging.

2. **Growth Analytics & PDF Passport**:
   - Interactive growth timeline using **Chart.js** (Height trend line, monthly foliage expansion).
   - Generates downloadable **PDF Plant Passports** formatted with care instructions and history logs via `jspdf`.

3. **AI Leaf Disease Diagnostics**:
   - Computer vision leaf image scanning interface with simulated neural net diagnostic reports, severity ratings, and treatment protocols.

4. **Microclimate & OpenWeather Integration**:
   - Fetches live temperature and humidity to generate real-time botanical care advisories (Heat Warning, Cold Snap Alert, Pebble Tray Recommendation).

5. **Voice Search & Catalog Filters**:
   - Web Speech API integration for hands-free voice search.
   - Instant filtering by plant category, sunlight requirements, and favorite status.

6. **Firebase Backend + Zero-Config Demo Mode**:
   - Seamlessly connects to Firebase Authentication & Cloud Firestore.
   - **Zero-Friction Demo Mode**: Works out of the box with offline mock dataset if Firebase credentials are not supplied.

7. **Admin Management Dashboard**:
   - Role-based route guard (`/admin`) for inspecting user accounts, system metrics, and dataset rules.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, React Router DOM v6, Context API, Tailwind CSS, Framer Motion, Lucide React Icons.
- **Charts & Export**: Chart.js, React-Chartjs-2, jsPDF, Html2Canvas.
- **Backend & Auth**: Firebase (Authentication, Firestore Database, Storage, Hosting).
- **APIs**: OpenWeather API, Perenual Botanical API, Web Speech API.

---

## 📁 Repository Structure

```
plantpal/
├── public/
│   └── manifest.json          # PWA Web App Manifest
├── src/
│   ├── assets/                # Botanical icons & graphics
│   ├── components/            # Reusable UI Components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── Footer.jsx
│   │   ├── PlantCard.jsx
│   │   ├── SearchBar.jsx
│   │   ├── CardSkeleton.jsx
│   │   ├── Loader.jsx
│   │   ├── Modal.jsx
│   │   └── ProtectedRoute.jsx
│   ├── contexts/              # Global State Management
│   │   ├── AuthContext.jsx
│   │   ├── PlantContext.jsx
│   │   ├── WeatherContext.jsx
│   │   └── ThemeContext.jsx
│   ├── firebase/              # Firebase Initialization & Config
│   │   └── config.js
│   ├── hooks/                 # Custom React Hooks
│   │   └── useVoiceSearch.js
│   ├── pages/                 # Route Pages
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MyPlants.jsx
│   │   ├── AddPlant.jsx
│   │   ├── PlantDetails.jsx
│   │   ├── Journal.jsx
│   │   ├── Weather.jsx
│   │   ├── DiseaseDetection.jsx
│   │   ├── Profile.jsx
│   │   ├── Admin.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── ForgotPassword.jsx
│   ├── services/              # API & Mock Data Services
│   │   ├── api.js
│   │   └── mockData.js
│   ├── utils/                 # Utilities (PDF Generator)
│   │   └── pdfExport.js
│   ├── App.jsx                # Router & App Shell
│   ├── index.css              # Custom Tailwind & Glassmorphism CSS
│   └── main.jsx               # Entrypoint
├── .env.example               # Environment Variables Template
├── firestore.rules            # Firestore Security Rules
├── tailwind.config.js         # Tailwind Styling Configuration
├── vite.config.js             # Vite Build Config
└── package.json
```

---

## ⚡ Quick Start & Setup Instructions

### 1. Installation

```bash
cd plantpal
npm install
```

### 2. Run Development Server

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔥 Firebase Setup Instructions

1. Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project named `plantpal`.
2. Enable **Authentication** with Email/Password and Google Sign-In providers.
3. Enable **Cloud Firestore** database in test/production mode and paste the contents of `firestore.rules`.
4. Copy your project configuration keys into a `.env` file based on `.env.example`:

```env
VITE_FIREBASE_API_KEY=AIzaSy...
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=1:...
```

---

## 🚀 Firebase Hosting Deployment Guide

1. Install Firebase CLI:
```bash
npm install -g firebase-tools
```
2. Authenticate and initialize Firebase in the project root:
```bash
firebase login
firebase init hosting
```
   - Select public directory: `dist`
   - Configure as single-page app (SPA): `Yes`
3. Build & Deploy:
```bash
npm run build
firebase deploy
```
