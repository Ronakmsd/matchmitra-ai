
import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'

import {
  Activity,
  ArrowUpRight,
  BrainCircuit,
  ChevronRight,
  CircleHelp,
  Clock3,
  Crosshair,
  MessageCircle,
  Radio,
  RefreshCw,
  Send,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from 'lucide-react'

import './App.css'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8001'

const API_URL = `${API_BASE_URL}/api/match`
const API_ASK_URL = `${API_BASE_URL}/api/ask`
const API_CATCHUP_URL = `${API_BASE_URL}/api/catchup`
const API_MOMENT_URL = `${API_BASE_URL}/api/moment`
function App() {
  const [match, setMatch] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [selectedPrompt, setSelectedPrompt] = useState('')
  const [asking, setAsking] = useState(false)
  const [askError, setAskError] = useState('')

  const [catchup, setCatchup] = useState('')
  const [catchupLoading, setCatchupLoading] = useState(false)
  const [catchupError, setCatchupError] = useState('')

  const [selectedEvent, setSelectedEvent] = useState('')
  const [momentAnswer, setMomentAnswer] = useState('')
  const [momentLoading, setMomentLoading] = useState(false)
  const [momentError, setMomentError] = useState('')

  async function loadMatch() {
    setLoading(true)
    setError('')

    try {
      const response = await fetch(API_URL)

      if (!response.ok) {
        throw new Error('Unable to load match data')
      }

      const data = await response.json()
      setMatch(data)
    } catch (err) {
      setError(err.message || 'Could not connect to MatchMitra API')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMatch()
  }, [])

  const prompts = [
    'Why is this match getting difficult?',
    'What should India focus on now?',
    'Explain the required run rate',
  ]

  async function handleAsk(e) {
    e.preventDefault()

    const q = question.trim()

    if (!q || !match || asking) return

    setSelectedPrompt(q)
    setAnswer('')
    setAskError('')
    setAsking(true)

    try {
      const response = await fetch(API_ASK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, match }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Unable to generate an AI response.')
      }

      setAnswer(data.answer)
      setQuestion('')
    } catch (err) {
      setAskError(err.message || 'Could not connect to MatchMitra AI.')
    } finally {
      setAsking(false)
    }
  }

  async function handleCatchup() {
    if (!match || catchupLoading) return

    setCatchup('')
    setCatchupError('')
    setCatchupLoading(true)

    try {
      const response = await fetch(API_CATCHUP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ match }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Unable to generate match catch-up.')
      }

      setCatchup(data.answer)
    } catch (err) {
      setCatchupError(err.message || 'Could not generate match catch-up.')
    } finally {
      setCatchupLoading(false)
    }
  }

  async function handleMoment(event) {
    if (!match || momentLoading) return

    setSelectedEvent(event)
    setMomentAnswer('')
    setMomentError('')
    setMomentLoading(true)

    try {
      const response = await fetch(API_MOMENT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event, match }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.detail || 'Unable to explain this moment.')
      }

      setMomentAnswer(data.answer)
    } catch (err) {
      setMomentError(err.message || 'Could not explain this moment.')
    } finally {
      setMomentLoading(false)
    }
  }

  if (loading) {
    return (
      <main className="loading-screen">
        <div className="loading-logo">
          <Activity size={25} />
        </div>
        <h2>MatchMitra</h2>
        <p>Getting your match context ready...</p>
      </main>
    )
  }

  if (error || !match) {
    return (
      <main className="loading-screen">
        <div className="loading-logo">
          <Activity size={25} />
        </div>
        <h2>MatchMitra</h2>
        <p>{error || 'Match data unavailable'}</p>
        <button className="primary-button" onClick={loadMatch}>
          <RefreshCw size={16} /> Retry connection
        </button>
      </main>
    )
  }

  const scoreParts = match.score.split('/')
  const currentRuns = Number(scoreParts[0])
  const target = Number(match.target)
  const progress = Math.min((currentRuns / target) * 100, 100)

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#home">
          <div className="brand-icon">
            <Activity size={23} />
          </div>
          <span>
            match<span className="brand-accent">mitra</span>
          </span>
          <span className="brand-ai">AI</span>
        </a>

        <nav className="nav-links">
          <a className="active" href="#match">Match centre</a>
          <a href="#catchup">AI insights</a>
          <a href="#ask">Ask MatchMitra</a>
        </nav>

        <div className="header-right">
          <span className="demo-pill"><span /> DEMO MODE</span>
          <button className="avatar" aria-label="User profile">R</button>
        </div>
      </header>

      <main id="home" className="main-content">
        <section className="welcome-row">
          <div>
            <div className="eyebrow">
              <Sparkles size={14} /> YOUR PERSONAL CRICKET COMPANION
            </div>

            <h1>
              Every ball has a story.
              <br />
              <span>Never miss the context.</span>
            </h1>

            <p className="welcome-copy">
              Understand the game beyond the scoreboard. Catch up, decode key moments,
              and experience cricket smarter.
            </p>
          </div>

          <div className="welcome-stat">
            <div className="stat-icon">
              <BrainCircuit size={21} />
            </div>
            <div>
              <strong>Context first</strong>
              <span>Cricket, made clearer.</span>
            </div>
          </div>
        </section>

        <section id="match" className="match-section">
          <div className="section-heading">
            <div>
              <div className="eyebrow">MATCH CENTRE</div>
              <h2>The big picture</h2>
            </div>

            <button className="refresh-button" onClick={loadMatch}>
              <RefreshCw size={15} /> Refresh data
            </button>
          </div>

          <div className="match-card">
            <div className="match-card-top">
              <div className="match-label">
                <Trophy size={15} /> INTERNATIONAL · T20
              </div>
              <span className="demo-tag">ILLUSTRATIVE DATA</span>
            </div>

            <div className="teams-score">
              <div className="team-block">
                <div className="team-flag india-flag">IN</div>
                <div>
                  <strong>{match.team_a}</strong>
                  <span>Batting</span>
                </div>
              </div>

              <div className="score-block">
                <div className="score">{match.score}</div>
                <div className="overs">Overs {match.overs}</div>
              </div>

              <div className="team-block team-right">
                <div>
                  <strong>{match.team_b}</strong>
                  <span>Bowling</span>
                </div>
                <div className="team-flag australia-flag">AU</div>
              </div>
            </div>

            <div className="match-divider">
              <span>SECOND INNINGS</span>
              <span>TARGET: {match.target}</span>
            </div>

            <div className="chase-progress">
              <div className="progress-label">
                <span>Chase progress</span>
                <strong>{progress.toFixed(1)}%</strong>
              </div>

              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="match-stats">
              <div className="match-stat">
                <span>Runs needed</span>
                <strong>{match.required_runs}</strong>
              </div>

              <div className="match-stat">
                <span>Balls left</span>
                <strong>{match.required_balls}</strong>
              </div>

              <div className="match-stat">
                <span>Required RR</span>
                <strong>{Number(match.required_run_rate).toFixed(2)}</strong>
              </div>

              <div className="match-stat">
                <span>Wickets left</span>
                <strong>{match.wickets_remaining}</strong>
              </div>
            </div>

            <div className="match-note">
              <CircleHelp size={15} />
              {match.note}
            </div>
          </div>
        </section>

        <section className="insights-grid">
          <article id="catchup" className="insight-card catchup-card">
            <div className="card-heading">
              <div className="card-icon purple">
                <Zap size={19} />
              </div>
              <span className="card-kicker">YOUR 30-SECOND BRIEF</span>
            </div>

            <h3>Just joined the match?</h3>

            <p className="card-description">
              Get the essential match context without scrolling through endless scorecards.
            </p>

            <div className="catchup-preview">
              <div className="brief-top">
                <span><Clock3 size={14} /> QUICK CATCH-UP</span>
                <span>30 SEC READ</span>
              </div>

              {catchup ? (
                <div className="ai-generated-text">
                  <ReactMarkdown>{catchup}</ReactMarkdown>
                </div>
              ) : (
                <>
                  <div className="brief-item">
                    <span className="brief-dot purple-dot" />
                    <div>
                      <strong>{match.team_a} are chasing {match.target}</strong>
                      <p>
                        Current score: {match.score} in {match.overs} overs.
                      </p>
                    </div>
                  </div>

                  <div className="brief-item">
                    <span className="brief-dot orange-dot" />
                    <div>
                      <strong>
                        {match.required_runs} runs from {match.required_balls} balls
                      </strong>
                      <p>
                        Required rate: {Number(match.required_run_rate).toFixed(2)} per over.
                      </p>
                    </div>
                  </div>

                  <div className="brief-item">
                    <span className="brief-dot green-dot" />
                    <div>
                      <strong>{match.wickets_remaining} wickets in hand</strong>
                      <p>There is still batting depth available for the chase.</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <button
              className="primary-button"
              onClick={handleCatchup}
              disabled={catchupLoading}
            >
              {catchupLoading ? <RefreshCw size={16} /> : <Sparkles size={16} />}
              {catchupLoading ? 'Generating catch-up...' : 'Generate AI catch-up'}
            </button>

            {catchupError && (
              <div className="answer-panel">
                <p>{catchupError}</p>
              </div>
            )}

            <div className="demo-explainer">
              <Sparkles size={14} />
              AI-generated from the displayed illustrative match data.
            </div>
          </article>

          <article className="insight-card moment-card">
            <div className="card-heading">
              <div className="card-icon orange">
                <Crosshair size={19} />
              </div>
              <span className="card-kicker">MOMENT TRACKER</span>
            </div>

            <h3>What just happened?</h3>

            <p className="card-description">
              Select any event to understand its significance with AI.
            </p>

            <div className="event-list">
              {match.recent_events.map((event, index) => {
                const isWicket = event.toLowerCase().includes('wicket')

                return (
                  <button
                    className={`event-row ${selectedEvent === event ? 'selected-event' : ''}`}
                    key={`${event}-${index}`}
                    onClick={() => handleMoment(event)}
                    disabled={momentLoading}
                  >
                    <div className={`event-icon ${isWicket ? 'wicket-event' : ''}`}>
                      {isWicket ? <Target size={15} /> : <Activity size={15} />}
                    </div>

                    <div className="event-text">
                      <strong>{event}</strong>
                      <span>{isWicket ? 'Key moment' : 'Recent delivery'}</span>
                    </div>

                    <span className="event-index">0{index + 1}</span>
                    <ChevronRight size={15} />
                  </button>
                )
              })}
            </div>

            {momentLoading && (
              <div className="answer-panel">
                <p>MatchMitra is analysing this moment...</p>
              </div>
            )}

            {momentError && (
              <div className="answer-panel">
                <p>{momentError}</p>
              </div>
            )}

            {momentAnswer && (
              <div className="answer-panel">
                <div className="answer-title">
                  <BrainCircuit size={17} /> AI MOMENT EXPLANATION
                </div>

                <p className="answer-question">
                  Selected event: {selectedEvent}
                </p>

                <div className="ai-generated-text">
                  <ReactMarkdown>{momentAnswer}</ReactMarkdown>
                </div>

                <span className="answer-disclaimer">
                  Gemini AI · Powered by MatchMitra
                </span>
              </div>
            )}
          </article>
        </section>

        <section id="ask" className="ask-section">
          <div className="ask-intro">
            <div className="card-icon purple">
              <MessageCircle size={19} />
            </div>

            <div>
              <div className="eyebrow">YOUR CRICKET THINKING PARTNER</div>
              <h2>Ask MatchMitra</h2>
              <p>
                Ask questions about the match. Get answers grounded in the displayed match situation.
              </p>
            </div>
          </div>

          <div className="suggested-prompts">
            {prompts.map((prompt) => (
              <button
                key={prompt}
                className="prompt-chip"
                onClick={() => {
                  setQuestion(prompt)
                  setAnswer('')
                  setAskError('')
                }}
              >
                {prompt} <ArrowUpRight size={13} />
              </button>
            ))}
          </div>

          <form className="ask-form" onSubmit={handleAsk}>
            <input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask anything about this match..."
              aria-label="Ask a question about the match"
            />

            <button type="submit" disabled={!question.trim() || asking}>
              {asking ? <RefreshCw size={16} /> : <Send size={16} />}
              {asking ? 'Thinking...' : 'Ask'}
            </button>
          </form>

          {askError && (
            <div className="answer-panel">
              <p>{askError}</p>
            </div>
          )}

          {answer && (
            <div className="answer-panel">
              <div className="answer-title">
                <BrainCircuit size={17} /> MATCHMITRA EXPLAINS
              </div>

              <p className="answer-question">
                You asked: {selectedPrompt}
              </p>

              <div className="ai-generated-text">
                <ReactMarkdown>{answer}</ReactMarkdown>
              </div>

              <span className="answer-disclaimer">
                Gemini AI · Powered by MatchMitra
              </span>
            </div>
          )}
        </section>

        <footer className="footer">
          <a className="brand footer-brand" href="#home">
            <div className="brand-icon">
              <Activity size={19} />
            </div>
            <span>
              match<span className="brand-accent">mitra</span>
            </span>
          </a>

          <span>Built for fans who want to understand every moment.</span>

          <span className="footer-status">
            <Radio size={13} /> Demo environment
          </span>
        </footer>
      </main>
    </div>
  )
}

export default App
