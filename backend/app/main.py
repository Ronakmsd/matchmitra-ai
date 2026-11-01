

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from backend.app.ai_service import (
    generate_ai_response,
    generate_match_catchup,
    explain_match_moment,
)

app = FastAPI(
    title="MatchMitra AI",
    description="AI-powered cricket fan companion",
    version="1.2.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5175"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

DEMO_MATCH = {
    "id": "matchmitra-demo-001",
    "sport": "Cricket",
    "format": "T20",
    "status": "DEMO",
    "is_demo": True,
    "team_a": "India",
    "team_b": "Australia",
    "score": "112/3",
    "overs": "15.0",
    "target": 181,
    "required_runs": 69,
    "required_balls": 30,
    "run_rate": 7.47,
    "required_run_rate": 13.80,
    "wickets_remaining": 7,
    "recent_events": [
        "Four - Cover Drive",
        "Single - Mid Wicket",
        "WICKET - Caught",
        "Two Runs",
        "Six - Straight Drive"
    ],
    "note": "Illustrative demo data, not a real live match."
}


class AskRequest(BaseModel):
    question: str = Field(min_length=2, max_length=500)
    match: dict


class MatchContextRequest(BaseModel):
    match: dict


class MomentRequest(BaseModel):
    event: str = Field(min_length=2, max_length=300)
    match: dict


@app.get("/")
def root():
    return {
        "name": "MatchMitra AI",
        "message": "Your AI cricket companion is ready."
    }


@app.get("/api/health")
def health():
    return {"status": "healthy", "service": "matchmitra-api"}


@app.get("/api/match")
def get_match():
    return DEMO_MATCH


@app.post("/api/ask")
def ask_matchmitra(request: AskRequest):
    try:
        answer = generate_ai_response(
            request.question,
            request.match
        )
        return {
            "answer": answer,
            "powered_by": "Gemini",
            "is_demo": True
        }
    except Exception as exc:
        print(f"Gemini API error: {exc}")
        raise HTTPException(
            status_code=502,
            detail="MatchMitra could not generate an AI response. Please try again."
        )


@app.post("/api/catchup")
def get_match_catchup(request: MatchContextRequest):
    try:
        answer = generate_match_catchup(request.match)
        return {
            "answer": answer,
            "powered_by": "Gemini",
            "is_demo": True
        }
    except Exception as exc:
        print(f"Gemini catch-up error: {exc}")
        raise HTTPException(
            status_code=502,
            detail="MatchMitra could not generate the match catch-up. Please try again."
        )


@app.post("/api/moment")
def explain_moment(request: MomentRequest):
    try:
        answer = explain_match_moment(
            request.event,
            request.match
        )
        return {
            "answer": answer,
            "powered_by": "Gemini",
            "is_demo": True
        }
    except Exception as exc:
        print(f"Gemini moment explanation error: {exc}")
        raise HTTPException(
            status_code=502,
            detail="MatchMitra could not explain this moment. Please try again."
        )
