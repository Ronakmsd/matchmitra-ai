# 🏏 MatchMitra AI
### Don't Just Follow the Score. Understand the Game.

**MatchMitra AI** is an AI-powered cricket companion that helps fans understand the story behind a match — not just the scoreboard.

Joining a match midway? Confused about why a wicket matters? Want to understand the pressure, match situation, and what to watch next?

MatchMitra AI transforms match data into clear, contextual cricket insights using Generative AI.

🌐 **Live Application:** https://matchmitra-ai.vercel.app

---

## 🎯 The Problem

Cricket fans who join a match midway often see the score but miss the context.

A scoreboard tells you what is happening, but not necessarily:
- Why is the current situation challenging?
- How important was that wicket?
- What does the required run rate mean?
- What should fans watch next?

MatchMitra AI bridges this gap by converting match information into understandable insights.

## ✨ Key Features

### ⚡ 1. 30-Second AI Catch-up
Get a concise AI-generated summary of the match situation, key challenges, strategic context, and what to watch next.

### 🎯 2. AI Moment Tracker
Select an important match event, such as a wicket or boundary, and understand what happened, why it matters, and its significance.

### 💬 3. Ask MatchMitra
Ask cricket-related questions in natural language and receive contextual AI-generated answers.

Example questions:
- Why is this match difficult for India?
- What should the batting team do to win?
- How important is the required run rate?

### 📊 4. Match Situation Dashboard
View current score, overs, target, runs required, balls remaining, current run rate, required run rate, and wickets remaining.

### 🧠 5. Context-Aware AI
AI responses use supplied match context, distinguish facts from analysis, and avoid inventing unavailable player or event details.

---

## 🛠️ Technology Stack

**Frontend:** React, Vite, JavaScript, CSS, Lucide React, React Markdown

**Backend:** Python, FastAPI, Pydantic

**AI Integration:** Google Gemini API

**Deployment:** Vercel (Frontend), Render (Backend)

**Version Control:** Git and GitHub

---

## 🏗️ System Architecture

Cricket Fan → React Frontend (Vercel) → REST API → FastAPI Backend (Render) → Google Gemini → Context-Aware AI Response → MatchMitra Dashboard

---

## 🚀 Live Demo

- **Application:** https://matchmitra-ai.vercel.app
- **Backend Health:** https://matchmitra-ai.onrender.com/api/health
- **Match API:** https://matchmitra-ai.onrender.com/api/match
- **API Documentation:** https://matchmitra-ai.onrender.com/docs

---

## 💻 Run Locally

### Prerequisites
- Python 3.11+
- Node.js and npm
- Google Gemini API key
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Ronakmsd/matchmitra-ai.git
cd matchmitra-ai
```

### 2. Set up the backend

```bash
python3 -m venv backend/.venv
source backend/.venv/bin/activate
pip install -r backend/requirements.txt
```

Create `backend/.env` and add:

```env
GEMINI_API_KEY=your_gemini_api_key
```

Start the backend:

```bash
uvicorn backend.app.main:app --reload --port 8001
```

Backend runs at `http://localhost:8001`.

### 3. Set up the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev -- --port 5175
```

Frontend runs at `http://localhost:5175`.

---

## 🔐 Security

- Gemini API credentials are stored on the backend.
- API keys are not exposed in frontend source code.
- Environment files are excluded from Git.
- Backend endpoints validate incoming request data.
- CORS is configured for approved frontend origins.

---

## 📌 Demo Data Transparency

The currently deployed version uses illustrative India vs Australia T20 match data. It is not connected to a real-time live cricket data provider.

AI-generated explanations are based on the supplied demo match context.

---

## 🔮 Future Scope

- Real-time cricket score integration.
- Ball-by-ball match context.
- Player performance insights.
- Match momentum analysis.
- Personalized fan notifications.
- Support for additional cricket formats and sports.

---

## 💡 Product Vision

Our vision is to make every cricket fan feel informed, even when they join a match halfway through.

**MatchMitra AI — Every Match Has a Story. Understand Yours.**

---

*Built with ❤️ for Cricket Fans.*