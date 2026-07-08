import React from 'react';
import './TheChallenge.css';
import challengeImg from '../assets/challenge_illustration.png';
import { Calendar, Brain, MapPin, BarChart3 } from 'lucide-react';

const challenges = [
  {
    icon: <Calendar size={22} />,
    title: 'Event-Based Training',
    body: 'One-time training events deliver a burst of information that field teams forget within days. Without reinforcement, learning evaporates before it reaches the field.',
  },
  {
    icon: <Brain size={22} />,
    title: 'Low Knowledge Retention',
    body: 'Research shows that up to 70% of knowledge is lost within a month when there is no spaced repetition, assessment, or real-world application built into the programme.',
  },
  {
    icon: <MapPin size={22} />,
    title: 'Dispersed Field Teams',
    body: 'Agribusiness field forces are spread across hundreds of villages and districts — geographically dispersed, hard to reach, hard to train, and even harder to track.',
  },
  {
    icon: <BarChart3 size={22} />,
    title: 'No Measurable Impact',
    body: 'L&D budgets are spent on training events, but there is no mechanism to link learning to field performance, product adoption, or sales uplift — making ROI invisible.',
  },
];

export default function TheChallenge() {
  return (
    <section className="challenge-v2" id="why">
      <div className="container challenge-v2-inner">
        
        <div className="challenge-top-row">
          {/* LEFT — Illustration */}
          <div className="challenge-illustration-col">
            <div className="challenge-illustration-frame">
              <img
                src={challengeImg}
                alt="Traditional agricultural training failing to reach field teams"
                className="challenge-illustration-img"
              />
              {/* Subtle watermark stat overlay */}
              <div className="challenge-stat-overlay glass">
                <span className="overlay-number">70%</span>
                <span className="overlay-label">of traditional training<br />fails in the field</span>
              </div>
            </div>
          </div>

          {/* RIGHT — Text Content */}
          <div className="challenge-text-col">
            <div className="tag">THE CHALLENGE</div>
            <h2>Traditional training<br />doesn't work<br />in the field.</h2>
            <p className="challenge-subheading">
              The agri-sector continues to rely on event-based, classroom-first approaches
              that are built for convenience — not for real field impact.
            </p>
          </div>
        </div>

        {/* BOTTOM — Cards */}
        <div className="challenge-cards-grid">
          {challenges.map((c, i) => (
            <div className="challenge-glass-card glass" key={i}>
              <div className="challenge-card-icon">{c.icon}</div>
              <h4>{c.title}</h4>
              <p>{c.body}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
