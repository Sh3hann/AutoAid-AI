<div align="center">

# 🚗 AutoAid AI
### Next-Generation AI Vehicle Diagnostics & Roadside Assistance Platform

[![Next.js 15](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://ai.google.dev/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

<p align="center">
  <b>AutoAid AI</b> bridges the gap between driver uncertainty and automotive expertise. By combining cutting-edge LLM intelligence with real-time OBD diagnostics data, AutoAid offers instantaneous triage, fault analysis, and emergency roadside guidance right from your device.
</p>

</div>

---

## ⚡ Core Features

- 🤖 **AI Diagnostic Engine**: Natural language symptom assessment powered by **Google Gemini AI**. Users describe car issues (e.g., strange noises, burning smells, hesitation) and receive structured hypotheses, severity indexes, and triage advice.
- 🚨 **Emergency SOS & Roadside Dispatch**: Quick-response emergency protocol providing immediate step-by-step safety guides, breakdown coordinates, and nearest roadside service contacts.
- 🔍 **OBD-II / DTC Code Decoder**: Comprehensive diagnostic trouble code database (P, B, C, U series). Input any engine code to receive plain-English root causes and repair difficulty ratings.
- ⚠️ **Dashboard Warning Light Catalog**: Visual and searchable guide to vehicle cluster warning symbols, filtered by urgency (Urgent Stop, Service Soon, Info).
- 🚗 **Virtual Vehicle Garage**: Multi-car profile manager storing vehicle specifications, VIN details, maintenance logs, and past diagnosis runs.
- 🎨 **Fluid Motion & Dark Mode**: Modern automotive cockpit interface styled with **Tailwind CSS v4** and fluid transitions powered by **Framer Motion**.

---

## 🛠️ Tech Stack & Architecture

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **UI & Components**: [React 19](https://react.dev/), [Tailwind CSS v4](https://tailwindcss.com/), [Framer Motion](https://motion.dev/)
- **AI Integration**: [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai) (Google Gemini Flash & Pro Models)
- **State & Theme**: [next-themes](https://github.com/pacocoursey/next-themes), clsx, 	ailwind-merge
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 🚀 Getting Started

### 1. Clone the repository
`ash
git clone https://github.com/Sh3hann/AutoAid-AI.git
cd AutoAid-AI
`

### 2. Install dependencies
`ash
npm install
`

### 3. Configure Environment Variables
Create a .env.local file in the root directory:
`env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
`

### 4. Run the development server
`ash
npm run dev
`

Open [http://localhost:3000](http://localhost:3000) with your browser to experience AutoAid AI.

---

## 📂 Project Structure

`
src/
├── app/
│   ├── api/                 # Next.js API route handlers
│   ├── assistance/          # Roadside assistance locator & dispatch
│   ├── diagnose/            # Interactive AI symptom diagnostic engine
│   ├── emergency/           # Immediate emergency SOS protocol
│   ├── faults/              # DTC & OBD-II fault code explorer
│   ├── vehicles/            # Virtual garage vehicle manager
│   ├── warning-lights/      # Visual instrument cluster light catalog
│   ├── layout.tsx           # Root application shell & theme provider
│   └── page.tsx             # Futuristic automotive landing portal
├── components/              # Reusable UI widgets & navigation
└── lib/                     # Gemini AI client & diagnostic helpers
`

---

## 👤 Author

**Akil Shehan**
- Portfolio: [itzshehan.xyz](https://itzshehan.xyz/)
- GitHub: [@Sh3hann](https://github.com/Sh3hann)
- LinkedIn: [Akil Shehan](https://www.linkedin.com/in/akil-shehan-b808b340b)

---

## 📄 License
This project is licensed under the MIT License.