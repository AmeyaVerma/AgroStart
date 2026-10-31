import React, { useEffect, useRef, useState } from 'react';
import './OurSolution.css';
import { Smartphone, Users, TrendingUp, ArrowDown, CheckCircle2 } from 'lucide-react';
import microImg from '../assets/micro_learning_illustration.png';
import trainerImg from '../assets/master_trainer_illustration.png';
import impactImg from '../assets/performance_impact_illustration.png';

const workflow = [
  {
    step: '01',
    image: microImg,
    icon: <Smartphone size={26} />,
    title: 'AI-Powered Micro-Learning',
    body: 'Bite-sized, role-specific lessons served in local languages through our mobile-first platform — available online or offline, anytime, anywhere in the field.',
    tag: 'Digital',
    color: '#599742',
    metrics: ['Local languages', 'Offline-ready', 'AI personalised'],
  },
  {
    step: '02',
    image: trainerImg,
    icon: <Users size={26} />,
    title: 'Offline Field Master Trainers',
    body: 'A certified network of Field Master Trainers reinforces digital learning through hands-on, in-field coaching — bridging the gap between knowledge and real-world application.',
    tag: 'Field',
    color: '#3a6829',
    metrics: ['On-ground coaching', 'Master Trainers', 'Blended delivery'],
  },
  {
    step: '03',
    image: impactImg,
    icon: <TrendingUp size={26} />,
    title: 'Measurable Performance Impact',
    body: 'Every learning intervention is tied to a business outcome — product adoption, sales uplift, compliance adherence — tracked in real-time through smart dashboards.',
    tag: 'Impact',
    color: '#1e4d16',
    metrics: ['Sales uplift', 'Compliance tracking', 'Live dashboards'],
  },
];

export default function OurSolution() {
  const [visible, setVisible] = useState([false, false, false]);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          // Stagger each card appearing
          workflow.forEach((_, i) => {
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 300);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="our-solution-v2" id="resources">
      <div className="container our-solution-v2-inner">

        {/* LEFT — copy */}
        <div className="solution-copy-col">
          <div className="tag">OUR SOLUTION</div>
          <h2>A blended learning engine<br />built for agriculture.</h2>
          <p className="solution-lead">
            We combine AI-powered digital micro-learning with offline field execution
            by certified Master Trainers — creating a continuous learning loop that
            drives real, measurable performance on the ground.
          </p>

          <div className="solution-pillars">
            <div className="solution-pillar">
              <div className="pillar-dot digital"></div>
              <div>
                <h4>Digital Micro-Learning</h4>
                <p>Personalised, in local languages, accessible anytime, anywhere.</p>
              </div>
            </div>
            <div className="solution-pillar">
              <div className="pillar-dot field"></div>
              <div>
                <h4>Offline Field Enablement</h4>
                <p>Reinforced through hands-on training and real-world application.</p>
              </div>
            </div>
            <div className="solution-pillar">
              <div className="pillar-dot dot-impact"></div>
              <div>
                <h4>Performance Measurement</h4>
                <p>Every programme is tied to sales, adoption, or compliance outcomes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Animated workflow */}
        <div className="solution-workflow-col" ref={ref}>
          <div className="workflow-rail">
            {workflow.map((item, i) => (
              <React.Fragment key={i}>
                <div
                  className={`workflow-card glass ${visible[i] ? 'workflow-card--visible' : ''}`}
                  style={{ '--card-color': item.color }}
                >
                  <div className="workflow-card-inner">
                    <div className="workflow-image-wrap">
                      <img src={item.image} alt={item.title} className="workflow-img" />
                    </div>
                    <div className="workflow-text">
                      <div className="workflow-step-label">Step {item.step}</div>
                      <h4>{item.title}</h4>
                      <p>{item.body}</p>
                      <div className="workflow-metric-chips">
                        {item.metrics.map((m, j) => (
                          <span className="metric-chip" key={j}>
                            <CheckCircle2 size={12} />
                            {m}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="workflow-card-accent" style={{ background: item.color }}></div>
                </div>

                {/* Animated connector arrow between cards */}
                {i < workflow.length - 1 && (
                  <div className={`workflow-connector ${visible[i] ? 'workflow-connector--visible' : ''}`}>
                    <div className="connector-line"></div>
                    <ArrowDown size={16} className="connector-arrow" />
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
