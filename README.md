<div align="center">

  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=11,19,26&height=200&section=header&text=🚗%20AutoAid%20AI&fontSize=46&fontAlignY=36&desc=Intelligent%20Vehicle%20Diagnostics%20%7C%20Gemini%20AI%20%7C%20Roadside%20Assistance&descAlignY=58&descSize=16&fontColor=ffffff" width="100%" alt="AutoAid AI Header" />

  <p align="center">
    <b>Empowering drivers with real-time AI vehicle diagnostics, instant OBD-II fault code decoding, visual warning light scanning, and emergency roadside dispatch triage.</b>
  </p>

  <p align="center">
    <a href="https://github.com/Sh3hann/AutoAid-AI">
      <img src="https://img.shields.io/badge/💻_Source_Code-GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="Source Code" />
    </a>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js&logoColor=white" alt="Next.js" />
    <img src="https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=flat-square&logo=google-gemini&logoColor=white" alt="Gemini" />
    <img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" alt="License" />
  </p>

</div>

---

## ⚡ Key Capabilities

<div align="center">

| Capability | Overview | Practical Impact |
|:---|:---|:---|
| 🤖 **AI Symptom Reasoner** | Natural language triage driven by **Google Gemini AI**. Translates sensory driver feedback (knocks, smoke, vibrations) into diagnostic hypotheses. | Solves uncertainty before costly dealership visits. |
| 🔍 **DTC & OBD-II Decoder** | Instant database lookup for all standard Powertrain (P), Body (B), Chassis (C), and Network (U) error codes. | Translates cryptic fault codes into clear root causes and repair guides. |
| 🚨 **Emergency SOS & Roadside Triage** | Automated safety checklist, incident GPS coordinates, breakdown protocols, and direct recovery service coordination. | Rapid, calm response in critical highway and breakdown scenarios. |
| ⚠️ **Cluster Warning Light Scanner** | Visual catalog of dashboard symbols with severity indicators (Critical Stop, Maintenance, Advisory). | Instant identification of unknown dashboard icons with actionable advice. |
| 🚗 **Virtual Vehicle Garage** | Profile manager for multiple personal vehicles tracking make, model, year, VIN specs, and past diagnostic evaluations. | Centralized maintenance and diagnostics history at your fingertips. |

</div>

---

## 🏗️ Diagnostic Pipeline Architecture

`mermaid
flowchart TD
    subgraph Driver ["Driver Input Layer"]
        A["Driver Describes Symptoms<br/>(Noise, Smell, Handling, Leak)"]
        B["OBD-II Fault Code Input<br/>(e.g., P0300, P0420)"]
        C["Cluster Warning Light Selection"]
    end

    subgraph Intelligence ["Gemini AI Intelligence Layer"]
        D["Context Builder<br/>(Make, Model, Year, Mileage)"]
        E["Gemini AI Diagnostic Engine<br/>(@google/generative-ai)"]
        F["Severity & Triage Calculator"]
    end

    subgraph Output ["Resolution & Guidance"]
        G["Probable Root Causes & Likelihood %"]
        H["Actionable DIY Steps vs. Mechanic Urgency"]
        I["Emergency SOS & Roadside Dispatch Protocol"]
    end

    A --> D
    B --> D
    C --> D
    D --> E
    E --> F
    F --> G
    F --> H
    F --> I
`

<details>
<summary><b>📂 View Modular Codebase Architecture</b></summary>

`
AutoAid-AI/
├── src/app/
│   ├── diagnose/            # Interactive AI symptom diagnostic engine
│   ├── faults/              # OBD-II & DTC fault code database explorer
│   ├── emergency/           # Immediate emergency SOS protocol & safety checklist
│   ├── assistance/          # Roadside recovery service locator & dispatch
│   ├── vehicles/            # Virtual garage vehicle manager
│   ├── warning-lights/      # Visual instrument cluster light catalog
│   └── api/                 # Next.js serverless route handlers
├── src/components/          # Modular UI components & animated cockpit controls
└── src/lib/                 # Gemini API client & automotive diagnostic helpers
`

</details>

---

## 🚀 Getting Started

### 1. Clone & Install
`ash
git clone https://github.com/Sh3hann/AutoAid-AI.git
cd AutoAid-AI
npm install
`

### 2. Configure Environment
Create a .env.local file in the project root:
`env
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key_here
`

### 3. Launch Development Server
`ash
npm run dev
`
Open **http://localhost:3000** in your browser.

---

<div align="center">

### 👨‍💻 Developed with Precision by [Akil Shehan](https://github.com/Sh3hann)

[![Website](https://img.shields.io/badge/Portfolio-itzshehan.xyz-f59e0b?style=flat-square&logo=google-chrome&logoColor=white)](https://itzshehan.xyz/)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Akil_Shehan-0077b5?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/akil-shehan-b808b340b)
[![GitHub](https://img.shields.io/badge/GitHub-@Sh3hann-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Sh3hann)

<sub>© 2026 AutoAid AI. Released under the MIT License.</sub>

</div>