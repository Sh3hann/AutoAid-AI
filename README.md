<div align="center">

  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f172a,50:1e293b,100:d97706&height=190&section=header&text=AutoAid%20AI&fontSize=46&fontAlignY=38&desc=Intelligent%20Vehicle%20Diagnostics%20%7C%20OBD-II%20Decoder%20%7C%20Roadside%20Triage&descAlignY=62&descSize=16&fontColor=ffffff" width="100%" alt="AutoAid AI Header" />

  <p align="center">
    <b>AI-powered vehicle diagnostics platform featuring symptom-based root-cause triage, instant OBD-II fault code decoding, dashboard warning light reference, and emergency roadside checklists.</b>
  </p>

  <p align="center">
    <img src="https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
    <img src="https://img.shields.io/badge/React-19-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React 19" />
    <img src="https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript 5" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />
    <img src="https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=flat-square&logo=googlegemini&logoColor=white" alt="Google Gemini AI" />
    <a href="LICENSE"><img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" alt="MIT License" /></a>
  </p>

</div>

---

## Core Capabilities

| Module | Overview | Practical Impact |
| :--- | :--- | :--- |
| **AI Symptom Reasoner** | Conversational triage via Google Gemini (`GEMINI_API_KEY`) with automatic fallback to a deterministic local engine (`src/lib/ai-engine.ts`). | Translates driver symptoms into ranked root causes, drivability checks, and repair cost estimates. |
| **DTC & OBD-II Decoder** | Searchable fault database covering standard Powertrain (`P`), Body (`B`), Chassis (`C`), and Network (`U`) diagnostic codes. | Explains fault triggers, severity levels, and inspection steps clearly. |
| **Emergency SOS & Roadside Triage** | Guided safety checklist, breakdown protocols, and recovery assistance locator. | Provides clear immediate steps during roadside emergencies. |
| **Warning Light Reference** | Interactive catalog of dashboard cluster indicators grouped by urgency (Critical Stop, Service Soon, Advisory). | Identifies unfamiliar warning icons and recommended actions quickly. |
| **Vehicle & Brand Explorer** | Browse supported vehicle makes, common model faults, and tailored maintenance guides. | Organizes vehicle-specific diagnostic data in one place. |

---

## Diagnostic Pipeline Architecture

```mermaid
flowchart TD
    subgraph Driver["Driver Input Layer"]
        A["Symptom Description\n(Noise, Vibration, Smoke, Leaks)"]
        B["OBD-II Fault Code Lookup\n(e.g., P0300, P0420)"]
        C["Dashboard Warning Light Selection"]
    end

    subgraph Intelligence["Diagnostics & Reasoning Layer"]
        D["Vehicle Context Builder\n(Make, Year, Mileage)"]
        E["POST /api/diagnose\n(Google Gemini API)"]
        F["Local Diagnostic Engine\n(src/lib/ai-engine.ts Fallback)"]
    end

    subgraph Output["Actionable Output"]
        G["Probable Root Causes & Confidence %"]
        H["DIY Inspection vs. Mechanic Urgency"]
        I["Drivability Verdict & Cost Range"]
    end

    A --> D
    B --> D
    C --> D
    D --> E
    D --> F
    E --> G
    F --> G
    E --> H
    F --> H
    E --> I
    F --> I
```

<details>
<summary><b>Project Structure</b></summary>

```text
AutoAid-AI/
├── src/
│   ├── app/
│   │   ├── api/diagnose/      # Serverless Gemini diagnostic route handler
│   │   ├── assistance/        # Roadside assistance & recovery locator
│   │   ├── diagnose/          # Interactive AI symptom diagnostic UI
│   │   ├── emergency/         # Emergency SOS protocol & safety checklist
│   │   ├── faults/            # OBD-II / DTC fault database & detail views
│   │   ├── search/            # Global fault & vehicle search
│   │   ├── vehicles/          # Supported brands & model guides
│   │   └── warning-lights/    # Instrument cluster warning light catalog
│   ├── components/            # Layout & reusable UI components
│   ├── data/                  # Vehicle, brand, fault & warning-light datasets
│   ├── lib/                   # Local diagnostic engine & utility helpers
│   └── types/                 # Shared TypeScript interfaces
├── scripts/                   # Data maintenance utilities
├── .env.example
└── package.json
```

</details>

---

## Getting Started

### Prerequisites
- **Node.js 20+** and **npm**

### 1. Clone & Install
```bash
git clone https://github.com/Sh3hann/AutoAid-AI.git
cd AutoAid-AI
npm install
```

### 2. Configure Environment (Optional)
Copy `.env.example` to `.env.local` and add a Google Gemini API key from [Google AI Studio](https://aistudio.google.com/):

```bash
cp .env.example .env.local
```

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

> **Offline / Keyless Mode:** If `GEMINI_API_KEY` is omitted, AutoAid AI runs using its built-in local symptom-correlation engine (`src/lib/ai-engine.ts`).

### 3. Run & Build
```bash
npm run dev     # Start local dev server at http://localhost:3000
npm run lint    # Run ESLint checks
npm run build   # Create production build
```

---

## License

Released under the [MIT License](LICENSE) © 2026 [Akil Shehan](https://github.com/Sh3hann).

<div align="center">

<a href="https://itzshehan.xyz/"><img src="https://img.shields.io/badge/Portfolio-itzshehan.xyz-f59e0b?style=flat-square&logo=googlechrome&logoColor=white" alt="Portfolio" /></a>
<a href="https://www.linkedin.com/in/akil-shehan"><img src="https://img.shields.io/badge/LinkedIn-Akil_Shehan-0077b5?style=flat-square&logo=linkedin&logoColor=white" alt="LinkedIn" /></a>
<a href="https://github.com/Sh3hann"><img src="https://img.shields.io/badge/GitHub-@Sh3hann-181717?style=flat-square&logo=github&logoColor=white" alt="GitHub" /></a>

</div>
