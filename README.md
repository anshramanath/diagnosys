# 💬 Diagnosys – AI-Powered Symptom Checker & Health Trends Tracker

Diagnosys is a full-stack medical assistant web app that helps users understand their symptoms and stay informed about health trends in their area.

## 🔍 What is Diagnosys?

Diagnosys has **two core features**:

### 💬 Symptom Chat
An AI-powered assistant that:
- Guides users through a friendly question-and-answer symptom check
- Provides a likely **diagnosis** and basic **treatment suggestions**
- Automatically generates a **patient-style chart** you can save or share with a doctor, making future visits smoother

### 📊 Health Trends
A clean dashboard that visualizes:
- Pollen levels (tree, grass, pine)
- COVID-19 case stats
- Flu case trends across weeks
- Local air quality index (AQI)

This helps users know what’s “going around” so they can be more cautious—or at ease—when facing symptoms.

## 🧱 Tech Stack

- **Frontend**: Next.js (App Router) · TypeScript · Material UI
- **Backend**: API routes in Next.js
- **AI Model**: [Command model](https://cohere.com/command)
- **PDF Generation**: `@react-pdf/renderer`
- **Health Data APIs**:
  - **Google Pollen API**
  - **Google Air Quality API**
  - **Delphi (CMU) FluView API**
  - **disease.sh API**

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/diagnosys.git
cd diagnosys
npm install
```

Create a `.env.local` file:

```env
COHERE_API_KEY=your-key
GOOGLE_API_KEY=your-key
DELPHI_API_KEY=your-key
```

Then run locally:

```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

## 📸 Example Use Cases

- ✅ You’re feeling sick and want a **quick second opinion** before going to urgent care
- 🧾 You want a **summary of your symptoms** to share with a doctor
- 🌿 You want to know if **pollen or poor air quality** is behind your symptoms
- 😷 You feel off but realize **there’s a flu/COVID wave**, putting your mind at ease

## ⚠️ Disclaimer

Diagnosys is **not a certified medical tool**. All outputs are AI-generated and for **informational purposes only**. Consult a healthcare professional for medical decisions.